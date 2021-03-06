import os
from datetime import datetime
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from app.models import Resume, Review, User


engine = create_engine(
    'cockroachdb://{}:{}@{}:26257/{}.resume?sslmode=verify-full&sslrootcert={}'.format(os.environ['username'], os.environ['password'], os.environ['globalhost'], os.environ['cluster'], os.environ['certpath']),
    echo=True                   # Log SQL queries to stdout
)


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

def add_resume(resume):
    factory = sessionmaker(bind=engine)
    session = factory()
    # Query to find if there is an existing resume record for the user
    existing_resume = session.query(Resume).filter_by(user_id=resume['user_id']).first()
    # Create resume record if there is no existing record
    if existing_resume is None:
        new_resume = Resume(user_id=resume['user_id'], title=resume['title'], description=resume['description'], tags=resume['tags'], created_at=datetime.now())
        session.add(new_resume)
    else:
        # TODO: Check for title, description and tags in the body

        # Set the updated_at to the current datetime
        existing_resume.updated_at = datetime.now()
    session.commit()
    return existing_resume if existing_resume is not None else new_resume

def create_review(review):
    factory = sessionmaker(bind=engine)
    session = factory()
    user = session.query(User).get(review['user_id'])
    resume = session.query(Resume).get(review['resume_id'])
    if user is not None and resume is not None:
        new_review = Review(review=review['review'])
        user.reviews.append(new_review)
        resume.reviews.append(new_review)
        session.add(new_review)
        session.commit()
        return new_review
    else:
        raise Exception("Either user or resume record not found")

def get_resumes():
    factory = sessionmaker(bind=engine)
    session = factory()
    resumes = session.query(Resume).all()
    return resumes

def get_resume_by_id(id):
    factory = sessionmaker(bind=engine)
    session = factory()
    resume = session.query(Resume).get(id)
    return resume