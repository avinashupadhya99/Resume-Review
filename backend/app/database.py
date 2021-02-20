import os
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from app.models import Resume, Review, User

Base = declarative_base()

engine = create_engine(
    'cockroachdb://{}:{}@{}:26257/{}.resume?sslmode=verify-full&sslrootcert={}'.format(os.environ['username'], os.environ['password'], os.environ['globalhost'], os.environ['cluster'], os.environ['certpath']),
    echo=True                   # Log SQL queries to stdout
)

Base.metadata.create_all(engine)

def get_users():
    factory = sessionmaker(bind=engine)
    session = factory()
    users = session.query(User).all()
    return users

def get_user_by_id(id):
    factory = sessionmaker(bind=engine)
    session = factory()
    user = session.query(User).get(id)
    return user

def create_users(user):
    factory = sessionmaker(bind=engine)
    session = factory()
    new_user = User(id=user['id'], auth_provider=user['auth_provider'])
    session.add(new_user)
    session.commit()
    return new_user

def add_resume(user_id):
    factory = sessionmaker(bind=engine)
    session = factory()
    # Query to find if there is an existing resume record for the user
    existing_resume = session.query(Resume).filter_by(user_id=user_id).first()
    # Create resume record if there is no existing record
    if existing_resume is None:
        new_resume = Resume(user_id=user_id, created_at=datetime.now())
        session.add(new_resume)
    else:
        # Set the updated_at to the current datetime
        existing_resume.updated_at = datetime.now()
    session.commit()
    return existing_resume if existing_resume is not None else new_resume

def create_review(review):
    factory = sessionmaker(bind=engine)
    session = factory()
    new_review = Review(user_id=review['user_id'], resume_id=review['resume_id'], review=review['review'], created_at=datetime.now())
    session.add(new_review)
    session.commit()
    return new_review

