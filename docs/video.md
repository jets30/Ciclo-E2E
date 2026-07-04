# Guion del video — Demostración Reto QA Automatización Web E2E

Objetivo: mostrar en 3-5 minutos la solución automatizada para el reto técnico (Web E2E — SauceDemo) incluyendo Playwright tests, evidencia UI integrada y el piloto BDD.

Duración aproximada: 3–5 minutos

Estructura:

1. Introducción (15–20s)
   - Saludo y presentación breve: nombre y objetivo del video.
   - Mencionar el repo y que el reto es `Prueba_Tecnica_QA_Automatizacion_E2E V1.0`.

2. Resumen rápido del proyecto (30s)
   - Explicar stack: `Node.js`, `Playwright Test` y pilot `Cucumber (BDD)`.
   - Mostrar la estructura del repo: `tests/ligo`, `tests/pageobjects`, `tests/util`, `evidencias/`, `features/`.

3. Ejecución de la suite Playwright (40–60s)
   - Ejecutar `npm test` (o `npm run test:headed` para video con UI).
   - Mostrar el terminal ejecutando 4 tests y el reporte HTML generado.
   - Abrir `npx playwright show-report` y navegar a un test, mostrando las capturas paso a paso integradas.

4. Mostrar evidencias versionadas (20s)
   - Navegar a `evidencias/ui/...` y abrir algunas capturas de pasos clave.
   - Abrir `evidencias/playwright-report/index.html` si existe copia.

5. Pilot BDD (Cucumber) (40–60s)
   - Explicar brevemente por qué se añadió BDD como piloto.
   - Ejecutar `npm run bdd:test` (mostrando que corre las features `login` y `checkout`).
   - Ejecutar `npm run bdd:report` y abrir `evidencias/bdd-report.html`.
   - Mostrar que las capturas quedan adjuntas en el reporte y en `evidencias/bdd`.

6. CI (breve) (20s)
   - Indicar que hay un workflow en `.github/workflows/ci.yml` que ejecuta Playwright y BDD y publica artefactos.
   - Mencionar que el informe queda disponible como artefacto del run.

7. Cierre (10–15s)
   - Resumen final: qué se cumplió y dónde está la evidencia.
   - Invitar a revisar el repo y preguntar si quieren migrar más escenarios a BDD o integrar el reporte en un dashboard.

Consejos para grabación
- Grabar en modo headed para las demos de UI (usar `npm run test:headed`).
- Resaltar en pantalla los comandos que se ejecutan.
- Mantener ritmo claro; si algo tarda, acelerarlo o mostrar captura previa para ahorrar tiempo.

Comandos clave para mostrar

```bash
npm install
npm run install:browsers
npm test
npx playwright show-report
npm run bdd:test
npm run bdd:report
```

Archivos a señalar en el repo
- `playwright.config.ts`
- `tests/ligo/` (specs)
- `tests/pageobjects/` (POM)
- `tests/util/evidence.ts` (capturas UI integradas)
- `features/` (BDD pilot)
- `.github/workflows/ci.yml` (CI)
- `evidencias/` (artefactos y reportes)


Muchas gracias — fin del guion.
