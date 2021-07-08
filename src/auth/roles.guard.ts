import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {


        try {
            const requierdRoles = this.reflector.getAllAndOverride(ROLES_KEY, [context.getHandler(), context.getClass()])
            if (!requierdRoles) {
                return true;
            }

            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(" ")[0];
            const token = authHeader.split(" ")[1];

            if (bearer !== "Bearer" || !token) {
                throw new UnauthorizedException({ message: "Пользователь не авторизован" })
            }

            const user = this.jwtService.verify(token);
            console.log(user)
            req.user = user;
            return user.roles.some(role => requierdRoles.includes(role.value));
        } catch (e) {
            console.log(e)
            throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN);
        }
    }
}

