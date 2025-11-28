import { registerDecorator, ValidationOptions } from 'class-validator';

export function NoRandomString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'noRandomString',
      target: object.constructor,
      propertyName,
      options: {
        message:
          'El valor parece ser una cadena aleatoria sin sentido. Por favor, ingrese un valor válido',
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
          if (str.length < 8) {
            return true;
          }

          // Contar vocales y consonantes
          const vowels = (str.match(/[aeiouáéíóú]/g) || []).length;
          const consonants = (str.match(/[bcdfghjklmnpqrstvwxyz]/g) || []).length;
          const totalLetters = vowels + consonants;

          // Si no hay suficientes letras, no aplicar
          if (totalLetters < 6) {
            return true;
          }

          // Calcular ratio de vocales
          const vowelRatio = vowels / totalLetters;

          // Si tiene menos del 10% de vocales, probablemente es aleatorio (bajado de 15% a 10%)
          // (ej: jasdlfjaowijroialsdfjaksdjfasf tiene muy pocas vocales)
          if (vowelRatio < 0.10) {
            return false;
          }

          // Detectar secuencias muy largas de consonantes (más de 8)
          // PERO ser más permisivo: solo bloquear si NO hay vocales cerca (texto real tiene vocales distribuidas)
          const consonantSequence = /[bcdfghjklmnpqrstvwxyz]{8,}/gi;
          const matches = str.match(consonantSequence);
          if (matches) {
            // Verificar si hay vocales cerca de la secuencia de consonantes
            // Si hay vocales en un rango de 3 caracteres antes o después, probablemente es texto real
            for (const match of matches) {
              const matchIndex = str.indexOf(match);
              const before = str.substring(Math.max(0, matchIndex - 3), matchIndex);
              const after = str.substring(
                matchIndex + match.length,
                matchIndex + match.length + 3
              );
              const hasVowelsNearby = /[aeiouáéíóú]/.test(before + after);
              
              // Si NO hay vocales cerca Y la secuencia es muy larga (10+), es probablemente basura
              if (!hasVowelsNearby && match.length >= 10) {
                return false;
              }
              // Si tiene vocales cerca o es menos de 10 caracteres, es texto real (permitir)
            }
          }

          
          for (let patternLength = 4; patternLength <= Math.floor(str.length / 2); patternLength++) {
            for (let i = 0; i <= str.length - patternLength * 2; i++) {
              const pattern = str.substring(i, i + patternLength);
              const remaining = str.substring(i + patternLength);
              if (remaining.includes(pattern)) {
                // Si el patrón se repite, verificar si es muy repetitivo
                const occurrences = (str.match(new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
                // Si el patrón aparece 3+ veces o representa más del 40% de la cadena, es sospechoso
                if (occurrences >= 3 || (patternLength * occurrences) / str.length > 0.4) {
                  return false;
                }
              }
            }
          }

          // Detectar baja diversidad de caracteres
          // Si hay muy pocos caracteres únicos comparado con la longitud, es sospechoso
          const uniqueChars = new Set(str.replace(/[^a-z]/g, '')).size;
          const uniqueRatio = uniqueChars / totalLetters;
          // Si tiene menos del 30% de caracteres únicos y es largo, probablemente es aleatorio
          if (str.length >= 15 && uniqueRatio < 0.3) {
            return false;
          }

        
          const charCounts: { [key: string]: number } = {};
          for (const char of str.replace(/[^a-z]/g, '')) {
            charCounts[char] = (charCounts[char] || 0) + 1;
          }
          // Si alguna letra aparece más del 30% de las veces en cadenas largas
          if (str.length >= 15) {
            for (const count of Object.values(charCounts)) {
              if (count / totalLetters > 0.3) {
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

