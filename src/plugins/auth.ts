import fp from 'fastify-plugin'
import { FastifyRequest, FastifyReply } from 'fastify';
import fjwt, { FastifyJWTOptions } from '@fastify/jwt'


export default fp<FastifyJWTOptions>(async (fastify, opts) => {

    fastify.register(fjwt as any, {
        secret: {
            private: {
                key: Buffer.from(process.env.ACCESS_TOKEN_PRIVATE_KEY_BASE64 as string, 'base64').toString('ascii'),
                passphrase: process.env.ACCESS_TOKEN_SECRET
            },
            public: Buffer.from(process.env.ACCESS_TOKEN_PUBLIC_KEY_BASE64 as string, 'base64').toString('ascii')
        },
        sign: {
            algorithm: 'RS256',
            iss: 'http://localhost:3000',
            audience: 'http://localhost:3000',
            kid: 'access-token-public-key',
        },
        verify: {
            allowedAud: 'http://localhost:3000',
            allowedIss: 'http://localhost:3000',
        }
    })

    fastify.decorate('jwtauthenticate', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify()
        } catch (error) {
            reply.code(401).send(error)
        }
    })
})

declare module 'fastify' {
    export interface FastifyInstance {
        jwtauthenticate: any
    }

    export interface FastifyRequest {
        jwt: any
    }
}