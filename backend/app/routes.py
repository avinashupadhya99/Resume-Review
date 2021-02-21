from app import app
import json
from app.database import add_resume, create_review, create_users, get_resumes, get_users, get_resume_by_id, get_user_by_id
from app.s3 import download_file, upload_file
from flask import jsonify, request, send_file
from sqlalchemy.exc import SQLAlchemyError

UPLOAD_FOLDER = "uploads"
BUCKET = "resume-reviewer-hackathon"

@app.route('/')
def index():
    return "Resume review"

@app.route('/users')
def users():
    try:
        users = get_users()

        return jsonify([i.serialize for i in users])
    except Exception as e:
        print(e)
        msg = "Internal error while fetching all users"
        return jsonify({"error": msg}), 500

@app.route('/user/<int:id>')
def get_user(id):
    try:
        user = get_user_by_id(id)
        if user is not None:
            return jsonify(user.serialize)
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        print(e)
        msg = "Internal error while fetching user"
        return jsonify({"error": msg}), 500

@app.route('/users/new', methods=['POST'])
def new_users():
    try:
        try:
            body = request.json
        except:
            msg = "payload must be a valid json"
            return jsonify({"error": msg}), 400

        try:
            new_user = create_users(body)
            return jsonify(new_user.serialize)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            return jsonify({"error": error}), 420
    except Exception as e:
        print(e)
        msg = "Internal error while creating new user"
        return jsonify({"error": msg}), 500

@app.route('/resume/add', methods=['POST'])
def resume_add():
    try:
        resume_file = request.files['file']
        form_data = request.form
        user_id = form_data['user_id']
        f = request.files['file']
        resume_file.save(f"{UPLOAD_FOLDER}/{user_id}.pdf")
        upload_file(f"{UPLOAD_FOLDER}/{user_id}.pdf", f"{user_id}.pdf", BUCKET)
    except Exception as e:
        print(e)
        msg = "Internal error while adding resume"
        return jsonify({"error": msg}), 500

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
    try:
        resumes = get_resumes()
        return jsonify([i.serialize for i in resumes])
    except Exception as e:
        print(e)
        msg = "Internal error while fetching all resumes"
        return jsonify({"error": msg}), 500

@app.route('/resume/<int:id>/file')
def get_resume_file(id):
    try:
        resume = get_resume_by_id(id)
        if resume is not None:
            user_id = resume.user_id
            print(user_id)
            resume_file_location = download_file(f"{user_id}.pdf", BUCKET)
            return send_file(f"/resume-review/downloads/{user_id}.pdf")
            # TODO: Set up a cron job to clean the data
        else:
            return jsonify({"error": "Resume not found"}), 404
    except Exception as e:
        print(e)
        msg = "Internal error while fetching resume"
        return jsonify({"error": msg}), 500
        
@app.route('/resume/<int:id>/details')
def get_resume_details(id):
    try:
        resume = get_resume_by_id(id)
        if resume is not None:
            return jsonify(resume.serialize)
        else:
            return jsonify({"error": "Resume not found"}), 404
    except Exception as e:
        print(e)
        msg = "Internal error while fetching resume"
        return jsonify({"error": msg}), 500