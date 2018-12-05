FROM python:3.6
WORKDIR /app
COPY . .
RUN pip3 install --upgrade setuptools pip
RUN pip3 install -r requirements.txt
EXPOSE 80
ENTRYPOINT ["python3", "server.py"]