from flask import Flask

from controllers.pointController import pointBlueprint
from model.point import Point

pointId = 1

app = Flask(__name__)
app.register_blueprint(pointBlueprint)

points = []

point1 = Point(1, {'lat': -34.6,  'lng': -58.5}, 'macDonald', 'muchas gordas', 5)
point2 = Point(2, {'lat': -34.52, 'lng': -58.55}, 'burgerKing', 'muchas gordas', 6)
point3 = Point(3, {'lat': -34.58319, 'lng': -58.4432}, 'RamenHut', 'fui de pepa', 7)
point4 = Point(4, {'lat': -34.573, 'lng': -58.4548}, 'FutureBar', 'rica, amargaaaaa', 8)

points.append(point1)
points.append(point2)
points.append(point3)
points.append(point4)

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
