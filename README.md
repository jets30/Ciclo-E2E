# Reto QA Automatización Web E2E

## Descripción

Este repositorio contiene una solución al reto técnico de QA Automation Lead. Se eligió el track **Web E2E** usando **Playwright** y el sistema objetivo **SauceDemo**.

## Estructura del repositorio (enfocado)

- `tests/SauceDemo/`: tests focalizados para el reto técnico (flujo E2E sobre SauceDemo).
- `tests/pageobjects/`: objetos de página reutilizables necesarios para el reto.
- `tests/util/`: datos de prueba y utilidades compartidas (evidence, testData).
- `docs/`: documentación del proyecto y diseño de casos.
- `evidencias/`: evidencias de ejecución y reportes.
- `playwright.config.ts`: configuración enfocada a `tests/SauceDemo`.
- `.env.dev` / `.env.qa`: variables de entorno.

## Prerrequisitos

- Node.js 18+ o 20+
- npm 9+
- Playwright 1.60+
  Recommended: use Node 18 LTS. Verify with `node --version`.

## Instalación

```bash
npm install
npm run install:browsers
```

## Ejecución

La suite principal (no BDD) está en `tests/SauceDemo`.

### Playwright (no BDD)

Estrategia de tags aplicada:

- `@smoke`: solo flujo crítico positivo (login exitoso y checkout exitoso).
- `@regression`: cobertura completa (positivos + negativos).

Ejecutar todos los tests Playwright:

```bash
npm test
```

Ejecutar todos los tests en modo visible (headed):

```bash
npm run test:headed
```

Ejecutar por tag:

```bash
npm run test:smoke
npm run test:regression
```

También puedes filtrar por grep manual:

```bash
npx playwright test --grep "@smoke"
npx playwright test --grep "@regression"
```

Ejecutar un único test por nombre exacto:

```bash
npx playwright test --grep "flujo de compra E2E exitoso"
```

Ejecutar un archivo de test específico:

```bash
npx playwright test tests/SauceDemo/login.spec.ts
npx playwright test tests/SauceDemo/checkout.spec.ts
```

Ejecutar un test específico por nombre:

```bash
npx playwright test --grep "login exitoso con credenciales válidas"
```

### BDD (Cucumber)

Ejecutar todos los escenarios BDD:

```bash
npm run bdd:test
```

Ejecutar un feature específico:

```bash
npx cucumber-js --require-module ts-node/register --require features/**/*.ts --format json:artifacts/bdd-reports/cucumber.json features/login.feature
```

Ejecutar BDD por tag:

```bash
npm run bdd:smoke
npm run bdd:regression
```

Generar el reporte HTML BDD local:

```bash
npm run bdd:report
```

Publicar reporte BDD en evidencias versionadas:

```bash
npm run bdd:report:evidence
```

### Logs de corrida

Generar log local de una corrida Playwright:

```bash
npm run test:log -- --grep @smoke
```

Salida esperada: `artifacts/test-results/last-run.log`.

Comportamiento por default:

- El log de consola **no** se guarda automáticamente con `npm test`.
- Para persistir el log en archivo debes usar `npm run test:log`.

### Reportes

Abrir el reporte Playwright después de una ejecución:

```bash
npm run test:report
```

Sincronizar el reporte Playwright a evidencias versionadas:

```bash
npm run evidence:sync
```

Refrescar todas las evidencias en un flujo (Playwright + BDD):

```bash
npm run evidence:refresh
```

### Trace (ejecuciones exitosas y fallidas)

Playwright está configurado con `trace: 'on'`, por lo que genera trazas en éxitos y fallos.

Comportamiento por default:

- El trace **sí** se genera automáticamente cuando ejecutas `npm test` o cualquier comando Playwright de la suite.
- No necesitas un comando extra para generar trace; solo para abrirlo (`npx playwright show-trace ...`).

Abrir un trace específico:

```bash
npx playwright show-trace artifacts/test-results/<carpeta-test>/trace.zip
```

Ejemplo:

```bash
npx playwright show-trace artifacts/test-results/checkout-SauceDemo-Checkou-973cf-2E-exitoso-smoke-regression-chromium/trace.zip
```

### Dónde queda cada artefacto (local)

- `artifacts/playwright-report/` → reporte HTML de Playwright de la última corrida local.
- `artifacts/test-results/` → videos, traces, screenshots y adjuntos técnicos de Playwright.
- `artifacts/bdd-reports/cucumber.json` → salida JSON de Cucumber (BDD).
- `artifacts/bdd-reports/bdd-report.html` → reporte HTML BDD de la última corrida local.
- `artifacts/test-results/last-run.log` → log local de corrida Playwright generado con `npm run test:log`.

