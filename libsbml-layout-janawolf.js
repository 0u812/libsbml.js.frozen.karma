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

      expect(layout3.rxnglyphs.length).toEqual(11);
      expect(layout3.rxnglyphs[0].getId()).toEqual('rGlyph_0');
      expect(layout3.rxnglyphs[0].getReactionId()).toEqual('J0');
      // meaningless
//       expect(layout3.rxnglyphs[0].getBoundingBox().width).toEqual(0);
      expect(layout3.rxnglyphs[0].specref.length).toEqual(2);
      expect(layout3.rxnglyphs[0].specref[0].isSetCurve()).toEqual(true);
      expect(layout3.rxnglyphs[0].specref[0].getCurve().segments.length).toEqual(1);
      expect(layout3.rxnglyphs[0].specref[0].getCurve().segments[0].isCubicBezier()).toEqual(true);
      expect(layout3.rxnglyphs[0].specref[0].getCurve().segments[0].getStart().x()).toEqual(225);
      expect(layout3.rxnglyphs[0].specref[0].getCurve().segments[0].getStart().y()).toEqual(85.4117647058823);
      expect(layout3.rxnglyphs[0].specref[0].getCurve().segments[0].getEnd().x()).toEqual(273);
      expect(layout3.rxnglyphs[0].specref[0].getCurve().segments[0].getEnd().y()).toEqual(94.2);
      expect(layout3.rxnglyphs[0].specref[0].getCurve().segments[0].getBasePoint1().x()).toEqual(246);
      expect(layout3.rxnglyphs[0].specref[0].getCurve().segments[0].getBasePoint1().y()).toEqual(91);
      expect(layout3.rxnglyphs[0].specref[0].getCurve().segments[0].getBasePoint2().x()).toEqual(247);
      expect(layout3.rxnglyphs[0].specref[0].getCurve().segments[0].getBasePoint2().y()).toEqual(92);

      expect(layout3.rxnglyphs[layout3.rxnglyphs.length-1].getId()).toEqual('rGlyph_10');
      expect(layout3.rxnglyphs[layout3.rxnglyphs.length-1].getReactionId()).toEqual('J10');
      expect(layout3.rxnglyphs[layout3.rxnglyphs.length-1].specref.length).toEqual(2);
      expect(layout3.rxnglyphs[layout3.rxnglyphs.length-1].specref[0].getId()).toEqual('SpeciesReference_J10_0');
      expect(layout3.rxnglyphs[layout3.rxnglyphs.length-1].specref[0].isSetCurve()).toEqual(true);
      expect(layout3.rxnglyphs[layout3.rxnglyphs.length-1].specref[0].getCurve().segments.length).toEqual(1);
      expect(layout3.rxnglyphs[layout3.rxnglyphs.length-1].specref[0].getCurve().segments[0].isCubicBezier()).toEqual(true);
      expect(layout3.rxnglyphs[layout3.rxnglyphs.length-1].specref[0].getCurve().segments[0].getStart().x()).toEqual(518.545454545455);
      expect(layout3.rxnglyphs[layout3.rxnglyphs.length-1].specref[0].getCurve().segments[0].getStart().y()).toEqual(749);
      expect(layout3.rxnglyphs[layout3.rxnglyphs.length-1].specref[0].getCurve().segments[0].getEnd().x()).toEqual(568);
      expect(layout3.rxnglyphs[layout3.rxnglyphs.length-1].specref[0].getCurve().segments[0].getEnd().y()).toEqual(776.491525423729);
      expect(layout3.rxnglyphs[layout3.rxnglyphs.length-1].specref[0].getCurve().segments[0].getBasePoint1().x()).toEqual(532);
      expect(layout3.rxnglyphs[layout3.rxnglyphs.length-1].specref[0].getCurve().segments[0].getBasePoint1().y()).toEqual(756);
      expect(layout3.rxnglyphs[layout3.rxnglyphs.length-1].specref[0].getCurve().segments[0].getBasePoint2().x()).toEqual(532);
      expect(layout3.rxnglyphs[layout3.rxnglyphs.length-1].specref[0].getCurve().segments[0].getBasePoint2().y()).toEqual(756);
    });
  });

  it('cleans up resources', function() {
    libsbml.destroy(doc3);
  });
});