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
//       console.log(rplugin7.ptr)
      var layout_render7 = rplugin7.asRenderLayoutPlugin();

      var rinfo7 = layout_render7.createLocalRenderInformation();

      rinfo7.setId('render_info');
      rinfo7.setName('Example Render Information');
      rinfo7.setProgramName('libsbml.js');
      rinfo7.setProgramVersion('0.1.2');

      // add color defs
      var black7 = rinfo7.createColorDefinition();
      black7.setId('black');
      black7.setColorValue('#000000');

      var silver7 = rinfo7.createColorDefinition();
      silver7.setId('silver');
      silver7.setColorValue('#c0c0c0');

      var white7 = rinfo7.createColorDefinition();
      white7.setId('white');
      white7.setColorValue('#FFFFFF');

      // add a gradient
      var lingrad7 = rinfo7.createLinearGradientDefinition();
      lingrad7.setId('simpleGradient');
      lingrad7.setPoint1(libsbml.RelAbsVector(), libsbml.RelAbsVector());

      var writer7 = new libsbml.SBMLWriter();
      serialized7 = writer7.writeSBMLToString(doc7);
//       console.log('reserialized:');
//       console.log(serialized7);
    });
  });

  it('cleans up resources', function() {
    libsbml.destroy(doc7);
  });

  it('round-trips SBML', function () {
    runs( function() {
      doc8 = reader.readSBMLFromString(serialized7);

      // check reactions
      expect(doc8.getModel().reactions.length).toEqual(5);

      // check layout package
      expect(doc8.isPackageEnabled('layout')).toEqual(true);

      var plugin8 = doc8.getModel().findPlugin('layout').asLayout();

      // check num layouts
      expect(plugin8.getNumLayouts()).toEqual(1);

      var layout8 = plugin8.getLayout(0);

      var rplugin8 = layout8.getPlugin('render');
//       console.log(rplugin8.ptr)
      var layout_render8 = rplugin8.asRenderLayoutPlugin();

      expect(layout_render8.getNumLocalRenderInformationObjects()).toEqual(1);

      var render_info8 = layout_render8.getRenderInformation(0);
      expect(render_info8.getId()).toEqual('render_info');
      expect(render_info8.getName()).toEqual('Example Render Information');
      expect(render_info8.getProgramName()).toEqual('libsbml.js');
      expect(render_info8.getProgramVersion()).toEqual('0.1.2');

      // test color def
      expect(render_info8.colors.length).toEqual(3);

      expect(render_info8.colors[0].getId()).toEqual('black');
      expect(render_info8.colors[0].createValueString()).toEqual('#000000');

      expect(render_info8.colors[1].getId()).toEqual('silver');
      expect(render_info8.colors[1].createValueString()).toEqual('#c0c0c0');

      expect(render_info8.colors[2].getId()).toEqual('white');
      expect(render_info8.colors[2].createValueString()).toEqual('#ffffff');

      // test gradient def
      expect(render_info8.gradients[0].getId()).toEqual('simpleGradient');
      expect(Math.abs(render_info8.gradients[0].getXPoint1().r-0)).toBeLessThan(1e-6);
      expect(Math.abs(render_info8.gradients[0].getXPoint1().a)-0).toBeLessThan(1e-6);
      expect(Math.abs(render_info8.gradients[0].getYPoint1().r)-0).toBeLessThan(1e-6);
      expect(Math.abs(render_info8.gradients[0].getYPoint1().a)-0).toBeLessThan(1e-6);
      expect(Math.abs(render_info8.gradients[0].getZPoint1().r)-0).toBeLessThan(1e-6);
      expect(Math.abs(render_info8.gradients[0].getZPoint1().a)-0).toBeLessThan(1e-6);
    });
  });

  it('cleans up resources', function() {
    libsbml.destroy(doc8);
  });
});