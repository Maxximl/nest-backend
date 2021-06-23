import { Body, Controller, Get, Post } from '@nestjs/common';
import { get } from 'http';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {

    }

    @Post()
    create(@Body() userDto: CreateUserDto) {
        console.log(userDto)
        return this.userService.createUser(userDto);
    }

    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }
}
