---
title: Telegram Child Fall Detection System with ESP32
description: A real-time child fall monitoring system combining ESP32-CAM MJPEG streaming, MediaPipe pose kinematics, multi-frame sequence stitching, and asynchronous Telegram alerts.
description_id: Sistem pemantauan deteksi anak jatuh secara real-time yang memadukan streaming MJPEG ESP32-CAM, kinematika pose MediaPipe, kolase urutan multi-frame, serta notifikasi asinkron Telegram.
date: 2025-03-01
category: Machine Learning
tags: Computer Vision, Pose Estimation, Fall Detection, IoT, ESP32-CAM
projectType: Personal
image: /projects/childfall_detection.avif
# githubUrl: https://github.com/AndriRahmadani12/child-fall-detection-system-iot-deeplearning
team: M. Kaspul Anwar | https://github.com/anwarpage, Andri Rahmadani | https://github.com/AndriRahmadani12, Henny Kartika | https://github.com/hennykartika, Muhammad Lutfan | https://github.com/MLutfan
techStack: Python, MediaPipe Pose, OpenCV, NumPy, ESP32-CAM (C/C++), AsyncIO & aiohttp, Telegram Bot API
---

Telegram Child Fall Detection System is an end-to-end computer vision and IoT safety monitoring prototype built to detect child fall incidents in real time and immediately dispatch visual evidence to caregivers via Telegram. It pairs a low-cost **AI-Thinker ESP32-CAM** video stream with **MediaPipe Pose** kinematic analysis in Python.

https://youtu.be/9MAKYy4xKGU

## Problem to Solve

Building a reliable fall monitoring system for home or daycare environments using an affordable microcontroller camera introduces three practical engineering challenges:

- **High False-Positive Rate on Static Posture**: Children frequently crouch, bend over, or sit on the floor. Judging a fall solely from a bounding-box aspect ratio on a single frame triggers constant false alarms.
- **Single-Frame Alert Ambiguity**: Sending a single blurry frame when an alert triggers rarely gives a caregiver enough context to tell whether the child actually fell or simply lay down.
- **Blocking Network I/O in Video Loops**: Uploading alert photos to the Telegram API synchronously inside an OpenCV `while cap.isOpened()` loop freezes frame capture and drops incoming camera frames for several seconds.

## Solution Approach

The system splits the workload between an embedded C/C++ camera streamer on the ESP32-CAM and a stateful Python pose-kinematics pipeline (`FallDetector`):

- **ESP32-CAM MJPEG HTTP Stream (`esp32cam/camera/camera.ino`)**: Configures the `OV2640` sensor on the AI-Thinker board in `PIXFORMAT_JPEG` (`FRAMESIZE_QVGA`, JPEG quality `10`) using dual PSRAM frame buffers (`fb_count = 2`, `CAMERA_GRAB_LATEST`) at a `20 MHz` clock, serving a continuous MJPEG stream over Wi-Fi at `http://<device-ip>:81/stream`.
- **MediaPipe 9-Keypoint Kinematic Tracking (`backend/fall_detector.py`)**: Consumes the MJPEG stream via `cv2.VideoCapture` and runs `mp.solutions.pose.Pose` (`min_detection_confidence=0.6`, `min_tracking_confidence=0.6`). Extracts 9 anatomical keypoints (`NOSE`, left/right `SHOULDER`, `HIP`, `KNEE`, and `ANKLE`) and tracks frame-to-frame midpoint displacement (`dx, dy`) and acceleration (`ax, ay`) for the shoulders, hips, and knees.
- **4-Criteria Biomechanical Filter & Temporal Debouncing**: Evaluates four posture and motion rules per frame, requiring **at least 3 of 4 criteria** (`criteria_count >= 3`) across **3 consecutive frames** (`fall_frames_threshold = 3`) to confirm a fall, followed by a **10-frame recovery cooldown** (`recovery_frames_threshold = 10`) to prevent duplicate alert spam.
- **2×3 Sequence Evidence Grid & Async Telegram Dispatch (`backend/telegram_utils.py`)**: Maintains a rolling 15-frame ring buffer (`frame_buffer`). Upon fall confirmation, `save_fall_image()` stitches the 5 preceding frames plus the current annotated frame into a `2×3` chronological sequence image (`Frame 1` to `Frame 6`) and dispatches `/sendMessage` and `/sendPhoto` non-blockingly via `asyncio.create_task()` and `aiohttp.ClientSession`.

![Child Fall Detection Kinematic & Alert Pipeline](/projects/childfall-detection/pipeline-workflow.svg)

### Multi-Criteria Kinematic Evaluation & Temporal Gate

Below is the core fall-confirmation logic from `backend/fall_detector.py`:

```python
# 1. Posture aspect ratio: body becomes wider than tall when horizontal
criteria_1 = height_width_ratio < self.normal_posture_ratio          # < 0.4

# 2. Downward vertical hip velocity
criteria_2 = vertical_velocity > self.vertical_velocity_threshold    # dy > 0.04

# 3. Downward vertical hip acceleration
criteria_3 = vertical_acceleration > self.vertical_acceleration_threshold  # ay > 0.01

# 4. Low center of mass within the camera frame
criteria_4 = hip_mid[1] > frame.shape[0] * 0.6                       # lower 40% of frame

# Require at least 3 of 4 criteria simultaneously
criteria_count = sum([criteria_1, criteria_2, criteria_3, criteria_4])
potential_fall = criteria_count >= 3

# Temporal debouncing across consecutive frames
if potential_fall:
    self.fall_frames_counter += 1
else:
    self.fall_frames_counter = max(0, self.fall_frames_counter - 1)

is_falling = self.fall_frames_counter >= self.fall_frames_threshold  # >= 3 frames

if is_falling and not self.previous_fall_status:
    asyncio.run(self.save_fall_image(frame))
    self.previous_fall_status = True
    self.recovery_counter = 0
```

### Biomechanical & Temporal Threshold Parameters

| Parameter / Rule                    | Threshold Value       | Role in Pipeline                                                                 |
| ----------------------------------- | --------------------- | -------------------------------------------------------------------------------- |
| `normal_posture_ratio` (`H / W`)    | `< 0.40`              | Detects transition from upright standing/walking posture to horizontal posture.  |
| `vertical_velocity_threshold`       | `dy > 0.04`           | Captures rapid downward hip midpoint displacement between frames.                |
| `vertical_acceleration_threshold`   | `ay > 0.01`           | Filters out slow, controlled sitting or kneeling movements.                      |
| `hip_mid[1]` Vertical Position      | `> 60%` frame height  | Verifies the subject's pelvis has dropped toward the floor plane.                |
| `fall_frames_threshold`             | `3` consecutive frames| Suppresses single-frame landmark jitter before triggering an alert.              |
| `frame_buffer` / Sequence Grid      | `15` frames (`2×3` out)| Stitches `Frame 1..6` so caregivers can inspect the motion leading up to the fall.|

## Impact

Delivered a working IoT + Computer Vision safety prototype that turns a low-cost **ESP32-CAM** into an automated fall monitor—combining multi-criteria pose kinematics, temporal frame debouncing, and non-blocking `aiohttp` Telegram alerts with 6-frame chronological photo evidence.
