PROJECTS=\
	compatibility-tests/commander.js-run

.PHONY: run-compatibility-tests
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
