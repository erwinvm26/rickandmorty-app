import { AuthDto } from './dto/auth.dto';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { z } from 'zod';
import { AuthGuard } from '@nestjs/passport';

const registerCredentials = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  state: z.boolean().catch(true),
});

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  async login(@Body() req): Promise<string> {
    console.log(req);

    this.auth.validateUser();

    return 'erwin';
  }

  @Post('register')
  async register(@Body() { email, password }: AuthDto): Promise<boolean> {
    console.log({ email, password });
    return false;
  }
}
