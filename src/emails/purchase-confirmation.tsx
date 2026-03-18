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
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

// ─── TYPES ──────────────────────────────────────────────────────────────────

export interface OrderItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface PurchaseConfirmationProps {
  // Customer
  customerName: string;
  customerEmail: string;
  // Invoice
  invoiceNumber: string;
  paymentDate: string; // "YYYY-MM-DD"
  paymentMethod: string;
  // Items
  items: OrderItem[];
  subtotal: number;
  discount?: number;
  total: number;
  // Company
  companyName: string;
  companyLogoUrl?: string; // URL of the logo image (optional — falls back to text)
  companyDocument: string; // CNPJ
  companyAddress?: string;
  supportEmail: string;
  // Brand color (hex) — optional, defaults to indigo
  brandColor?: string;
}

// ─── HELPERS ────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

const fmtDate = (s: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(s + "T12:00:00"));

const PAYMENT_ICONS: Record<string, string> = {
  "Cartão de Crédito": "💳",
  "Cartão de Débito": "💳",
  PIX: "⚡",
  Boleto: "🔖",
};

// ─── COMPONENT ──────────────────────────────────────────────────────────────

export function PurchaseConfirmationEmail({
  customerName,
  customerEmail,
  invoiceNumber,
  paymentDate,
  paymentMethod,
  items,
  subtotal,
  discount,
  total,
  companyName,
  companyLogoUrl,
  companyDocument,
  companyAddress,
  supportEmail,
  brandColor = "#4f46e5",
}: PurchaseConfirmationProps) {
  const paymentIcon = PAYMENT_ICONS[paymentMethod] ?? "💰";

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
        ✅ Compra confirmada! Olá {customerName}, recebemos seu pagamento. Recibo #{invoiceNumber}
      </Preview>

      <Body style={styles.body}>
        <Container style={styles.wrapper}>

          {/* ════════════════════════════════════════
              HEADER — Logo + Empresa
          ════════════════════════════════════════ */}
          <Section style={{ ...styles.header, backgroundColor: brandColor }}>
            <Row>
              <Column align="center">
                {companyLogoUrl ? (
                  <Img
                    src={companyLogoUrl}
                    alt={companyName}
                    width={140}
                    height={40}
                    style={styles.logo}
                  />
                ) : (
                  <Text style={styles.logoText}>{companyName}</Text>
                )}
              </Column>
            </Row>
          </Section>

          {/* ════════════════════════════════════════
              HERO — Ícone de sucesso + Mensagem
          ════════════════════════════════════════ */}
          <Section style={styles.hero}>
            {/* Checkmark circle */}
            <Row>
              <Column align="center">
                <Section style={styles.successRing}>
                  <Text style={styles.successCheck}>✓</Text>
                </Section>
              </Column>
            </Row>

            <Heading style={styles.heroTitle}>Pagamento Confirmado!</Heading>
            <Text style={styles.heroBody}>
              Olá, <strong style={{ color: "#111827" }}>{customerName}</strong>! Seu
              pagamento foi processado com sucesso. Abaixo você encontra o seu
              recibo completo.
            </Text>

            {/* Quick summary pill */}
            <Section style={styles.totalPill}>
              <Text style={styles.totalPillLabel}>Total pago</Text>
              <Text style={styles.totalPillValue}>{fmt(total)}</Text>
            </Section>
          </Section>

          {/* ════════════════════════════════════════
              INVOICE METADATA
          ════════════════════════════════════════ */}
          <Section style={styles.section}>
            <Text style={styles.sectionLabel}>Informações do Recibo</Text>
            <Hr style={styles.hr} />

            <Row style={styles.metaRow}>
              <Column style={styles.metaLeft}>
                <Text style={styles.metaKey}>Número do Recibo</Text>
              </Column>
              <Column style={styles.metaRight}>
                <Text style={styles.metaVal}>#{invoiceNumber}</Text>
              </Column>
            </Row>

            <Row style={styles.metaRow}>
              <Column style={styles.metaLeft}>
                <Text style={styles.metaKey}>Data do Pagamento</Text>
              </Column>
              <Column style={styles.metaRight}>
                <Text style={styles.metaVal}>{fmtDate(paymentDate)}</Text>
              </Column>
            </Row>

            <Row style={styles.metaRow}>
              <Column style={styles.metaLeft}>
                <Text style={styles.metaKey}>Forma de Pagamento</Text>
              </Column>
              <Column style={styles.metaRight}>
                <Text style={styles.metaVal}>
                  {paymentIcon} {paymentMethod}
                </Text>
              </Column>
            </Row>

            <Row style={styles.metaRow}>
              <Column style={styles.metaLeft}>
                <Text style={styles.metaKey}>Email</Text>
              </Column>
              <Column style={styles.metaRight}>
                <Text style={styles.metaVal}>{customerEmail}</Text>
              </Column>
            </Row>
          </Section>

          {/* ════════════════════════════════════════
              ITEMS TABLE
          ════════════════════════════════════════ */}
          <Section style={styles.section}>
            <Text style={styles.sectionLabel}>Itens do Pedido</Text>
            <Hr style={styles.hr} />

            {/* Table head */}
            <Row style={styles.tableHead}>
              <Column style={{ width: "48%" }}>
                <Text style={styles.thText}>Descrição</Text>
              </Column>
              <Column style={{ width: "14%", textAlign: "center" as const }}>
                <Text style={styles.thText}>Qtd.</Text>
              </Column>
              <Column style={{ width: "19%", textAlign: "right" as const }}>
                <Text style={styles.thText}>Unitário</Text>
              </Column>
              <Column style={{ width: "19%", textAlign: "right" as const }}>
                <Text style={styles.thText}>Subtotal</Text>
              </Column>
            </Row>

            {/* Rows */}
            {items.map((item, i) => (
              <Row key={i} style={i % 2 === 0 ? styles.tdRowEven : styles.tdRowOdd}>
                <Column style={{ width: "48%" }}>
                  <Text style={styles.tdText}>{item.description}</Text>
                </Column>
                <Column style={{ width: "14%", textAlign: "center" as const }}>
                  <Text style={styles.tdText}>{item.quantity}x</Text>
                </Column>
                <Column style={{ width: "19%", textAlign: "right" as const }}>
                  <Text style={styles.tdText}>{fmt(item.unitPrice)}</Text>
                </Column>
                <Column style={{ width: "19%", textAlign: "right" as const }}>
                  <Text style={{ ...styles.tdText, fontWeight: "500" }}>
                    {fmt(item.quantity * item.unitPrice)}
                  </Text>
                </Column>
              </Row>
            ))}

            {/* Spacer */}
            <Row>
              <Column>
                <Hr style={{ ...styles.hr, marginTop: "16px" }} />
              </Column>
            </Row>

            {/* Subtotal */}
            <Row style={styles.summaryRow}>
              <Column style={{ width: "60%" }} />
              <Column style={{ width: "22%" }}>
                <Text style={styles.summaryKey}>Subtotal</Text>
              </Column>
              <Column style={{ width: "18%", textAlign: "right" as const }}>
                <Text style={styles.summaryVal}>{fmt(subtotal)}</Text>
              </Column>
            </Row>

            {/* Discount */}
            {discount && discount > 0 && (
              <Row style={styles.summaryRow}>
                <Column style={{ width: "60%" }} />
                <Column style={{ width: "22%" }}>
                  <Text style={{ ...styles.summaryKey, color: "#16a34a" }}>
                    Desconto
                  </Text>
                </Column>
                <Column style={{ width: "18%", textAlign: "right" as const }}>
                  <Text style={{ ...styles.summaryVal, color: "#16a34a" }}>
                    -{fmt(discount)}
                  </Text>
                </Column>
              </Row>
            )}

            {/* TOTAL */}
            <Section style={{ ...styles.totalBar, backgroundColor: brandColor }}>
              <Row>
                <Column style={{ width: "55%" }}>
                  <Text style={styles.totalBarLabel}>Total Pago</Text>
                </Column>
                <Column style={{ width: "45%", textAlign: "right" as const }}>
                  <Text style={styles.totalBarValue}>{fmt(total)}</Text>
                </Column>
              </Row>
            </Section>
          </Section>

          {/* ════════════════════════════════════════
              SUPPORT BANNER
          ════════════════════════════════════════ */}
          <Section style={styles.supportBanner}>
            <Row>
              <Column style={{ width: "44px" }}>
                <Text style={styles.supportIcon}>💬</Text>
              </Column>
              <Column>
                <Text style={styles.supportTitle}>Precisa de ajuda?</Text>
                <Text style={styles.supportText}>
                  Nossa equipe está disponível para tirar todas as suas dúvidas.
                  Fale com a gente pelo email{" "}
                  <span style={{ color: brandColor, fontWeight: "600" }}>
                    {supportEmail}
                  </span>
                </Text>
              </Column>
            </Row>
          </Section>

          {/* ════════════════════════════════════════
              FOOTER
          ════════════════════════════════════════ */}
          <Section style={styles.footer}>
            {companyLogoUrl ? (
              <Img
                src={companyLogoUrl}
                alt={companyName}
                width={90}
                height={26}
                style={{ margin: "0 auto 8px", display: "block", opacity: 0.6 }}
              />
            ) : (
              <Text style={styles.footerBrand}>{companyName}</Text>
            )}
            <Text style={styles.footerMeta}>CNPJ: {companyDocument}</Text>
            {companyAddress && (
              <Text style={styles.footerMeta}>{companyAddress}</Text>
            )}
            <Hr style={{ borderColor: "#e5e7eb", margin: "16px 0" }} />
            <Text style={styles.footerNote}>
              Este é um recibo automático de confirmação de pagamento. Não responda
              diretamente a este email — use{" "}
              <span style={{ color: "#6b7280" }}>{supportEmail}</span> para contato.
            </Text>
            <Text style={{ ...styles.footerNote, marginTop: "8px", color: "#d1d5db" }}>
              © {new Date().getFullYear()} {companyName}. Todos os direitos reservados.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

// ─── DEFAULT PROPS (used for preview / storybook) ───────────────────────────

export const defaultEmailProps: PurchaseConfirmationProps = {
  customerName: "Mariana Costa",
  customerEmail: "mariana@email.com",
  invoiceNumber: "2024-00137",
  paymentDate: "2024-03-18",
  paymentMethod: "PIX",
  items: [
    { description: "Curso Completo de Design de Produto", quantity: 1, unitPrice: 497.0 },
    { description: "Mentoria em Grupo — 4 sessões", quantity: 1, unitPrice: 297.0 },
    { description: "Acesso à Comunidade (12 meses)", quantity: 1, unitPrice: 97.0 },
  ],
  subtotal: 891.0,
  discount: 90.0,
  total: 801.0,
  companyName: "Escola Digital",
  // companyLogoUrl: "https://seu-site.com/logo.png", // descomente e substitua
  companyDocument: "12.345.678/0001-99",
  companyAddress: "Av. Paulista, 1000 — São Paulo, SP — CEP 01310-100",
  supportEmail: "suporte@escoladigital.com.br",
  brandColor: "#4f46e5",
};

export default PurchaseConfirmationEmail;

// ─── STYLES ─────────────────────────────────────────────────────────────────

const styles = {
  body: {
    backgroundColor: "#f3f4f6",
    fontFamily:
      "Inter, 'Helvetica Neue', Arial, sans-serif",
    margin: "0",
    padding: "0",
  } as React.CSSProperties,

  wrapper: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
    marginTop: "32px",
    marginBottom: "32px",
  } as React.CSSProperties,

  // ── Header ──
  header: {
    padding: "22px 36px",
  } as React.CSSProperties,

  logo: {
    display: "block",
    objectFit: "contain" as const,
  } as React.CSSProperties,

  logoText: {
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: "700",
    letterSpacing: "-0.02em",
    margin: "0",
    textAlign: "center" as const,
  } as React.CSSProperties,

  // ── Hero ──
  hero: {
    padding: "40px 36px 32px",
    backgroundColor: "#fafafa",
    borderBottom: "1px solid #f0f0f0",
    textAlign: "center" as const,
  } as React.CSSProperties,

  successRing: {
    width: "72px",
    height: "72px",
    backgroundColor: "#dcfce7",
    borderRadius: "50%",
    margin: "0 auto 20px",
    border: "3px solid #86efac",
  } as React.CSSProperties,

  successCheck: {
    color: "#16a34a",
    fontSize: "32px",
    fontWeight: "700",
    margin: "0",
    lineHeight: "72px",
    textAlign: "center" as const,
  } as React.CSSProperties,

  heroTitle: {
    color: "#111827",
    fontSize: "26px",
    fontWeight: "700",
    letterSpacing: "-0.02em",
    margin: "0 0 12px",
    lineHeight: "1.25",
  } as React.CSSProperties,

  heroBody: {
    color: "#6b7280",
    fontSize: "15px",
    lineHeight: "1.65",
    margin: "0 0 24px",
  } as React.CSSProperties,

  totalPill: {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "14px 28px",
    display: "inline-block",
    margin: "0 auto",
    textAlign: "center" as const,
  } as React.CSSProperties,

  totalPillLabel: {
    color: "#9ca3af",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    margin: "0 0 2px",
  } as React.CSSProperties,

  totalPillValue: {
    color: "#111827",
    fontSize: "24px",
    fontWeight: "700",
    letterSpacing: "-0.03em",
    margin: "0",
  } as React.CSSProperties,

  // ── Sections ──
  section: {
    padding: "28px 36px",
    borderBottom: "1px solid #f3f4f6",
  } as React.CSSProperties,

  sectionLabel: {
    color: "#9ca3af",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    margin: "0 0 14px",
  } as React.CSSProperties,

  hr: {
    borderColor: "#f3f4f6",
    margin: "0 0 16px",
  } as React.CSSProperties,

  // ── Meta rows ──
  metaRow: {
    marginBottom: "8px",
  } as React.CSSProperties,

  metaLeft: { width: "44%" } as React.CSSProperties,
  metaRight: { width: "56%" } as React.CSSProperties,

  metaKey: {
    color: "#9ca3af",
    fontSize: "13px",
    margin: "0",
    lineHeight: "1.5",
  } as React.CSSProperties,

  metaVal: {
    color: "#111827",
    fontSize: "13px",
    fontWeight: "500",
    margin: "0",
    lineHeight: "1.5",
  } as React.CSSProperties,

  // ── Table ──
  tableHead: {
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
  } as React.CSSProperties,

  thText: {
    color: "#9ca3af",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    margin: "0",
    padding: "10px 8px",
  } as React.CSSProperties,

  tdRowEven: {
    backgroundColor: "#ffffff",
  } as React.CSSProperties,

  tdRowOdd: {
    backgroundColor: "#fafafa",
  } as React.CSSProperties,

  tdText: {
    color: "#374151",
    fontSize: "13px",
    margin: "0",
    padding: "10px 8px",
    lineHeight: "1.5",
  } as React.CSSProperties,

  // ── Summary ──
  summaryRow: {
    marginBottom: "4px",
  } as React.CSSProperties,

  summaryKey: {
    color: "#6b7280",
    fontSize: "13px",
    margin: "0",
    padding: "4px 8px",
    textAlign: "right" as const,
  } as React.CSSProperties,

  summaryVal: {
    color: "#374151",
    fontSize: "13px",
    margin: "0",
    padding: "4px 8px",
    textAlign: "right" as const,
  } as React.CSSProperties,

  totalBar: {
    borderRadius: "10px",
    padding: "16px 20px",
    marginTop: "14px",
  } as React.CSSProperties,

  totalBarLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    margin: "0",
  } as React.CSSProperties,

  totalBarValue: {
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: "700",
    letterSpacing: "-0.03em",
    margin: "0",
  } as React.CSSProperties,

  // ── Support banner ──
  supportBanner: {
    backgroundColor: "#f0fdf4",
    borderLeft: "4px solid #86efac",
    padding: "18px 36px",
  } as React.CSSProperties,

  supportIcon: {
    fontSize: "22px",
    margin: "0",
    lineHeight: "1.4",
  } as React.CSSProperties,

  supportTitle: {
    color: "#14532d",
    fontSize: "13px",
    fontWeight: "600",
    margin: "0 0 2px",
  } as React.CSSProperties,

  supportText: {
    color: "#166534",
    fontSize: "13px",
    lineHeight: "1.6",
    margin: "0",
  } as React.CSSProperties,

  // ── Footer ──
  footer: {
    backgroundColor: "#f9fafb",
    padding: "28px 36px",
    textAlign: "center" as const,
  } as React.CSSProperties,

  footerBrand: {
    color: "#6b7280",
    fontSize: "14px",
    fontWeight: "600",
    margin: "0 0 4px",
  } as React.CSSProperties,

  footerMeta: {
    color: "#9ca3af",
    fontSize: "12px",
    margin: "0 0 2px",
    lineHeight: "1.6",
  } as React.CSSProperties,

  footerNote: {
    color: "#9ca3af",
    fontSize: "11px",
    lineHeight: "1.7",
    margin: "0",
  } as React.CSSProperties,
};
