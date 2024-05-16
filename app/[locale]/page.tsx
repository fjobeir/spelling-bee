import SpellBee from "@/components/spellbee/spellbee";
import { Locale } from "@/types/misc";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = Readonly<{
	params: {
		locale: Locale;
	};
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = params;
  const t = await getTranslations({locale, namespace: ''});
	return {
    title: t('app.name'),
  };
}

export default async function Home({ params: { locale } }: Props) {
  // load the dictionary on the server not to expose its content easily in the network tab.
  const dictionaries = await import(`@/dictionaries/${locale}`);
  const randomIndex: number = Math.floor(Math.random() * dictionaries.default.length);
  return (
    <main className="flex container mx-auto min-h-[calc(100vh-160px)] flex-col items-center justify-between py-10 md:py-16">
      <SpellBee dictionary={dictionaries.default[randomIndex]} />
    </main>
  );
}
