"use client";

import { useState } from "react";

export default function PreviewClient({ html }: { html: string }) {
  const [sending, setSending] = useState(false);
  const [toEmail, setToEmail] = useState("");
  const [result, setResult] = useState<{
    success?: boolean;
    error?: unknown;
    emailId?: string;
  } | null>(null);

  const handleSendTest = async () => {
    if (!toEmail) return alert("Digite um email para receber o teste.");
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/api/send-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toEmail }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ success: false, error: "Falha na requisição" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100">
      {/* Top bar */}
      <div className="bg-zinc-900 text-white px-6 py-4 flex items-center gap-4 flex-wrap">
        <span className="font-semibold text-sm tracking-tight">
          Preview — Email de Compra Confirmada
        </span>

        <div className="flex items-center gap-2 ml-auto flex-wrap">
          <input
            type="email"
            placeholder="seu@email.com"
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
            className="bg-zinc-700 text-white text-sm px-3 py-2 rounded-lg border border-zinc-600 focus:outline-none focus:border-zinc-400 w-56 placeholder:text-zinc-400"
          />
          <button
            onClick={handleSendTest}
            disabled={sending}
            className="bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            {sending ? "Enviando..." : "✉ Enviar teste"}
          </button>
        </div>

        {result && (
          <span
            className={`text-sm font-medium w-full sm:w-auto ${
              result.success ? "text-green-400" : "text-red-400"
            }`}
          >
            {result.success
              ? `✓ Email enviado! ID: ${result.emailId}`
              : `✗ Erro: ${JSON.stringify(result.error)}`}
          </span>
        )}
      </div>

      {/* Preview frame */}
      <div className="p-8 flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="text-xs text-zinc-400 mb-3 font-medium uppercase tracking-widest text-center">
            Visualização do email
          </div>
          <iframe
            srcDoc={html}
            className="w-full rounded-xl shadow-2xl border border-zinc-200 bg-white"
            style={{ height: "960px" }}
            title="Email Preview"
          />
        </div>
      </div>
    </div>
  );
}
