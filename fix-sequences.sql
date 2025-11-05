-- Script para ajustar secuencias después de eliminar registros
-- Ejecuta este script en pgAdmin después de eliminar registros

-- Ajustar secuencia de empleado al máximo ID existente
SELECT setval(
    pg_get_serial_sequence('empleado', 'id_empleado'), 
    COALESCE((SELECT MAX(id_empleado) FROM empleado), 0)
);

-- Verificar el próximo valor que se usará
SELECT nextval(pg_get_serial_sequence('empleado', 'id_empleado')) as proximo_id;

-- Si quieres que el próximo ID sea específico (ej: 2), primero elimina los registros
-- y luego ejecuta:
-- SELECT setval(pg_get_serial_sequence('empleado', 'id_empleado'), 1, false);

