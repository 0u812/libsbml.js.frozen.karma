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
      var rgplugin6 = list_of_layouts6.getPlugin('render');

      expect(rgplugin6.getPackageName()).toEqual('render');
      var lol6 = rgplugin6.asRenderListOfLayoutsPlugin();

      // render info is local in this model
      expect(lol6.getNumGlobalRenderInformationObjects()).toEqual(0);

      var rplugin6 = layout6.getPlugin('render');
      expect(rplugin6.getPackageName()).toEqual('render');
      var layout_render6 = rplugin6.asRenderLayoutPlugin();

      expect(layout_render6.getNumLocalRenderInformationObjects()).toEqual(1);

      var render_info6 = layout_render6.getRenderInformation(0);

      expect(render_info6.getId()).toEqual('ConvertedRenderStyle');
      expect(render_info6.getName()).toEqual('');
      expect(render_info6.getProgramVersion()).toEqual('2.7.5121.21120 Compiled on: 1/9/2014 11:44:00 AM');
      expect(render_info6.getBackgroundColor()).toEqual('#FFFFFFFF');

      // test color definitions
      expect(render_info6.colors.length).toEqual(8);
      expect(render_info6.colors[0].getId()).toEqual('Color_0');
      expect(render_info6.colors[0].createValueString()).toEqual('#969696');
      expect(render_info6.colors[1].getId()).toEqual('Color_1');
      expect(render_info6.colors[1].createValueString()).toEqual('#ff7faa');
      expect(render_info6.colors[7].getId()).toEqual('Color_7');
      expect(render_info6.colors[7].createValueString()).toEqual('#ff9900');
    });
  });

  it('cleans up resources', function() {
    libsbml.destroy(doc6);
  });
});