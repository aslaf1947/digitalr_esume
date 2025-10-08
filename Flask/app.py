# from flask import Flask, render_template, request,jsonify
# import pdfplumber
# import re
# import nltk
# from nltk.corpus import stopwords
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# nltk.download('stopwords')
# stop_words = set(stopwords.words('english'))

# app = Flask(__name__)

# def extract_text_from_pdf(pdf_file):
#     text = ''
#     with pdfplumber.open(pdf_file) as pdf:
#         for page in pdf.pages:
#             page_text = page.extract_text()
#             if page_text:
#                 text += page_text + '\n'
#     return text

# def preprocess_text(text):
#     text = text.lower()
#     text = re.sub(r'[^\w\s]', '', text)
#     words = text.split()
#     filtered_words = [word for word in words if word not in stop_words]
#     return ' '.join(filtered_words)

# def calculate_similarity(resume_text, job_keywords):
#     vectorizer = TfidfVectorizer()
#     vectors = vectorizer.fit_transform([resume_text, job_keywords])
#     similarity = cosine_similarity(vectors[0:1], vectors[1:2])
#     return similarity[0][0]

# def evaluate_resume(similarity_score, threshold=0.3):
#     if similarity_score >= threshold:
#         return "✅ Resume Accepted"
#     else:
#         return "❌ Resume Rejected"

# @app.route('/', methods=['GET', 'POST'])
# def index():
#     result = None
#     similarity = None
#     if request.method == 'POST':
#         uploaded_file = request.files['resume']
#         job_keywords = request.form['keywords']
        
#         if uploaded_file and job_keywords:
#             raw_text = extract_text_from_pdf(uploaded_file)
#             resume_text = preprocess_text(raw_text)
#             job_keywords_clean = preprocess_text(job_keywords)
#             similarity = calculate_similarity(resume_text, job_keywords_clean)
#             result = evaluate_resume(similarity)

#     return render_template('index.html', result=result, similarity=similarity)

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import re
import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

app = Flask(__name__)
CORS(app)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    return response

def extract_text_from_pdf(pdf_file):
    text = ''
    with pdfplumber.open(pdf_file) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + '\n'
    return text

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    words = text.split()
    filtered_words = [word for word in words if word not in stop_words and len(word) > 2]
    return ' '.join(filtered_words)

def calculate_similarity(resume_text, job_keywords):
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([resume_text, job_keywords])
    similarity = cosine_similarity(vectors[0:1], vectors[1:2])
    return similarity[0][0]

def evaluate_resume(similarity_score, threshold=0.3):
    if similarity_score >= threshold:
        return "✅ Resume Accepted",
    else:
        return "❌ Resume Rejected"

@app.route('/', methods=['POST'])
def analyze():
    try:
        if 'resume' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
        
        uploaded_file = request.files['resume']
        job_keywords = request.form.get('keywords', '')
        
        if not job_keywords:
            return jsonify({"error": "No keywords provided"}), 400

        # Process the resume
        raw_text = extract_text_from_pdf(uploaded_file)
        resume_text = preprocess_text(raw_text)
        job_keywords_clean = preprocess_text(job_keywords)
        
        # Calculate similarity
        similarity_score = calculate_similarity(resume_text, job_keywords_clean)
        result = evaluate_resume(similarity_score)
        
        # Simplified response with only result and similarity
        return jsonify({
            "result": result,
            "similarity": round(similarity_score, 4)  # Rounded to 4 decimal places
        })
        
    except Exception as e:
        return jsonify({
            "error": str(e),
            "message": "Error processing your resume"
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)