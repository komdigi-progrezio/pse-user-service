import {
  IsIn,
  IsNotEmpty,
  IsString,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { account } from 'models';
import { Op } from 'sequelize';

interface UsernameExistsValidationArguments extends ValidationArguments {
  constraints: [number]; // Tipe data ID
}

@ValidatorConstraint({ async: true })
class UsernameExistsValidator implements ValidatorConstraintInterface {
  async validate(
    username: string,
    args: UsernameExistsValidationArguments,
  ): Promise<boolean> {
    const id = args.object['id'] as number; // Mendapatkan ID dari objek DTO
    const existingUser = await account.findOne({
      where: {
        username,
        id: { [Op.not]: id },
      },
    });

    return !existingUser; // Mengembalikan true jika username belum digunakan, false jika sudah digunakan
  }
}

function IsUsernameAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UsernameExistsValidator,
    });
  };
}

export class UpdateUserDto {
  id: number;

  @IsNotEmpty({ message: 'Nama harus diisi' })
  nama: string;

  @IsNotEmpty({ message: 'Username harus diisi' })
  @IsString({ message: 'Username harus berupa string' })
  @IsUsernameAlreadyExist({ message: 'Username sudah digunakan' })
  username: string;

  @IsNotEmpty({ message: 'Status harus diisi' })
  @IsIn([0, 1], { message: 'Status harus 0 atau 1' })
  status: number;

  @IsNotEmpty({ message: 'isAdmin harus diisi' })
  isAdmin: number;
}
