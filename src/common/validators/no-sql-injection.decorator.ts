import { registerDecorator, ValidationOptions } from 'class-validator';

// Caracteres y patrones peligrosos para SQL injection
const SQL_INJECTION_PATTERNS = [
  /['";]/g, // Comillas simples, dobles y punto y coma
  /--/g, // Comentarios SQL
  /\/\*/g, // Inicio de comentario multilínea
  /\*\//g, // Fin de comentario multilínea
  /(union|select|insert|update|delete|drop|create|alter|exec|execute|script|javascript|onerror|onload)/gi, // Palabras SQL peligrosas
  /<script|<\/script>/gi, // Scripts
  /on\w+\s*=/gi, // Event handlers (onclick, onerror, etc.)
];

export function NoSqlInjection(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'noSqlInjection',
      target: object.constructor,
      propertyName,
      options: {
        message:
          'El valor contiene caracteres o patrones no permitidos por seguridad',
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

          // Verificar patrones peligrosos
          for (const pattern of SQL_INJECTION_PATTERNS) {
            if (pattern.test(value)) {
              return false;
            }
          }

          return true;
        },
      },
    });
  };
}

