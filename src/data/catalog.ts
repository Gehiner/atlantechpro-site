import type { LucideIcon } from "lucide-react";
import { Laptop, Monitor, Cpu, Printer, Router, Mouse, CreditCard, Building2 } from "lucide-react";
import { waMsg } from "@/config/site";

/** Advisory/supply categories only — no prices, stock, discounts or availability. */
export type ProductCategory = { title: string; icon: LucideIcon; text: string; message: string };

const ask = (what: string) =>
  waMsg(`Estoy buscando ${what} y quisiera consultar disponibilidad y recibir asesoría.`);

export const productCategories: ProductCategory[] = [
  {
    title: "Computadores",
    icon: Monitor,
    text: "Equipos de escritorio para hogar, oficina o trabajo exigente.",
    message: waMsg("Estoy buscando un computador y quisiera recibir asesoría."),
  },
  {
    title: "Portátiles",
    icon: Laptop,
    text: "Según tu uso: estudio, trabajo, diseño o movilidad.",
    message: ask("un portátil"),
  },
  {
    title: "Componentes",
    icon: Cpu,
    text: "SSD, RAM y piezas para mejorar el rendimiento de tu equipo.",
    message: ask("componentes para mi equipo"),
  },
  {
    title: "Impresoras",
    icon: Printer,
    text: "Para casa o negocio, con instalación y configuración.",
    message: ask("una impresora"),
  },
  {
    title: "Redes y routers",
    icon: Router,
    text: "Equipos para mejorar cobertura y estabilidad de tu red.",
    message: ask("equipos de red o un router"),
  },
  {
    title: "Accesorios",
    icon: Mouse,
    text: "Periféricos y accesorios para trabajar con comodidad.",
    message: ask("accesorios"),
  },
  {
    title: "Equipos empresariales",
    icon: Building2,
    text: "Equipos para oficinas, colegios y empresas.",
    message: ask("equipos para mi empresa"),
  },
  {
    title: "POS",
    icon: CreditCard,
    text: "Equipos para punto de venta en tu negocio.",
    message: ask("equipos POS"),
  },
];
