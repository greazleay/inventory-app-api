import { FastifyPluginAsync } from 'fastify';
import { LoginUserValidate } from '../../../validators/auth.validator';

export const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

    fastify.post('/login', LoginUserValidate, fastify.sendTokens);
}

export default auth;