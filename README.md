# High Training App — Template de Email de Boas-vindas

Template de email de boas-vindas com recibo de pagamento, pronto para ser integrado em **qualquer linguagem ou framework**.

---

## Como funciona

O template é construído em React Email e exportado como **HTML puro com placeholders** no formato `{{variavel}}`.

O dev pega esse HTML, substitui os placeholders pelos dados reais na linguagem que ele usa, e manda pelo serviço de email que já estiver configurado no projeto.

---

## Passo 1 — Baixar o HTML do template

Com o projeto rodando localmente:

```bash
npm install
npm run dev
```

Acesse no browser:

```
http://localhost:3000/api/export-html
```

O arquivo `email-template.html` será baixado automaticamente.

> Para visualizar como o email fica, acesse `http://localhost:3000/email`

---

## Passo 2 — Substituir os placeholders

O HTML contém os seguintes placeholders para substituir:

| Placeholder | O que é |
|---|---|
| `{{customerName}}` | Nome completo do cliente |
| `{{customerEmail}}` | Email do cliente |
| `{{invoiceNumber}}` | Número do recibo |
| `{{paymentDate}}` | Data do pagamento (ex: `18 de março de 2024`) |
| `{{paymentMethod}}` | Forma de pagamento (ex: `PIX`, `Cartão de Crédito`) |
| `{{itemDescription}}` | Nome/descrição do produto comprado |
| `{{subtotal}}` | Valor subtotal formatado (ex: `R$ 497,00`) |
| `{{discount}}` | Valor do desconto formatado (ex: `R$ 50,00`) |
| `{{companyName}}` | Nome da empresa |
| `{{companyDocument}}` | CNPJ |
| `{{companyAddress}}` | Endereço da empresa |
| `{{supportEmail}}` | Email de suporte |
| `{{logoUrl}}` | URL pública da logo |
| `{{heroBgUrl}}` | URL pública da imagem de fundo |
| `{{appUrl}}` | Link para abrir o app (botão CTA) |

---

## Passo 3 — Enviar o email

Exemplos de como substituir e enviar em cada linguagem:

---

### Node.js

```js
const fs = require("fs");
const { Resend } = require("resend"); // ou nodemailer, sendgrid, etc.

const template = fs.readFileSync("email-template.html", "utf-8");

function buildEmail(data) {
  return template
    .replace(/\{\{customerName\}\}/g,    data.customerName)
    .replace(/\{\{customerEmail\}\}/g,   data.customerEmail)
    .replace(/\{\{invoiceNumber\}\}/g,   data.invoiceNumber)
    .replace(/\{\{paymentDate\}\}/g,     data.paymentDate)
    .replace(/\{\{paymentMethod\}\}/g,   data.paymentMethod)
    .replace(/\{\{itemDescription\}\}/g, data.itemDescription)
    .replace(/\{\{subtotal\}\}/g,        data.subtotal)
    .replace(/\{\{discount\}\}/g,        data.discount)
    .replace(/\{\{companyName\}\}/g,     data.companyName)
    .replace(/\{\{companyDocument\}\}/g, data.companyDocument)
    .replace(/\{\{companyAddress\}\}/g,  data.companyAddress)
    .replace(/\{\{supportEmail\}\}/g,    data.supportEmail)
    .replace(/\{\{logoUrl\}\}/g,         data.logoUrl)
    .replace(/\{\{heroBgUrl\}\}/g,       data.heroBgUrl)
    .replace(/\{\{appUrl\}\}/g,          data.appUrl);
}

const html = buildEmail({
  customerName:    "João Silva",
  customerEmail:   "joao@email.com",
  invoiceNumber:   "2024-00042",
  paymentDate:     "18 de março de 2024",
  paymentMethod:   "PIX",
  itemDescription: "High Training App — Plano Anual",
  subtotal:        "R$ 497,00",
  discount:        "R$ 50,00",
  companyName:     "High Training App Ltda",
  companyDocument: "12.345.678/0001-99",
  companyAddress:  "Av. Paulista, 1000 — São Paulo, SP",
  supportEmail:    "suporte@hightrainingapp.com",
  logoUrl:         "https://seucdn.com/logo.png",
  heroBgUrl:       "https://seucdn.com/hero-bg.png",
  appUrl:          "https://hightrainingapp.com",
});

// enviar com Resend
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({
  from:    "High Training App <noreply@hightrainingapp.com>",
  to:      "joao@email.com",
  subject: "Bem-vindo ao High Training App!",
  html,
});
```

---

### PHP

