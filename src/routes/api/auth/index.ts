import { FastifyPluginAsync } from 'fastify';
import { FastifyRequest, FastifyReply } from 'fastify';


export const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

    fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
        const token = fastify.jwt.sign({ name: 'John Doe' }, { expiresIn: '1h', algorithm: 'RS256' });
        return { token };
    })
}

export default auth;