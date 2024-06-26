.PHONY: install
install:
	npm install

.PHONY: install_all
install_all:
	npm run install-all

.PHONY: setup_husky
setup_husky:
	npm run prepare

.PHONY: build
build:
	npm run build

.PHONY: clean
clean:
	npm run clean

.PHONY: test
test:
	npm run test

.PHONY: test_coverage
test_coverage:
	npm run test:coverage

.PHONY: test_debug
test_debug:
	npm run test:debug

.PHONY: test_watch
test_watch:
	npm run test:watch

.PHONY: lint
lint:
	npm run lint

.PHONY: lint_text
lint_text:
	npm run lint:text

.PHONY: format
format:
	npm run format

.PHONY: format_check
format_check:
	npm run format:check

.PHONY: before_commit
before_commit: test format lint

.PHONY: start_frontend
start_frontend:
	cd frontend && npm start

.PHONY: start_backend
start_backend:
	cd backend && npm start

.PHONY: start
start:
	npx concurrently "make start_backend" "make start_frontend"
