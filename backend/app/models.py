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
    """The User class corresponds to the "users" database table.
    """
    __tablename__ = 'users'
    id      = Column(Integer, primary_key=True)
    name    = Column(String(75))       
    email = Column(String(50), unique=True)
    resume = relationship("Resume", uselist=False, backref="users")

    def __init__(self, name, email):
        self.name = name
        self.email = email
        pass

    @property
    def serialize(self):
        return {
            'id'         : self.id,
            'name'       : self.name,
            'email'      : self.email
        }

class Resume(Base):
    """The Resume class corresponds to the "resume" database table.
    """
    __tablename__ = 'resume'
    id      = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime, default=datetime.now())
    updated_at = Column(DateTime, default=datetime.now())

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




Base.metadata.create_all(engine)