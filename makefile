local_secrets.env:
	cp local_secrets.env.template local_secrets.env

init: local_secrets.env
	git config core.hooksPath .githooks

.PHONY: build
build:
	# docker build --tag instant-stock-backend .
	docker-compose build instant-stock

.PHONY: clean
clean:
	rm -rf build

make lint:
	npm run lint

make lint-fix:
	npm run lint-fix

.PHONY: run
run:
	docker-compose up
	# docker run -it --rm -p 8080:8080 --name instant-stock-backend instant-stock-backend
