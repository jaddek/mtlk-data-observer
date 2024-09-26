COMPOSE_FILE=docker-compose.yml

up:
	docker compose -f $(COMPOSE_FILE) up -d --build

down:
	docker compose -f $(COMPOSE_FILE) down

ps:
	docker compose -f $(COMPOSE_FILE) ps

restart: down up

logs:
	docker compose -f $(COMPOSE_FILE) logs -f

reinit:
	docker exec -it mongodb mongosh -u root -p example --authenticationDatabase admin metlink /docker-entrypoint-initdb.d/mongo-init.js

.PHONY: up down restart logs shell