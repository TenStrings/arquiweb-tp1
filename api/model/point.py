from utils.jsonSerializable import JsonSerializable


class Point(JsonSerializable):

    def __init__(self, id, position, name, description, category):
        self.id = id
        self.position = position
        self.name = name
        self.description = description
        self.category = category

