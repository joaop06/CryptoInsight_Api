import { UserEntity as Entity } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserReturnDto } from '../dto/user-return.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { ServiceInterface } from '../../../interfaces/service.interface';

export interface UsersServiceInterface
  extends ServiceInterface<Entity, CreateUserDto, UserReturnDto> {
  removePassword(user: Entity): Partial<Entity>;

  findOneByEmail(email: string): Promise<Entity>;

  changePassword(object: ChangePasswordDto): Promise<any>;

  update(id: number, object: UpdateUserDto): Promise<any>;
}
