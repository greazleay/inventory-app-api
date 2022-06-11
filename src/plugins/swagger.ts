import fp from 'fastify-plugin'
import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from 'fastify'
import swagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger'

export default fp<FastifyDynamicSwaggerOptions>(async (fastify, opts) => {

    await fastify.register(swagger, {
        routePrefix: '/api-docs',
        swagger: {
            info: {
                title: 'Inventory App API',
                description: 'A simple API with CRUD capabilities for managing inventory items',
                version: '0.1.0'
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            },
            host: 'localhost',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                { name: 'user', description: 'User related end-points' },
                { name: 'category', description: 'Category related end-points' },
                { name: 'product', description: 'Product related end-points' }
            ],
            definitions: {
                User: {
                    type: 'object',
                    required: ['id', 'email'],
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        email: { type: 'string', format: 'email' }
                    }
                },
                Category: {
                    type: 'object',
                    required: ['id', 'name', 'descrition'],
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                    }
                },
                Product: {
                    type: 'object',
                    required: ['id', 'email'],
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        categories: { type: 'array', items: { type: 'string', format: 'uuid' } },
                        price: { type: 'number' },
                        stock: { type: 'number' },
                        img: { type: 'string' }
                    }
                }
            },
            securityDefinitions: {
                Bearer: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header'
                },
            }
        },
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        },
        uiHooks: {
            onRequest: function (request: FastifyRequest, reply: FastifyReply, next: DoneFuncWithErrOrRes) { next() },
            preHandler: function (request: FastifyRequest, reply: FastifyReply, next: DoneFuncWithErrOrRes) { next() }
        },
        staticCSP: true,
        transformStaticCSP: (header: any) => header,
        exposeRoute: true
    })

})
