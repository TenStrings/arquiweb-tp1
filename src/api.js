const categoriesMock = [
    { title: "category1", icon: "idk1" },
    { title: "category2", icon: "idk2" },
    { title: "category3", icon: "idk3" },
]

const pointsMock = [
    {id: 1, position: { lat: -34.583192397850446, lng: -58.44321326835347 }},
    {id: 2, position: { lat: -34.57301606452501, lng: -58.454889807030376 }}
]

export const categoriesAPI = {
    all: function () {
        return Promise.resolve(categoriesMock)
    }
}

export const poiAPI = {
    all: function () {
        return Promise.resolve(pointsMock)
    }
}
