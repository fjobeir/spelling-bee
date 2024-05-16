import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import { LOCALES } from './config/constants';
 
export default getRequestConfig(async ({locale}) => {
  if (!Object.keys(LOCALES).includes(locale as any)) notFound();
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});