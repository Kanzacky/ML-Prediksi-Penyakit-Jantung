import React, { useState } from 'react';

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root {
  --primary-color: #4f46e5;
  --primary-hover: #4338ca;
  --primary-light: #e0e7ff;
  --bg-color: #f8fafc;
  --surface-color: rgba(255, 255, 255, 0.7);
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-tertiary: #94a3b8;
  --border-color: rgba(226, 232, 240, 0.6);
  --input-bg: rgba(255, 255, 255, 0.8);
  
  --risk-high-bg: #fff1f2;
  --risk-high-border: #fecdd3;
  --risk-high-text: #e11d48;
  --risk-high-grad: linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%);
  
  --risk-low-bg: #f0fdf4;
  --risk-low-border: #bbf7d0;
  --risk-low-text: #16a34a;
  --risk-low-grad: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #e0e7ff 0%, #f8fafc 50%, #ffffff 100%);
  background-attachment: fixed;
  color: var(--text-primary);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.layout-wrapper { display: flex; flex-direction: column; min-height: 100vh; }
.main-container { flex: 1; width: 100%; max-width: 100%; padding: 2rem 4vw; animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1); }

/* Intro Header */
.hero-text { text-align: center; margin-bottom: 1.5rem; animation: slideDown 0.6s ease-out; }
.hero-text h1 { 
  font-size: 2rem; font-weight: 800; 
  background: linear-gradient(135deg, #4f46e5 0%, #0ea5e9 100%); 
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
  letter-spacing: -0.04em; margin-bottom: 0.5rem; line-height: 1.2; 
}
.hero-text p { color: var(--text-secondary); font-size: 0.95rem; font-weight: 500; max-width: 600px; margin: 0 auto; line-height: 1.5; }

/* Content Card - Glassmorphism */
.content-wrapper {
  background: var(--surface-color);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 28px;
  box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.05), inset 0 0 20px rgba(255,255,255,0.4);
  overflow: hidden;
}

/* Forms */
.assessment-form { display: flex; flex-direction: column; }
.form-section { padding: 1.5rem 2rem; border-bottom: 1px solid rgba(0,0,0,0.04); transition: background 0.4s ease; }
.form-section:hover { background-color: rgba(255, 255, 255, 0.4); }
.form-section:last-of-type { border-bottom: none; }

.section-header { margin-bottom: 1rem; display: flex; align-items: center; gap: 0.8rem; }
.section-icon { 
  background: linear-gradient(135deg, var(--primary-light) 0%, #ffffff 100%);
  color: var(--primary-color); 
  width: 36px; height: 36px; border-radius: 10px; 
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
}
.section-icon svg { width: 18px; height: 18px; }
.section-title-wrap h2 { font-size: 1.15rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; margin: 0; }
.section-title-wrap p { font-size: 0.85rem; color: var(--text-secondary); margin-top: 0; }

.form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem 1.5rem; }
.input-group { display: flex; flex-direction: column; gap: 0.4rem; }
.input-group label { font-size: 0.9rem; font-weight: 600; color: var(--text-secondary); letter-spacing: -0.01em; }

