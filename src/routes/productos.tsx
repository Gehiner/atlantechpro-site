import { createFileRoute } from "@tanstack/react-router";
import { pageHead, breadcrumbLd } from "@/lib/seo";
import { productCategories } from "@/data/catalog";
import { PageHero, ProductCard, CTASection } from "@/components/ui-site";

export const Route = createFileRoute("/productos")({
  head: () =>
    pageHead({
      title: "Computadores y equipos en Chiquinquirá — AtlanTech Pro",
      description:
        "Asesoría y suministro de computadores, portátiles, componentes, impresoras, routers, equipos empresariales y POS en Chiquinquirá y Boyacá.",
      path: "/productos",
      jsonLd: [
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Productos", path: "/productos" },
        ]),
      ],
    }),
  component: () => (
    <>
      <PageHero
        crumb="Productos"
        eyebrow="Productos"
        title="Equipos con asesoría"
        text="No es una tienda en línea: te ayudamos a elegir el equipo adecuado y lo conseguimos para ti. Consulta disponibilidad por WhatsApp."
      />
      <section className="container-site grid gap-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {productCategories.map((p) => (
          <ProductCard key={p.title} product={p} />
        ))}
      </section>
      <CTASection
        title="¿No sabes qué equipo elegir?"
        text="Cuéntanos para qué lo necesitas y te recomendamos la mejor opción."
      />
    </>
  ),
});
