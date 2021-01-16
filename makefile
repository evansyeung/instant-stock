local_secrets.env:
	cp local_secrets.env.template local_secrets.env

init: local_secrets.env
	git config core.hooksPath .githooks

.PHONY: build
build:
	docker-compose build instant-stock

.PHONY: clean
clean:
	rm -rf build

.PHONY: run
run:
	docker-compose up

# ESLint
lint:
	npm run lint

lint-fix:
	npm run lint-fix

# DynamoDB
create-tables:
	npm run create-tables

delete-tables:
	npm run delete-tables

reset-tables:
	npm run reset-tables

insert-items:
	npm run insert-items

run-dynamodb:
	docker-compose up dynamodb
