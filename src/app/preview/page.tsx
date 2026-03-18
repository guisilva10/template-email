import { headers } from "next/headers";
import { render } from "@react-email/components";
import { WelcomeEmail, defaultWelcomeProps } from "@/emails/welcome";
import { ResetPasswordEmail, defaultResetPasswordProps } from "@/emails/reset-password";
import PreviewClient from "./preview-client";

export default async function PreviewPage() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const proto = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${proto}://${host}`;

  const [welcomeHtml, resetHtml] = await Promise.all([
    render(WelcomeEmail({
      ...defaultWelcomeProps,
      logoUrl: `${baseUrl}/logo.png`,
      heroBgUrl: `${baseUrl}/hero-bg.png`,
    }), { pretty: true }),
    render(ResetPasswordEmail({
      ...defaultResetPasswordProps,
      logoUrl: `${baseUrl}/logo.png`,
      heroBgUrl: `${baseUrl}/hero-bg.png`,
    }), { pretty: true }),
  ]);

  return <PreviewClient welcomeHtml={welcomeHtml} resetHtml={resetHtml} />;
}
