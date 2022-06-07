export const validateCreateCategory = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                description: { type: 'string' }
            },
            required: ['name', 'description']
        }
    }
}