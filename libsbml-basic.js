var reader;
var doc;
var doneLoadingEmbeddedModel = false;

Module["noExitRuntime"] = true

var loadsbml = function () {
  sbmlstr = " \
<!-- Created by libAntimony version v2.5 on 2014-10-09 21:22 with libSBML version 5.10.0. --> \
<sbml xmlns=\"http://www.sbml.org/sbml/level3/version1/core\" level=\"3\" version=\"1\"> \
  <model id=\"__main\" name=\"__main\"> \
    <listOfCompartments> \
      <compartment sboTerm=\"SBO:0000410\" id=\"default_compartment\" spatialDimensions=\"3\" size=\"1\" constant=\"true\"/> \
    </listOfCompartments> \
    <listOfSpecies> \
      <species id=\"S1\" compartment=\"default_compartment\" initialConcentration=\"1\" hasOnlySubstanceUnits=\"false\" boundaryCondition=\"false\" constant=\"false\"/> \
      <species id=\"S2\" compartment=\"default_compartment\" initialConcentration=\"0\" hasOnlySubstanceUnits=\"false\" boundaryCondition=\"false\" constant=\"false\"/> \
    </listOfSpecies> \
    <listOfParameters> \
      <parameter id=\"k0\" value=\"0.1\" constant=\"true\"/> \
      <parameter id=\"k1\" value=\"1\" constant=\"true\"/> \
      <parameter id=\"n\" value=\"4\" constant=\"true\"/> \
      <parameter id=\"k2\" value=\"0.2\" constant=\"true\"/> \
    </listOfParameters> \
    <listOfReactions> \
      <reaction id=\"_J0\" reversible=\"true\" fast=\"false\"> \
        <listOfProducts> \
          <speciesReference species=\"S1\" stoichiometry=\"1\" constant=\"true\"/> \
        </listOfProducts> \
        <kineticLaw> \
          <math xmlns=\"http://www.w3.org/1998/Math/MathML\"> \
            <ci> k0 </ci> \
          </math> \
        </kineticLaw> \
      </reaction> \
      <reaction id=\"_J1\" reversible=\"true\" fast=\"false\"> \
        <listOfReactants> \
          <speciesReference species=\"S1\" stoichiometry=\"1\" constant=\"true\"/> \
        </listOfReactants> \
        <listOfProducts> \
          <speciesReference species=\"S2\" stoichiometry=\"1\" constant=\"true\"/> \
        </listOfProducts> \
        <kineticLaw> \
          <math xmlns=\"http://www.w3.org/1998/Math/MathML\"> \
            <apply> \
              <divide/> \
              <apply> \
                <times/> \
                <ci> k1 </ci> \
                <ci> S1 </ci> \
              </apply> \
              <apply> \
                <plus/> \
                <cn type=\"integer\"> 1 </cn> \
                <apply> \
                  <power/> \
                  <ci> S1 </ci> \
                  <ci> n </ci> \
                </apply> \
              </apply> \
            </apply> \
          </math> \
        </kineticLaw> \
      </reaction> \
      <reaction id=\"_J2\" reversible=\"true\" fast=\"false\"> \
        <listOfReactants> \
          <speciesReference species=\"S2\" stoichiometry=\"1\" constant=\"true\"/> \
        </listOfReactants> \
        <kineticLaw> \
          <math xmlns=\"http://www.w3.org/1998/Math/MathML\"> \
            <apply> \
              <times/> \
              <ci> k2 </ci> \
              <ci> S2 </ci> \
            </apply> \
          </math> \
        </kineticLaw> \
      </reaction> \
    </listOfReactions> \
  </model> \
</sbml>"

  reader = new libsbml.SBMLReader();
  doc = reader.readSBMLFromString(sbmlstr);
  doneLoadingEmbeddedModel = true;
};

// console.log('begin xmlhttp req section');
// var request = new XMLHttpRequest();
// request.open('get', 'decayModel.xml', true);
// request.responseType = 'text';
// request.onload = function(e) {
//   console.log('async loaded model');
// //         if(xhr.status==200 || xhr.status==0 && xhr.response
// };
// request.onerror = function(e) {
//   console.log('problem');
// };
// request.onprogress = function(e) {
//   if(e.lengthComputable) {
//     console.log(String(e.loaded));
//   }
// };
// console.log('send req');
// request.send(null);
// console.log('post send req');

describe("Basic API tests for libsbml.js", function() {
    it("loads raw SBML", function() {
      runs(function () {
        libsbml.onload(loadsbml);
      });

      waitsFor(function() {
        return doneLoadingEmbeddedModel;
      }, 'the model to load', 10000);

      runs(function() {
        // read with no errors
        expect(doc.getNumErrors()).toEqual(0);

        var model = doc.getModel();

        // three reactions in model
        expect(model.getNumReactions()).toEqual(3);
        expect(model.getReaction(0).getId()).toEqual('_J0');
        expect(model.getReaction(0).getNumReactants()).toEqual(0);
        expect(model.getReaction(1).getId()).toEqual('_J1');
        expect(model.getReaction(1).getNumReactants()).toEqual(1);
        expect(model.getReaction(1).getReactant(0).getSpecies()).toEqual('S1');
        expect(model.getReaction(2).getId()).toEqual('_J2');
        expect(model.getReaction(2).getNumReactants()).toEqual(1);
        expect(model.getReaction(2).getReactant(0).getSpecies()).toEqual('S2');

        // consistency check
        expect(model.reactions.length).toEqual(3);
        expect(model.reactions[0].getId()).toEqual('_J0');
        expect(model.reactions[0].getNumReactants()).toEqual(0);
        expect(model.reactions[1].getId()).toEqual('_J1');
        expect(model.reactions[1].getNumReactants()).toEqual(1);
        expect(model.reactions[1].getReactant(0).getSpecies()).toEqual('S1');
        expect(model.reactions[2].getId()).toEqual('_J2');
        expect(model.reactions[2].getNumReactants()).toEqual(1);
        expect(model.reactions[2].getReactant(0).getSpecies()).toEqual('S2');
      });
      });
});

// function loadmodel() {
//   console.log('1begin xmlhttp req section');
//   var request = new XMLHttpRequest();
//   request.open('get', 'decayModel.xml', true);
//   request.responseType = 'text';
//   request.onload = function(e) {
//     console.log('1async loaded model');
//     console.log('1status ' + String(request.status));
//     if((request.status==200 || request.status==0) && request.response) {
//       console.log(request.response);
//     }
//   };
//   request.onerror = function(e) {
//     console.log('1problem');
//   };
//   request.onprogress = function(e) {
//     if(e.lengthComputable) {
//       console.log(String(e.loaded));
//     }
//   };
//   console.log('1send req');
//   request.send(null);
//   console.log('1post send req');
// }

describe("Decay model test", function() {
//   loadmodel();
  libsbml.load('models/decayModel.xml', function(result) {
//     console.log(result.text);
    console.log('got results');
    var doc = result.doc;
    console.log('num errors: ' + String(doc.getNumErrors()));
    var model = doc.getModel();
    console.log('num rxns: ' + String(model.getNumReactions()));
  });
  it("loads raw SBML", function() {

    waits(4000);
  });
});