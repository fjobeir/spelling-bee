import createMiddleware from 'next-intl/middleware';
import { DEFAULT_LOCALE, LOCALES } from './config/constants';

const localesKeys = Object.keys(LOCALES);

export default createMiddleware({
	locales: localesKeys,
	defaultLocale: DEFAULT_LOCALE,
	localeDetection: true,
	localePrefix: 'always',
	alternateLinks: true,
});


export const config = {
	// Skip all paths that should not be internationalized
	matcher: ['/((?!api|_next|.*\\..*).*)']
};