import { registerDecorator, ValidationOptions } from 'class-validator';

/**
 * Decorador de validación específico para direcciones.
 * Es más permisivo que @NoRandomString() porque las direcciones pueden tener
 * formatos variados y legítimos que no coinciden con patrones de texto común.
 */
export function NoRandomAddress(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'noRandomAddress',
      target: object.constructor,
      propertyName,
      options: {
        message:
          'La dirección parece ser una cadena aleatoria sin sentido. Por favor, ingrese una dirección válida',
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

          const str = value.toLowerCase();

          // Si es muy corto, no aplicar esta validación
          if (str.length < 10) {
            return true;
          }

          // Contar vocales y consonantes
          const vowels = (str.match(/[aeiouáéíóú]/g) || []).length;
          const consonants = (str.match(/[bcdfghjklmnpqrstvwxyz]/g) || []).length;
          const totalLetters = vowels + consonants;

          // Si no hay suficientes letras, no aplicar
          if (totalLetters < 8) {
            return true;
          }

          // Calcular ratio de vocales
          const vowelRatio = vowels / totalLetters;

          // Para direcciones, ser más permisivo: si tiene menos del 10% de vocales, es sospechoso
          // (más permisivo que el 15% de @NoRandomString)
          if (vowelRatio < 0.1) {
            return false;
          }

          // Detectar secuencias muy largas de consonantes (más de 6, más permisivo que 5)
          const consonantSequence = /[bcdfghjklmnpqrstvwxyz]{7,}/gi;
          if (consonantSequence.test(str)) {
            return false;
          }

          // Detectar patrones repetitivos muy obvios (solo si el patrón es muy repetitivo)
          // Solo para cadenas muy largas (30+ caracteres)
          if (str.length >= 30) {
            for (let patternLength = 5; patternLength <= Math.floor(str.length / 2); patternLength++) {
              for (let i = 0; i <= str.length - patternLength * 2; i++) {
                const pattern = str.substring(i, i + patternLength);
                const remaining = str.substring(i + patternLength);
                if (remaining.includes(pattern)) {
                  const occurrences = (str.match(new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
                  // Solo rechazar si el patrón aparece 4+ veces o representa más del 50% de la cadena
                  // (más permisivo que @NoRandomString que usa 3+ veces o 40%)
                  if (occurrences >= 4 && (patternLength * occurrences) / str.length > 0.5) {
                    return false;
                  }
                }
              }
            }
          }

          // Detectar baja diversidad de caracteres (solo para cadenas muy largas)
          // Más permisivo: menos del 20% de caracteres únicos (vs 30% en @NoRandomString)
          if (str.length >= 25) {
            const uniqueChars = new Set(str.replace(/[^a-z]/g, '')).size;
            const uniqueRatio = uniqueChars / totalLetters;
            if (uniqueRatio < 0.2) {
              return false;
            }
          }

          // Detectar si alguna letra aparece excesivamente (solo para cadenas muy largas)
          // Más permisivo: más del 40% (vs 30% en @NoRandomString)
          if (str.length >= 25) {
            const charCounts: { [key: string]: number } = {};
            for (const char of str.replace(/[^a-z]/g, '')) {
              charCounts[char] = (charCounts[char] || 0) + 1;
            }
            for (const count of Object.values(charCounts)) {
              if (count / totalLetters > 0.4) {
                return false;
              }
            }
          }

          return true;
        },
      },
    });
  };
}