Nota: `features/` (BDD) es un track adicional separado de la suite principal en `tests/SauceDemo` y se mantiene como base para una evolución v2.

Nota: `evidencias/` es solo para ejemplos versionados de entrega (no para trabajo diario).

## Evidencias (versionadas)

- En este repositorio ya existe evidencia versionada en la carpeta `evidencias/` para revisar resultados sin volver a ejecutar la suite.
- Estructura recomendada y visible en el repo:

```text
evidencias/
├─ bdd-report.html
├─ playwright-report/
│  ├─ index.html
│  └─ data/...
```

- Qué revisar primero (sin ejecutar tests):
  - `evidencias/playwright-report/index.html` — reporte Playwright navegable con sus assets en `evidencias/playwright-report/data/`.
  - `evidencias/bdd-report.html` — reporte HTML del piloto BDD con screenshots embebidas.

Cómo regenerar evidencias localmente:

1. Generar y versionar reporte Playwright completo (index + data):

```bash
npm test
npm run evidence:sync
```

2. Regenerar reporte BDD con screenshots embebidas:

```bash
npm run bdd:test
npm run bdd:report
```

Esto deja el HTML en `artifacts/bdd-reports/bdd-report.html`.

3. Flujo completo en un comando:

```bash
npm run evidence:refresh
```

4. Este flujo además publica la versión BDD en `evidencias/bdd-report.html` usando `npm run bdd:report:evidence`.

Nota: los logs de ejecución Playwright se generan en `artifacts/test-results/` y los artefactos BDD en `artifacts/bdd-reports/`; en `evidencias/` solo se versionan los reportes de entrega.

## Diseño del reto

- Track: Web E2E
- Herramienta: Playwright
- SUT: SauceDemo
- Flujo principal: login -> agregar producto al carrito -> checkout -> verificar mensaje de orden completada.

## Entregables en este repo

- [docs/casos-de-prueba.md](docs/casos-de-prueba.md): diseño de casos, criterios de aceptación y matriz de trazabilidad.
- [docs/decisiones-tecnicas.md](docs/decisiones-tecnicas.md): decisiones de arquitectura, alcance y trade-offs del reto.
- [tests/SauceDemo](tests/SauceDemo): suite automatizada enfocada al reto.
- [evidencias](evidencias): ejemplos de reportes, capturas y artefactos generados.

## Cobertura del reto técnico

Este repo cubre los puntos clave del PDF:

- 4.1 Diseño de casos y trazabilidad.
- 4.2 Suite automatizada con POM y estructura orientada a Playwright.
- 4.3 Evidencias: reporte HTML, capturas por paso, video/trace y ejemplos versionados.
- 4.4 README ejecutable con instalación, ejecución y alcance.
- Parte 5: decisiones y trade-offs documentados.
- Parte 6: guion del video listo para grabar; agregar el enlace al README cuando esté disponible.

## Video

- Video de la demostración (8-15 min):
  - https://drive.google.com/file/d/1BzOCWgT4kbXms09DcrqE21m-Iz4mIWkh/view?usp=sharing

## Checklist de entrega

- [X] Repo público en GitHub con la suite, el README y las evidencias de ejemplo.
- [X] Documento de diseño de casos + matriz de trazabilidad.
- [X] Suite que corre en cualquier orden y genera reporte/evidencias.
- [X] Link al video en el README.
- [X] (Opcional) Pipeline CI.

## Decisiones clave

- Se prioriza calidad y trazabilidad sobre cantidad de tests.
- Se usa POM para encapsular acciones y mejorar mantenibilidad.
- Se externalizan datos de prueba mediante `env` para soportar múltiples ambientes.
- Se usan localizadores accesibles y robustos con `getByRole`.

## Alcance inicial

- HU-1: validación de login correcto e incorrecto.
- HU-2: compra de producto y checkout exitoso.
- HU-3: verificación de orden completada.
- HU-4: manejo de datos faltantes en el checkout.

## Siguientes pasos

1. Validar periódicamente que los artefactos de ejemplo en `evidencias/` estén actualizados.
2. Ejecutar `npm run evidence:refresh` antes de la entrega para actualizar reportes versionados.
3. Mantener la suite BDD como piloto complementario y ampliar cobertura en una v2.

CI y demo:

- Hay un workflow de GitHub Actions en `.github/workflows/ci.yml` que ejecuta Playwright y BDD y publica los artefactos (`playwright-report`, `bdd-evidences`, `test-results`).
- Guion del video de demostración: `docs/video.md`.
