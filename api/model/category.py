from utils.jsonSerializable import JsonSerializable


class Category(JsonSerializable):

    def __init__(self, id, title, icon):
        self.id = id
        self. title = title
        self.icon = icon