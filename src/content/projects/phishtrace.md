---
title: PhishTrace - URL Phishing Detection & Tracker
description: A local URL safety checker and link tracker powered by a LightGBM hybrid model (TF-IDF + 30 lexical features) trained on Kaggle datasets and served with FastAPI and React.
date: 2026-11-22
category: Machine Learning
tags: Cybersecurity, URL Classification, LightGBM, TF-IDF, FastAPI, React
projectType: Personal
team: M. Kaspul Anwar | https://github.com/anwarpage
image: /projects/phishtrace/cover.png
githubUrl: https://github.com/anwarpage/phishtrace
techStack: Python, scikit-learn, LightGBM, TF-IDF, FastAPI, Pydantic, Pytest, React, TypeScript, Tailwind CSS
---

PhishTrace is a local web app that classifies URLs (`safe` vs `phishing`) from the link string alone, without opening the target site or relying on a static blocklist. The model is trained in `notebooks/phishtrace_pipeline.ipynb`, exported as `artifacts/model.pkl` (`1.79 MB`), and served via FastAPI to a React interface.

https://youtube.com/shorts/HKKd70m7-n4

## Problem to Solve

- **Prefix Leakage in Public Datasets**: `malicious_phish.csv` omits `http(s)://` on 91.7% of benign rows, while `PhiUSIIL` (2024) includes `https://www.` on 100% of legitimate rows. Without stripping prefixes, models memorize the scheme instead of URL structure.
- **Single-Dataset Path Bias**: `PhiUSIIL` benign links are mostly root domains without paths, while `malicious_phish.csv` benign links mostly have deep paths. Using only one source causes false positives on the other pattern.
- **Hard-to-Read Output**: Raw probabilities alone do not tell a regular user why a link looks risky or when the model is unsure.

## Solution Approach

Both training and inference import `ml/features.py` so URL preprocessing stays identical:

- **Merged Dataset (`868,716` Unique URLs)**: Combines **PhiUSIIL (2024)** and **Malicious URLs**, strips `http(s)://` and `www.`, and deduplicates before an 80/20 stratified split.
- **Hybrid Model**: Combines `4,000` Character N-Gram TF-IDF features (`3–5` chars) with `30` lexical features (length, entropy, subdomain count, raw IP, Punycode, suspicious TLDs, executable extensions) using **LightGBM**.
- **Local Web App**: FastAPI serves `/api/predict`, `/api/predict-batch`, `/api/predict-csv`, and `/api/model-info`. React displays plain-language reasons, flags borderline scores (`50%–67%`), tracks history in `localStorage`, and keeps TreeSHAP details collapsible.

![PhishTrace ML Pipeline](/projects/phishtrace/pipeline-workflow.svg)

### Model Benchmark (`173,744` Test URLs)

Evaluated primarily with **ROC-AUC**, **Macro F1**, and **Phishing Recall**:

| Model | ROC-AUC | Macro F1 | Phishing Recall | Accuracy (Ref) |
| --- | ---: | ---: | ---: | ---: |
| Logistic Regression (Lexical) | `0.7764` | `68.79%` | `43.80%` | `74.64%` |
| Decision Tree (Lexical) | `0.8967` | `84.08%` | `74.15%` | `85.79%` |
| Random Forest (Lexical) | `0.9296` | `84.72%` | `71.90%` | `86.61%` |
| **LightGBM Hybrid (TF-IDF + Lexical)** | **`0.9621`** | **`89.20%`** | **`80.80%`** | `90.34%` |

## Limitations

- Analyzes only the URL text (no live HTTP fetch, HTML scraping, or DNS/WHOIS lookup), so rare-TLD legitimate domains can occasionally land in the borderline range.
