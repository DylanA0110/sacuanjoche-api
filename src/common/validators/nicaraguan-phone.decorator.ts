import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class NicaraguanPhoneConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    if (typeof value !== 'string') {
      return false;
    }
    // Formato: 505 seguido de 8 dígitos = 11 dígitos totales
    // Ejemplo: 50512345678
    const phonePattern = /^505\d{8}$/;
    return phonePattern.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return 'El teléfono debe tener el formato 505 seguido de 8 dígitos (ejemplo: 50512345678)';
  }
}

export function NicaraguanPhone(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: NicaraguanPhoneConstraint,
    });
  };
}

