type JsonLdSchema = Record<string, unknown>;

export function JsonLdScripts({ schemas }: { schemas: JsonLdSchema[] }) {
  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema["@type"] as string}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
