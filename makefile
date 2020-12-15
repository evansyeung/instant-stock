build:
	docker build --tag instant-stock-backend .

clean:
	rm -rf build

make lint:
	npm run lint

make lint-fix:
	npm run lint-fix

run:
	docker run -it --rm -p 8080:8080 --name instant-stock-backend instant-stock-backend
