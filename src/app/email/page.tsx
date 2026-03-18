import { headers } from "next/headers";
import { render } from "@react-email/components";
import { WelcomeEmail, defaultWelcomeProps } from "@/emails/welcome";

export default async function EmailPage() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const proto = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${proto}://${host}`;

  const html = await render(WelcomeEmail({
    ...defaultWelcomeProps,
    logoUrl: `${baseUrl}/logo.png`,
    heroBgUrl: `${baseUrl}/hero-bg.png`,
  }), { pretty: true });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ margin: 0, padding: 0 }}
    />
  );
}
