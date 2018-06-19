import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { CacheModule } from '../cache/cache.module';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { AdminUserController } from './admin-user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CommonModule,
    CacheModule,
  ],
  providers: [ UserService ],
  controllers: [UserController, AdminUserController],
  exports: [ UserService ]
})
export class UserModule {}
