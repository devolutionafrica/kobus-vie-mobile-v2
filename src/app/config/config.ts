/**
 * Configuration de l'application
 */
export const MODE_DEBUG = true;
export const MAX_CHECkED_TRANSACTION = 30 //durée en seconde
export const STEEP_TIME = 2000 //durée en milliseconde
export const PLAFOND_MOBILE = 100000;
export const LIMIT_REQUEST_NUMBER = 1;
export const NUMBER_DEFAULT_CONTRAT = 3;
export const SERVER_MESSAGE_MAX_LENGTH = 150;
export const PROPOSITION_UNAUTHENTICATED_NUMBER = 10;
export const DEFAULT_SPLASH_ICON = 'nsia_logo_or.png';
export const DEFAULT_APP_ICON = 'nsia_assurances_vie.jpg';
export const KKAIPAY_KEY = 'b6e50f80987611ebb611b7e676b55ada'
export const KKAIPAY_MODE_TEST = true
export const KKAIPAY_TEST_NUMBER = '61000000'

export enum APP_STORAGE_KEY {
  AUTH = 'auth',
  FILIALE = 'filiale',
  LANGUAGE = 'language',
  CONTRATS = 'contrats',
  APP_CONFIG = 'appConfig',
  CONFIG_STEP = 'configStep',
  CGU_CONTENT = 'cguContent',
  CURRENT_USER = 'currentUser',
  PROPOSITIONS = 'propositions',
  CURRENT_ACCES = 'currentAccess',
  DEFAULT_APPORTEUR = 'defaultApporteur',
  APP_GLOBAL_STORAGE = 'chapChapStorage',
  PARRAIN_KEY = 'parrain_key'
}

export enum APP_SESSION_KEY {
  PANIER = 'panier',
  STOP_GOBACK = 'stopGoBack',
  PRIMES_IMPAYES = 'primesImpayes',
  CURRENT_CONTRAT = 'currentContrats',
  GARANTIES_FACULTATIVES = 'garantieFacultative'
}

export enum ACT_ENUM {
  VALID = 'validation',
  CREATE = 'create',
  UPDATE = 'update'
}

/**
 * Configuration filiale
 */
export const USE_FILIALE_CONFIG = false;
export const FILIALE_CONFIG = {
  codeFiliale: 'CM_VIE',
  appIcon: 'logoDelaala.png',
  splashIcon: 'LogoSplash.png'
};

export const integrators = [
  {
    libelle: 'KKiaPay',
    isActive: true,
    urlAPI: 'test',
    logo: 'logoKkiapay.png',
    description: 'Opérateur KKiaPay'
  },
  {
    libelle: 'IxpertaPay',
    isActive: true,
    urlAPI: 'test',
    logo: 'logoIxpertaPay.png',
    description: 'Opérateur IxpertaPay'
  }
]
