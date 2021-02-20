import os
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from app.models import User

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

