import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

// ─── TYPES ──────────────────────────────────────────────────────────────────

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface WelcomeEmailProps {
  // Customer
  customerName: string;
  customerEmail: string;
  // App
  logoUrl: string;
  heroBgUrl?: string;
  appUrl?: string;
  // Invoice
  invoiceNumber: string;
  paymentDate: string; // "YYYY-MM-DD"
  paymentMethod: string;
  items: InvoiceItem[];
  subtotal: number;
  discount?: number;
  total: number;
  // Company
  companyName: string;
  companyDocument: string;
  companyAddress?: string;
  supportEmail: string;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

const fmtDate = (s: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(s + "T12:00:00"));

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export function WelcomeEmail({
  customerName,
  customerEmail,
  logoUrl,
  heroBgUrl,
  appUrl = "#",
  invoiceNumber,
  paymentDate,
  paymentMethod,
  items,
  subtotal,
  discount,
  total,
  companyName,
  companyDocument,
  companyAddress,
  supportEmail,
}: WelcomeEmailProps) {
  const firstName = customerName.split(" ")[0];

  return (
    <Html lang="pt-BR" dir="ltr">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2",
            format: "woff2",
          }}
          fontWeight={600}
          fontStyle="normal"
        />
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFyfAZ9hiA.woff2",
            format: "woff2",
          }}
          fontWeight={700}
          fontStyle="normal"
        />
      </Head>

      <Preview>
        Bem-vindo ao High Training App, {firstName}! Seu acesso está ativo. Recibo #{invoiceNumber}
      </Preview>

      <Body style={s.body}>
        <Container style={s.container}>

          {/* ══════════════════════════════════════════
              HERO — background image + overlay + logo
          ══════════════════════════════════════════ */}
          <Section
            style={{
              ...s.hero,
              ...(heroBgUrl
                ? {
                    backgroundImage: `linear-gradient(rgba(4,2,14,0.55) 0%, rgba(4,2,14,0.72) 55%, rgba(4,2,14,0.92) 100%), url(${heroBgUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    backgroundRepeat: "no-repeat",
                  }
                : {}),
            }}
          >
            {/* Logo inside hero */}
            <Img
              src={logoUrl}
              alt="High Training App"
              width={130}
              height={130}
              style={s.heroLogo}
            />
            <Text style={s.logoWordmark}>HIGH TRAINING APP</Text>

            <Hr style={s.heroRule} />

            <Text style={s.heroEyebrow}>— BEM-VINDO —</Text>

            <Heading style={s.heroTitle}>
              SEU TREINO{"\n"}COMEÇA AGORA.
            </Heading>

            <Text style={s.heroSub}>
              Olá,{" "}
              <span style={{ color: "#e8eaf0", fontWeight: "600" }}>{firstName}</span>.
              {" "}Seu pagamento foi confirmado e o acesso ao{" "}
              <span style={{ color: "#ffffff", fontWeight: "600" }}>High Training App</span>{" "}
              está ativo.
            </Text>

            {/* CTA */}
            <Section style={s.ctaWrap}>
              <Link href={appUrl} style={s.ctaBtn}>
                ACESSAR O APP  →
              </Link>
            </Section>

            <Hr style={s.heroRule} />
          </Section>

          {/* ══════════════════════════════════════════
              RECEIPT / NOTA FISCAL
          ══════════════════════════════════════════ */}
          <Section style={s.receiptSection}>

            {/* Receipt header */}
            <Section style={s.receiptHeader}>
              <Row>
                <Column style={{ width: "60%" }}>
                  <Text style={s.receiptTitle}>RECIBO DE PAGAMENTO</Text>
                  <Text style={s.receiptSub}>Nota Fiscal Eletrônica</Text>
                </Column>
                <Column style={{ width: "40%", textAlign: "right" as const }}>
                  <Text style={s.receiptBadge}>✓ PAGO</Text>
                  <Text style={s.receiptNum}>#{invoiceNumber}</Text>
                </Column>
              </Row>
            </Section>

            {/* Divider */}
            <Hr style={s.receiptDivider} />

            {/* Customer + payment info — 2 columns */}
            <Row style={{ marginBottom: "20px" }}>
              <Column style={{ width: "50%", paddingRight: "16px" }}>
                <Text style={s.infoLabel}>CLIENTE</Text>
                <Text style={s.infoVal}>{customerName}</Text>
                <Text style={s.infoValSm}>{customerEmail}</Text>
              </Column>
              <Column style={{ width: "50%" }}>
                <Text style={s.infoLabel}>PAGAMENTO</Text>
                <Text style={s.infoVal}>{fmtDate(paymentDate)}</Text>
                <Text style={s.infoValSm}>{paymentMethod}</Text>
              </Column>
            </Row>

            <Hr style={s.receiptDivider} />

            {/* Items table header */}
            <Row style={s.tableHeadRow}>
              <Column style={{ width: "52%" }}>
                <Text style={s.th}>DESCRIÇÃO</Text>
              </Column>
              <Column style={{ width: "12%", textAlign: "center" as const }}>
                <Text style={s.th}>QTD</Text>
              </Column>
              <Column style={{ width: "18%", textAlign: "right" as const }}>
                <Text style={s.th}>UNIT.</Text>
              </Column>
              <Column style={{ width: "18%", textAlign: "right" as const }}>
                <Text style={s.th}>TOTAL</Text>
              </Column>
            </Row>

            {/* Items */}
            {items.map((item, i) => (
              <Row key={i} style={s.tableRow}>
                <Column style={{ width: "52%" }}>
                  <Text style={s.td}>{item.description}</Text>
                </Column>
                <Column style={{ width: "12%", textAlign: "center" as const }}>
                  <Text style={s.td}>{item.quantity}</Text>
                </Column>
                <Column style={{ width: "18%", textAlign: "right" as const }}>
                  <Text style={s.td}>{fmt(item.unitPrice)}</Text>
                </Column>
                <Column style={{ width: "18%", textAlign: "right" as const }}>
                  <Text style={{ ...s.td, color: "#c8cdd3" }}>
                    {fmt(item.quantity * item.unitPrice)}
                  </Text>
                </Column>
              </Row>
            ))}

            <Hr style={{ ...s.receiptDivider, marginTop: "12px" }} />

            {/* Summary */}
            <Row style={{ marginBottom: "6px" }}>
              <Column style={{ width: "70%" }} />
              <Column style={{ width: "15%" }}>
                <Text style={s.summaryKey}>Subtotal</Text>
              </Column>
              <Column style={{ width: "15%", textAlign: "right" as const }}>
                <Text style={s.summaryVal}>{fmt(subtotal)}</Text>
              </Column>
            </Row>

            {discount && discount > 0 && (
              <Row style={{ marginBottom: "6px" }}>
                <Column style={{ width: "70%" }} />
                <Column style={{ width: "15%" }}>
                  <Text style={{ ...s.summaryKey, color: "#6ee7a0" }}>Desconto</Text>
                </Column>
                <Column style={{ width: "15%", textAlign: "right" as const }}>
                  <Text style={{ ...s.summaryVal, color: "#6ee7a0" }}>-{fmt(discount)}</Text>
                </Column>
              </Row>
            )}

            {/* Total bar */}
            <Section style={s.totalBar}>
              <Row>
                <Column style={{ width: "60%" }}>
                  <Text style={s.totalLabel}>TOTAL PAGO</Text>
                </Column>
                <Column style={{ width: "40%", textAlign: "right" as const }}>
                  <Text style={s.totalValue}>{fmt(total)}</Text>
                </Column>
              </Row>
            </Section>

            {/* Company info */}
            <Hr style={{ ...s.receiptDivider, marginTop: "24px" }} />
            <Row style={{ marginTop: "16px" }}>
              <Column style={{ width: "50%", paddingRight: "16px" }}>
                <Text style={s.infoLabel}>EMPRESA</Text>
                <Text style={s.infoValSm}>{companyName}</Text>
                <Text style={s.infoValSm}>CNPJ: {companyDocument}</Text>
              </Column>
              {companyAddress && (
                <Column style={{ width: "50%" }}>
                  <Text style={s.infoLabel}>ENDEREÇO</Text>
                  <Text style={s.infoValSm}>{companyAddress}</Text>
                </Column>
              )}
            </Row>

          </Section>

          {/* ══════════════════════════════════════════
              SUPPORT
          ══════════════════════════════════════════ */}
          <Section style={s.supportSection}>
            <Text style={s.supportText}>
              Dúvidas?{" "}
              <Link href={`mailto:${supportEmail}`} style={s.supportLink}>
                {supportEmail}
              </Link>
            </Text>
          </Section>

          {/* ══════════════════════════════════════════
              FOOTER
          ══════════════════════════════════════════ */}
          <Section style={s.footer}>
            <Img
              src={logoUrl}
              alt="High Training App"
              width={36}
              height={36}
              style={{ display: "block", margin: "0 auto 10px", opacity: 0.5 }}
            />
            <Text style={s.footerBrand}>HIGH TRAINING APP</Text>
            <Text style={s.footerMeta}>
              {companyName} · CNPJ {companyDocument}
            </Text>
            <Hr style={{ borderColor: "#222", margin: "18px 0" }} />
            <Text style={s.footerNote}>
              Este email foi enviado para {customerEmail} como confirmação do seu
              pagamento. Por favor, não responda diretamente a este email.
            </Text>
            <Text style={{ ...s.footerNote, marginTop: "6px", opacity: 0.4 }}>
              © {new Date().getFullYear()} {companyName}. Todos os direitos reservados.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

// ─── DEFAULT PROPS (preview / tests) ─────────────────────────────────────────

export const defaultWelcomeProps: WelcomeEmailProps = {
  customerName: "Rafael Mendes",
  customerEmail: "rafael@email.com",
  logoUrl: "http://localhost:3000/logo.png",
  heroBgUrl: "http://localhost:3000/hero-bg.png",
  appUrl: "https://hightrainingapp.com",
  invoiceNumber: "2024-00137",
  paymentDate: "2024-03-18",
  paymentMethod: "PIX",
  items: [
    { description: "High Training App — Plano Anual", quantity: 1, unitPrice: 497.0 },
  ],
  subtotal: 497.0,
  discount: 50.0,
  total: 447.0,
  companyName: "High Training App Ltda",
  companyDocument: "12.345.678/0001-99",
  companyAddress: "Av. Paulista, 1000 — São Paulo, SP",
  supportEmail: "suporte@hightrainingapp.com",
};

export default WelcomeEmail;

// ─── STYLES ──────────────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: "#0a0a0a",
    fontFamily: "Inter, Arial, sans-serif",
    margin: "0",
    padding: "0",
  },

  container: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#0f0f0f",
    borderRadius: "0",
    overflow: "hidden",
  },

  // ── Hero ──
  hero: {
    backgroundColor: "#04020e",
    padding: "48px 44px 52px",
    textAlign: "center",
  },
  heroLogo: {
    display: "block",
    margin: "0 auto 12px",
    filter: "drop-shadow(0 0 16px rgba(120,100,255,0.5))",
  },
  logoWordmark: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.32em",
    margin: "0 0 28px",
    textAlign: "center",
  },
  heroRule: {
    borderColor: "rgba(130,110,255,0.25)",
    margin: "0 auto 28px",
    maxWidth: "260px",
  },
  heroEyebrow: {
    color: "rgba(180,175,255,0.75)",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.35em",
    margin: "0 0 16px",
    textTransform: "uppercase",
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: "34px",
    fontWeight: "700",
    letterSpacing: "-0.02em",
    lineHeight: "1.08",
    margin: "0 0 24px",
    textTransform: "uppercase",
    whiteSpace: "pre-line",
  },
  heroSub: {
    color: "rgba(210,212,230,0.88)",
    fontSize: "15px",
    lineHeight: "1.75",
    margin: "0 auto 36px",
    maxWidth: "420px",
    textAlign: "center",
  },
  ctaWrap: {
    textAlign: "center",
    margin: "0 0 28px",
  },
  ctaBtn: {
    backgroundColor: "#ffffff",
    color: "#06040f",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.2em",
    padding: "15px 44px",
    borderRadius: "2px",
    textDecoration: "none",
    display: "inline-block",
    textTransform: "uppercase",
  },

  // ── Receipt ──
  receiptSection: {
    backgroundColor: "#0e0e1a",
    borderTop: "1px solid #1e1e30",
    borderBottom: "1px solid #1e1e30",
    padding: "32px 36px",
    margin: "0",
  },
  receiptHeader: {
    marginBottom: "20px",
  },
  receiptTitle: {
    color: "#e8e8f4",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "0.15em",
    margin: "0 0 3px",
  },
  receiptSub: {
    color: "#4a4a62",
    fontSize: "11px",
    letterSpacing: "0.05em",
    margin: "0",
  },
  receiptBadge: {
    color: "#7af0a8",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.12em",
    margin: "0 0 4px",
  },
  receiptNum: {
    color: "#5a5a78",
    fontSize: "12px",
    margin: "0",
    letterSpacing: "0.05em",
  },
  receiptDivider: {
    borderColor: "#1e1e30",
    margin: "0 0 20px",
  },

  // ── Info columns ──
  infoLabel: {
    color: "#5a5a72",
    fontSize: "9px",
    fontWeight: "700",
    letterSpacing: "0.18em",
    margin: "0 0 5px",
    textTransform: "uppercase",
  },
  infoVal: {
    color: "#e8e8f0",
    fontSize: "13px",
    fontWeight: "600",
    margin: "0 0 2px",
    lineHeight: "1.4",
  },
  infoValSm: {
    color: "#7a7a90",
    fontSize: "12px",
    margin: "0",
    lineHeight: "1.5",
  },

  // ── Table ──
  tableHeadRow: {
    backgroundColor: "#0a0a12",
    borderRadius: "4px",
    marginBottom: "2px",
  },
  th: {
    color: "#5a5a72",
    fontSize: "9px",
    fontWeight: "700",
    letterSpacing: "0.15em",
    margin: "0",
    padding: "8px 6px",
    textTransform: "uppercase",
  },
  tableRow: {
    borderBottom: "1px solid #1c1c28",
  },
  td: {
    color: "#a0a0b8",
    fontSize: "12px",
    margin: "0",
    padding: "10px 6px",
    lineHeight: "1.4",
  },

  // ── Summary ──
  summaryKey: {
    color: "#6a6a82",
    fontSize: "11px",
    margin: "0",
    padding: "2px 6px",
    textAlign: "right",
  },
  summaryVal: {
    color: "#a0a0b8",
    fontSize: "11px",
    margin: "0",
    padding: "2px 6px",
    textAlign: "right",
  },

  // ── Total bar ──
  totalBar: {
    backgroundColor: "#ffffff",
    borderRadius: "3px",
    padding: "14px 16px",
    marginTop: "16px",
  },
  totalLabel: {
    color: "#0a0a0a",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.15em",
    margin: "0",
  },
  totalValue: {
    color: "#0a0a0a",
    fontSize: "20px",
    fontWeight: "700",
    letterSpacing: "-0.02em",
    margin: "0",
    textAlign: "right",
  },

  // ── Support ──
  supportSection: {
    padding: "22px 36px",
    backgroundColor: "#0a0a14",
    borderBottom: "1px solid #1a1a2a",
    textAlign: "center",
  },
  supportText: {
    color: "#5a5a78",
    fontSize: "12px",
    margin: "0",
    letterSpacing: "0.02em",
  },
  supportLink: {
    color: "#8888b0",
    textDecoration: "underline",
  },

  // ── Footer ──
  footer: {
    backgroundColor: "#06060f",
    padding: "32px 36px",
    textAlign: "center",
  },
  footerBrand: {
    color: "#3a3a52",
    fontSize: "9px",
    fontWeight: "700",
    letterSpacing: "0.3em",
    margin: "0 0 6px",
  },
  footerMeta: {
    color: "#2e2e42",
    fontSize: "11px",
    margin: "0",
  },
  footerNote: {
    color: "#2a2a3e",
    fontSize: "10px",
    lineHeight: "1.7",
    margin: "0",
  },
};
