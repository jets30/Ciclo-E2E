# Guía del Proyecto: Reto QA Automatización Web E2E

## 1. Propósito
Este proyecto está orientado a cumplir el reto técnico de QA Automation Lead en el track de **Web E2E**. La implementación se basa en **Playwright** y el sistema objetivo será **SauceDemo**.

## 2. Elección del track
- Track elegido: **Web E2E**
- Herramienta: **Playwright**
- SUT estimado: **https://www.saucedemo.com/**

### Por qué esta elección
- El repositorio ya tiene Playwright configurado y tests existentes en `tests/`.
- SauceDemo es un SUT público, estable y adecuado para flujos de e-commerce.
- Permite demostrar patrones de automatización, diseño de pruebas y evidencias visuales.
- Es factible en pocas horas con un alcance limpio y ordenado.

## 3. Qué se evaluará
Los puntos del reto técnico que se alinean con el proyecto son:
- Dominio de herramienta: uso real de Playwright.
- Patrones de automatización: POM (Page Object Model) y estructura clara.
- Metodología: independencia de tests, manejo de esperas y localizadores robustos.
- Diseño de casos: técnica aplicada, priorización y trazabilidad.
- Ciclo E2E: diseño → implementación → ejecución → reporte.
- Evidencias: reportes, screenshots, traces/videos y logs.
- Criterio técnico: decisiones justificadas y trade-offs claros.

## 4. Estado actual del repositorio
### Archivos clave
- `package.json`: dependencias `@playwright/test`, TypeScript, dotenv.
- `playwright.config.ts`: configuración de Playwright, proyectos Chrome, reporter HTML.
- `tests/`: contiene varios `*.spec.ts`, incluyendo `saucedemo1.spec.ts` y `testPOMCarritoDeCompras.spec.ts`.
- `tests/pageobjects/LoginPage.ts`: página de login con acciones encapsuladas.
- `.env.dev`, `.env.qa`: variables de entorno de URL.

### Observaciones
- Hay una base de POM, pero la suite puede mejorar con más páginas y un flujo centralizado.
- Faltan documentos de diseño de casos y trazabilidad.
- Faltan evidencias versionadas en el repo como `evidencias/`.
- No hay README con instrucciones claras de ejecución.

## 5. Casos y flujo planeado
### Historias adaptadas al SUT SauceDemo
- HU-1 Autenticación: login válido y login inválido.
- HU-2 Operación principal: buscar producto, agregar al carrito y checkout.
- HU-3 Verificación de estado: orden completada y detalles del carrito.
- HU-4 Casos negativos: campos obligatorios faltantes en checkout y usuario bloqueado.

### Alcance inicial
- Implementar un flujo E2E central con un producto y checkout completo.
- Incluir al menos un caso negativo de login y un caso negativo de checkout.
- Externalizar datos de prueba y usar localizadores por rol / test id.

## 6. Entregables planificados
- `docs/casos-de-prueba.md`: documento de diseño y trazabilidad.
- Suite automatizada en `tests/` usando Playwright.
- Evidencias: reporte HTML y capturas example en `playwright-report/` o `evidencias/`.
- `README.md`: instrucciones de instalación y ejecución.
- `docs/guia-del-proyecto.md`: este documento de guía adicional.

## 7. Arquitectura propuesta
### Estructura de carpetas
- `tests/`: archivos de prueba.
- `tests/pageobjects/`: clases de página reutilizables.
- `tests/util/`: datos de prueba y utilidades.
- `docs/`: documentación de diseño y guía.
- `evidencias/`: ejemplos de capturas, reportes y traces.

### POM recomendado
- `LoginPage.ts`
- `InventoryPage.ts`
- `CartPage.ts`
- `CheckoutPage.ts`

## 8. Cómo ejecutar hoy
```bash
npm install
npx playwright install
npx playwright test
```

## 9. Próximos pasos
1. Consolidar los casos de prueba en `docs/casos-de-prueba.md`.
2. Refactorizar la suite para usar POM en `tests/pageobjects/`.
3. Crear un archivo de pruebas E2E principal con el flujo SauceDemo.
4. Añadir evidencia de ejemplo y mejorar el `README.md`.
5. Documentar decisiones clave y trade-offs en el README y guía.

## 10. Notas importantes
- La solución prioriza calidad sobre cantidad de tests.
- Se buscará que cada test sea independiente y robusto.
- El proyecto local se puede convertir después en repo público para la entrega.
