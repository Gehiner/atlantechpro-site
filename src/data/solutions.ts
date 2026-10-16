import type { LucideIcon } from "lucide-react";
import { Monitor, Wrench, Network, Code2, Workflow, BrainCircuit, Laptop, Cpu } from "lucide-react";
import { waMsg } from "@/config/site";

export type Solution = {
  slug: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  items: string[];
  message: string;
};

export const solutions: Solution[] = [
  {
    slug: "tecnologia-y-equipos",
    title: "Tecnología y equipos",
    icon: Monitor,
    summary:
      "Te asesoramos para elegir y conseguir el equipo correcto para tu hogar, estudio o negocio.",
    items: [
      "Computadores y portátiles",
      "Componentes",
      "Impresoras",
      "Redes y routers",
      "Equipos empresariales y POS",
      "Accesorios",
    ],
    message: waMsg("Estoy buscando un equipo tecnológico y quisiera recibir asesoría."),
  },
  {
    slug: "soporte-tecnico",
    title: "Soporte técnico",
    icon: Wrench,
    summary: "Dejamos tus equipos rápidos, seguros y bien configurados.",
    items: [
      "Instalación y migración de SSD/HDD",
      "Instalación de memoria RAM",
      "Mantenimiento y optimización",
      "Instalación y configuración de Windows",
      "Antivirus",
      "Configuración de software",
    ],
    message: waMsg("Necesito soporte técnico y quisiera recibir asesoría."),
  },
  {
    slug: "redes-e-infraestructura",
    title: "Redes e infraestructura",
    icon: Network,
    summary: "Wi-Fi estable, redes locales ordenadas y conectividad confiable.",
    items: ["Configuración de routers", "Wi-Fi", "Redes locales", "Conectividad"],
    message: waMsg(
      "Estoy interesado en una solución de redes e infraestructura y quisiera recibir asesoría.",
    ),
  },
  {
    slug: "desarrollo-de-software",
    title: "Desarrollo de software",
    icon: Code2,
    summary: "Páginas web, aplicaciones y herramientas internas a la medida de tu operación.",
    items: [
      "Páginas y sistemas web",
      "Aplicaciones",
      "Herramientas internas",
      "Soluciones personalizadas",
    ],
    message: waMsg("Tengo un proyecto de software y quisiera hablar con AtlanTech Pro."),
  },
  {
    slug: "automatizacion",
    title: "Automatización",
    icon: Workflow,
    summary: "Elimina tareas repetitivas y conecta tus herramientas para ganar tiempo.",
    items: [
      "Automatización de procesos",
      "Integración entre herramientas",
      "Reportes automáticos",
      "Flujos de trabajo",
    ],
    message: waMsg("Quiero automatizar un proceso y quisiera recibir asesoría."),
  },
  {
    slug: "inteligencia-artificial",
    title: "Inteligencia artificial",
    icon: BrainCircuit,
    summary: "IA práctica aplicada a tu negocio: asistentes y procesamiento de información.",
    items: [
      "Integración de IA",
      "Asistentes",
      "Procesamiento de información",
      "Automatización con IA",
    ],
    message: waMsg(
      "Quiero aplicar inteligencia artificial en mi negocio y quisiera recibir asesoría.",
    ),
  },
];

/** Problem-oriented entry points ("¿Qué necesitas resolver?"). */
export const needs: { title: string; icon: LucideIcon; message: string }[] = [
  {
    title: "Necesito un computador o equipo",
    icon: Laptop,
    message: waMsg("Estoy buscando un computador y quisiera recibir asesoría."),
  },
  {
    title: "Mi computador necesita soporte",
    icon: Cpu,
    message: waMsg("Necesito soporte técnico y quisiera recibir asesoría."),
  },
  {
    title: "Necesito mejorar mi red",
    icon: Network,
    message: waMsg(
      "Estoy interesado en una solución de redes e infraestructura y quisiera recibir asesoría.",
    ),
  },
  {
    title: "Necesito una página o sistema",
    icon: Code2,
    message: waMsg("Tengo un proyecto de software y quisiera hablar con AtlanTech Pro."),
  },
  {
    title: "Quiero automatizar un proceso",
    icon: Workflow,
    message: waMsg("Quiero automatizar un proceso y quisiera recibir asesoría."),
  },
  {
    title: "Quiero aplicar inteligencia artificial",
    icon: BrainCircuit,
    message: waMsg("Quiero aplicar inteligencia artificial y quisiera recibir asesoría."),
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Entendemos",
    text: "Primero escuchamos qué necesitas resolver, tu contexto y tu presupuesto.",
  },
  {
    n: "02",
    title: "Recomendamos",
    text: "Te proponemos la opción adecuada, sin venderte lo que no necesitas.",
  },
  {
    n: "03",
    title: "Implementamos",
    text: "Entregamos, instalamos, configuramos o desarrollamos la solución acordada.",
  },
  {
    n: "04",
    title: "Acompañamos",
    text: "Seguimos contigo después para que todo siga funcionando.",
  },
];

export const advantages = [
  { title: "Asesoría antes de comprar", text: "Te ayudamos a decidir antes de invertir." },
  {
    title: "Soluciones adaptadas a la necesidad",
    text: "Cada recomendación parte de tu caso concreto.",
  },
  {
    title: "Integración entre hardware y software",
    text: "Equipos, redes y software trabajando juntos.",
  },
  {
    title: "Acompañamiento después de la implementación",
    text: "No desaparecemos después de la entrega.",
  },
  { title: "Atención cercana", text: "Hablas directamente con quien resuelve." },
  {
    title: "Para personas y empresas",
    text: "Desde un equipo para el hogar hasta un proyecto empresarial.",
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "¿Atienden en Chiquinquirá?",
    a: "Sí. Atendemos en Chiquinquirá y en Boyacá. Las soluciones digitales y remotas las ofrecemos en toda Colombia.",
  },
  {
    q: "¿Trabajan con empresas?",
    a: "Sí. Trabajamos con personas y con empresas: equipos, soporte, redes, software y automatización.",
  },
  {
    q: "¿Pueden ayudarme a elegir un computador?",
    a: "Sí. Nos cuentas para qué lo necesitas y tu presupuesto, y te recomendamos opciones adecuadas.",
  },
  {
    q: "¿Realizan instalación y configuración de equipos?",
    a: "Sí. Entregamos, instalamos y configuramos equipos, incluyendo Windows, software y antivirus.",
  },
  {
    q: "¿Trabajan con redes y routers?",
    a: "Sí. Configuramos routers y Wi-Fi y organizamos redes locales para mejorar la conectividad.",
  },
  {
    q: "¿Desarrollan software personalizado?",
    a: "Sí. Desarrollamos páginas, sistemas, herramientas internas y automatizaciones según tu necesidad.",
  },
  {
    q: "¿Pueden trabajar de forma remota?",
    a: "Sí. El desarrollo de software, la automatización y parte del soporte pueden hacerse de forma remota.",
  },
  {
    q: "¿Cómo solicito una cotización?",
    a: "Escríbenos por WhatsApp o al correo, cuéntanos qué necesitas y te enviamos una propuesta.",
  },
];
