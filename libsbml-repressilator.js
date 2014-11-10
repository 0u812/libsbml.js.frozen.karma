var doc2;
var ready2 = false;

describe("Repressilator model test", function() {
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
      expect(doc2.getNumErrors()).toEqual(0);

      // check reactions
      expect(doc2.getModel().reactions.length).toEqual(12);

      expect(doc2.getModel().compartments.length).toEqual(1);
      expect(doc2.getModel().compartments[0].getId()).toEqual('cell');
      expect(doc2.getModel().compartments[0].getMetaId()).toEqual('_000002');
      expect(doc2.getModel().compartments[0].getSBOTerm()).toEqual(290);
      expect(doc2.getModel().compartments[0].getSize()).toEqual(1);

      // ** Reaction4 (has modifiers) **
      expect(doc2.getModel().reactions[3].getId()).toEqual('Reaction4');
      expect(doc2.getModel().reactions[3].getMetaId()).toEqual('_905882');
      expect(doc2.getModel().reactions[3].isSetReversible()).toEqual(true);
      expect(doc2.getModel().reactions[3].getReversible()).toEqual(false);
      expect(doc2.getModel().reactions[3].getSBOTerm()).toEqual(184);
      expect(doc2.getModel().reactions[3].getName()).toEqual('translation of LacI');
      // reactants
      expect(doc2.getModel().reactions[3].reactants.length).toEqual(0);
      // modifiers
      expect(doc2.getModel().reactions[3].modifiers.length).toEqual(1);
      expect(doc2.getModel().reactions[3].modifiers[0].getSpecies()).toEqual('X');
      expect(doc2.getModel().reactions[3].modifiers[0].getMetaId()).toEqual('_421064');
      expect(doc2.getModel().reactions[3].modifiers[0].isSetSBOTerm()).toEqual(true);
      expect(doc2.getModel().reactions[3].modifiers[0].getSBOTerm()).toEqual(461);
      expect(doc2.getModel().reactions[3].modifiers[0].findSpecies().getId()).toEqual('X');
      expect(doc2.getModel().reactions[3].modifiers[0].findSpecies().getCompartment()).toEqual('cell');
      // products
      expect(doc2.getModel().reactions[3].products.length).toEqual(1);
      expect(doc2.getModel().reactions[3].products[0].getSpecies()).toEqual('PX');
      expect(doc2.getModel().reactions[3].products[0].getMetaId()).toEqual('_421051');
      expect(doc2.getModel().reactions[3].products[0].isSetSBOTerm()).toEqual(false);
      expect(doc2.getModel().reactions[3].products[0].findSpecies().getId()).toEqual('PX');
      expect(doc2.getModel().reactions[3].products[0].findSpecies().isSetInitialAmount()).toEqual(true);
      expect(doc2.getModel().reactions[3].products[0].findSpecies().isSetInitialConcentration()).toEqual(false);
      expect(doc2.getModel().reactions[3].products[0].findSpecies().isSetHasOnlySubstanceUnits()).toEqual(true);
      expect(doc2.getModel().reactions[3].products[0].findSpecies().getHasOnlySubstanceUnits()).toEqual(true);

//       console.log('find spec');
//       console.log(doc2.getModel().findSpecies('PX').getId());
//       console.log(doc2.getModel().reactions[3].products[0].getModel().findSpecies('PX').getId());
//       console.log(doc2.getModel().reactions[3].products[0].findSpecies().getId());
//       console.log(doc2.getModel().reactions[3].modifiers[0].findSpecies().getId());

      // ** Assignment rules **

      // check properties
      expect(doc2.getModel().getNumRules()).toEqual(9);
      console.log(doc2.getModel().rules[0].getMetaId());
      console.log(doc2.getModel().rules[0].isAssignment());
      expect(doc2.getModel().rules[0].isAssignment()).toEqual(true);
      expect(doc2.getModel().rules[0].asAssignmentRule().getVariable()).toEqual('t_ave');
      expect(doc2.getModel().rules[0].asAssignmentRule().getMetaId()).toEqual('metaid_0500035');

      // check AST
      expect(doc2.getModel().rules[0].asAssignmentRule().getMath().getType()).toBe(libsbml.AST_DIVIDE);
      expect(doc2.getModel().rules[0].asAssignmentRule().getMath().children.length).toEqual(2);
      expect(doc2.getModel().rules[0].asAssignmentRule().getMath().children[0].getType()).toBe(libsbml.AST_NAME);
      expect(doc2.getModel().rules[0].asAssignmentRule().getMath().children[0].getName()).toEqual('tau_mRNA');
      expect(doc2.getModel().rules[0].asAssignmentRule().getMath().children[1].getType()).toBe(libsbml.AST_FUNCTION_LN);
      expect(doc2.getModel().rules[0].asAssignmentRule().getMath().children[1].children.length).toEqual(1);
      expect(doc2.getModel().rules[0].asAssignmentRule().getMath().children[1].children[0].getType()).toBe(libsbml.AST_REAL);

      expect(doc2.getModel().rules[1].isAssignment()).toEqual(true);
      expect(doc2.getModel().rules[1].asAssignmentRule().getVariable()).toEqual('beta');
      expect(doc2.getModel().rules[1].asAssignmentRule().getMetaId()).toEqual('metaid_0240045');

      expect(doc2.getModel().rules[2].isAssignment()).toEqual(true);
      expect(doc2.getModel().rules[2].asAssignmentRule().getVariable()).toEqual('k_tl');
      expect(doc2.getModel().rules[2].asAssignmentRule().getMetaId()).toEqual('metaid_0400235');

      expect(doc2.getModel().rules[3].isAssignment()).toEqual(true);
      expect(doc2.getModel().rules[3].asAssignmentRule().getVariable()).toEqual('a_tr');
      expect(doc2.getModel().rules[3].asAssignmentRule().getMetaId()).toEqual('metaid_1000237');

      expect(doc2.getModel().rules[4].isAssignment()).toEqual(true);
      expect(doc2.getModel().rules[4].asAssignmentRule().getVariable()).toEqual('a0_tr');
      expect(doc2.getModel().rules[4].asAssignmentRule().getMetaId()).toEqual('metaid_0100236');

      expect(doc2.getModel().rules[5].isAssignment()).toEqual(true);
      expect(doc2.getModel().rules[5].asAssignmentRule().getVariable()).toEqual('kd_prot');
      expect(doc2.getModel().rules[5].asAssignmentRule().getMetaId()).toEqual('metaid_0010335');

      expect(doc2.getModel().rules[6].isAssignment()).toEqual(true);
      expect(doc2.getModel().rules[6].asAssignmentRule().getVariable()).toEqual('kd_mRNA');
      expect(doc2.getModel().rules[6].asAssignmentRule().getMetaId()).toEqual('metaid_0020435');

      expect(doc2.getModel().rules[7].isAssignment()).toEqual(true);
      expect(doc2.getModel().rules[7].asAssignmentRule().getVariable()).toEqual('alpha');
      expect(doc2.getModel().rules[7].asAssignmentRule().getMetaId()).toEqual('metaid_0230035');

      expect(doc2.getModel().rules[8].isAssignment()).toEqual(true);
      expect(doc2.getModel().rules[8].asAssignmentRule().getVariable()).toEqual('alpha0');
      expect(doc2.getModel().rules[8].asAssignmentRule().getMetaId()).toEqual('metaid_0240035');

      doc2.getModel().rules.forEach(function(e) {
        expect(e.isAssignment()).toEqual(true);
      });
    });
  });

  it('cleans up resources', function() {
    libsbml.destroy(doc2);
  });
});