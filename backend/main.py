from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import os

app = FastAPI(
    title="Heart Disease Prediction API",
    description="API untuk memprediksi risiko penyakit jantung menggunakan Random Forest",
    version="1.0.0"
)

# Enable CORS (supaya frontend React/Vite bisa memanggil API ini)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model secara global saat aplikasi berjalan
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model", "model.pkl")

try:
    model = joblib.load(MODEL_PATH)
    print("Model berhasil dimuat dari:", MODEL_PATH)
except Exception as e:
    print("Gagal memuat model:", e)
    model = None

# Skema data input berdasarkan kolom heart.csv
class HeartData(BaseModel):
    Age: int
    Sex: str
    ChestPainType: str
    RestingBP: int
    Cholesterol: int
    FastingBS: int
    RestingECG: str
    MaxHR: int
    ExerciseAngina: str
    Oldpeak: float
    ST_Slope: str

@app.get("/")
def read_root():
    return {"message": "Welcome to Heart Disease Prediction API. Gunakan /docs untuk melihat endpoint."}

@app.post("/predict")
def predict_heart_disease(data: HeartData):
    if model is None:
        return {"error": "Model tidak ditemukan. Pastikan model.pkl ada di folder backend/model/"}
    
    # Ubah data input (Pydantic model) menjadi Dictionary lalu DataFrame
    input_data = data.dict()
    df = pd.DataFrame([input_data])
    
    # Lakukan prediksi menggunakan pipeline yang sudah dimuat (otomatis melakukan scaling & encoding)
    prediction = model.predict(df)
    
    # prediction[0] akan bernilai 0 (Negatif) atau 1 (Positif)
    result = int(prediction[0])
    status = "Positif Penyakit Jantung" if result == 1 else "Normal (Negatif)"
    
    # Analisis parameter untuk catatan klinis (berdasarkan panduan medis umum)
    notes = []
    if data.RestingBP > 130:
        notes.append("Tekanan darah Anda di atas optimal (>130 mmHg). Disarankan untuk membatasi konsumsi natrium/garam dan perbanyak asupan kalium dari buah/sayur.")
    if data.Cholesterol > 200:
        notes.append("Kadar kolesterol Anda tergolong tinggi (>200 mg/dl). Sangat dianjurkan untuk mengurangi asupan lemak jenuh (makanan gorengan/cepat saji) dan memperbanyak serat.")
    if data.FastingBS == 1:
        notes.append("Gula darah puasa Anda terindikasi tinggi (>120 mg/dl). Batasi asupan gula dan karbohidrat olahan untuk mencegah komplikasi ke pembuluh darah.")
    if data.ChestPainType != "ASY":
        notes.append("Anda melaporkan adanya gejala nyeri dada (Angina). Ini merupakan indikasi penting. Segera konsultasikan dengan dokter spesialis untuk evaluasi fisik lebih lanjut.")
        
    if not notes:
        notes.append("Berdasarkan data profil yang Anda masukkan, parameter vital seperti tekanan darah, kolesterol, dan gula darah Anda tampaknya berada pada rentang yang baik. Tetap pertahankan gaya hidup sehat dan olahraga teratur.")
    
    return {
        "prediction": result,
        "status": status,
        "input_data": input_data,
        "notes": notes
    }
