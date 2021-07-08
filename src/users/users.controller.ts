import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { get } from 'http';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {

    }

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @Roles("USER", "ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({ summary: "Выдать роль" })
    @ApiResponse({ status: 200 })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post("/role")
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }

    @ApiOperation({ summary: "Забанить пользователя" })
    @ApiResponse({ status: 200 })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post("/ban")
    ban(@Body() dto: BanUserDto) {
        return this.userService.ban(dto);
    }
}
