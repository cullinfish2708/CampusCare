# Final preparation and QA status

## Verified in the preparation environment

- DOCX report rendered to 12 PDF pages; all report pages were visually reviewed for layout and pagination.
- PowerPoint presentation has 8 slides; every slide rendered and the slide overflow test passed.
- JavaScript API module and Vite configuration passed Node syntax checks.
- Frontend JSX files passed the available TypeScript parser check (`tsc --noEmit` with JS/JSX enabled).
- Both Maven `pom.xml` files parsed as valid XML.
- Docker Compose file parsed as valid YAML.
- Postman collection parsed as valid JSON.

## Not executed in the preparation environment

The current environment does not have Maven or Docker installed. The npm dependency installation attempt timed out. Therefore:

- Maven compile/test results are **not verified**.
- Vite production build is **not verified**.
- Docker image build, compose startup, and live HTTP integration are **not verified**.
- No public GitHub repository or cloud deployment was created.

Run all commands in `README.md` and `docs/DEPLOYMENT.md` on a machine with the listed prerequisites before describing the application as runtime-tested or publicly deployed.

## Submission items to personalise

1. Confirm the team has been allocated Problem Statement 1 and obtain faculty approval for the scope.
2. Replace the member names, register numbers, roles and actual contributions in `TEAM_DETAILS_TEMPLATE.md` and the report.
3. Capture real screenshots from the running application; `docs/UI_WIREFRAMES.svg` is a design wireframe, not a runtime screenshot.
4. Add a real GitHub URL and deployment URL only after publishing.
5. Use synthetic/authorised demo data. Authentication and role-based access control must be added before any real campus use.
