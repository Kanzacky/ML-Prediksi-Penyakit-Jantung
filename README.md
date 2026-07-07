# Heart Disease Prediction

Proyek ini adalah aplikasi *Machine Learning* berbasis web untuk memprediksi risiko penyakit jantung menggunakan model **Random Forest**. Proyek ini ditujukan untuk tugas UAS (Kecerdasan Buatan).

Aplikasi ini mengimplementasikan arsitektur *client-server*, dengan *backend* berbasis **FastAPI** (Python) untuk menyajikan model *machine learning*, dan *frontend* berbasis **React + Vite** (TypeScript) untuk antarmuka pengguna.

## Struktur Proyek

- `backend/`: Direktori *backend* menggunakan FastAPI. Menangani request API untuk prediksi menggunakan model *machine learning* yang telah dilatih (`model.pkl`).
- `frontend/`: Direktori *frontend* menggunakan React, Vite, dan TypeScript. Menampilkan *user interface* untuk menginput parameter medis dan melihat hasil prediksi.
- `notebook/`: Berisi Jupyter Notebook (`data_exploration.ipynb`) yang digunakan untuk eksplorasi data (*EDA*), prapemrosesan, dan pelatihan model.
- `data/`: Berisi dataset asli `heart.csv` yang digunakan sebagai data latih model.

## Teknologi yang Digunakan

### Frontend
<div align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
</div>

### Backend
<div align="left">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white" alt="FastAPI" />
</div>

### Machine Learning & Data
<div align="left">
  <img src="https://img.shields.io/badge/Pandas-2C2D72?style=for-the-badge&logo=pandas&logoColor=white" alt="Pandas" />
  <img src="https://img.shields.io/badge/Scikit_Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="Scikit-Learn" />
  <img src="https://img.shields.io/badge/Jupyter-F37626?style=for-the-badge&logo=Jupyter&logoColor=white" alt="Jupyter Notebook" />
</div>

<br/>

> **Model Spesifik**: Random Forest Classifier

## Cara Menjalankan Proyek Secara Lokal

### 1. Menjalankan Backend

Buka terminal dan jalankan perintah berikut:

```bash
# Pindah ke direktori backend
cd backend

# Opsional namun disarankan: Buat dan aktifkan virtual environment
python -m venv .venv
source .venv/bin/activate  # Untuk Linux/macOS
# .venv\Scripts\activate   # Untuk Windows

# Instal dependensi Python
pip install -r requirements.txt

# Jalankan server FastAPI
uvicorn main:app --reload
```
Server *backend* akan berjalan di `http://127.0.0.1:8000`. Anda bisa mencoba dan melihat dokumentasi API (Swagger UI) di `http://127.0.0.1:8000/docs`.

### 2. Menjalankan Frontend

Buka tab terminal baru dan jalankan perintah berikut:

```bash
# Pindah ke direktori frontend
cd frontend

# Instal dependensi Node.js
npm install

# Jalankan server pengembangan untuk React
npm run dev
```
Aplikasi *frontend* akan berjalan dan bisa diakses lewat browser, umumnya di URL `http://localhost:5173`.

## Fitur Utama

- **Prediksi Akurat**: Menggunakan model algoritma *Random Forest* untuk mengklasifikasi risiko penyakit jantung.
- **Formulir Interaktif**: Menerima 11 parameter profil kesehatan seperti Usia, Jenis Kelamin, Jenis Nyeri Dada (Chest Pain Type), Tekanan Darah (Resting BP), Kolesterol, Gula Darah Puasa (Fasting BS), dll.
- **Saran Klinis (Clinical Notes)**: Selain hasil positif/negatif, sistem juga memberikan rekomendasi gaya hidup atau peringatan dini jika ada input spesifik yang melampaui batas normal (seperti tekanan darah tinggi atau gula darah di atas normal).

## Catatan Tambahan
Pastikan file model prediksi `model.pkl` sudah berada di dalam folder `backend/model/`. Model ini dibutuhkan oleh FastAPI saat dijalankan agar *endpoint* `/predict` berfungsi dengan baik.
