import Script from 'next/script';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Girish Lade',
  url: 'https://girish.ladestack.in',
  sameAs: [
    'https://github.com/girishlade111',
    'https://instagram.com/girish_lade_',
    'https://www.ladestack.in',
  ],
  jobTitle: 'Software Developer & Founder',
  worksFor: { '@type': 'Organization', name: 'LadeStack' },
  address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
};

export default function JsonLd() {
  return (
    <Script
      id="json-ld-person"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}