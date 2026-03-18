import { render } from "@react-email/components";
import { WelcomeEmail } from "@/emails/welcome";

// Renderiza com valores de exemplo reais e depois substitui por placeholders.
// Assim o HTML fica com valores semânticos que o dev troca na linguagem dele.
export async function GET() {
  const html = await render(
    WelcomeEmail({
      customerName:    "CUSTOMER_NAME",
      customerEmail:   "CUSTOMER_EMAIL",
      logoUrl:         "LOGO_URL",
      heroBgUrl:       "HERO_BG_URL",
      appUrl:          "APP_URL",
      invoiceNumber:   "INVOICE_NUMBER",
      paymentDate:     "2024-01-01",
      paymentMethod:   "PAYMENT_METHOD",
      items: [
        { description: "ITEM_DESCRIPTION", quantity: 1, unitPrice: 100 },
      ],
      subtotal:        100,
      discount:        0,
      total:           100,
      companyName:     "COMPANY_NAME",
      companyDocument: "COMPANY_DOCUMENT",
      companyAddress:  "COMPANY_ADDRESS",
      supportEmail:    "SUPPORT_EMAIL",
    }),
    { pretty: true }
  );

  // Substitui os valores sentinela por placeholders {{variavel}}
  const withPlaceholders = html
    .replace(/CUSTOMER_NAME/g,    "{{customerName}}")
    .replace(/CUSTOMER_EMAIL/g,   "{{customerEmail}}")
    .replace(/LOGO_URL/g,         "{{logoUrl}}")
    .replace(/HERO_BG_URL/g,      "{{heroBgUrl}}")
    .replace(/APP_URL/g,          "{{appUrl}}")
    .replace(/INVOICE_NUMBER/g,   "{{invoiceNumber}}")
    .replace(/1 de janeiro de 2024/, "{{paymentDate}}")
    .replace(/PAYMENT_METHOD/g,   "{{paymentMethod}}")
    .replace(/ITEM_DESCRIPTION/g, "{{itemDescription}}")
    .replace(/R\$\s*100,00/g,     "{{subtotal}}")   // subtotal, unitPrice e total = 100
    .replace(/R\$\s*0,00/g,       "{{discount}}")
    .replace(/COMPANY_NAME/g,     "{{companyName}}")
    .replace(/COMPANY_DOCUMENT/g, "{{companyDocument}}")
    .replace(/COMPANY_ADDRESS/g,  "{{companyAddress}}")
    .replace(/SUPPORT_EMAIL/g,    "{{supportEmail}}");

  return new Response(withPlaceholders, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": 'attachment; filename="email-template.html"',
    },
  });
}
