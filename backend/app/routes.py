from app import app
import json
from app.database import add_resume, create_review, create_users, get_resumes, get_users, get_user_by_id
from app.s3 import download_file, upload_file
from flask import jsonify, request
from sqlalchemy.exc import SQLAlchemyError

UPLOAD_FOLDER = "uploads"
BUCKET = "resume-reviewer-hackathon"

@app.route('/')
def index():
    return "Resume review"

@app.route('/users')
def users():
    users = get_users()

    return jsonify([i.serialize for i in users])

@app.route('/user/<int:id>')
def get_user(id):
    user = get_user_by_id(id)
    print(user.resume)
    return jsonify(user.serialize)

@app.route('/users/new', methods=['POST'])
def new_users():
    try:
        body = request.json
        print(body)
    except:
        msg = "payload must be a valid json"
        return jsonify({"error": msg}), 400

    try:
        new_user = create_users(body)
        return jsonify(new_user.serialize)
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        return jsonify({"error": error}), 420
    # except Exception as e:
    #     print(e)
    #     msg = "Internal error while creating new user"
    #     return jsonify({"error": msg}), 500

@app.route('/resume/add', methods=['POST'])
def resume_add():
    resume_file = request.files['file']
    form_data = request.form
    user_id = form_data['user_id']
    f = request.files['file']
    resume_file.save(f"{UPLOAD_FOLDER}/{user_id}.pdf")
    upload_file(f"{UPLOAD_FOLDER}/{user_id}.pdf", BUCKET)

    try:
        resume = add_resume(form_data)
        return jsonify(resume.serialize)
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        return jsonify({"error": error}), 420

@app.route('/review/new', methods=['POST'])
def new_review():
    try:
        body = request.json
        print(body)
    except:
        msg = "payload must be a valid json"
        return jsonify({"error": msg}), 400

    try:
        new_review = create_review(body)
        return jsonify(new_review.serialize)
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        return jsonify({"error": error}), 420

@app.route('/resumes')
def resumes():
    resumes = get_resumes()
    return jsonify([i.serialize for i in resumes])