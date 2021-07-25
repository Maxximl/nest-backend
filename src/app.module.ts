import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/posts.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'nest-back',
            autoLoadModels: true,
            synchronize: true,
            models: [User, Role, UserRoles, Post]
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname,  'static'),
          }),
    ],
})
export class AppModule { }
