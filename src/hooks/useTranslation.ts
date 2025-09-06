import { useContext } from 'react';
import { TranslationContext, Language } from '../contexts/TranslationContext';

export const useTranslation = () => {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }

  return {
    ...context,
    getCurrentLanguage: (): Language => context.language,
  };
};
