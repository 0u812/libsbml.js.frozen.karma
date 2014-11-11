var doc3;
var ready3 = false;

describe("Basic layout test", function() {
  ready3 = false;
  // load the model asynchronously
  libsbml.load('models/GlycolysisOriginal.xml', function(result) {
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
      doc3.errors.forEach(function(x) {
        console.log(x.getMessage());
      });

      // check reactions
      expect(doc3.getModel().reactions.length).toEqual(11);

      // check plugins
//       console.log('layout supported:');
//       console.log((new libsbml.Capabilities()).isLayoutSupported());
//       console.log('num plugins:');
//       console.log(doc3.getNumPlugins());
//       console.log('plugins:');
//       doc3.plugins.forEach(function(x) {
//         console.log(x.getPackageName());
//       });
      expect(doc3.hasPlugin('layout')).toEqual(true);
      var layout3 = doc3.findPlugin('layout');
      expect(layout3.getPackageName()).toEqual('layout');
    });
  });

  it('cleans up resources', function() {
    libsbml.destroy(doc3);
  });
});