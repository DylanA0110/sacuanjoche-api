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
    // Si el valor es undefined, null o string vacío, la validación pasa
    // (esto permite que campos opcionales funcionen correctamente)
    if (value === undefined || value === null || value === '') {
      return true;
    }
    
    if (typeof value !== 'string') {
      return false;
    }
    
    // Eliminar espacios en blanco antes de validar
    const trimmedValue = value.trim().replace(/\s+/g, '');
    
    // Si después de trim está vacío, considerar válido (campo opcional)
    if (trimmedValue === '') {
      return true;
    }
    
    // Formato: 505 seguido de 8 dígitos = 11 dígitos totales
    // Ejemplo: 50512345678
    const phonePattern = /^505\d{8}$/;
    return phonePattern.test(trimmedValue);
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

