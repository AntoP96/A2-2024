# Game-Repository  
![Coverage](https://img.shields.io/badge/Coverage-47.1%25-yellow)
<br>
![BuildStatus](https://github.com/alarmfox/game-repository/actions/workflows/go.yml/badge.svg) ![Go Report Card](https://goreportcard.com/badge/github.com/alarmfox/game-repository)
<br>

## Documentation
Documentation is in `docs/documentazione.pdf`.<br>
Visual paradigm project is in `docs/progetto.vpp` .<br>
A usage guide is available at https://testing-game-sad-2023.github.io/T4-G18/
## Live demo
A live demo is available on https://sad.capass.org

## Configuring Grafana and Prometheus
1. Navigate to the page http://localhost:3300 and log in with the credentials `admin` `admin` (skip the password change).
2. Click on `add data source` on the `home` page.
3. From the list, select `Prometheus`, enter the URL: `http://prometheus:9090`, and click `Save and Test` at the bottom of the page.
4. Click on the three dots in the top left corner and go to the `dashboard` page, then click on `Create Dashboard`.
5. Click on `Import dashboard` and then on `Upload dashboard JSON file`.
6. Upload the file `dashboard_grafana.json` located in the project folder `/T4-G18`.

## Swagger UI API Documentation
http://localhost:3000/docs