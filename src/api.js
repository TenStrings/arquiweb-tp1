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
        description: "Descripcion prueba 1",
        category: 1
    },
    {
        id: 2,
        position: { lat: -34.57301606452501, lng: -58.454889807030376 },
        description: "Descripcion prueba 2",
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

export const userAPI = {
    authenticate: function (username, password) {
        return fakeUsers.find(
            user => user.username === username && user.password === password
        ).token
    },
}

const fakeUsers = [
    {
        username: "TomiPasto",
        password: "1234",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRvbWlQYXN0byIsImFkbWluIjpmYWxzZX0.NO3LWNaf7BIi4bgYT3QpC2tSd7LJ9FxxHIwOIyx-smg"
    },
    {
        username: "admin",
        password: "admin",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiYWRtaW4iOnRydWV9.2c7fRwMbZW_sJZxeggp-fBWbxYQNVzZxEvHrZwD-mKk"
    }
];
