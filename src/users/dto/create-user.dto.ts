import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { account } from 'models';
// Ganti dengan import yang sesuai dengan struktur proyek Anda
// Custom validator untuk memeriksa apakah username sudah digunakan atau belum

@ValidatorConstraint({ async: true })
export class UsernameExistsValidator implements ValidatorConstraintInterface {
  async validate(username: string) {
    const existingUser = await account.findOne({ where: { username } });
    return !existingUser; // Return true jika username belum digunakan, false jika sudah digunakan
  }
}

function IsUsernameAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UsernameExistsValidator,
    });
  };
}

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nama harus diisi' })
  name: string;

  nama: string;

  @IsNotEmpty({ message: 'Username harus diisi' })
  @IsString({ message: 'Username harus berupa string' })
  @IsUsernameAlreadyExist({ message: 'Username sudah digunakan' })
  username: string;

  @IsNotEmpty({ message: 'Status harus diisi' })
  @IsIn([0, 1], { message: 'Status harus 0 atau 1' })
  status: number;

  @IsNotEmpty({ message: 'isAdmin harus diisi' })
  is_admin: number;
}
