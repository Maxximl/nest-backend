import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
        private roleService: RolesService
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userModel.create(createUserDto);
        const role = await this.roleService.getRoleByValue("ADMIN");
        await user.$set("roles", [role.id]);
        user.roles = [role];
        return user;
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userModel.findAll({ include: { all: true } });
        return users;
    }

    findOne(id: string): Promise<User> {
        return this.userModel.findOne({
            where: {
                id,
            },
        });
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy();
    }

    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({ where: { email }, include: { all: true } });
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userModel.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add("role", role.id);
            return dto;
        }
        throw new HttpException("Пользователь или роль не найдены", HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        const user = await this.userModel.findByPk(dto.userId);
        if (!user) {
            throw new HttpException(`Пользователь с id = ${dto.userId} не найден`, HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }
}
