import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface ResetPasswordEmailProps {
  customerName: string;
  resetUrl: string;
  expiresInMinutes: number;
  logoUrl: string;
  heroBgUrl?: string;
  appUrl?: string;
  companyName: string;
  companyDocument: string;
  supportEmail: string;
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export function ResetPasswordEmail({
  customerName,
  resetUrl,
  expiresInMinutes,
  logoUrl,
  heroBgUrl,
  appUrl = "#",
  companyName,
  companyDocument,
  supportEmail,
}: ResetPasswordEmailProps) {
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
        {`Redefinição de senha — ${firstName}, use o link para criar uma nova senha. Válido por ${expiresInMinutes} minutos.`}
      </Preview>

      <Body style={s.body}>
        <Container style={s.container}>

          {/* ══════════════════════════════════════════
              HERO
          ══════════════════════════════════════════ */}
          <Section
            style={{
              ...s.hero,
              ...(heroBgUrl
                ? {
                    backgroundImage: `linear-gradient(rgba(4,2,14,0.60) 0%, rgba(4,2,14,0.78) 55%, rgba(4,2,14,0.96) 100%), url(${heroBgUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    backgroundRepeat: "no-repeat",
                  }
                : {}),
            }}
          >
            <Img
              src={logoUrl}
              alt={companyName}
              width={130}
              height={130}
              style={s.heroLogo}
            />
            <Text style={s.logoWordmark}>HIGH TRAINING APP</Text>

            <Hr style={s.heroRule} />

            {/* Lock icon */}
            <Section style={s.lockCircle}>
              <Text style={s.lockIcon}>🔒</Text>
            </Section>

            <Text style={s.heroEyebrow}>— REDEFINIÇÃO DE SENHA —</Text>

            <Heading style={s.heroTitle}>
              NOVA SENHA{"\n"}SOLICITADA.
            </Heading>

            <Text style={s.heroSub}>
              Olá,{" "}
              <span style={{ color: "#e8eaf0", fontWeight: "600" }}>{firstName}</span>.
              {" "}Recebemos uma solicitação para redefinir a senha da sua conta.
              Clique no botão abaixo para criar uma nova senha.
            </Text>

            {/* CTA */}
            <Section style={s.ctaWrap}>
              <Link href={resetUrl} style={s.ctaBtn}>
                REDEFINIR MINHA SENHA  →
              </Link>
            </Section>

            {/* Expiry warning */}
            <Text style={s.expiryNote}>
              ⏱ Este link expira em{" "}
              <span style={{ color: "#e8eaf0", fontWeight: "600" }}>
                {expiresInMinutes} minutos
              </span>
            </Text>

            <Hr style={s.heroRule} />
          </Section>

          {/* ══════════════════════════════════════════
              LINK MANUAL
          ══════════════════════════════════════════ */}
          <Section style={s.linkSection}>
            <Text style={s.linkTitle}>Botão não funcionou?</Text>
            <Text style={s.linkDesc}>
              Copie e cole o link abaixo diretamente no navegador:
            </Text>
            <Section style={s.linkBox}>
              <Text style={s.linkText}>{resetUrl}</Text>
            </Section>
          </Section>

          {/* ══════════════════════════════════════════
              AVISO DE SEGURANÇA
          ══════════════════════════════════════════ */}
          <Section style={s.securitySection}>
            <Text style={s.securityTitle}>⚠ Não solicitou a redefinição?</Text>
            <Text style={s.securityText}>
              Se você não solicitou a redefinição de senha, ignore este email —
              sua senha permanece a mesma e nenhuma alteração foi feita. Se você
              acredita que sua conta foi comprometida, entre em contato com o
              suporte imediatamente:{" "}
              <Link href={`mailto:${supportEmail}`} style={s.securityLink}>
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
              alt={companyName}
              width={36}
              height={36}
              style={{ display: "block", margin: "0 auto 10px", opacity: 0.5 }}
            />
            <Text style={s.footerBrand}>HIGH TRAINING APP</Text>
            <Text style={s.footerMeta}>
              {companyName} · CNPJ {companyDocument}
            </Text>
            <Hr style={{ borderColor: "#1a1a2a", margin: "18px 0" }} />
            <Text style={s.footerNote}>
              Este email foi enviado para a conta associada a este endereço.
              Por favor, não responda diretamente.
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

// ─── DEFAULT PROPS ────────────────────────────────────────────────────────────

export const defaultResetPasswordProps: ResetPasswordEmailProps = {
  customerName:     "Rafael Mendes",
  resetUrl:         "https://hightrainingapp.com/reset-password?token=abc123xyz",
  expiresInMinutes: 30,
  logoUrl:          "http://localhost:3000/logo.png",
  heroBgUrl:        "http://localhost:3000/hero-bg.png",
  appUrl:           "https://hightrainingapp.com",
  companyName:      "High Training App Ltda",
  companyDocument:  "12.345.678/0001-99",
  supportEmail:     "suporte@hightrainingapp.com",
};

export default ResetPasswordEmail;

// ─── STYLES ──────────────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: "#04020e",
    fontFamily: "Inter, Arial, sans-serif",
    margin: "0",
    padding: "0",
  },

  container: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#0f0f0f",
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
  lockCircle: {
    width: "60px",
    height: "60px",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: "50%",
    border: "1px solid rgba(130,110,255,0.3)",
    margin: "0 auto 20px",
  },
  lockIcon: {
    fontSize: "26px",
    margin: "0",
    lineHeight: "60px",
    textAlign: "center",
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
    margin: "0 0 22px",
    textTransform: "uppercase",
    whiteSpace: "pre-line",
  },
  heroSub: {
    color: "rgba(210,212,230,0.88)",
    fontSize: "15px",
    lineHeight: "1.75",
    margin: "0 auto 32px",
    maxWidth: "420px",
    textAlign: "center",
  },
  ctaWrap: {
    textAlign: "center",
    margin: "0 0 20px",
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
  expiryNote: {
    color: "rgba(160,158,200,0.65)",
    fontSize: "12px",
    margin: "0 0 28px",
    letterSpacing: "0.02em",
    textAlign: "center",
  },

  // ── Link manual ──
  linkSection: {
    backgroundColor: "#0e0e1a",
    borderTop: "1px solid #1e1e30",
    padding: "24px 36px",
  },
  linkTitle: {
    color: "#7a7a98",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    margin: "0 0 6px",
  },
  linkDesc: {
    color: "#5a5a72",
    fontSize: "12px",
    margin: "0 0 12px",
  },
  linkBox: {
    backgroundColor: "#0a0a14",
    border: "1px solid #1e1e30",
    borderRadius: "4px",
    padding: "10px 14px",
  },
  linkText: {
    color: "#7070a0",
    fontSize: "11px",
    margin: "0",
    wordBreak: "break-all",
    letterSpacing: "0.01em",
    lineHeight: "1.6",
  },

  // ── Security warning ──
  securitySection: {
    backgroundColor: "#0d0a0a",
    borderTop: "1px solid #201818",
    borderLeft: "3px solid #3d1f1f",
    padding: "20px 36px",
  },
  securityTitle: {
    color: "#c08080",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.08em",
    margin: "0 0 8px",
  },
  securityText: {
    color: "#7a6060",
    fontSize: "12px",
    lineHeight: "1.7",
    margin: "0",
  },
  securityLink: {
    color: "#a08080",
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
