# Guía Personal del Proyecto (Conceptual)

> Uso personal. Este documento es una brújula conceptual para no perder contexto técnico del proyecto.

## 1. Qué es este proyecto
- Objetivo: resolver un reto de QA Automation E2E con trazabilidad y evidencia auditable.
- SUT: SauceDemo.
- Stack principal: Playwright + TypeScript.
- Stack complementario: piloto BDD con Cucumber.

## 2. Cómo está pensado el sistema de pruebas
- La suite principal vive en `tests/SauceDemo/` y representa el flujo crítico del negocio.
- Los pasos UI reutilizables se encapsulan en `tests/pageobjects/` (POM).
- Datos y utilidades comunes viven en `tests/util/`.
- Cucumber es un piloto paralelo para mostrar enfoque BDD, no reemplaza la suite principal.

## 3. Carpeta por carpeta (para qué sirve cada una)
- `tests/SauceDemo/`: tests E2E formales del reto (login y checkout).
- `tests/pageobjects/`: objetos de página (`LoginPage`, `InventoryPage`, `CartPage`, `CheckoutPage`).
- `tests/util/`: configuración de ambiente, captura de evidencia, datos de prueba y logging.
- `features/`: escenarios BDD en Gherkin.
- `features/steps/`: implementación de pasos BDD.
- `features/support/`: hooks y world de Cucumber.
- `docs/`: documentación formal del reto (casos, decisiones, guion).
- `scripts/`: automatizaciones auxiliares (sincronizar reportes, generar reportes, test con log).
- `playwright-report/`: reporte HTML local de Playwright.
- `test-results/`: artefactos técnicos locales (trace, video, screenshots, adjuntos).
- `reports/`: artefactos locales de Cucumber + logs de corrida.
- `evidencias/`: snapshots versionados para revisión externa.

## 4. Flujo operativo (día a día)
- Ejecutar suite principal: `npm test`.
- Ejecutar smoke: `npm run test:smoke`.
- Ejecutar con log persistente: `npm run test:log -- --grep @smoke`.
- Abrir reporte Playwright local: `npm run test:report`.
- Abrir trace puntual: `npx playwright show-trace test-results/<carpeta-test>/trace.zip`.
- Ejecutar BDD: `npm run bdd:test`.
- Generar BDD local HTML: `npm run bdd:report`.

## 5. Flujo de evidencias
- Trabajo local: `playwright-report/`, `test-results/`, `reports/`.
- Publicación versionada: `evidencias/playwright-report` y `evidencias/bdd-report.html`.
- Comando integral: `npm run evidence:refresh`.

## 6. Decisiones técnicas (resumen rápido)
- POM para mantenibilidad y separación de responsabilidades.
- Tests independientes con contexto/página por prueba.
- Localizadores robustos (`getByRole`, `getByText`, etc.).
- Configuración por ambiente usando `.env.*` y helper central.
- Trace habilitado para éxitos y fallos (`trace: 'on'`).

## 7. Alcance actual real
- HU-1: login válido e inválido (usuario bloqueado).
- HU-2: operación principal de compra (add to cart + checkout).
- HU-3: verificación de estado (orden completada).
- HU-4: borde/negativo (campo obligatorio faltante).

## 8. Lo que NO cubre todavía (para recordar)
- Variantes extendidas de usuarios especiales de SauceDemo.
- Más combinaciones de borde parametrizadas.
- Suite de regresión ampliada por catálogo completo.
- Integración de métricas avanzadas de estabilidad.

## 9. Checklist personal antes de cerrar entrega
- README consistente con nombres y rutas actuales.
- `playwright.config.ts` apuntando a `tests/SauceDemo`.
- Reportes locales generados (`playwright-report`, `reports/bdd-report.html`).
- Evidencias versionadas actualizadas cuando corresponda.
- Trazabilidad de casos en `docs/casos-de-prueba.md`.
- Trade-offs actualizados en `docs/decisiones-tecnicas.md`.
