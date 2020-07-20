function matchAmino(codon) {
  switch(codon) {
    case 'AUG':
      return 'Methionine';
    case 'UUU':
    case 'UUC': 
      return 'Phenylalanine';
    case 'UUA':
    case 'UUG':
      return 'Leucine';
    case 'UCU':
    case 'UCC':
    case 'UCA':
    case 'UCG':
      return 'Serine';
    case 'UAU':
    case 'UAC':
      return 'Tyrosine';
    case 'UGU':
    case 'UGC':
      return 'Cysteine';
    case 'UGG':
      return 'Tryptophan';
    case 'UAA':
    case 'UAG':
    case 'UGA':
      return 'STOP';
    
    default:
      return 'ERROR';
  }
}

function translate(rna) {
  let proteins = [];
  
  if (!rna) return proteins;
  let codons = rna.match(/.{3}/g) || [];

  for (let i = 0; i < codons.length; i++) {
    let protein = matchAmino(codons[i]);

    if (protein === 'ERROR') throw new Error('Invalid codon');
    if (protein === 'STOP') return proteins;

    proteins.push(protein);
  }
  return proteins;
}

module.exports = translate;