import { IsNumber, IsString } from "class-validator";

export class CreateRoleDto {

    readonly value: string;
    readonly description: string;
}