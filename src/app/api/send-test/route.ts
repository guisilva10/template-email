import { Resend } from "resend";
import { render } from "@react-email/components";
import { NextResponse } from "next/server";
import { WelcomeEmail, defaultWelcomeProps } from "@/emails/welcome";
import { ResetPasswordEmail, defaultResetPasswordProps } from "@/emails/reset-password";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    console.log("[send-test] RESEND_API_KEY loaded:", apiKey ? `${apiKey.slice(0, 8)}...` : "UNDEFINED");

    const body = await request.json().catch(() => ({}));
    const toEmail: string = body.toEmail;
    const template: string = body.template ?? "welcome";

    let html: string;
    let subject: string;

    if (template === "reset") {
      const props = { ...defaultResetPasswordProps, ...body };
      html = await render(ResetPasswordEmail(props));
      subject = "Redefinição de senha — High Training App";
    } else {
      const props = { ...defaultWelcomeProps, ...body };
      html = await render(WelcomeEmail(props));
      subject = `Bem-vindo ao High Training App! Recibo #${defaultWelcomeProps.invoiceNumber}`;
    }

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL ?? "onboarding@resend.dev",
      to: toEmail,
      subject,
      html,
    });

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 400 });
    }

    return NextResponse.json({ success: true, emailId: data?.id });
  } catch (err) {
    console.error("[send-test]", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
