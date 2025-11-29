import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Headers,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, UpdateUserRolesDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RawHeaders } from './decorators/raw-header.decorator';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';
import { Auth } from './decorators';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth(ValidRoles.admin, ValidRoles.vendedor, ValidRoles.conductor, ValidRoles.cliente)
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    //@Req() request: Express.Request
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return {
      ok: true,
      message: 'This is a private route',
      user,
      userEmail,
      rawHeaders,
      headers,
    };
  }
  //@SetMetadata('roles', ['admin','super-user'])

  // @Get('private2')
  // @RoleProtected(ValidRoles.superUser)
  // @UseGuards(AuthGuard(), UserRoleGuard)
  // privateRoute2(@GetUser() user: User){
  //   return{
  //     ok: true,
  //     user
  //   }
  // }

  //  @Get('private3')
  // @Auth(ValidRoles.superUser, ValidRoles.admin)
  // privateRoute3(@GetUser() user: User){
  //   return{
  //     ok: true,
  //     user
  //   }
  // }

  @Patch('users/:id/roles')
  @Auth(ValidRoles.admin)
  @ApiTags('Users')
  @ApiOperation({ summary: 'Actualizar roles de un usuario' })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario (UUID)',
    example: 'a3f0f1c2-1234-4b5a-9c0d-ef1234567890',
  })
  @ApiResponse({ status: 200, description: 'Roles actualizados correctamente' })
  @ApiResponse({
    status: 400,
    description: 'Solicitud inválida o usuario no existe',
  })
  updateUserRoles(@Param('id') id: string, @Body() dto: UpdateUserRolesDto) {
    return this.authService.updateUserRoles(id, dto);
  }
}
