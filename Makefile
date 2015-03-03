PROJECTS=\
	compatibility-tests/commander.js-run \
	compatibility-tests/ejs-run

run-compatibility-tests: ${PROJECTS}

compatibility-tests:
	mkdir -p compatibility-tests

compatibility-tests/commander.js: compatibility-tests
	git clone https://github.com/tj/commander.js.git compatibility-tests/commander.js
	cd compatibility-tests/commander.js \
	&& git checkout v2.6.0 \
	&& npm install \
	&& echo "\n\nRUNNING TESTS WITH THE SHIPPED VERSION OF SHOULD.JS\n\n" \
	&& npm test \
	&& rm -rf node_modules/should \
	&& cd node_modules \
	&& echo "\n\nREPLACING SHOULD WITH SHOULD-BE-UNEXPECTED\n\n" \
	&& ln -s ../../../ should

.PHONY: compatibility-tests/commander.js-run
compatibility-tests/commander.js-run: compatibility-tests/commander.js
	cd compatibility-tests/commander.js ; \
	npm test

compatibility-tests/ejs: compatibility-tests
	git clone https://github.com/tj/ejs.git compatibility-tests/ejs || true
	cd compatibility-tests/ejs \
	&& git checkout 1.0.0 \
	&& sed 's/"should": "\*"/"should": "~3"/' -i package.json \
	&& npm install \
	&& echo "\n\nRUNNING TESTS WITH THE SHIPPED VERSION OF SHOULD.JS\n\n" \
	&& npm test \
	&& rm -rf node_modules/should \
	&& cd node_modules \
	&& echo "\n\nREPLACING SHOULD WITH SHOULD-BE-UNEXPECTED\n\n" \
	&& ln -s ../../../ should

.PHONY: compatibility-tests/ejs-run
compatibility-tests/ejs-run: compatibility-tests/ejs
	cd compatibility-tests/ejs ; \
	npm test
