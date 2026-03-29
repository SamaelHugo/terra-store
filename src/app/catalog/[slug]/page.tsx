export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <section className="pb-32 pt-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-15">
        <h1 className="font-heading text-4xl font-light text-text-heading md:text-5xl">
          Продукт: {slug}
        </h1>
        <p className="mt-4 text-text-muted">Страница продукта — скоро</p>
      </div>
    </section>
  );
}
