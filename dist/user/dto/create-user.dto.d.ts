export declare class CreateUserDto {
    idEmpleado?: number;
    idCliente?: number;
    password: string;
    username: string;
    roles: string[];
    activo?: boolean;
}
