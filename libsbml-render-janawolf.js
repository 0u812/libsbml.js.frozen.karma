var doc6;
var ready6 = false;

describe("Test of import coverage", function() {
  ready6 = false;
  // load the model asynchronously
  libsbml.load('models/GlycolysisOriginal.xml', function(result) {
    doc6 = result.doc;
    ready6 = true;
  });

  it('loads SBML', function() {
    waitsFor(function() {
        return ready6;
      }, 'the model to load', 10000);

    runs( function() {
      // read with no errors
      expect(doc6.getNumErrors()).toEqual(0);
      doc6.errors.forEach(function(x) {
        console.log(x.getMessage());
      });

      // check reactions
      expect(doc6.getModel().reactions.length).toEqual(11);

      // check plugins
      var caps = new libsbml.Capabilities();
      expect(caps.isLayoutSupported()).toEqual(true);
      expect(caps.isRenderSupported()).toEqual(true);

      expect(doc6.getModel().hasPlugin('layout')).toEqual(true);
      var lplugin6 = doc6.getModel().findPlugin('layout');
      expect(lplugin6).not.toEqual(Module.NULL);
      expect(lplugin6.getPackageName()).toEqual('layout');
      var layoutlplugin6 = lplugin6.asLayout();
      expect(layoutlplugin6.layouts.length).toEqual(1);

      var layout6 = layoutlplugin6.layouts[0];

      var list_of_layouts6 = layoutlplugin6.getListOfLayouts();
      var rplugin6 = list_of_layouts6.getPlugin('render');
//       expect(rplugin6).toEqual(Module.NULL);
      console.log(rplugin6.ptr);
      expect(rplugin6.getPackageName()).toEqual('render');
      var lol6 = rplugin6.asRenderListOfLayoutsPlugin();
    });
  });

  it('cleans up resources', function() {
    libsbml.destroy(doc6);
  });
});