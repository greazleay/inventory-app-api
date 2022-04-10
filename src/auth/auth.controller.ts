import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RequestWithUser } from '../auth/interfaces/auth.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: RequestWithUser) {
        return this.authService.login(req.user);
    }
}
