var doc2;
var doneLoadingEmbeddedModel = false;
var ready2 = false;

Module["noExitRuntime"] = true;

describe("Decay model test", function() {
  ready2 = false;
  // load the model asynchronously
  libsbml.load('models/BIOMD0000000012.xml', function(result) {
    doc2 = result.doc;
    ready2 = true;
  });

  it('loads SBML', function() {
    waitsFor(function() {
        return ready2;
      }, 'the model to load', 10000);

    runs( function() {
      // read with no errors
      expect(doc.getNumErrors()).toEqual(0);

      // num reactions
      expect(doc2.getModel().reactions.length).toEqual(12);

      // Reaction4 (has modifiers)
      expect(doc2.getModel().reactions[3].getId()).toEqual('Reaction4');
      expect(doc2.getModel().reactions[3].getMetaId()).toEqual('_905882');
      expect(doc2.getModel().reactions[3].isSetReversible()).toEqual(true);
      expect(doc2.getModel().reactions[3].getReversible()).toEqual(false);
      expect(doc2.getModel().reactions[3].getSBOTerm()).toEqual(184);
      expect(doc2.getModel().reactions[3].getName()).toEqual('translation of LacI');
      expect(doc2.getModel().reactions[3].modifiers.length).toEqual(1);
      expect(doc2.getModel().reactions[3].modifiers[0].getSpecies()).toEqual('X');
      expect(doc2.getModel().reactions[3].modifiers[0].getMetaId()).toEqual('_421064');
      expect(doc2.getModel().reactions[3].modifiers[0].getSBOTerm()).toEqual(461);
    });
  });

  it('cleans up resources', function() {
    libsbml.destroy(doc);
  });
});