```php
<?php
function buildEmail(string $templatePath, array $data): string {
    $html = file_get_contents($templatePath);
    foreach ($data as $key => $value) {
        $html = str_replace('{{' . $key . '}}', $value, $html);
    }
    return $html;
}

$html = buildEmail(__DIR__ . '/email-template.html', [
    'customerName'    => 'João Silva',
    'customerEmail'   => 'joao@email.com',
    'invoiceNumber'   => '2024-00042',
    'paymentDate'     => '18 de março de 2024',
    'paymentMethod'   => 'PIX',
    'itemDescription' => 'High Training App — Plano Anual',
    'subtotal'        => 'R$ 497,00',
    'discount'        => 'R$ 50,00',
    'companyName'     => 'High Training App Ltda',
    'companyDocument' => '12.345.678/0001-99',
    'companyAddress'  => 'Av. Paulista, 1000 — São Paulo, SP',
    'supportEmail'    => 'suporte@hightrainingapp.com',
    'logoUrl'         => 'https://seucdn.com/logo.png',
    'heroBgUrl'       => 'https://seucdn.com/hero-bg.png',
    'appUrl'          => 'https://hightrainingapp.com',
]);

// Enviar com PHPMailer ou qualquer lib de email
$mail->isHTML(true);
$mail->Body = $html;
$mail->Subject = 'Bem-vindo ao High Training App!';
```

---

### Python

```python
def build_email(template_path: str, data: dict) -> str:
    with open(template_path, "r", encoding="utf-8") as f:
        html = f.read()
    for key, value in data.items():
        html = html.replace(f"{{{{{key}}}}}", value)
    return html

html = build_email("email-template.html", {
    "customerName":    "João Silva",
    "customerEmail":   "joao@email.com",
    "invoiceNumber":   "2024-00042",
    "paymentDate":     "18 de março de 2024",
    "paymentMethod":   "PIX",
    "itemDescription": "High Training App — Plano Anual",
    "subtotal":        "R$ 497,00",
    "discount":        "R$ 50,00",
    "companyName":     "High Training App Ltda",
    "companyDocument": "12.345.678/0001-99",
    "companyAddress":  "Av. Paulista, 1000 — São Paulo, SP",
    "supportEmail":    "suporte@hightrainingapp.com",
    "logoUrl":         "https://seucdn.com/logo.png",
    "heroBgUrl":       "https://seucdn.com/hero-bg.png",
    "appUrl":          "https://hightrainingapp.com",
})

# Enviar com smtplib ou qualquer lib de email
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

msg = MIMEMultipart("alternative")
msg["Subject"] = "Bem-vindo ao High Training App!"
msg["From"]    = "noreply@hightrainingapp.com"
msg["To"]      = "joao@email.com"
msg.attach(MIMEText(html, "html"))
```

---

### C# / .NET

```csharp
string BuildEmail(string templatePath, Dictionary<string, string> data)
{
    var html = File.ReadAllText(templatePath);
    foreach (var item in data)
        html = html.Replace("{{" + item.Key + "}}", item.Value);
    return html;
}

var html = BuildEmail("email-template.html", new Dictionary<string, string>
{
    { "customerName",    "João Silva" },
    { "customerEmail",   "joao@email.com" },
    { "invoiceNumber",   "2024-00042" },
    { "paymentDate",     "18 de março de 2024" },
    { "paymentMethod",   "PIX" },
    { "itemDescription", "High Training App — Plano Anual" },
    { "subtotal",        "R$ 497,00" },
    { "discount",        "R$ 50,00" },
    { "companyName",     "High Training App Ltda" },
    { "companyDocument", "12.345.678/0001-99" },
    { "companyAddress",  "Av. Paulista, 1000 — São Paulo, SP" },
    { "supportEmail",    "suporte@hightrainingapp.com" },
    { "logoUrl",         "https://seucdn.com/logo.png" },
    { "heroBgUrl",       "https://seucdn.com/hero-bg.png" },
    { "appUrl",          "https://hightrainingapp.com" },
});
```

---

## Observação sobre imagens

A logo e a imagem de fundo precisam estar em uma **URL pública** para aparecerem nos clientes de email (Gmail, Outlook, etc.).

Opções para hospedar: AWS S3, Cloudflare R2, Supabase Storage, Google Cloud Storage ou qualquer CDN.

---

## Integração com o Asaas

Quando o Asaas disparar o evento `PAYMENT_CONFIRMED` no webhook, os campos mapeiam assim:

| Placeholder | Campo do Asaas |
|---|---|
| `{{customerName}}` | `payment.customer.name` |
| `{{customerEmail}}` | `payment.customer.email` |
| `{{invoiceNumber}}` | `payment.invoiceNumber` ou `payment.id` |
| `{{paymentDate}}` | `payment.confirmedDate` (formatar para pt-BR) |
| `{{paymentMethod}}` | `payment.billingType` (ver tabela abaixo) |
| `{{itemDescription}}` | `payment.description` |
| `{{subtotal}}` | `payment.value` (formatar como `R$ 0,00`) |
| `{{total}}` | `payment.value` (formatar como `R$ 0,00`) |

**`billingType` → texto de exibição:**

| Asaas | Exibir como |
|---|---|
| `PIX` | `PIX` |
| `CREDIT_CARD` | `Cartão de Crédito` |
| `BOLETO` | `Boleto Bancário` |
| `DEBIT_CARD` | `Cartão de Débito` |
