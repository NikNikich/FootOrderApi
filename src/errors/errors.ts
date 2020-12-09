import { badRequestVocabulary } from '@errors/dictionaries/bad-requests';
import { internalVocabulary } from '@errors/dictionaries/internals';
import { notFoundRequestVocabulary } from '@errors/dictionaries/not-found';
import { secureVocabulary } from '@errors/dictionaries/secure';

export const errors = {
  ...internalVocabulary,
  ...badRequestVocabulary,
  ...secureVocabulary,
  ...notFoundRequestVocabulary,
};
