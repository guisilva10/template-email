import { render } from "@react-email/components";
import { WelcomeEmail, defaultWelcomeProps } from "@/emails/welcome";
import { ResetPasswordEmail, defaultResetPasswordProps } from "@/emails/reset-password";
import PreviewClient from "./preview-client";

export default async function PreviewPage() {
  const [welcomeHtml, resetHtml] = await Promise.all([
    render(WelcomeEmail(defaultWelcomeProps), { pretty: true }),
    render(ResetPasswordEmail(defaultResetPasswordProps), { pretty: true }),
  ]);

  return <PreviewClient welcomeHtml={welcomeHtml} resetHtml={resetHtml} />;
}
