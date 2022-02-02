const price = [
    {
        "_id": 0,
        "name": "Any",
        "array": []
    },
    {
        "_id": 1,
        "name": "$0 to $5",
        "array": [0, 5]
    },
    {
        "_id": 2,
        "name": "$6 to $10",
        "array": [6, 10]
    },
    {
        "_id": 3,
        "name": "$11 to $15",
        "array": [11, 15]
    },
    {
        "_id": 4,
        "name": "$16 to $20",
        "array": [16, 20]
    },
    {
        "_id": 5,
        "name": "More than $20",
        "array": [20, 100]
    }
]



const continents = [
    {
        id: "1",
        name: "Novel",
        image: "",
        subCategories: [
            {
                id: 0,
                name: "All",
                url: "http://localhost:8080/product/getProductsByCategory?category=Novel",
                url2: "http://localhost:8080/product/getProductsByCategoryAndSearch?category=Novel&search="
            },
            {
                id: 1,
                name: "Romance",
                url: "http://localhost:8080/product/getProductsByGenre?genre=Romance",
                url2: "http://localhost:8080/product/getProductsByGenreAndSearch?genre=Romance&search="
            },
            {
                id: 2,
                name: "Fantasy",
                url: "http://localhost:8080/product/getProductsByGenre?genre=Fantasy",
                url2: "http://localhost:8080/product/getProductsByGenreAndSearch?genre=Fantasy&search="
            },
            {
                id: 3,
                name: "Science Fiction",
                url: "http://localhost:8080/product/getProductsByGenre?genre=Science Fiction",
                url2: "http://localhost:8080/product/getProductsByGenreAndSearch?genre=Science Fiction&search="
            },
            {
                id: 4,
                name: "Adventure",
                url: "http://localhost:8080/product/getProductsByGenre?genre=Adventure",
                url2: "http://localhost:8080/product/getProductsByGenreAndSearch?genre=Adventure&search="
            },
            {
                id: 5,
                name: "World Classics",
                url: "http://localhost:8080/product/getProductsByGenre?genre=World’s Classics",
                url2: "http://localhost:8080/product/getProductsByGenreAndSearch?genre=World’s Classics&search="
            },
        ]
    },
    {
        id: "2",
        name: "Poetry",
        image: "",
        subCategories: [
            {
                id: 0,
                name: "All",
                url: "http://localhost:8080/product/getProductsByCategory?category=Poetry",
                url2: "http://localhost:8080/product/getProductsByCategoryAndSearch?category=Poetry&search="
            },
            {
                id: 1,
                name: "World Poetry",
                url: "http://localhost:8080/product/getProductsByGenre?genre=World Poetry",
                url2: "http://localhost:8080/product/getProductsByGenreAndSearch?genre=World Poetry&search="
            },
            {
                id: 2,
                name: "Turkish Poetry",
                url: "http://localhost:8080/product/getProductsByGenre?genre=Turkish Poetry",
                url2: "http://localhost:8080/product/getProductsByGenreAndSearch?genre=Turkish Poetry&search="

            },
        ]
    },
    {
        id: "3",
        name: "Story",
        image: "",
        subCategories: [
            {
                id: 0,
                name: "All",
                url: "http://localhost:8080/product/getProductsByCategory?category=Story",
                url2: "http://localhost:8080/product/getProductsByCategoryAndSearch?category=Story&search="
            },
            {
                id: 1,
                name: "World Story",
                url: "http://localhost:8080/product/getProductsByGenre?genre=World Story",
                url2: "http://localhost:8080/product/getProductsByGenreAndSearch?genre=World Story&search="
            },
            {
                id: 2,
                name: "Turkish Story",
                url: "http://localhost:8080/product/getProductsByGenre?genre=Turkish Story",
                url2: "http://localhost:8080/product/getProductsByGenreAndSearch?genre=Turkish Story&search="
            },
        ]
    },
    {
        id: "4",
        name: "Biography",
        image: "",
        subCategories: [
            {
                id: 0,
                name: "All",
                url: "http://localhost:8080/product/getProductsByCategory?category=Biography",
                url2: "http://localhost:8080/product/getProductsByCategoryAndSearch?category=Biography&search="
            },
        ]
    },
    {
        id: "5",
        name: "Cookbooks",
        image: "",
        subCategories: [
            {
                id: 0,
                name: "All",
                url: "http://localhost:8080/product/getProductsByCategory?category=Cookbook",
                url2: "http://localhost:8080/product/getProductsByCategoryAndSearch?category=Cookbook&search="
            },
        ]
    }

]


export {
    price,
    continents
}