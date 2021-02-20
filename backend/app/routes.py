from app import app
import json
from app.database import create_users, get_users, get_user_by_id
from flask import jsonify, request
from sqlalchemy.exc import SQLAlchemyError

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