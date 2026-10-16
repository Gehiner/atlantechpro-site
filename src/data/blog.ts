/**
 * Blog posts as a typed module (no CMS). Only posts with `draft: false` are
 * listed, routed and included in the sitemap. `publishedAt` must be the real
 * publication date (ISO yyyy-mm-dd). Never invent statistics, sources or clients.
 */
import { siteConfig } from "@/config/site";

export type BlogSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type BlogLink = {
  label: string;
  to: "/soluciones" | "/productos" | "/contacto";
  hash?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  /** Shorter <title> (without the brand suffix) when `title` is too long for search results. */
  metaTitle?: string;
  description: string;
  publishedAt: string;
  /** Real date of the last substantive edit (ISO yyyy-mm-dd). Leave unset until the post is revised. */
  updatedAt?: string;
  draft: boolean;
  intro: string;
  sections: BlogSection[];
  related: BlogLink[];
  cta: { label: string; message: string };
};

const posts: BlogPost[] = [
  {
    slug: "como-elegir-computador",
    title: "Cómo elegir un computador para estudiar o trabajar",
    description:
      "Guía práctica para elegir computador según tu uso: memoria RAM, almacenamiento SSD, procesador, pantalla y presupuesto, sin fórmulas universales.",
    publishedAt: "2026-10-14",
    draft: false,
    intro:
      "No existe un computador ideal para todo el mundo. El equipo correcto depende de lo que vas a hacer con él, de dónde lo vas a usar y de cuánto puedes invertir. Esta guía te ayuda a ordenar esas decisiones antes de comprar, para que no pagues por lo que no necesitas ni te quedes corto a los pocos meses.",
    sections: [
      {
        heading: "1. Empieza por el uso, no por la ficha técnica",
        paragraphs: [
          "Antes de comparar marcas o modelos, escribe en una lista qué programas vas a usar y con qué frecuencia. No es lo mismo un equipo para clases virtuales y documentos que uno para diseño, edición de video, programación o contabilidad con varios programas abiertos al tiempo.",
        ],
        list: [
          "Uso básico: navegación, correo, ofimática, clases y reuniones virtuales.",
          "Uso intermedio: muchas pestañas, hojas de cálculo grandes, programas administrativos, programación ligera.",
          "Uso exigente: diseño gráfico, edición de fotos o video, modelado 3D, máquinas virtuales o videojuegos.",
          "Movilidad: si lo vas a llevar a diario a la universidad o al trabajo, el peso y la batería pesan tanto como el rendimiento.",
        ],
      },
      {
        heading: "2. Memoria RAM: cuánta necesitas realmente",
        paragraphs: [
          "La RAM determina cuántas cosas puede mantener abiertas el equipo sin volverse lento. Para un uso básico actual, 8 GB suele ser el punto de partida razonable; para trabajo intermedio con varios programas y muchas pestañas, 16 GB da más margen. Los usos exigentes pueden requerir más, según el software.",
          "Pregunta también si la memoria se puede ampliar después. Algunos portátiles traen la RAM soldada a la tarjeta madre y no admiten mejoras, lo que obliga a decidir bien desde el principio.",
        ],
      },
      {
        heading: "3. Almacenamiento: prioriza un SSD",
        paragraphs: [
          "Un disco de estado sólido (SSD) hace que el sistema encienda, abra programas y guarde archivos mucho más rápido que un disco duro mecánico (HDD). Hoy es el cambio que más se nota en el día a día.",
          "En cuanto a capacidad, piensa en cuántos archivos guardas y si usas almacenamiento en la nube. Si manejas fotos, videos o proyectos pesados, conviene más espacio o un disco externo para copias de seguridad.",
        ],
      },
      {
        heading: "4. Procesador: suficiente para tu uso, sin exagerar",
        paragraphs: [
          "Los fabricantes tienen gamas de entrada, media y alta. Para ofimática y estudio, un procesador de gama de entrada o media de una generación reciente suele ser suficiente. Para tareas exigentes vale la pena subir de gama. Más que el nombre comercial, importa la generación y que el procesador esté pensado para el tipo de equipo (portátiles ultradelgados, equipos de rendimiento, etc.).",
          "Revisa los requisitos recomendados de los programas que usarás: es la forma más confiable de saber si un procesador se queda corto.",
        ],
      },
      {
        heading: "5. Pantalla, teclado y conexiones",
        list: [
          'Tamaño: 14" es un buen equilibrio entre portabilidad y comodidad; 15,6" es más cómodo para trabajar muchas horas en un mismo sitio.',
          "Resolución: Full HD (1920×1080) es lo recomendable para leer y trabajar con varias ventanas.",
          "Teclado: si escribes mucho, pruébalo; el teclado numérico ayuda en contabilidad y hojas de cálculo.",
          "Puertos: verifica que tenga los que usas (USB, HDMI para proyectar, lector de tarjetas, red cableada si la necesitas).",
        ],
      },
      {
        heading: "6. Presupuesto: define un rango y qué no vas a sacrificar",
        paragraphs: [
          "Fija un rango de inversión y decide qué es lo innegociable para ti: tal vez el SSD y la RAM, o la batería, o la pantalla. Con eso claro, es más fácil descartar opciones. Un equipo un poco más caro pero que te dura más años puede salir mejor que uno barato que se queda corto pronto.",
          "Considera también la garantía, el soporte disponible y si el equipo trae sistema operativo con licencia.",
        ],
      },
      {
        heading: "Antes de comprar",
        paragraphs: [
          "Si tienes dudas entre dos o tres opciones, compara siempre con base en tu lista de usos. Y si ya tienes un equipo que se siente lento, a veces una mejora de SSD o RAM y un mantenimiento resuelven el problema sin necesidad de comprar uno nuevo.",
        ],
      },
    ],
    related: [
      { label: "Tecnología y equipos", to: "/soluciones", hash: "tecnologia-y-equipos" },
      { label: "Soporte técnico y mejoras de SSD/RAM", to: "/soluciones", hash: "soporte-tecnico" },
      { label: "Categorías de productos", to: "/productos" },
    ],
    cta: {
      label: "Recibir asesoría de compra",
      message:
        "Leí la guía para elegir computador y quisiera asesoría para escoger un equipo según mi uso y presupuesto.",
    },
  },
  {
    slug: "problemas-wifi-antes-de-cambiar-router",
    metaTitle: "Wi-Fi: qué revisar antes de cambiar el router",
    title:
      "Problemas de Wi-Fi en casa o en un pequeño negocio: qué revisar antes de cambiar el router",
    description:
      "Verificaciones básicas y seguras de ubicación, cobertura, conexiones e interferencias para mejorar tu Wi-Fi, y cuándo conviene pedir soporte técnico.",
    publishedAt: "2026-10-14",
    draft: false,
    intro:
      "Cuando el Wi-Fi falla, lo primero que muchos piensan es comprar un router nuevo. A veces es la solución, pero muchas veces el problema está en otro lado: la ubicación del equipo, el número de dispositivos conectados, interferencias o el propio servicio del proveedor. Estas son revisiones sencillas y seguras que puedes hacer antes de gastar dinero.",
    sections: [
      {
        heading: "1. Separa el problema: ¿es el Wi-Fi o es el internet?",
        paragraphs: [
          "Conecta un computador directamente al router con un cable de red y haz una prueba de velocidad. Si por cable también va lento o se cae, el problema probablemente está en el servicio del proveedor o en su módem, y conviene reportarlo a la empresa de internet. Si por cable funciona bien y solo falla por Wi-Fi, sigue con los pasos siguientes.",
        ],
      },
      {
        heading: "2. Revisa la ubicación del router",
        list: [
          "Ubícalo en un punto central y elevado, no en el piso ni dentro de un mueble cerrado.",
          "Aléjalo de paredes gruesas, espejos, acuarios, neveras y estructuras metálicas.",
          "Evita ponerlo junto a microondas, teléfonos inalámbricos o equipos que emitan interferencia.",
          "Si las antenas son externas, prueba orientarlas en distintas direcciones (por ejemplo, una vertical y otra horizontal).",
        ],
      },
      {
        heading: "3. Reinicia de forma ordenada",
        paragraphs: [
          "Apaga el módem y el router, espera unos 30 segundos y enciende primero el módem; cuando esté estable, enciende el router. Es una acción simple que corrige bloqueos temporales. Si necesitas hacerlo todos los días, es una señal de que algo más está pasando.",
        ],
      },
      {
        heading: "4. Revisa las bandas y los canales",
        paragraphs: [
          "Muchos routers emiten en dos bandas: 2,4 GHz llega más lejos pero se satura con facilidad; 5 GHz es más rápida pero atraviesa peor las paredes. Conecta los equipos cercanos a 5 GHz y deja 2,4 GHz para los lejanos o los dispositivos que solo la soportan.",
          "En zonas con muchas redes vecinas, cambiar el canal desde la configuración del router puede reducir interferencias. Si no tienes la clave de administración o no te sientes seguro, no cambies configuraciones avanzadas: un error puede dejarte sin conexión.",
        ],
      },
      {
        heading: "5. Cuenta los dispositivos conectados",
        paragraphs: [
          "Celulares, televisores, cámaras, consolas, impresoras y computadores comparten la misma conexión. Revisa en la aplicación o el panel del router qué está conectado; desconoce y bloquea dispositivos que no reconozcas y cambia la contraseña del Wi-Fi si sospechas que alguien ajeno la usa. Usa siempre una contraseña larga con cifrado WPA2 o WPA3.",
        ],
      },
      {
        heading: "6. Revisa cables y conexiones",
        paragraphs: [
          "Un cable de red dañado, doblado o mal ajustado puede causar cortes intermitentes. Revisa que los conectores estén firmes y, si tienes uno de repuesto, prueba cambiándolo.",
        ],
      },
      {
        heading: "Cuándo conviene pedir soporte",
        paragraphs: [
          "No hay una sola solución que arregle todos los problemas de Wi-Fi; cada espacio es distinto. Conviene pedir apoyo técnico cuando:",
        ],
        list: [
          "La casa o el local tiene varios pisos o zonas donde la señal no llega, y puede requerir puntos de acceso adicionales o una red en malla.",
          "En el negocio hay varios equipos de trabajo, cámaras o puntos de pago que dependen de la conexión.",
          "Necesitas una red separada para clientes o invitados.",
          "Ya hiciste las revisiones anteriores y los cortes continúan.",
        ],
      },
    ],
    related: [
      { label: "Redes e infraestructura", to: "/soluciones", hash: "redes-e-infraestructura" },
      { label: "Routers y equipos de red", to: "/productos" },
      { label: "Contacto y cobertura", to: "/contacto" },
    ],
    cta: {
      label: "Revisar mi red con AtlanTech Pro",
      message:
        "Leí el artículo sobre problemas de Wi-Fi y quisiera apoyo para revisar la red de mi casa o negocio.",
    },
  },
  {
    slug: "cuando-automatizar-proceso-pequeno-negocio",
    metaTitle: "Cuándo automatizar un proceso en un pequeño negocio",
    title: "Cuándo conviene automatizar un proceso de un pequeño negocio",
    description:
      "Cómo identificar tareas repetitivas, medir tiempo y errores, y evaluar si vale la pena automatizarlas con software o Python en un pequeño negocio.",
    publishedAt: "2026-10-14",
    draft: false,
    intro:
      "Automatizar no siempre es la respuesta, pero cuando una tarea se repite todos los días, consume horas y produce errores, suele valer la pena revisarla. Esta guía te ayuda a decidir qué procesos conviene automatizar primero y cuáles es mejor dejar como están.",
    sections: [
      {
        heading: "1. Identifica las tareas repetitivas",
        paragraphs: [
          "Durante una o dos semanas, anota las tareas que tú o tu equipo hacen de la misma forma una y otra vez. Suelen ser buenas candidatas las que siguen pasos fijos y trabajan con datos digitales.",
        ],
        list: [
          "Copiar datos de un correo, un formulario o un archivo a una hoja de cálculo.",
          "Generar reportes o cuadres con la misma estructura cada semana o cada mes.",
          "Enviar recordatorios o mensajes similares a muchos clientes.",
          "Renombrar, organizar o convertir archivos de forma manual.",
        ],
      },
      {
        heading: "2. Mide el tiempo y los errores",
        paragraphs: [
          "Para cada tarea, estima cuánto tiempo toma cada vez y con qué frecuencia se hace. Multiplica y tendrás las horas al mes. Anota también los errores que aparecen: datos mal copiados, archivos perdidos o reportes que no cuadran. Una tarea que toma poco tiempo pero genera errores costosos también puede merecer atención.",
        ],
      },
      {
        heading: "3. Evalúa si es viable automatizarla",
        list: [
          "¿Las reglas son claras? Si la tarea depende de criterio humano en cada caso, es más difícil automatizarla por completo.",
          "¿Los datos están en formato digital? Si la información está en papel, primero hay que digitalizarla.",
          "¿El proceso es estable? Si cambia cada mes, conviene ordenarlo antes de automatizarlo.",
          "¿Qué herramientas usas hoy? Muchas hojas de cálculo, sistemas y servicios permiten integraciones; otras veces se necesita un pequeño programa a la medida, por ejemplo en Python.",
        ],
      },
      {
        heading: "4. Ejemplos ilustrativos",
        paragraphs: [
          "Los siguientes casos son ejemplos hipotéticos para explicar la idea; no corresponden a clientes ni a resultados de AtlanTech Pro.",
        ],
        list: [
          "Una papelería que cada noche pasa las ventas del día de un archivo a otro: un script puede consolidar los archivos y generar el resumen automáticamente.",
          "Un consultorio que confirma citas una por una: se puede preparar un listado diario con los datos listos para enviar los recordatorios.",
          "Un negocio que recibe facturas por correo: un programa puede descargar los adjuntos y organizarlos por fecha y proveedor.",
        ],
      },
      {
        heading: "5. Empieza pequeño",
        paragraphs: [
          "Elige un solo proceso, el que más tiempo consume o más errores genera, y automatiza primero esa parte. Así puedes comprobar si funciona en tu realidad antes de invertir en algo más grande. Documenta cómo funciona y quién lo revisa, para que no dependa de una sola persona.",
        ],
      },
      {
        heading: "Cuándo no conviene automatizar (todavía)",
        list: [
          "Cuando la tarea se hace pocas veces al año.",
          "Cuando el proceso no está definido y cada persona lo hace distinto.",
          "Cuando el costo de construir y mantener la automatización supera el tiempo que ahorra.",
        ],
      },
    ],
    related: [
      { label: "Automatización de procesos", to: "/soluciones", hash: "automatizacion" },
      { label: "Desarrollo de software", to: "/soluciones", hash: "desarrollo-de-software" },
      {
        label: "Inteligencia artificial aplicada",
        to: "/soluciones",
        hash: "inteligencia-artificial",
      },
    ],
    cta: {
      label: "Cuéntanos tu proceso",
      message:
        "Leí el artículo sobre automatización y quisiera revisar si un proceso de mi negocio se puede automatizar.",
    },
  },
];

export const publishedPosts = posts
  .filter((p) => !p.draft)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const getPost = (slug: string) => publishedPosts.find((p) => p.slug === slug);

/** <title> for a post page: short `metaTitle` when defined, else the full title. */
export const postHeadTitle = (p: BlogPost) => `${p.metaTitle ?? p.title} — ${siteConfig.name}`;

/** Word count of the visible article text (derived from the data, never typed by hand). */
export function postWordCount(post: BlogPost) {
  const text = [
    post.intro,
    ...post.sections.flatMap((s) => [s.heading, ...(s.paragraphs ?? []), ...(s.list ?? [])]),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

export function formatPostDate(iso: string) {
  const [y = 1970, m = 1, d = 1] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("es-CO", { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}
