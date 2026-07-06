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

La suite enfocada al reto se encuentra en `tests/SauceDemo`.

```bash
npm test
```

Ejecutar en modo visible:

```bash
npm run test:headed
```

Abrir el reporte después de la ejecución:

```bash
npm run test:report
```

La evidencia del reporte generado también se copia a `evidencias/playwright-report/index.html`.

Las capturas de UI de cada paso clave se adjuntan al informe HTML de Playwright y están disponibles en los detalles de cada prueba.

## Dónde queda cada artefacto (local)

- `playwright-report/` → reporte HTML de Playwright de la última corrida local.
- `test-results/` → videos, traces, screenshots y adjuntos técnicos de Playwright.
- `reports/cucumber.json` → salida JSON de Cucumber (BDD).
- `reports/bdd-report.html` → reporte HTML BDD de la última corrida local.
- `reports/last-run.log` → log local de corrida generado con `npm run test:log`.

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

Esto deja el HTML en `reports/bdd-report.html`.

3. Flujo completo en un comando:

```bash
npm run evidence:refresh
```

4. Generar log de corrida local en `reports/last-run.log`:

```bash
npm run test:log -- --grep @smoke
```

5. Las capturas, videos, traces y logs de ejecución quedan en artefactos locales (`test-results/`, `playwright-report/`, `reports/`) y no se versionan en `evidencias/`.
6. Trazas Playwright: se generan para ejecuciones exitosas y fallidas. Para abrir una traza:

```bash
npx playwright show-trace test-results/<carpeta-test>/trace.zip
```

Nota: Playwright está configurado con `trace: 'on'` para guardar trazas en éxitos y fallos. Videos y screenshots se conservan en fallos; todo queda en `test-results/`.

Tip: para refrescar toda la evidencia en un solo flujo (Playwright + BDD), usa:

```bash
npm run evidence:refresh
```

Ese comando además publica la versión BDD en `evidencias/bdd-report.html` con `npm run bdd:report:evidence`.

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
- [docs/video.md](docs/video.md): guion de la explicación en video.

## Cobertura del reto técnico

Este repo cubre los puntos clave del PDF:

- 4.1 Diseño de casos y trazabilidad.
- 4.2 Suite automatizada con POM y estructura orientada a Playwright.
- 4.3 Evidencias: reporte HTML, capturas por paso, video/trace y ejemplos versionados.
- 4.4 README ejecutable con instalación, ejecución y alcance.
- Parte 5: decisiones y trade-offs documentados.
- Parte 6: guion del video listo para grabar; agregar el enlace al README cuando esté disponible.

## Video

- El guion de la explicación está en [docs/video.md](docs/video.md).
- Cuando esté grabado, sustituir este marcador por el enlace real del video en el README.

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

1. Ejecutar `npm test`.
2. Revisar reportes y evidencia en `playwright-report/`.
3. Documentar el video en el README.

- Implementé un piloto BDD con Cucumber para dos escenarios clave (login, checkout).
  - Features: `features/*.feature`
  - Step definitions: `features/steps/*.ts`
  - World/hooks: `features/support`
  - Ejecutar BDD: `npm run bdd:test`
  - Generar reporte HTML local: `npm run bdd:report` → `reports/bdd-report.html`
  - Publicar versión de evidencia: `npm run bdd:report:evidence` → `evidencias/bdd-report.html`

Nota: esto es un piloto: la suite principal sigue siendo `@playwright/test`. Mantuvimos ambas por compatibilidad.

CI y demo:

- Hay un workflow de GitHub Actions en `.github/workflows/ci.yml` que ejecuta Playwright y BDD y publica los artefactos (`playwright-report`, `bdd-evidences`, `test-results`).
- Guion del video de demostración: `docs/video.md`.
