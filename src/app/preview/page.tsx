import { render } from "@react-email/components";
import { WelcomeEmail, defaultWelcomeProps } from "@/emails/welcome";
import PreviewClient from "./preview-client";

export default async function PreviewPage() {
  const html = await render(WelcomeEmail(defaultWelcomeProps), { pretty: true });
  return <PreviewClient html={html} />;
}
