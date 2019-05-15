""" index file for running the API"""
import os
import sys
from flask import jsonify, make_response

from app import app, mongo
from app.model.point import Point

ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
os.environ.update({'ROOT_PATH': ROOT_PATH})
sys.path.append(os.path.join(ROOT_PATH, 'app'))

""" Port variable to run the server on """
PORT = os.environ.get('PORT')


@app.errorhandler(404)
def not_found():
    return make_response(jsonify({'error': 'Not found'}), 404)


if __name__ == '__main__':
    points = []

    point1 = Point({'lat': -34.6, 'lng': -58.5}, 'macDonald', 'muchas gordas', 5)
    point2 = Point({'lat': -34.52, 'lng': -58.55}, 'burgerKing', 'muchas gordas', 6)
    point3 = Point({'lat': -34.58319, 'lng': -58.4432}, 'RamenHut', 'fui de pepa', 7)
    point4 = Point({'lat': -34.573, 'lng': -58.4548}, 'FutureBar', 'rica, amaaaaargaa', 8)

    points.append(point1)
    points.append(point2)
    points.append(point3)
    points.append(point4)

    with app.app_context():

        for point in points:
            mongo.db.points.insert_one(point.__dict__)

    app.config['DEBUG'] = os.environ.get('ENV') == 'development'
    app.run(host='0.0.0.0', port=int(PORT))
