# Casos de Prueba y Trazabilidad

> Documento formal de entrega para el reto técnico. Cubre el diseño, la trazabilidad y las decisiones de automatización del flujo E2E sobre SauceDemo.

## Cobertura frente al reto técnico
Este documento está alineado con las entregas obligatorias del PDF:
- Diseño de casos: define 4 casos con historia, técnica, priorización, precondiciones, datos, pasos y resultado esperado.
- Trazabilidad: relaciona cada historia de usuario con los casos y con los tests automatizados.
- Alcance del reto: cubre autenticación, operación principal (checkout), verificación de estado y casos negativos de borde.
- Decisiones técnicas: la justificación de alcance, localizadores y datos se complementa en [docs/decisiones-tecnicas.md](docs/decisiones-tecnicas.md).

## Historias de usuario

- HU-1: Autenticación de usuarios.
- HU-2: Operación principal de compra.
- HU-3: Verificación del estado de la orden.
- HU-4: Casos negativos y de borde.

## Criterios de aceptación por historia (BDD)

### HU-1 — Autenticación
- Criterio 1: Dado un usuario con credenciales válidas, cuando intenta iniciar sesión, entonces accede al inventario y visualiza el carrito.
- Criterio 2: Dado un usuario bloqueado o con credenciales inválidas, cuando intenta iniciar sesión, entonces no accede al inventario y se muestra un mensaje de error claro.

### HU-2 — Operación principal
- Criterio 1: Dado un usuario autenticado, cuando selecciona un producto, lo agrega al carrito y avanza al checkout, entonces el producto aparece en el resumen del carrito.
- Criterio 2: Dado un usuario con un producto en el carrito, cuando completa los datos de envío y finaliza la compra, entonces se confirma la orden correctamente.

### HU-3 — Verificación de estado
- Criterio 1: Dado que la compra se ha completado, cuando el usuario revisa el flujo final, entonces se visualiza un mensaje de confirmación de compra.
- Criterio 2: Dado un proceso de checkout en curso, cuando la compra no se completa, entonces el sistema mantiene el estado del flujo y muestra el error correspondiente.

### HU-4 — Casos negativos y de borde
- Criterio 1: Dado un usuario autenticado en checkout, cuando deja un campo obligatorio vacío, entonces el sistema impide continuar y muestra un mensaje de validación.
- Criterio 2: Dado un usuario que intenta avanzar con datos incompletos, cuando presiona continuar, entonces no se genera la orden y se conserva el estado de la pantalla de checkout.

## Casos de prueba seleccionados

### CP-01: Login válido

- ID: CP-01
- Título: Login válido
- Historia/Criterio: HU-1
- Técnica: Partición de equivalencia.
- Prioridad: Alta. Justificación: afecta el acceso principal al sistema y es la ruta base para el resto del flujo.
- Severidad: Crítica. Justificación: si falla, no se puede avanzar a la operación principal ni validar el negocio.
- Precondiciones: Página de SauceDemo accesible.
- Datos: `standard_user` / `secret_sauce`.
- Pasos:
  1. Ingresar a `https://www.saucedemo.com/`.
  2. Llenar usuario y contraseña.
  3. Presionar Login.
- Resultado esperado: Se muestra el ícono de carrito y se accede al inventario.

### CP-02: Login inválido (credenciales incorrectas)

- ID: CP-02
- Título: Login inválido con usuario bloqueado
- Historia/Criterio: HU-1
- Técnica: Partición de equivalencia.
- Prioridad: Media. Justificación: valida un escenario de error relevante, pero no es la ruta principal del negocio.
- Severidad: Alta. Justificación: un acceso bloqueado debe manejarse con claridad para evitar que el usuario entre en estado inválido.
- Precondiciones: Página de SauceDemo accesible.
- Datos: `locked_out_user` / `secret_sauce`.
- Pasos:
  1. Ingresar usuario bloqueado.
  2. Presionar Login.
- Resultado esperado: Se muestra mensaje de error y no se accede al inventario.

### CP-03: Compra E2E exitosa

- ID: CP-03
- Título: Compra E2E exitosa
- Historia/Criterio: HU-2, HU-3
- Técnica: Flujo de usuario / happy path.
- Prioridad: Alta. Justificación: representa la operación central del sistema y el valor de negocio principal.
- Severidad: Crítica. Justificación: si falla, el proceso transaccional principal no se cumple.
- Precondiciones: Login exitoso.
- Datos: `standard_user` / `secret_sauce`, datos de checkout válidos.
- Pasos:
  1. Seleccionar un producto.
  2. Agregar al carrito.
  3. Ir al carrito.
  4. Iniciar checkout.
  5. Completar datos de envío.
  6. Finalizar orden.
- Resultado esperado: Mensaje de orden completada visible.

### CP-04: Checkout con datos obligatorios faltantes

- ID: CP-04
- Título: Checkout con datos obligatorios faltantes
- Historia/Criterio: HU-4
- Técnica: Valores límite / campos obligatorios.
- Prioridad: Media. Justificación: cubre un escenario de negocio importante, pero no es el flujo principal de compra.
- Severidad: Media. Justificación: afecta la validación de datos, pero no rompe todo el proceso si se maneja correctamente.
- Precondiciones: Login exitoso.
- Datos: nombre o apellido vacío.
- Pasos:
  1. Agregar producto al carrito.
  2. Iniciar checkout.
  3. Dejar un campo obligatorio vacío.
  4. Continuar.
- Resultado esperado: Se muestra mensaje de validación de campo obligatorio.

## Matriz de trazabilidad

| HU   | CP    | Test File        | Test Name                                                | Estado |
| ---- | ----- | ---------------- | -------------------------------------------------------- | ------ |
| HU-1 | CP-01 | login.spec.ts    | login exitoso con credenciales válidas                  | ✅     |
| HU-1 | CP-02 | login.spec.ts    | muestra error para usuario bloqueado                     | ✅     |
| HU-2 | CP-03 | checkout.spec.ts | flujo de compra E2E exitoso                              | ✅     |
| HU-3 | CP-03 | checkout.spec.ts | flujo de compra E2E exitoso                              | ✅     |
| HU-4 | CP-04 | checkout.spec.ts | error al continuar checkout con campo obligatorio vacío | ✅     |
