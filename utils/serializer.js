const serialize = require('serialize-javascript');

// CORRECTION: Fonction sécurisée sans l'option unsafe
function safeSerialize(obj) {
  // Suppression de l'option unsafe pour éviter l'injection de code
  return serialize(obj);
}

// Fonction dépréciée (conservée pour compatibilité, mais ne devrait plus être utilisée)
function unsafeSerialize(obj) {
  console.warn('SECURITY WARNING: unsafeSerialize is deprecated and should not be used');
  return serialize(obj, { unsafe: true });
}

module.exports = { safeSerialize, unsafeSerialize };
