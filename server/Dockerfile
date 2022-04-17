FROM python:3.8-alpine

COPY ./requirements.txt /app/requirements.txt

WORKDIR .

RUN pip install -r requirements.txt

COPY . /server

ENTRYPOINT [ "python" ]

CMD ["app.py" ]