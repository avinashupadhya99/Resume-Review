from app import app
import json
from app.database import get_users, get_user_by_id
from flask import jsonify, request

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