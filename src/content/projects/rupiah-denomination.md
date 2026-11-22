---
title: Rupiah Currency Denomination & Sum Detection
description: A YOLOv8 computer vision prototype trained on 2,877 manually photographed Indonesian banknotes to detect multiple denominations and calculate their total value in real time.
description_id: Prototipe computer vision berbasis YOLOv8 yang dilatih pada 2.877 foto uang kertas Rupiah hasil pemotretan manual untuk mendeteksi multi-nominal dan menghitung total nilainya secara real-time.
date: 2024-09-06
category: Machine Learning
tags: Computer Vision, Object Detection, YOLOv8, Custom Dataset, Accessibility
projectType: Competition
image: /projects/rupiah_denomination.avif
githubUrl: GitHub (Model) | https://github.com/AndriRahmadani12/penghitung-uang-indonesia-deeplearning, GitHub (Dataset) | https://github.com/mkaspulanwar/rupiah-banknotes-dataset
team: M. Kaspul Anwar | https://github.com/anwarpage, Andri Rahmadani | https://github.com/AndriRahmadani12, Muhammad Lutfan | https://github.com/MLutfan
techStack: Python, PyTorch, YOLOv8 (Ultralytics), OpenCV, Roboflow
---

Rupiah Currency Denomination & Sum Detection is an assistive computer vision prototype developed to help visually impaired users in South Kalimantan identify Indonesian Rupiah banknotes and calculate total cash in hand automatically. The project spans two repositories: a manually photographed dataset ([mkaspulanwar/rupiah-banknotes-dataset](https://github.com/mkaspulanwar/rupiah-banknotes-dataset)) and the YOLOv8 training and video-inference pipeline ([AndriRahmadani12/penghitung-uang-indonesia-deeplearning](https://github.com/AndriRahmadani12/penghitung-uang-indonesia-deeplearning)).

## Problem to Solve

Recognizing paper money in daily transactions is challenging for visually impaired individuals once tactile markings wear down from circulation:

- **Physical Degradation & Lighting**: Circulated banknotes are frequently folded, crumpled, faded, or held under dim lighting where simple color-thresholding fails.
- **Multi-Note Summation**: In real transactions, users often hold multiple banknotes of different denominations simultaneously—requiring multi-object localization and arithmetic summation rather than single-image classification.
- **False-Positive Cost in Counting**: A single misclassified background object or low-confidence detection directly corrupts the total Rupiah sum.

## Solution Approach

I led the project development and dataset curation, building the pipeline from raw photography to real-time OpenCV summation:

- **Manual Dataset Curation (`2,877` Images)**: Photographed **2,877 Indonesian Rupiah images** across all seven paper denominations (`Rp1.000`, `Rp2.000`, `Rp5.000`, `Rp10.000`, `Rp20.000`, `Rp50.000`, `Rp100.000`) plus multi-note scenes (`idr_mix`). Captured deliberate variations across normal, folded, crumpled, angled, low-light, and blurred conditions, then annotated bounding boxes in **Roboflow** ([rupiah-banknotes-dataset](https://github.com/mkaspulanwar/rupiah-banknotes-dataset)).
- **YOLOv8n Object Detection (`src/train.py` & `src/config.yaml`)**: Trained an Ultralytics `yolov8n.yaml` detector for `100` epochs (`imgsz=640`, `batch=16`) across the 7 Rupiah classes to balance multi-object localization accuracy with fast frame-by-frame inference.
- **High-Confidence Gate & Frame Summation (`main.py`)**: Processes video frames via `cv2.VideoCapture`, filters predictions with a strict confidence threshold (`score > 0.8`), extracts the numeric value directly from the detected class label (`int(class_name[2:])`), and formats the per-frame total into standard Indonesian currency notation using Python's `locale` (`id_ID`).

![Rupiah Dataset, YOLOv8n Detection & Summation Pipeline](/projects/rupiah-denomination/pipeline-workflow.svg)

### Frame-by-Frame Detection & Nominal Accumulation

Below is the core detection filter and nominal summation loop from `main.py`:

```python
threshold = 0.8
total_money = {
    'RP1000': 0, 'RP2000': 0, 'RP5000': 0,
    'RP10000': 0, 'RP20000': 0, 'RP50000': 0, 'RP100000': 0
}
locale.setlocale(locale.LC_ALL, 'id_ID')

while ret:
    total_frame_money = 0
    results = model(frame)[0]

    for result in results.boxes.data.tolist():
        x1, y1, x2, y2, score, class_id = result

        if score > threshold:
            class_name = results.names[int(class_id)].upper()
            if class_name in total_money:
                total_money[class_name] += 1
                total_frame_money += int(class_name[2:])  # e.g. 'RP50000' -> 50000

            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 4)
            cv2.putText(frame, class_name, (int(x1), int(y1 - 10)),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 255, 0), 3, cv2.LINE_AA)

    total_frame_money_str = locale.currency(total_frame_money, grouping=True)
    cv2.putText(frame, f"Total uang: {total_frame_money_str}", (50, 50),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)
```

### Validation Metrics & Environmental Stress Testing

Evaluated across the 7 Rupiah classes (100 epochs) and stress-tested under three environmental conditions:

| Denomination    | Precision | Recall  | mAP@0.5   | Normal Light | Low Light | Motion / Blur |
| --------------- | --------- | ------- | --------- | ------------ | --------- | ------------- |
| **Rp1.000**     | `0.968`   | `0.950` | `0.952`   | `93%`        | `93%`     | `70%`         |
| **Rp2.000**     | `0.909`   | `0.950` | `0.909`   | `94%`        | `92%`     | `65%`         |
| **Rp5.000**     | `0.935`   | `0.950` | `0.935`   | `91%`        | `91%`     | `70%`         |
| **Rp10.000**    | `0.961`   | `0.950` | `0.961`   | `95%`        | `93%`     | `72%`         |
| **Rp20.000**    | `0.973`   | `0.950` | `0.973`   | `92%`        | `91%`     | `67%`         |
| **Rp50.000**    | `0.963`   | `0.950` | `0.963`   | `93%`        | `90%`     | `71%`         |
| **Rp100.000**   | `0.957`   | `0.950` | `0.957`   | `90%`        | `90%`     | `65%`         |
| **All Classes** | **`0.952`** | **`0.950`** | **`0.952`** | **`92.6%`** | **`91.4%`** | **`68.6%`** |

## Impact

Delivered a functional assistive computer vision prototype achieving **95.2% mAP@0.5** and **0.92 F1-score** across all seven Rupiah denominations—maintaining over **90% accuracy in both normal and low-light scenes** while publishing the open **2,877-image Rupiah Banknotes Dataset** for future Indonesian currency recognition research.
