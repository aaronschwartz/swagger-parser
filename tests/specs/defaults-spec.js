describe('parser.defaults tests', function() {
  'use strict';

  afterEach(function() {
    // Reset defaults
    parser.defaults.parseYaml = true;
  });


  it('should be initialized with the default values',
    function() {
      expect(parser.defaults.parseYaml).to.equal(true);
      expect(parser.defaults.dereferencePointers).to.equal(true);
      expect(parser.defaults.dereferenceExternalPointers).to.equal(true);
      expect(parser.defaults.validateSpec).to.equal(true);
    }
  );

  it('should use modified defaults when parsing',
    function(done) {
      // Disable YAML parsing by default
      parser.defaults.parseYaml = false;

      // Which means this call should fail
      parser.parse(filePath('minimal.yaml'), function(err, swagger) {
        expect(err).to.be.an.instanceOf(SyntaxError);
        expect(err.message).to.match(/(Unexpected token|unexpected character|Unexpected identifier)/);
        expect(swagger).to.be.undefined;

        done();
      });
    }
  );

  it('should override defaults with options when parsing',
    function(done) {
      // Disable YAML parsing by default
      parser.defaults.parseYaml = false;

      // Enable YAML parsing in the parse options
      var options = { parseYaml: true };

      // This call should succeed, because options override defaults
      parser.parse(filePath('minimal.yaml'), options, function(err, swagger) {
        expect(err).to.be.null;
        expect(swagger).to.be.an('object');

        done();
      });
    }
  );

});