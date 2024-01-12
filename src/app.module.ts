import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database/database';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guard/jwt.guard';

@Module({
  imports: [
    // env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // db
    MongooseModule.forRootAsync({
      useClass: DatabaseService,
    }),

    // JWT
    JwtModule.register({
      global: true,
    }),

    // service
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
