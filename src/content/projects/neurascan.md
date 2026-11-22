---
title: NeuraScan - Brain MRI Tumor Segmentation
description: A web-based medical imaging application for automated brain tumor classification, localization, and pixel-level instance segmentation on MRI scans.
description_id: Aplikasi web pencitraan medis untuk klasifikasi, lokalisasi kotak pembatas, dan segmentasi instans tingkat piksel otomatis pada citra MRI tumor otak.
date: 2025-02-01
category: Machine Learning
tags: Medical Imaging, Computer Vision, Instance Segmentation, Deep Learning, FastAPI
projectType: Personal
team: M. Kaspul Anwar | https://github.com/anwarpage, Andri Rahmadani | https://github.com/AndriRahmadani12, Henny Kartika | https://github.com/hennykartika
image: /projects/neurascan.avif
githubUrl: https://github.com/AndriRahmadani12/brain-tumor-web-app
techStack: Python, PyTorch, Mask R-CNN, Ultralytics YOLO, OpenCV, NumPy, FastAPI, HTML/CSS/JavaScript
---

NeuraScan is a web-based brain MRI analysis system developed in a cross-university collaboration between Information Technology students from UIN Antasari Banjarmasin and Universitas Lambung Mangkurat. It combines deep learning instance segmentation with a FastAPI inference service and a split-screen web interface to classify, localize, and highlight brain tumor regions across four diagnostic categories: **Glioma**, **Meningioma**, **Pituitary**, and **No Tumor**.

https://youtu.be/7-NVucEu0XY

## Problem to Solve

Manual inspection of brain MRI slices is time-intensive and requires clear visual delineation of lesion boundaries:

- **Beyond Whole-Image Classification**: Simple image classifiers output a label (`Glioma` or `Pituitary`) without showing where the lesion sits or how far its boundary extends.
- **Boundary Delineation vs. Bounding Boxes**: Standard bounding boxes include surrounding healthy tissue; clinical review benefits from pixel-level instance masks alongside confidence scores.
- **Accessible Inference Workflow**: Trained PyTorch weights (`.pt`) typically remain inside notebooks unless wrapped in a low-latency HTTP endpoint and browser interface that supports direct image uploads, URL inputs, and side-by-side visual comparison.

## Solution Approach

The system is architected as a decoupled two-tier web application (`backend/` and `frontend/`) built around a three-branch instance segmentation pipeline:

- **Instance Segmentation Architecture (Mask R-CNN & YOLOv11-seg)**: Extracts multi-scale feature maps (`640×640` input resolution) and predicts three parallel outputs per region of interest—**Tumor Category** (`Glioma`, `Meningioma`, `Pituitary`, `No Tumor`), **Bounding Box Coordinates** (`[x1, y1, x2, y2]`), and a binary **Pixel Segmentation Mask** (`mask > 0.5`).
- **FastAPI & OpenCV Inference Endpoint (`POST /predict/`)**: Decodes uploaded MRI bytes directly in memory via `np.frombuffer` and `cv2.imdecode`, runs model inference (`conf=0.5`, `iou=0.5`), resizes the predicted binary mask to the original scan dimensions, and renders class-specific BGR color overlays (`Glioma` in green, `Meningioma` in red, `Pituitary` in blue) while filtering out `No Tumor` regions from mask drawing.
- **Split-Pane Web Interface (Vanilla HTML/CSS/JS)**: Implements drag-and-drop file upload, remote image URL fetching (`Blob` conversion), and four built-in sample MRI scans on the left panel, paired with a side-by-side **Original vs. Segmented Scan** viewer, animated confidence progress bar, inference latency readout, and `localStorage` session persistence on the right panel.

![NeuraScan Instance Segmentation & Inference Pipeline](/projects/neurascan/inference-pipeline.svg)

### Real-Time Inference & OpenCV Mask Overlay

Below is the core inference and pixel-mask rendering logic from `backend/app.py`:

```python
CLASS_COLORS = {
    "Glioma": (0, 255, 0),       # Green (BGR)
    "Meningioma": (0, 0, 255),   # Red (BGR)
    "Pituitary": (255, 0, 0),    # Blue (BGR)
}

@app.post("/predict/")
async def predict_mri_tumor(file: UploadFile = File(...)):
    start_time = time.time()
    contents = await file.read()
    img = cv2.imdecode(np.frombuffer(contents, np.uint8), cv2.IMREAD_COLOR)

    results = model.predict(source=img, conf=0.5, iou=0.5, imgsz=640)
    result = results[0]

    if result.boxes:
        annotated_img = img.copy()
        for box, mask in zip(result.boxes, result.masks):
            class_id = int(box.cls)
            class_name = model.names[class_id]
            confidence = float(box.conf)
            bbox = box.xyxy[0].cpu().numpy()

            if class_name == "No Tumor":
                continue

            color = CLASS_COLORS.get(class_name, (255, 255, 255))
            cv2.rectangle(
                annotated_img,
                (int(bbox[0]), int(bbox[1])),
                (int(bbox[2]), int(bbox[3])),
                color, 2,
            )

            mask_data = mask.data[0].cpu().numpy()
            mask_resized = cv2.resize(mask_data, (annotated_img.shape[1], annotated_img.shape[0]))
            annotated_img[mask_resized > 0.5] = color
```

### Model Validation Performance (100 Epochs)

Evaluated on the 4-class labeled brain MRI segmentation validation set (`imgsz=640`, `batch=8`):

| Metric / Class                | Bounding Box (`B`) | Segmentation Mask (`M`) | Notes                                           |
| ----------------------------- | ------------------ | ----------------------- | ----------------------------------------------- |
| **Precision**                 | `95.0%`            | `95.2%`                 | Peak validation precision (Epoch 87)            |
| **Recall**                    | `93.3%`            | `93.5%`                 | Peak validation recall (Epoch 87)               |
| **mAP@50**                    | `95.9%`            | `96.1%`                 | IoU threshold `0.50` across all 4 classes       |
| **mAP@50–95**                 | `70.2%`            | `71.3%`                 | Strict multi-threshold IoU (`0.50:0.95`)        |
| **Class Normalized Accuracy** | —                  | —                       | `No Tumor` 98%, `Pituitary` 97%, `Glioma` 93%, `Meningioma` 91% |

## Impact

Delivered a working end-to-end medical imaging web prototype that bridges trained PyTorch segmentation weights with an interactive browser workflow—achieving **96.1% mask mAP@50** across four MRI diagnostic categories and returning color-coded lesion masks, confidence scores, and processing times in sub-second local inference.
