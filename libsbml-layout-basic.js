var doc3;
var ready3 = false;

describe("Basic layout test", function() {
  ready3 = false;
  // load the model asynchronously
  libsbml.load('models/twocompsys-ex.xml', function(result) {
    doc3 = result.doc;
    ready3 = true;
  });

  it('loads SBML', function() {
    waitsFor(function() {
        return ready3;
      }, 'the model to load', 10000);

    runs( function() {
      // read with no errors
      expect(doc3.getNumErrors()).toEqual(0);

      // check reactions
      expect(doc3.getModel().reactions.length).toEqual(5);
    });
  });

  it('cleans up resources', function() {
    libsbml.destroy(doc3);
  });
});