import fp from 'fastify-plugin'
import { FastifyRequest, FastifyReply } from 'fastify';
import fjwt, { FastifyJWTOptions } from '@fastify/jwt'
import User from '../models/User';


export default fp<FastifyJWTOptions>(async (fastify, opts) => {

    fastify.register(fjwt as any, {
        secret: {
            private: {
                key: Buffer.from(process.env.ACCESS_TOKEN_PRIVATE_KEY_BASE64 as string, 'base64').toString('ascii'),
                passphrase: process.env.ACCESS_TOKEN_SECRET
            },
            public: Buffer.from(process.env.ACCESS_TOKEN_PUBLIC_KEY_BASE64 as string, 'base64').toString('ascii')
        },
        decode: {
            checkTyp: 'JWT'
        },
        sign: {
            algorithm: 'RS256',
            iss: 'http://localhost:3000',
            aud: 'http://localhost:3000',
            expiresIn: '1h',
            kid: 'atpubk',
            jti: '=~+QJV&%!*#',
            nonce: 'defaultNonce'
        },
        verify: {
            allowedAud: 'http://localhost:3000',
            allowedIss: 'http://localhost:3000',
            allowedAlg: ['RS256'],
            allowedJti: /^[~+=]{2,3}[JQVX]{2,3}(?=[!@#$%^&*]{3,5})/g,
            allowedNonce: 'defaultNonce',
            cache: true,
            requiredClaims: ['sub', 'email', 'isAdmin', 'isMember',],
        }
    })

    fastify.decorate('jwtauthenticate', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify()
        } catch (error) {
            reply.code(401).send(error)
        }
    })

    fastify.decorate('sendTokens', async (request: FastifyRequest<{
        Body: {
            email: string;
            password: string;
        }
    }>,

        reply: FastifyReply) => {
        try {
            const { email, password } = request.body;
            const user = await User.findOne({ email });

            if (!user || !(await user.validatePassword(password))) {
                throw fastify.httpErrors.unauthorized('Invalid email or password');
            }

            const payload = {
                sub: user!._id,
                name: user!.name,
                email: user!.email,
                avatar: user!.avatar,
                isAdmin: user!.isAdmin,
                isMember: user!.isMember,
                last_login: user!.lastLogin,
                token_version: user!.tokenVersion
            };

            return { access_token: fastify.jwt.sign(payload, fastify.jwt.options.sign) };
        } catch (error) {
            console.error(error);
            reply.send(error);
        }
    })
})

declare module 'fastify' {
    export interface FastifyInstance {
        jwtauthenticate: any
        sendTokens: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
    }
}