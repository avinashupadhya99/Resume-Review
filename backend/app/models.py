from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, DateTime, ForeignKey, Integer, LargeBinary, String, Table
from sqlalchemy.orm import relationship
import os

Base = declarative_base()

engine = create_engine(
    'cockroachdb://{}:{}@{}:26257/{}.resume?sslmode=verify-full&sslrootcert={}'.format(os.environ['username'], os.environ['password'], os.environ['globalhost'], os.environ['cluster'], os.environ['certpath']),
    echo=True                   # Log SQL queries to stdout
)

def dump_date(value):
    """Deserialize datetime object into string form for JSON processing."""
    if value is None:
        return None
    return value.strftime("%m/%d/%Y, %H:%M:%S")

class User(Base):
    """The User class corresponds to the "user" database table.
    """
    __tablename__ = 'user'
    id      = Column(Integer, primary_key=True)   
    auth_provider = Column(String(10))
    resume = relationship("Resume", uselist=False, backref="user")
    reviews = relationship("Review", backref="user")

    def __init__(self, id, auth_provider):
        self.id = id
        self.auth_provider = auth_provider
        pass

    @property
    def serialize(self):
        return {
            'id'         : self.id,
            'provider'   : self.provider
        }

class Resume(Base):
    """The Resume class corresponds to the "resume" database table.
    """
    __tablename__ = 'resume'
    id      = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), unique=True)
    created_at = Column(DateTime, default=datetime.now())
    updated_at = Column(DateTime, default=datetime.now())
    reviews = relationship("Review", backref="resume")

    def __init__(self, created_at, user_id):
        self.created_at = created_at
        self.user_id = user_id
        pass

    @property
    def serialize(self):
        return {
            'id'         : self.id,
            'user_id'    : self.user_id,
            'created_at'  : dump_date(self.created_at),
            'updated_at'  : dump_date(self.updated_at)
        }

class Review(Base):
    """The Reviews class corresponds to the "review" database table.
    """
    __tablename__ = 'review'
    id      = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    resume_id = Column(Integer, ForeignKey('resume.id'))
    review = Column(String(250))
    created_at = Column(DateTime, default=datetime.now())
    updated_at = Column(DateTime, default=datetime.now())

    def __init__(self, created_at, user_id, resume_id, review):
        self.created_at = created_at
        self.user_id = user_id
        self.resume_id = resume_id
        self.review = review
        pass

    @property
    def serialize(self):
        return {
            'id'         : self.id,
            'user_id'    : self.user_id,
            'resume_id'    : self.resume_id,
            'review'    : self.review,
            'created_at'  : dump_date(self.created_at),
            'updated_at'  : dump_date(self.updated_at)
        }




Base.metadata.create_all(engine)