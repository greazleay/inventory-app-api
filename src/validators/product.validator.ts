export const validateCreateProduct = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                categories: { type: 'array', items: { type: 'string' } },
                price: { type: 'number' },
                stock: { type: 'number' },
                img: { type: 'string' }
            },
            required: ['name', 'description', 'categories', 'price', 'stock', 'img']
        }
    }
}