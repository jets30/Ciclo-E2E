# Reto QA Automatización Web E2E

## Descripción
Este repositorio contiene una solución al reto técnico de QA Automation Lead. Se eligió el track **Web E2E** usando **Playwright** y el sistema objetivo **SauceDemo**.

## Estructura del repositorio (enfocado)
- `tests/ligo/`: tests focalizados para el reto técnico (flujo E2E sobre SauceDemo).
- `tests/pageobjects/`: objetos de página reutilizables necesarios para el reto.
- `tests/util/`: datos de prueba y utilidades compartidas (evidence, testData).
- `docs/`: documentación del proyecto y diseño de casos.
- `evidencias/`: evidencias de ejecución y reportes.
- `playwright.config.ts`: configuración enfocada a `tests/ligo`.
- `.env.dev` / `.env.qa`: variables de entorno.

## Prerrequisitos
- Node.js 18+ o 20+
- npm
Recommended: use Node 18 LTS. Verify with `node --version`.

## Instalación
```bash
npm install
npm run install:browsers
```

## Ejecución
La suite enfocada al reto se encuentra en `tests/ligo`.

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

## Evidencias (versionadas)
- En este repositorio mantenemos un ejemplo de evidencia versionada en la carpeta `evidencias/` para revisar resultados sin ejecutar la suite.
- Contenido recomendado en `evidencias/`:
	- `evidencias/playwright-report/index.html` — copia del Playwright HTML report de ejemplo.
	- `evidencias/bdd-report.html` — reporte HTML generado por el piloto BDD (si aplica).
	- `evidencias/ui/...` — capturas PNG representativas por prueba/paso.

Cómo regenerar evidencias localmente:
1. Ejecutar la suite Playwright y generar el reporte HTML:
```bash
npm test
npx playwright show-report   # abre el HTML report
```
2. (opcional) Guardar una copia versionada del reporte y capturas:
```bash
mkdir -p evidencias/playwright-report
cp -r playwright-report/* evidencias/playwright-report/
```
3. Ejecutar el piloto BDD y generar su reporte HTML:
```bash
npm run bdd:test
npm run bdd:report
```

Nota: `playwright-report/`, `reports/`, `test-results/`, `traces/` y `videos/` están excluidos por `.gitignore` porque son artefactos de ejecución. Mantener únicamente ejemplos representativos en `evidencias/`.

## Diseño del reto
- Track: Web E2E
- Herramienta: Playwright
- SUT: SauceDemo
- Flujo principal: login -> agregar producto al carrito -> checkout -> verificar mensaje de orden completada.

## Entregables en este repo
- `docs/casos-de-prueba.md`: diseño de casos y trazabilidad.
- `docs/guia-del-proyecto.md`: guía del proyecto y decisiones.
- `tests/ligo/`: suite automatizada enfocada al reto.
- `playwright-report/`: reporte generado por Playwright.
- `evidencias/playwright-report/`: copia del reporte HTML como evidencia versionada.

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
	 - Generar reporte HTML: `npm run bdd:report` → `evidencias/bdd-report.html`

Nota: esto es un piloto: la suite principal sigue siendo `@playwright/test`. Mantuvimos ambas por compatibilidad.

CI y demo:
- Hay un workflow de GitHub Actions en `.github/workflows/ci.yml` que ejecuta Playwright y BDD y publica los artefactos (`playwright-report`, `bdd-evidences`, `test-results`).
- Guion del video de demostración: `docs/video.md`.
