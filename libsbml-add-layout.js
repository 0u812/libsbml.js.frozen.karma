var doc4;
var ready4 = false;

describe("Basic layout test", function() {
  ready4 = false;
  // load the model asynchronously
  libsbml.load('models/twocompsys-ex.xml', function(result) {
    doc4 = result.doc;
    ready4 = true;
  });

  it('loads SBML', function() {
    waitsFor(function() {
        return ready4;
      }, 'the model to load', 10000);

    runs( function() {
      // read with no errors
      expect(doc4.getNumErrors()).toEqual(0);
      doc4.errors.forEach(function(x) {
        console.log(x.getMessage());
      });

      // check reactions
      expect(doc4.getModel().reactions.length).toEqual(5);

      // check layout package
      expect(doc4.isPackageEnabled('layout')).toEqual(true);

      expect(doc4.getLevel()).not.toBeLessThan(2);
      expect(doc4.getLevel()).not.toBeGreaterThan(3);

      // disable it so we can go through the paces
      if (doc4.getLevel() == 2) {
        doc4.disablePackage(libsbml.LayoutExtension.getXmlnsL2(), 'layout');
      } else if (doc4.getLevel() == 3) {
        doc4.disablePackage(libsbml.LayoutExtension.getXmlnsL3V1V1(), 'layout');
      }

      expect(doc4.isPackageEnabled('layout')).toEqual(false);
    });
  });

  it('cleans up resources', function() {
    libsbml.destroy(doc4);
  });
});