input, select {
  width: 100%; padding: 0.65rem 1rem;
  border: 1px solid var(--border-color); border-radius: 10px;
  background-color: var(--input-bg); color: var(--text-primary);
  font-family: inherit; font-size: 0.95rem; font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.01);
}
input:hover, select:hover { border-color: #cbd5e1; background-color: rgba(255,255,255,0.9); }
input:focus, select:focus { 
  outline: none; border-color: var(--primary-color); background-color: #ffffff;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.15), inset 0 1px 2px 0 rgba(0,0,0,0.05); 
}

/* Actions */
.form-actions { padding: 1.5rem 2rem; background-color: rgba(255,255,255,0.3); border-top: 1px solid rgba(0,0,0,0.04); backdrop-filter: blur(10px); }
.btn-primary {
  width: 100%; background: linear-gradient(135deg, var(--primary-color) 0%, #3b82f6 100%);
  color: white; border: none; padding: 0.9rem 1.25rem; border-radius: 12px; 
  font-size: 1.05rem; font-weight: 700; letter-spacing: 0.02em;
  cursor: pointer; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 8px 20px -6px rgba(79, 70, 229, 0.5), inset 0 -2px 0 rgba(0,0,0,0.1);
  display: flex; justify-content: center; align-items: center; gap: 0.6rem;
}
.btn-primary:hover:not(:disabled) { 
  transform: translateY(-2px); 
  box-shadow: 0 12px 25px -6px rgba(79, 70, 229, 0.6), inset 0 -2px 0 rgba(0,0,0,0.1); 
}
.btn-primary:active:not(:disabled) { transform: translateY(1px); box-shadow: 0 2px 5px rgba(79, 70, 229, 0.4); }
.btn-primary:disabled { background: #cbd5e1; box-shadow: none; cursor: not-allowed; transform: none; color: #f8fafc; }
.spinner { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

/* Results */
.results-container { padding: 0 3rem 3rem; background-color: var(--surface-color); animation: slideDown 0.4s ease-out; }
.alert-box { display: flex; gap: 1rem; padding: 1.25rem 1.5rem; border-radius: 12px; margin-top: 1rem; }
.alert-box.error { background-color: var(--risk-high-bg); border: 1px solid var(--risk-high-border); color: var(--risk-high-text); }

.diagnosis-card { margin-top: 1rem; border-radius: 20px; border: 2px solid transparent; overflow: hidden; box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1); }
.diagnosis-header { padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center; }
.diagnosis-header h3 { font-size: 1.25rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; }
.badge { padding: 0.5rem 1.25rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.5rem; }

.diagnosis-card.risk-high { border-color: var(--risk-high-border); }
.diagnosis-card.risk-high .diagnosis-header { background: var(--risk-high-grad); border-bottom: 1px solid var(--risk-high-border); }
.diagnosis-card.risk-high .badge { background-color: var(--risk-high-text); color: white; box-shadow: 0 4px 6px rgba(185, 28, 28, 0.2); }
.diagnosis-card.risk-low { border-color: var(--risk-low-border); }
.diagnosis-card.risk-low .diagnosis-header { background: var(--risk-low-grad); border-bottom: 1px solid var(--risk-low-border); }
.diagnosis-card.risk-low .badge { background-color: var(--risk-low-text); color: white; box-shadow: 0 4px 6px rgba(21, 128, 61, 0.2); }

.diagnosis-body { padding: 3rem 2rem; background-color: #ffffff; text-align: center; }
.status-label { font-size: 0.9rem; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 800; margin-bottom: 0.75rem; }
.status-value { font-size: 2.75rem; font-weight: 800; margin-bottom: 2.5rem; letter-spacing: -0.03em; line-height: 1.1; }
.diagnosis-card.risk-high .status-value { color: var(--risk-high-text); }
.diagnosis-card.risk-low .status-value { color: var(--risk-low-text); }

.disclaimer-box { background-color: #f8fafc; padding: 1.5rem; border-radius: 12px; border-left: 4px solid var(--primary-color); font-size: 0.95rem; color: var(--text-secondary); text-align: left; }
.disclaimer-box strong { color: var(--text-primary); display: block; margin-bottom: 0.5rem; font-size: 1rem; }

.main-footer { text-align: center; padding: 1rem 0; color: var(--text-tertiary); font-size: 0.85rem; font-weight: 500; }

@media (max-width: 768px) {
  .main-container { padding: 2rem 1rem; }
  .page-header h1 { font-size: 2rem; }
  .form-section { padding: 2rem 1.5rem; }
  .form-actions { padding: 2rem 1.5rem; }
  .results-container { padding: 0 1.5rem 2rem; }
  .diagnosis-header { flex-direction: column; gap: 1rem; text-align: center; }
}
`;

const App = () => {
  const [formData, setFormData] = useState({
    Age: 40,
    Sex: 'M',
    ChestPainType: 'ATA',
    RestingBP: 120,
    Cholesterol: 200,
    FastingBS: 0,
    RestingECG: 'Normal',
    MaxHR: 150,
    ExerciseAngina: 'N',
    Oldpeak: 0.0,
    ST_Slope: 'Up'
  });

  const [prediction, setPrediction] = useState<{ status: string, prediction: number, notes?: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Age' || name === 'RestingBP' || name === 'Cholesterol' || name === 'MaxHR' || name === 'FastingBS'
        ? parseInt(value)
        : name === 'Oldpeak' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Gagal menghubungi server API');

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setPrediction(data);
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan sistem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="layout-wrapper">
        <main className="main-container">
          <div className="hero-text">
            <h1>Cek Kesehatan Jantung Anda</h1>
            <p>Sistem cerdas kami membantu menganalisis risiko kardiovaskular secara instan. Cukup lengkapi form klinis di bawah untuk hasil yang akurat.</p>
          </div>

          <div className="content-wrapper">
            <form onSubmit={handleSubmit} className="assessment-form">

              {/* Section 1 */}
              <section className="form-section">
                <div className="section-header">
                  <div className="section-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                  <div className="section-title-wrap">
                    <h2>Informasi Demografi</h2>
                    <p>Data dasar pasien</p>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="input-group">
                    <label>Usia (Tahun)</label>
                    <input type="number" name="Age" min="28" max="100" value={formData.Age} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <label>Jenis Kelamin</label>
                    <select name="Sex" value={formData.Sex} onChange={handleChange}>
                      <option value="M">Laki-laki</option>
                      <option value="F">Perempuan</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section className="form-section">
                <div className="section-header">
                  <div className="section-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                  </div>
                  <div className="section-title-wrap">
                    <h2>Tanda & Gejala Klinis</h2>
                    <p>Observasi kondisi fisik dan vital pasien</p>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="input-group">
                    <label>Tipe Nyeri Dada (Chest Pain)</label>
                    <select name="ChestPainType" value={formData.ChestPainType} onChange={handleChange}>
                      <option value="ATA">Atypical Angina (ATA)</option>
                      <option value="NAP">Non-Anginal Pain (NAP)</option>
                      <option value="ASY">Asymptomatic (ASY)</option>
                      <option value="TA">Typical Angina (TA)</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Tekanan Darah Istirahat (mmHg)</label>
                    <input type="number" name="RestingBP" min="80" max="250" value={formData.RestingBP} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <label>Kolesterol Serum (mg/dl)</label>
                    <input type="number" name="Cholesterol" min="0" max="800" value={formData.Cholesterol} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <label>Gula Darah Puasa &gt; 120 mg/dl</label>
                    <select name="FastingBS" value={formData.FastingBS} onChange={handleChange}>
                      <option value={0}>Normal (≤ 120 mg/dl)</option>
                      <option value={1}>Tinggi (&gt; 120 mg/dl)</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section className="form-section">
                <div className="section-header">
                  <div className="section-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  </div>
                  <div className="section-title-wrap">
                    <h2>Tes Lanjutan</h2>
                    <p>Parameter Elektrokardiogram (EKG) & Uji Stres</p>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="input-group">
                    <label>EKG Istirahat (Resting ECG)</label>
                    <select name="RestingECG" value={formData.RestingECG} onChange={handleChange}>
                      <option value="Normal">Normal</option>
                      <option value="ST">ST-T Wave Abnormality</option>
                      <option value="LVH">Left Ventricular Hypertrophy</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Detak Jantung Maksimal</label>
                    <input type="number" name="MaxHR" min="60" max="220" value={formData.MaxHR} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <label>Angina Dipicu Olahraga</label>
                    <select name="ExerciseAngina" value={formData.ExerciseAngina} onChange={handleChange}>
                      <option value="N">Tidak Ada</option>
                      <option value="Y">Ya, Ada</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Depresi ST (Oldpeak)</label>
                    <input type="number" step="0.1" name="Oldpeak" value={formData.Oldpeak} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <label>Kemiringan Segmen ST</label>
                    <select name="ST_Slope" value={formData.ST_Slope} onChange={handleChange}>
                      <option value="Up">Up-sloping</option>
                      <option value="Flat">Flat</option>
                      <option value="Down">Down-sloping</option>
                    </select>
                  </div>
                </div>
              </section>

              <div className="form-actions">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? (
                    <><svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg> Menganalisis Data...</>
                  ) : (
                    <>Jalankan Analisis Prediktif</>
                  )}
                </button>
              </div>
            </form>

            <div className="results-container" id="result-section">
              {error && (
                <div className="alert-box error">
                  <div className="alert-icon">⚠️</div>
                  <div className="alert-content">
                    <strong>Peringatan Sistem</strong>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              {prediction && (
                <div className={`diagnosis-card ${prediction.prediction === 1 ? 'risk-high' : 'risk-low'}`}>
                  <div className="diagnosis-header">
                    <h3>Hasil Asesmen Risiko</h3>
                    <span className="badge">
                      {prediction.prediction === 1 ? (
                        <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> Perhatian Medis</>
                      ) : (
                        <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Status Aman</>
                      )}
                    </span>
                  </div>
                  <div className="diagnosis-body">
                    <div className="status-label">Interpretasi Prediksi AI</div>
                    <div className="status-value">{prediction.status}</div>
                    <div className="disclaimer-box">
                      <strong>Analisis Kondisi Anda</strong>
                      <div style={{ marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                        {(prediction.notes || []).map((note, idx) => (
                          <p key={idx} style={{ marginBottom: '0.6rem', lineHeight: '1.4' }}>{note}</p>
                        ))}
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>


      </div>
    </>
  );
};

export default App;