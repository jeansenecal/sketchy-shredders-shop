import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
          name: 'Jean',
          email: 'admin@example.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: true,
        },
        {
          name: 'John',
          email: 'user@example.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: false,
        },
    ],
    products: [
        {
            name: 'Nike Slim Shirt',
            category: 'Shirts',
            image : '/images/p1.jpg',
            price: 120,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: "high quality shirt",
            countInStock: 4,
        },
        {
            name: 'Adidas Fit Shirt',
            category: 'Shirt',
            image : '/images/p2.jpg',
            price: 67,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 10,
            description: "high quality shirt",
            countInStock: 6,
        },
        {
            name: 'Lacoste Slim Shirt',
            category: 'Shirts',
            image : '/images/p3.jpg',
            price: 34,
            brand: 'Lacoste',
            rating: 5,
            numReviews: 100,
            description: "high quality shirt",
            countInStock: 0,
        },
        {
            name: 'Nike Slim Pants',
            category: 'Pants',
            image : '/images/p4.jpg',
            price: 41,
            brand: 'Nike',
            rating: 1.5,
            numReviews: 1,
            description: "high quality pants",
            countInStock: 56,
        },
        {
            name: 'Adidas Slim Pants',
            category: 'Pants',
            image : '/images/p5.jpg',
            price: 46,
            brand: 'Adidas',
            rating: 2,
            numReviews: 14,
            description: "high quality pants",
            countInStock: 0,
        },
        {
            name: 'Lacoste Slim Pants',
            category: 'Pants',
            image : '/images/p6.jpg',
            price: 76,
            brand: 'Lacoste',
            rating: 3.5,
            numReviews: 20,
            description: "high quality pants",
            countInStock: 47,
        }

    ]
}
export default data;