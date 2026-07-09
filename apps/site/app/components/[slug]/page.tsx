import { notFound } from "next/navigation";
import { docs } from "@/content/components";
import { ComponentDocView } from "@/components/component-doc-view";

export function generateStaticParams() {
  return Object.keys(docs).map((slug) => ({ slug }));
}

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = docs[slug];
  if (!doc) notFound();
  return (
    <div className="container section">
      <article className="prose" style={{ maxWidth: 860 }}>
        <ComponentDocView doc={doc} />
      </article>
    </div>
  );
}
