import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";
import { pageHead, breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/ui-site";

export const Route = createFileRoute("/privacidad")({
  head: () =>
    pageHead({
      title: "Política de privacidad y tratamiento de datos — AtlanTech Pro",
      description:
        "Cómo AtlanTech Pro trata los datos personales que recibe por WhatsApp y correo, tus derechos según la Ley 1581 de 2012 y cómo ejercerlos.",
      path: "/privacidad",
      jsonLd: [
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Privacidad", path: "/privacidad" },
        ]),
      ],
    }),
  component: PrivacyPage,
});

/** Visible marker for data the owner still has to supply. Never fill with invented values. */
function Pending({ children }: { children: string }) {
  return (
    <span className="rounded bg-accent/15 px-1.5 py-0.5 text-sm font-medium text-accent">
      [Pendiente: {children}]
    </span>
  );
}

function PrivacyPage() {
  const email = siteConfig.contact.email;
  return (
    <>
      <PageHero
        crumb="Privacidad"
        eyebrow="Legal"
        title="Política de privacidad y tratamiento de datos personales"
        text="Esta política explica qué datos personales recibe AtlanTech Pro, para qué los usa y cómo puedes ejercer tus derechos."
      />
      <div className="container-site max-w-3xl space-y-10 py-12 leading-relaxed text-muted-foreground">
        <p className="rounded-lg border border-border p-4 text-sm">
          Documento informativo preparado con base en la Ley 1581 de 2012 y el Decreto 1377 de 2013
          (compilado en el Decreto 1074 de 2015). No constituye una revisión jurídica definitiva;
          los apartados marcados como pendientes deben completarse por el responsable.
        </p>

        <section id="responsable" className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">1. Responsable del tratamiento</h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>Nombre comercial: {siteConfig.name}</li>
            <li>
              Razón social o nombre del titular:{" "}
              <Pending>razón social o nombre del responsable</Pending>
            </li>
            <li>
              NIT o documento: <Pending>NIT</Pending>
            </li>
            <li>
              Ubicación: {siteConfig.location.city}, {siteConfig.location.region},{" "}
              {siteConfig.location.country}. Dirección física:{" "}
              <Pending>dirección de notificaciones</Pending>
            </li>
            <li>
              Correo:{" "}
              <a href={`mailto:${email}`} className="text-accent hover:underline">
                {email}
              </a>
            </li>
          </ul>
        </section>

        <section id="datos" className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">2. Qué datos recibimos</h2>
          <p>
            Este sitio web no tiene formularios, registro de usuarios ni pagos, y no instala
            herramientas de analítica ni publicidad. Solo recibimos datos personales cuando tú
            decides escribirnos:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Por WhatsApp: tu número, nombre de perfil y el contenido de los mensajes que nos
              envíes.
            </li>
            <li>
              Por correo electrónico: tu dirección de correo, nombre y el contenido del mensaje.
            </li>
          </ul>
          <p>
            Te pedimos no enviar datos sensibles (por ejemplo, de salud) ni información de menores
            de edad. El servidor que aloja el sitio puede registrar datos técnicos de navegación
            (como la dirección IP) por razones de seguridad y funcionamiento.
          </p>
        </section>

        <section id="finalidades" className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">3. Para qué usamos los datos</h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>Responder tus consultas y brindarte asesoría.</li>
            <li>Preparar y enviar cotizaciones que solicites.</li>
            <li>Coordinar la venta, entrega, instalación, soporte o desarrollo contratados.</li>
            <li>Hacer seguimiento a los servicios que hayas solicitado.</li>
          </ul>
          <p>No vendemos ni compartimos tus datos con terceros para fines publicitarios.</p>
        </section>

        <section id="tratamiento" className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">4. Tratamiento y terceros</h2>
          <p>
            Las conversaciones por WhatsApp se gestionan a través de la aplicación WhatsApp (Meta),
            y los correos a través del proveedor de correo del dominio, sujetos a sus propias
            políticas. Otros encargados del tratamiento:{" "}
            <Pending>proveedores que el responsable confirme</Pending>
          </p>
          <p>
            Tiempo de conservación: <Pending>plazo definido por el responsable</Pending>
          </p>
        </section>

        <section id="derechos" className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">5. Tus derechos</h2>
          <p>Como titular de los datos, según el artículo 8 de la Ley 1581 de 2012, puedes:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Conocer, actualizar y rectificar tus datos.</li>
            <li>Solicitar prueba de la autorización otorgada.</li>
            <li>Ser informado sobre el uso que se ha dado a tus datos.</li>
            <li>
              Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por
              infracciones a la ley.
            </li>
            <li>Revocar la autorización y solicitar la supresión de tus datos cuando proceda.</li>
            <li>Acceder de forma gratuita a tus datos personales.</li>
          </ul>
        </section>

        <section id="solicitudes" className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">6. Cómo ejercer tus derechos</h2>
          <p>
            Envía tu consulta o reclamo a{" "}
            <a href={`mailto:${email}`} className="text-accent hover:underline">
              {email}
            </a>{" "}
            indicando tu nombre, el medio por el que nos contactaste y tu solicitud. La ley
            establece plazos máximos de diez (10) días hábiles para consultas y quince (15) días
            hábiles para reclamos (artículos 14 y 15 de la Ley 1581 de 2012).
          </p>
          <p>
            Procedimiento interno y área responsable de atender solicitudes:{" "}
            <Pending>definir por el responsable</Pending>
          </p>
        </section>

        <section id="cookies" className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">7. Cookies</h2>
          <p>
            Actualmente el sitio no usa cookies de analítica ni de publicidad. Si en el futuro se
            activan, esta política se actualizará antes de hacerlo.
          </p>
        </section>

        <section id="vigencia" className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">8. Vigencia</h2>
          <p>
            Fecha de entrada en vigencia: <Pending>fecha definida por el responsable</Pending>
          </p>
        </section>
      </div>
    </>
  );
}
