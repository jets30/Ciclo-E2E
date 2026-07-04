# Casos de Prueba y Trazabilidad

## Historias de usuario
- HU-1: Autenticación de usuarios.
- HU-2: Operación principal de compra.
- HU-3: Verificación del estado de la orden.
- HU-4: Casos negativos y de borde.

## Casos de prueba seleccionados

### CP-01: Login válido
- Historia: HU-1
- Técnica: Partición de equivalencia.
- Prioridad: Alta.
- Severidad: Crítica.
- Precondiciones: Página de SauceDemo accesible.
- Datos: `standard_user` / `secret_sauce`.
- Pasos:
  1. Ingresar a `https://www.saucedemo.com/`.
  2. Llenar usuario y contraseña.
  3. Presionar Login.
- Resultado esperado: Se muestra el ícono de carrito y se accede al inventario.

### CP-02: Login inválido (credenciales incorrectas)
- Historia: HU-1
- Técnica: Partición de equivalencia.
- Prioridad: Media.
- Severidad: Alta.
- Precondiciones: Página de SauceDemo accesible.
- Datos: `locked_out_user` / `secret_sauce`.
- Pasos:
  1. Ingresar usuario bloqueado.
  2. Presionar Login.
- Resultado esperado: Se muestra mensaje de error y no se accede al inventario.

### CP-03: Compra E2E exitosa
- Historia: HU-2, HU-3
- Técnica: Flujo de usuario / happy path.
- Prioridad: Alta.
- Severidad: Crítica.
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
- Historia: HU-4
- Técnica: Valores límite / campos obligatorios.
- Prioridad: Media.
- Severidad: Media.
- Precondiciones: Login exitoso.
- Datos: nombre o apellido vacío.
- Pasos:
  1. Agregar producto al carrito.
  2. Iniciar checkout.
  3. Dejar un campo obligatorio vacío.
  4. Continuar.
- Resultado esperado: Se muestra mensaje de validación de campo obligatorio.

## Matriz de trazabilidad
- HU-1 -> CP-01, CP-02 -> tests/login.spec.ts
- HU-2 -> CP-03 -> tests/checkout.spec.ts
- HU-3 -> CP-03 -> tests/checkout.spec.ts
- HU-4 -> CP-04 -> tests/checkout.spec.ts
