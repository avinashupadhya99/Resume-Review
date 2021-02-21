# Backend for the resume review application

### Tech Stack used

- Flask
- CockroachDB (Sqlalchemy as the ORM)

### Instructions to set it up

- Clone the repository and change directory into `backend`
- Create a virtual environment (Optional) `python -m venv venv` and `venv\Scripts\activate` if Windows or `source venv/bin/activate` if other
- `pip install flask sqlalchemy sqlalchemy-cockroachdb psycopg2`
- Set the `certpath`, `username`, `password`, `globalhost` and `cluster` environment variables. Please ask the maintainer for those. Or create your own cockroachDB cluster and set the variables. 
- Ensure you have the certificate in the `certspath`. Please ask the maintainer for the certificate if you don't have one.