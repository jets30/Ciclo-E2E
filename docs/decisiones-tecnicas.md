# Decisiones Técnicas y Trade-offs

## 1. Alcance automatizado y justificación

- Se automatizaron los puntos del flujo que representan el corazón del negocio: autenticación, acceso al inventario, compra y validación del checkout.
- Se cubrieron 4 casos de alto valor: login válido, login inválido con usuario bloqueado, flujo completo de compra y checkout con datos obligatorios faltantes.
- **Trade-off (explicado)**:
	- Ganancia: una suite corta, estable y fácil de auditar en tiempo limitado.
	- Costo: menor cobertura funcional total en esta iteración.
	- Decisión: priorizar la ruta crítica del negocio y la evidencia reproducible antes de ampliar combinatorias.

## 2. Preparación de datos y setup

- Se usaron datos simples y estables para los casos principales: `standard_user` y `locked_out_user` con la contraseña `secret_sauce`.
- El setup se realizó vía UI porque SauceDemo no expone un endpoint de preparación de estado para este reto y, además, el login y el checkout forman parte del flujo real de negocio.
- **Trade-off (explicado)**:
	- Ganancia: mayor fidelidad al comportamiento real del usuario final.
	- Costo: más tiempo por prueba y mayor dependencia del frontend.
	- Decisión: aceptar ese costo porque el objetivo del reto es E2E de punta a punta y SauceDemo no ofrece API de setup para aislar estado.

## 3. Estrategia para evitar flaky tests en CI

- Se configuró Playwright para correr en modo headless en CI, con un worker por ejecución y reintentos controlados para reducir falsos negativos por estabilidad de navegador.
- Se evitaron esperas fijas y se prefirieron acciones basadas en estado visible de la UI.
- **Trade-off (explicado)**:
	- Ganancia: menos falsos negativos y mayor confianza en resultados de CI.
	- Costo: ejecución más lenta por menor paralelismo y reintentos controlados.
	- Decisión: optimizar primero estabilidad y repetibilidad; rendimiento se mejora después con tuning incremental.

## 4. Localizadores robustos

- Se prefirieron `getByRole`, `getByLabel`, `getByText` y `getByTestId` cuando aplica, en lugar de XPath.
- **Justificación**: los localizadores accesibles son más mantenibles y menos frágiles ante cambios de estructura del DOM.
- **Trade-off (explicado)**:
	- Ganancia: menor fragilidad ante cambios cosméticos del DOM.
	- Costo: en algunos puntos se necesita ajustar selectores por semántica real de la UI.
	- Decisión: mantener prioridad en selectores accesibles y solo usar alternativas más frágiles cuando no haya opción robusta.

## 5. Manejo de usuarios especiales y casos de borde

- Se incluyó el caso de `locked_out_user` como ejemplo de error de negocio y bloqueo de acceso.
- `problem_user` y `performance_glitch_user` quedaron fuera del alcance de esta versión para evitar mezclar validaciones de rendimiento con el objetivo principal del reto.
- **Trade-off (explicado)**:
	- Ganancia: foco en validación funcional principal sin mezclar señales de performance.
	- Costo: quedan huecos de cobertura en comportamientos especiales del SUT.
	- Decisión: documentar explícitamente la exclusión para incorporarla de forma controlada en la siguiente iteración.

## 6. Qué dejaría para una v2

- Añadir más casos de borde y pruebas parametrizadas.
- Incorporar tags de suite como smoke y regression.
- Implementación BDD más completa (features):
	- ampliar cobertura de escenarios en `features/*.feature` para incluir variantes de negocio y validaciones negativas adicionales;
	- refactorizar steps para mayor reutilización (pasos genéricos y menos duplicación);
	- unificar datos de prueba BDD y Playwright con una sola fuente de datos por ambiente;
	- incluir hooks de evidencia más ricos (capturas por hitos y trazabilidad por escenario);
	- definir convención de tags BDD (`@smoke`, `@regression`, `@negative`) y ejecución selectiva por pipeline.
- Ampliar la estrategia de evidencias con más artefactos de auditoría y un video final enlazado en el README.
