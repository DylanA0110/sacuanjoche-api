import { registerDecorator, ValidationOptions } from 'class-validator';

export function NoExcessiveRepetition(
  maxRepeats: number = 4,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'noExcessiveRepetition',
      target: object.constructor,
      propertyName,
      options: {
        message: `No se permiten más de ${maxRepeats} caracteres repetidos consecutivos`,
        ...validationOptions,
      },
      validator: {
        validate(value: unknown) {
          if (value === null || value === undefined || value === '') {
            return true;
          }
          if (typeof value !== 'string') {
            return false;
          }

          // Detectar repeticiones excesivas (ej: jjjjjjjjjj, aaaaaaa)
          const repetitionPattern = new RegExp(
            `(.)\\1{${maxRepeats},}`,
            'g',
          );
          return !repetitionPattern.test(value);
        },
      },
    });
  };
}

