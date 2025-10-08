import fitz
from sentence_transformers import SentenceTransformer, util
import numpy as np
import joblib

model = SentenceTransformer('all-MiniLM-L6-v2')
lr_model = joblib.load("lr_model.joblib")
knn_model = joblib.load("knn_model.joblib")

def extract_text(file):
    text = ""
    file.seek(0)
    with fitz.open(stream=file.read(), filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()
    return text

def generate_suggestions(resume_text, job_title):
    tips = []
    lower_resume = resume_text.lower()
    keywords = {
        "developer": ["javascript", "react", "node", "api", "frontend", "backend"],
        "data scientist": ["python", "pandas", "machine learning", "model", "visualization"],
        "designer": ["figma", "sketch", "ui/ux", "prototype"],
    }
    for key, kws in keywords.items():
        if key in job_title.lower():
            for kw in kws:
                if kw not in lower_resume:
                    tips.append(f"Add more about '{kw}' to strengthen your {key} profile.")
            break
    if "project" not in lower_resume:
        tips.append("Include relevant projects to showcase your experience.")
    if "experience" not in lower_resume:
        tips.append("Add work experience to improve your resume.")
    if len(resume_text) < 500:
        tips.append("Resume is too short; add more details.")
    return tips

def analyze_resume(file, job_title):
    try:
        resume_text = extract_text(file)
        if not resume_text.strip():
            return {"status": "error", "error": "Resume text is empty or unreadable."}

        resume_embedding = model.encode(resume_text, convert_to_tensor=True)
        job_embedding = model.encode(job_title, convert_to_tensor=True)

        similarity_score = util.cos_sim(resume_embedding, job_embedding).item()
        semantic_percentage = round(float(similarity_score) * 100, 2)  # 🚨 cast to native float

        resume_embedding_np = resume_embedding.cpu().numpy().reshape(1, -1)
        lr_pred = lr_model.predict(resume_embedding_np)[0]
        knn_pred = knn_model.predict(resume_embedding_np)[0]
        ml_final_score = round(float((lr_pred + knn_pred) / 2), 2)  # 🚨 cast to native float

        suggestions = generate_suggestions(resume_text, job_title) if semantic_percentage < 50 else []

        return {
            "status": "success",
            "semantic_score": semantic_percentage,
            "lr_score": round(float(lr_pred), 2),   # 🚨 ensure native float
            "knn_score": round(float(knn_pred), 2), # 🚨 ensure native float
            "ml_final_score": ml_final_score,       # already cast above
            "job_title": job_title,
            "resume_text": resume_text[:300] + "..." if len(resume_text) > 300 else resume_text,
            "suggestions": suggestions
        }

    except Exception as e:
        return {"status": "error", "error": f"Error analyzing resume: {str(e)}"}
