/**
 * Real projects only. Optional fields stay empty until the owner provides
 * verified material (screenshots, links, technologies). Never invent them.
 */
export type ProjectKind = "PROYECTO PROFESIONAL" | "PRODUCTO PROPIO" | "SOLUCIÓN COMERCIAL";

export type Project = {
  slug: string;
  name: string;
  kind: ProjectKind;
  area: string;
  summary: string;
  client?: string;
  location?: string;
  note?: string;
  tags: string[];
  /** Real screenshots/photos (URLs). Empty → structural placeholder. */
  images: { src: string; alt: string }[];
  links: { label: string; href: string }[];
  status?: string;
};

export const projects: Project[] = [
  {
    slug: "kodlandfaster",
    name: "KodlandFaster",
    kind: "PROYECTO PROFESIONAL",
    area: "Software y automatización",
    summary:
      "Extensión de Chrome para tutores de Kodland que organiza tareas de grupos y automatiza procesos del Backoffice, comunicación y seguimiento, con integración de herramientas Python mediante Native Messaging.",
    note: "Proyecto profesional realizado por Gehiner Sierra dentro de su experiencia profesional.",
    tags: ["JavaScript", "Manifest V3", "Python", "Native Messaging", "Automatización"],
    images: [],
    links: [{ label: "Código en GitHub", href: "https://github.com/Gehiner/KodlandFaster" }],
    status: "Versión publicada · v1.1.0",
  },
  {
    slug: "invitaciones-saas",
    name: "Invitaciones SaaS",
    kind: "PRODUCTO PROPIO",
    area: "Desarrollo de software",
    summary:
      "Aplicación web para crear y compartir invitaciones digitales, desarrollada con Next.js y React. Ya se utilizó en un caso real y continúa evolucionando hacia la gestión de invitados y administración.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Eventos"],
    images: [],
    links: [],
    status: "En desarrollo",
  },
  {
    slug: "salas-de-informatica-hofbauer",
    name: "Equipamiento de salas de informática",
    kind: "SOLUCIÓN COMERCIAL",
    area: "Equipamiento tecnológico",
    client: "Colegio Redentorista María Hofbauer",
    location: "Manizales, Caldas",
    summary:
      "AtlanTech Pro realizó la venta directa, suministro, entrega, instalación y configuración de 100 computadores Janus destinados a las salas de informática del Colegio Redentorista María Hofbauer, mediante dos compras.",
    tags: ["100 computadores", "Janus", "Instalación", "Configuración", "Educación"],
    images: [],
    links: [],
  },
];
