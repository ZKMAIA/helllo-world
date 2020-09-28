export interface Product {
    id: number
    name: string
    price: number
    stock: number
}

const Products: Product[] = [
    {
        id: 1,
        name: 'cookie',
        price: 1.25,
        stock: 20
    },
    {
        id: 2,
        name: 'Milk',
        price: 0.99,
        stock: 10
    },
    {
        id: 3,
        name: 'Detergent',
        price: 0.75,
        stock: 65
    },
    {
        id: 4,
        name: 'water 1l',
        price: 0.30,
        stock: 150
    }
]

export default Products