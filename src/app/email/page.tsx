import { render } from "@react-email/components";
import { WelcomeEmail, defaultWelcomeProps } from "@/emails/welcome";

export default async function EmailPage() {
  const html = await render(WelcomeEmail(defaultWelcomeProps), { pretty: true });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ margin: 0, padding: 0 }}
    />
  );
}
