import { Locale } from '@/types/misc';

export const DEFAULT_LOCALE = 'en';
export const LOCALES: Record<Locale, { dir: 'rtl' | 'ltr'; name: string }> = {
	en: {
		name: 'English',
		dir: 'ltr',
	},
	tr: {
		name: 'Türkçe',
		dir: 'ltr',
	},
};