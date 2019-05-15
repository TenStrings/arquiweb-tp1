import os
from flask import Flask
from flask_pymongo import PyMongo
from app.utils.jsonEncoder import JSONEncoder

app = Flask(__name__)
app.config['MONGO_URI'] = os.environ.get('DB')
app.json_encoder = JSONEncoder
mongo = PyMongo(app)

from app.controllers.pointController import point
app.register_blueprint(point)
