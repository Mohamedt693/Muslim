import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '../core/i18n/i18n'; 

describe('LanguageProvider Logic', () => {
    test('should toggle language and direction', async () => {
        const { result } = renderHook(() => useLanguage(), {
            wrapper: ({ children }) => (
                <I18nextProvider i18n={i18n}>
                    <LanguageProvider>{children}</LanguageProvider>
                </I18nextProvider>
            ),
        });

        expect(result.current.language).toBe('ar');
        expect(result.current.direction).toBe('rtl');

        await act(async () => {
            result.current.toggleLanguage();
        });

        expect(result.current.language).toBe('en');
        expect(result.current.direction).toBe('ltr');

        expect(document.documentElement.lang).toBe('en');
        expect(document.documentElement.dir).toBe('ltr');
    })
});


