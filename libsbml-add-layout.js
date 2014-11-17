var doc4;
var ready4 = false;
var serialized4;
var doc5;

describe("Round-trip", function() {
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

      // enable the layout extension as if starting from scratch
      // following (addLayout.cpp)
      if (doc4.getLevel() == 2) {
        doc4.enablePackage(libsbml.LayoutExtension.getXmlnsL2(), 'layout', true);
      } else if (doc4.getLevel() == 3) {
        doc4.enablePackage(libsbml.LayoutExtension.getXmlnsL3V1V1(), 'layout', true);
      }

      expect(doc4.isPackageEnabled('layout')).toEqual(true);

      expect(doc4.getModel().hasPlugin('layout')).toEqual(true);

      var plugin4 = doc4.getModel().findPlugin('layout').asLayout();

      // create layout
      var layoutns4 = new libsbml.LayoutPkgNamespaces(doc4.getLevel(), doc4.getVersion());
      var layout4 = plugin4.createLayout();

      layout4.setId('Layout_1');
      var dim4 = new libsbml.Dimensions(layoutns4, 400., 220., 0.);
      layout4.setDimensions(dim4);

      // create species glyphs
      expect(layout4.getNumSpeciesGlyphs()).toEqual(0);

      var specglyph = layout4.createSpeciesGlyph();
      specglyph.setId(doc4.getModel().species[0].getId() + '_sglyph');
      specglyph.setSpeciesId(doc4.getModel().species[0].getId());
      specglyph.getBoundingBox().getDimensions().setWidth(40);
      specglyph.getBoundingBox().getDimensions().setHeight(20);

      var specglyph = layout4.createSpeciesGlyph();
      specglyph.setId(doc4.getModel().species[1].getId() + '_sglyph');
      specglyph.setSpeciesId(doc4.getModel().species[1].getId());
      specglyph.getBoundingBox().getDimensions().setWidth(42);
      specglyph.getBoundingBox().getDimensions().setHeight(38);

      var writer4 = new libsbml.SBMLWriter();
      serialized4 = writer4.writeSBMLToString(doc4);
//       console.log('reserialized:');
//       console.log(serialized4);
    });
  });

  it('cleans up resources', function() {
    libsbml.destroy(doc4);
  });

  it('round-trips SBML', function () {
    runs( function() {
      doc5 = reader.readSBMLFromString(serialized4);

      // check reactions
      expect(doc5.getModel().reactions.length).toEqual(5);

      // check layout package
      expect(doc5.isPackageEnabled('layout')).toEqual(true);

      var plugin5 = doc5.getModel().findPlugin('layout').asLayout();

      // check num layouts
      expect(plugin5.getNumLayouts()).toEqual(1);

      var layout5 = plugin5.getLayout(0);

      expect(layout5.getDimensions().getWidth()).toEqual(400.);
      expect(layout5.getDimensions().getHeight()).toEqual(220.);

      // test species glyphs
      expect(layout5.getNumSpeciesGlyphs()).toEqual(2);

      expect(layout5.specglyphs[0].getId()).toEqual(doc5.getModel().species[0].getId() + '_sglyph');
      expect(layout5.specglyphs[0].getSpeciesId()).toEqual(doc5.getModel().species[0].getId());
      expect(layout5.specglyphs[0].getBoundingBox().getDimensions().getWidth()).toEqual(40);
      expect(layout5.specglyphs[0].getBoundingBox().getDimensions().getHeight()).toEqual(20);

      expect(layout5.specglyphs[1].getId()).toEqual(doc5.getModel().species[1].getId() + '_sglyph');
      expect(layout5.specglyphs[1].getSpeciesId()).toEqual(doc5.getModel().species[1].getId());
      expect(layout5.specglyphs[1].getBoundingBox().getDimensions().getWidth()).toEqual(42);
      expect(layout5.specglyphs[1].getBoundingBox().getDimensions().getHeight()).toEqual(38);
    });
  });

  it('cleans up resources', function() {
    libsbml.destroy(doc5);
  });
});