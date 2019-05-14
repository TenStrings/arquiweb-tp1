import flask
from flask import Blueprint, jsonify, request

from model.point import Point

pointBlueprint = Blueprint("point", __name__)

#no cambiar el lugar del import por las dependencias circulares
from app import points


@pointBlueprint.route('/point', methods=['GET'])
def getPoints():
    # buscar de la base//@TOMI P
    resp = jsonify([point.__dict__ for point in points])
    response = flask.make_response(resp)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@pointBlueprint.route('/point', methods=['POST'])
def addPoint():
    global pointId
    pointData = request.get_json()
    id = pointId
    pointId += 1

    name = pointData['name']
    position = pointData['position']
    description = pointData['description']
    category = pointData['category']

    point = Point(id, position, name, description, category)

    # insertar en la base//@TOMI P
    points.append(point)
    return jsonify({'ok': True}), 200


@pointBlueprint.route('/point/<id>', methods=['DELETE'])
def deletePoint(id):
    # borrar de la base//@TOMI P
    for point in points:
        if point.id == int(id):
            points.remove(point)
            return jsonify({'deleted': True})

    return jsonify({'deleted': False, 'message': 'point not found'}), 404
