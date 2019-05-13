from flask import Flask, jsonify
from flask import request

from model.point import Point

pointId = 1

app = Flask(__name__)

points = []

point1 = Point(1, {'lat': -34, 'long': 58}, 'macDonald', 'muchas gordas', 'restaurantes')
point2 = Point(2, {'lat': -34.3, 'long': 58.3}, 'burgerKing', 'muchas gordas', 'restaurantes')

points.append(point1)
points.append(point2)


@app.route('/point', methods=['GET'])
def getPoints():
    #buscar de la base//@TOMI P
    return jsonify([point.toJson() for point in points])


@app.route('/point', methods=['POST'])
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

    #insertar en la base//@TOMI P
    points.append(point)
    return jsonify({'ok': True}), 200

@app.route('/point/<id>', methods=['DELETE'])
def deletePoint(id):
    #borrar de la base//@TOMI P
    for point in points:
        if point.id == int(id):
            points.remove(point)
            return jsonify({'deleted': True})

    return jsonify({'deleted': False, 'message' : 'point not found'}), 404

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
