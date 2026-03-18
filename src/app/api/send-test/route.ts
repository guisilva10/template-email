import { Resend } from "resend";
import { render } from "@react-email/components";
import { NextResponse } from "next/server";
import { WelcomeEmail, defaultWelcomeProps } from "@/emails/welcome";
import type { WelcomeEmailProps } from "@/emails/welcome";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    console.log("[send-test] RESEND_API_KEY loaded:", apiKey ? `${apiKey.slice(0, 8)}...` : "UNDEFINED");

    const resend = new Resend(apiKey);
    const body = await request.json().catch(() => ({}));

    const props: WelcomeEmailProps = { ...defaultWelcomeProps, ...body };
    const toEmail: string = body.toEmail ?? props.customerEmail;

    const html = await render(WelcomeEmail(props));

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL ?? "onboarding@resend.dev",
      to: toEmail,
      subject: `Bem-vindo ao High Training App! Recibo #${props.invoiceNumber}`,
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
