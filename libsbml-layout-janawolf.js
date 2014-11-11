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
      expect(doc3.getModel().hasPlugin('layout')).toEqual(true);
      var plugin3 = doc3.getModel().findPlugin('layout');
      expect(plugin3.getPackageName()).toEqual('layout');
      var layoutplugin3 = plugin3.asLayout();
      expect(layoutplugin3.layouts.length).toEqual(1);

      var layout3 = layoutplugin3.layouts[0];

      expect(layout3.compglyphs.length).toEqual(0);
      expect(layout3.specglyphs.length).toEqual(23);
      expect(layout3.specglyphs[0].getId()).toEqual('sGlyph_0');
      expect(layout3.specglyphs[0].getBoundingBox().getPosition().x()).toEqual(280);
      expect(layout3.specglyphs[0].getBoundingBox().getPosition().y()).toEqual(84);
      expect(layout3.specglyphs[0].getBoundingBox().getDimensions().getWidth()).toEqual(54);
      expect(layout3.specglyphs[0].getBoundingBox().width).toEqual(54);
      expect(layout3.specglyphs[0].getBoundingBox().getDimensions().getHeight()).toEqual(24);
      expect(layout3.specglyphs[0].getBoundingBox().height).toEqual(24);
      expect(layout3.specglyphs[0].getBoundingBox().getDimensions().getDepth()).toEqual(0);
      expect(layout3.specglyphs[0].getBoundingBox().depth).toEqual(0);

      expect(layout3.specglyphs[1].getId()).toEqual('sGlyph_1');
      expect(layout3.specglyphs[1].getBoundingBox().getPosition().x()).toEqual(293);
      expect(layout3.specglyphs[1].getBoundingBox().getPosition().y()).toEqual(202);
      expect(layout3.specglyphs[1].getBoundingBox().width).toEqual(150);
      expect(layout3.specglyphs[1].getBoundingBox().height).toEqual(24);
      expect(layout3.specglyphs[1].getBoundingBox().depth).toEqual(0);

      expect(layout3.specglyphs[14].getId()).toEqual('sGlyph_14');
      expect(layout3.specglyphs[14].getBoundingBox().getPosition().x()).toEqual(574);
      expect(layout3.specglyphs[14].getBoundingBox().getPosition().y()).toEqual(777);
      expect(layout3.specglyphs[14].getBoundingBox().width).toEqual(34);
      expect(layout3.specglyphs[14].getBoundingBox().height).toEqual(24);
      expect(layout3.specglyphs[14].getBoundingBox().depth).toEqual(0);

      expect(layout3.specglyphs[15].getId()).toEqual('sGlyph_7_alias_0');
      expect(layout3.specglyphs[15].getBoundingBox().getPosition().x()).toEqual(486);
      expect(layout3.specglyphs[15].getBoundingBox().getPosition().y()).toEqual(530);
      expect(layout3.specglyphs[15].getBoundingBox().width).toEqual(34);
      expect(layout3.specglyphs[15].getBoundingBox().height).toEqual(24);
      expect(layout3.specglyphs[15].getBoundingBox().depth).toEqual(0);

      expect(layout3.specglyphs[16].getId()).toEqual('sGlyph_7_alias_1');
      expect(layout3.specglyphs[16].getBoundingBox().getPosition().x()).toEqual(486);
      expect(layout3.specglyphs[16].getBoundingBox().getPosition().y()).toEqual(415);
      expect(layout3.specglyphs[16].getBoundingBox().width).toEqual(34);
      expect(layout3.specglyphs[16].getBoundingBox().height).toEqual(24);
      expect(layout3.specglyphs[16].getBoundingBox().depth).toEqual(0);

      expect(layout3.specglyphs[layout3.specglyphs.length-1].getId()).toEqual('sGlyph_10_alias_7');
      expect(layout3.specglyphs[layout3.specglyphs.length-1].getBoundingBox().getPosition().x()).toEqual(228);
      expect(layout3.specglyphs[layout3.specglyphs.length-1].getBoundingBox().getPosition().y()).toEqual(397);
      expect(layout3.specglyphs[layout3.specglyphs.length-1].getBoundingBox().width).toEqual(43);
      expect(layout3.specglyphs[layout3.specglyphs.length-1].getBoundingBox().height).toEqual(24);
      expect(layout3.specglyphs[layout3.specglyphs.length-1].getBoundingBox().depth).toEqual(0);
    });
  });

  it('cleans up resources', function() {
    libsbml.destroy(doc3);
  });
});