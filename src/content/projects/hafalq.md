---
title: HafalQ - Al Qur’an App with the Tasmi’ Method
description: A Flutter Qur'an app built around Tasmi', the listen-and-repeat memorization method, with a repeatable murottal player, offline-tolerant surah data, and location-based prayer times.
date: 2025-06-22
category: Mobile
tags: Quran, Education, Memorization, Flutter
projectType: Freelance
image: /projects/hafalq/cover.avif
githubUrl: https://github.com/anwarpage/HafalQ
team: Wifda Muna Fatihia, M.Tr.Kom., M. Kaspul Anwar | https://github.com/anwarpage, Muhammad Fahrul Bahri | https://github.com/Theseadev, Akhmad Hafidz Ardianto | https://github.com/Hzkun001, Muhammad Lutfan | https://github.com/MLutfan
institution: Fakultas Dakwah dan Ilmu Komunikasi UIN Antasari
techStack: Flutter, Dart, Provider, audioplayers, SharedPreferences, Geolocator & Geocoding, Qur'an API (quran.gading.dev, alquran.cloud), Aladhan API
---

HafalQ is a Flutter Qur'an app for Fakultas Dakwah dan Ilmu Komunikasi UIN Antasari, designed around **Tasmi'**, the memorization method of listening to a recitation and repeating it until it sticks. It combines a full surah reader with a murottal player that can loop a surah and change its pace, plus daily prayer times and the Hijri date on the home screen. I served as **Product Leader** in a five-person team alongside a Scrum Master, a UI/UX designer, and frontend and backend developers.

## Problem to Solve

Most Qur'an apps are built for reading, not memorizing. Supporting Tasmi' on a phone raised three practical needs:

- **Repetition Is the Core Loop**: Memorizing means hearing the same passage many times at a comfortable pace. A plain play button forces users to restart audio by hand after every pass.
- **Reliable Text on Unreliable Networks**: Students often study on weak mobile connections. If the Qur'an API is slow or down, the app still has to open the surah they were memorizing.
- **Everything in One Place**: Learners also check prayer times and the Hijri date daily. Switching between separate apps breaks the study routine.

## Solution Approach

The app is a Flutter client with Provider for state, organized into a surah reader, a Tasmi' player, and a daily dashboard:

- **Tasmi' Murottal Player**: Plays the surah **ayah by ayah** in sequence, then loops the whole surah **1×, 5×, 10×, or 15×** in repeat mode. Playback speed can be set from **0.5× to 2×**, so users can slow down for new passages and speed up during review. Each ayah card also has its own play, repeat, and bookmark controls.
- **Resilient Qur'an Data Layer**: Surah lists and verses come from `api.quran.gading.dev`, falling back to `api.alquran.cloud`. Each request has a 10-second timeout, and timeouts or network errors are retried up to **3 times with exponential backoff** (1s, 2s, 4s). Results are cached in SharedPreferences for **30 days**, and an expired copy is still served if every source fails, so previously opened surahs keep working offline.
- **Complete Surah Detail**: Arabic text, Indonesian translation, and transliteration on every ayah. Transliteration is fetched from a separate per-surah dataset and merged into the verse list, since the primary API does not provide it.
- **Daily Dashboard**: The device location (Geolocator) feeds the **Aladhan** prayer-time API, cached per coordinate with the same expired-cache fallback, while reverse geocoding shows the user's city in the greeting. A Hijri calendar card shows today's Islamic date.
- **Personal Preferences**: Dark mode persisted with SharedPreferences, adjustable font size, surah search, and a bookmark list for quick returns to verses.

![HafalQ Qur'an Data and Tasmi' Player Flow](/projects/hafalq/data-flow.svg)

### Repeat Logic in the Tasmi' Player

Below is the playback loop from `lib/pages/surah_detail_page.dart`. When an ayah finishes, the player either advances to the next ayah or, in repeat mode, restarts the surah until the chosen count is reached:

```dart
_audioPlayer.onPlayerComplete.listen((event) {
  if (_isRepeating) {
    _repeatCounter++;
    if (_repeatCounter < _repeatCount) {
      _playSurah(startIndex: 0, resetRepeat: false); // next Tasmi' pass
    } else {
      setState(() {
        _isPlaying = false;
        _currentAyat = 0;
        _repeatCounter = 0;
      });
    }
  } else if (_currentAyat < widget.ayatList.length - 1) {
    _playSurah(startIndex: _currentAyat + 1); // continue to the next ayah
  } else {
    setState(() {
      _isPlaying = false;
      _currentAyat = 0;
    });
  }
});
```

### Retry With Exponential Backoff

Below is the request helper from `lib/services/quran_api_service.dart` used for every Qur'an API call:

```dart
Future<http.Response> _fetchWithRetry(String url, {int retryCount = 0}) async {
  try {
    final response = await http.get(Uri.parse(url)).timeout(_timeout); // 10s
    return response;
  } catch (e) {
    if (retryCount < _maxRetries) {
      // Exponential backoff: wait 2^retryCount seconds before retrying
      await Future.delayed(Duration(seconds: 1 << retryCount));
      return _fetchWithRetry(url, retryCount: retryCount + 1);
    }
    rethrow;
  }
}
```

### Team Roles

| Role           | Member                       |
| -------------- | ---------------------------- |
| Scrum Master   | Wifda Muna Fatihia, M.Tr.Kom. |
| Product Leader | M. Kaspul Anwar              |
| UI/UX Designer | Muhammad Lutfan              |
| Frontend Dev   | Muhammad Fahrul Bahri        |
| Backend Dev    | Akhmad Hafidz Ardianto       |

## Impact

Delivered a working Flutter prototype that turns Tasmi' into a daily mobile routine: learners open a surah even on a weak connection, loop its murottal at their own pace, and check prayer times without leaving the app. The next steps are persisting bookmarks and font size across app restarts (both currently live only in memory), and completing the Qibla direction menu that is already on the home screen.
