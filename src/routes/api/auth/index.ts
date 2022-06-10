import { FastifyPluginAsync } from 'fastify';
import { FastifyRequest, FastifyReply } from 'fastify';
import { LoginUserValidate } from '../../../validators/auth.validator';
import User from '../../../models/User';


export const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

    fastify.post('/login', LoginUserValidate, async (request: FastifyRequest<{
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
                // reply.code(401).send({
                //     message: 'Invalid email or password'
                // });
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
}

export default auth;