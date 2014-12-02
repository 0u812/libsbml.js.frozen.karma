var doc7;
var ready7 = false;

describe("Add render information", function() {
  ready7 = false;
  // load the model asynchronously
  libsbml.load('models/twocompsys-ex-with-layout-written.xml', function(result) {
    doc7 = result.doc;
    ready7 = true;
  });

  it('loads SBML', function() {
    waitsFor(function() {
        return ready7;
      }, 'the model to load', 10000);

    runs( function() {
      // read with no errors
      expect(doc7.getNumErrors()).toEqual(0);
      doc7.errors.forEach(function(x) {
        console.log(x.getMessage());
      });

      // check reactions
      expect(doc7.getModel().reactions.length).toEqual(5);

      // check capabilities
      var caps = new libsbml.Capabilities();
      expect(caps.isLayoutSupported()).toEqual(true);
      expect(caps.isRenderSupported()).toEqual(true);

      // check layout package
      expect(doc7.isPackageEnabled('layout')).toEqual(true);

      expect(doc7.getLevel()).not.toBeLessThan(2);
      expect(doc7.getLevel()).not.toBeGreaterThan(3);

      expect(doc7.getModel().hasPlugin('layout')).toEqual(true);
      var lplugin7 = doc7.getModel().findPlugin('layout');
      expect(lplugin7).not.toEqual(Module.NULL);
      expect(lplugin7.getPackageName()).toEqual('layout');
      var layoutlplugin7 = lplugin7.asLayout();
      expect(layoutlplugin7.layouts.length).toEqual(1);

      var layout7 = layoutlplugin7.layouts[0];

      if(doc.getLevel() == 2) {
        doc7.enablePackage(libsbml.RenderExtension.getXmlnsL2(), 'render', true);
      } else {
        doc7.enablePackage(libsbml.RenderExtension.getXmlnsL3V1V1(), 'render', true);
      }

      doc7.setPackageRequired('render', false);

      // get the render plugin
      var rplugin7 = layout7.getPlugin('render');
      console.log(rplugin7.ptr)
      var layout_render7 = rplugin7.asRenderLayoutPlugin();

      var rinfo7 = layout_render7.createLocalRenderInformation();
    });
  });

  it('cleans up resources', function() {
    libsbml.destroy(doc7);
  });
});