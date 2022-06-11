export const LoginUserValidate = {
    schema: {
        body: {
            type: 'object',
            properties: {
                email: { type: 'string', format: 'email' },
                password: { type: 'string' }
            },
            required: ['email', 'password']
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    access_token: { type: 'string' }
                }
            }
        }
    }
}