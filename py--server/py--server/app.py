from flask import Flask, request, jsonify
from flask_cors import CORS
from resume_scorer import analyze_resume  # assumes file is named resumescore.py

app = Flask(__name__)
CORS(app)

@app.route('/cv', methods=['POST'])
def handle_cv():
    file = request.files.get('file')
    job_title = request.form.get('job_title')

    if not file or not job_title:
        return jsonify({
            "status": "error",
            "error": "JobCraft API is running, but file or job_title is missing."
        }), 400

    try:
        result = analyze_resume(file, job_title)
        # result should always include 'status' key from updated resumescore.py
        if isinstance(result, dict):
            return jsonify(result), 200

        # fallback in case analyze_resume returns something unexpected
        return jsonify({
            "status": "error",
            "error": "Unexpected server response format."
        }), 500

    except Exception as e:
        return jsonify({
            "status": "error",
            "error": f"Error scoring resume: {str(e)}"
        }), 500

@app.errorhandler(404)
def not_found(e):
    return jsonify({"status": "error", "error": "Endpoint not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=4000)
