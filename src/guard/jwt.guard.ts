import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async verifyRefreshToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_TOKEN'),
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async verifyAccessToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_ACCESS_TOKEN'),
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractJwtFromHeaders(request.headers);

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const decoded = await this.verifyAccessToken(token);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractJwtFromHeaders(headers: any): string | null {
    const authHeader = headers.authorization;

    if (!authHeader) {
      return null;
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return null;
    }

    return token;
  }
}
