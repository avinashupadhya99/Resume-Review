from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, Date, ForeignKey, Integer, String, Table
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
    return [value.strftime("%Y-%m-%d")]

class User(Base):
    """The User class corresponds to the "users" database table.
    """
    __tablename__ = 'users'
    id      = Column(Integer, primary_key=True)
    name    = Column(String(75))       
    email = Column(String(50), unique=True)

    def __init__(self, id, name, email, password):
        self.id = id
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




Base.metadata.create_all(engine)