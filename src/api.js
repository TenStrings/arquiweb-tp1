const categoriesMock = [
    { id: 1, title: "Food", icon: "idk1" },
    { id: 2, title: "Night life", icon: "idk2" },
    { id: 3, title: "Sports", icon: "idk3" },
]

const pointsMock = [
    {
        id: 1,
        position: { lat: -34.583192397850446, lng: -58.44321326835347 },
        name: "RamenHut",
        category: 1
    },
    {
        id: 2,
        position: { lat: -34.57301606452501, lng: -58.454889807030376 },
        name: "FutureBar",
        category: 2
    }
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
