/* TODO(emily): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable eol-last, no-unused-vars, no-var, semi, space-after-keywords */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var fs = require("fs");
var assert = require("assert");

var katexA11y = require("../js/katex-a11y");

describe("a11y math", function() {
    var data;

    before(function() {
        var testFile = __dirname + "/katex-a11y-math.txt";
        data = fs.readFileSync(testFile, {encoding: "utf8"}).split("\n");
    });

    it("parses all math", function() {
        data.forEach(function(math) {
            try {
                katexA11y.renderString(math);

                // Successfully rendered a string
                assert(true, math);
            } catch(e) {
                // Hit something that was unknown - this is bad!
                assert(false, math + " " + e)
            }
        });
    });
});

describe("a11y tex", function() {
    var tests;

    before(function() {
        tests = require("./katex-a11y-tex.json");
    });

    it("generates the correct strings", function() {
        var results = [];

        tests.forEach(function(math) {
            var output = katexA11y.renderString(math.input);
            assert.equal(output, math.output, "Parsing " + math.input);
        });
    });
});