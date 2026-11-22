---
title: Sumify AI - Meeting Summarizer
description: An Android meeting assistant backed by a FastAPI pipeline that turns recorded or uploaded meeting audio into transcripts, structured summaries, and downloadable PDF reports.
description_id: Aplikasi Android asisten rapat dengan backend FastAPI yang mengubah rekaman atau unggahan audio rapat menjadi transkrip, ringkasan terstruktur, dan laporan PDF yang dapat diunduh.
date: 2026-09-13
category: Machine Learning
tags: AI, NLP, Speech Recognition, Summarization, Android
projectType: Personal
team: M. Kaspul Anwar | https://github.com/anwarpage, Andri Rahmadani | https://github.com/AndriRahmadani12, Henny Kartika | https://github.com/hennykartika
image: /projects/sumify.png
githubUrl: GitHub (Backend) | https://github.com/hennykartika/sumify-ai, GitHub (Android App) | https://github.com/anwarpage/sumify-ai-fe
techStack: Kotlin, Jetpack Compose, Retrofit & OkHttp, DataStore, Python, FastAPI, faster-whisper, DeepSeek LLM, Celery & Redis, PostgreSQL, SQLAlchemy & Alembic, MinIO, Playwright
---

Sumify AI is an end-to-end meeting summarizer built as two decoupled repositories: a **Kotlin / Jetpack Compose** Android client for recording, uploading, and tracking meetings, and a **FastAPI** backend that transcribes audio locally with **faster-whisper**, summarizes the transcript with the **DeepSeek** LLM, and renders the result into a branded A4 PDF report. It was developed collaboratively by Information Technology students from UIN Antasari Banjarmasin and Universitas Lambung Mangkurat.

https://youtube.com/shorts/O9PHaKJbLDA

## Problem to Solve

Meeting notes are usually written by hand, incomplete, and delivered late. Automating them from raw audio introduces several engineering challenges:

- **Long-Running AI Workloads**: Speech-to-text, LLM summarization, and PDF rendering take far longer than a normal HTTP request (a single summary alone takes about `30s`). Running them inline blocks the API and drops mobile connections.
- **Unstructured Output**: A transcript alone is not actionable. Teams need structured key points, decisions, action items with a PIC (person in charge), and next steps in a consistent, shareable format.
- **Mobile Capture & Reachability**: Users need to record directly from the phone or pick an existing file, follow real processing progress instead of an indefinite spinner, and download the final PDF from a device that cannot reach internal storage hosts such as `localhost:9000`.

## Solution Approach

The system is split into an Android client and a layered FastAPI backend (`router → services → repositories → models`) connected through a status-driven job lifecycle:

- **Android Client (Single-Activity + Compose + MVVM)**: Records audio via `MediaRecorder` (`MPEG_4` / `AAC`, `128 kbps`, `44.1 kHz`) or picks files from storage, then uploads them with title, description, and language through a Retrofit multipart `POST /meetings`. A `MeetingViewModel` polls `GET /meetings/{id}` every `3s` until a terminal status is reached, while a local history (favorites, delete, PDF downloads via `DownloadManager`) and `DataStore` preferences keep results available offline. The API base URL is injected per build type, and release builds enforce HTTPS.
- **Non-Blocking Ingest with Celery Fallback**: The upload endpoint stores audio in **MinIO**, records the meeting in **PostgreSQL** (SQLAlchemy async + Alembic) as `queued`, and immediately returns the meeting ID. The full pipeline is dispatched to a **Celery** worker over **Redis**; if the broker is unavailable, it falls back to an `asyncio` background task so uploads never block or fail.
- **Local Speech-to-Text (faster-whisper)**: Audio is pulled from MinIO into a temporary file and transcribed on CPU with a cached `base` model (`int8`, `beam_size=1`, `vad_filter=True` to skip silence). Timestamped segments and the detected language are saved alongside the full transcript.
- **Template-Driven LLM Summarization (DeepSeek)**: A prompt handler selects one of three summary types (`simple`, `business`, `study`), each with a strict JSON-only system prompt that forbids invented content. The summarizer normalizes the response and fills any field the LLM omits with safe defaults before it reaches the PDF stage.
- **HTML to A4 PDF (Playwright)**: The summary context is injected into *Simple* or *Business* HTML templates (including generated PIC and action-assignment tables), then printed by headless Chromium with a logo header, page counter, and an AI-accuracy disclaimer footer. The PDF is stored in MinIO and streamed back through `GET /meetings/{id}/download`, so the app only ever needs a single backend address.

![Sumify AI Recording, Processing & PDF Pipeline](/projects/sumify/system-pipeline.svg)

### Non-Blocking Upload with Celery Fallback

Below is the dispatch logic from `src/router/meetings.py`, the endpoint the Android app calls:

```python
def _enqueue_pipeline(meeting_id: int, template_type: str) -> bool:
    try:
        from src.worker.calery_task import full_pipeline_task

        full_pipeline_task.delay(meeting_id=meeting_id, template_type=template_type)
        return True
    except Exception as exc:
        logger.warning(f"Failed to enqueue Celery task for meeting {meeting_id}: {exc}")
        return False


@router.post("")
async def create_meeting(
    audio: UploadFile = File(...),
    title: str = Form(...),
    description: str | None = Form(None),
    language: str | None = Form(None),
    template_type: str = Form("business"),
):
    # ...store audio in MinIO and create the meeting row with status QUEUED...

    if not _enqueue_pipeline(meeting_id, template_type):
        # Broker unavailable: run as a plain asyncio background task instead.
        asyncio.create_task(_run_pipeline_inline(meeting_id, template_type))

    return {"id": str(meeting_id), "status": ProcessingStatus.QUEUED.value}
```

### Status Polling on the Android Client

Below is the polling loop from `ui/viewmodel/MeetingViewModel.kt` that drives the progress screen:

```kotlin
fun startPollingMeetingStatus(meetingId: String) {
    activeMeetingId = meetingId
    pollingJob?.cancel()
    _activeMeeting.value = repository.meetings.value.find { it.id == meetingId }
    pollingJob = viewModelScope.launch(Dispatchers.IO) {
        while (true) {
            runCatching {
                repository.refreshMeeting(meetingId)
            }.onSuccess {
                if (it != null) _activeMeeting.value = it
            }
            if (_activeMeeting.value?.status.isTerminalStatus()) break
            delay(if (meetingId.startsWith("mock_")) 1_500 else 3_000)
        }
    }
}
```

### Processing Lifecycle

| Status           | Stage                                   | Handled By                          |
| ---------------- | --------------------------------------- | ----------------------------------- |
| `queued`         | Audio stored, meeting recorded          | FastAPI + MinIO + PostgreSQL        |
| `transcribing`   | Speech converted to timestamped text    | faster-whisper (Celery worker)      |
| `summarizing`    | Key points, decisions, action items     | DeepSeek LLM (JSON output)          |
| `generating_pdf` | Template rendered into an A4 report     | Playwright (headless Chromium)      |
| `completed`      | Transcript, summary, and PDF link ready | Android client (polling + download) |
| `failed`         | Any stage raised an error               | Pipeline marks status, app stops    |

## Impact

Delivered a working end-to-end meeting summarizer: a user records or uploads audio on Android, and the backend automatically transcribes, summarizes, and returns a downloadable PDF report with no manual steps. Every backend stage (upload, Whisper transcription, LLM summary, PDF generation, and the Celery worker) has been tested end to end, and a built-in **demo mode** in the app simulates the full lifecycle for UX testing without a running server.
