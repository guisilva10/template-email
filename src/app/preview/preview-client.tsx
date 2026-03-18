"use client";

import { useState } from "react";

type Tab = "welcome" | "reset";

interface Props {
  welcomeHtml: string;
  resetHtml: string;
}

export default function PreviewClient({ welcomeHtml, resetHtml }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("welcome");

  const currentHtml = activeTab === "welcome" ? welcomeHtml : resetHtml;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* ── Top bar ── */}
      <div className="bg-[#0f0f0f] border-b border-[#1e1e1e] px-6 py-4 flex items-center justify-between">
        <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">
          High Training App — Templates de Email
        </span>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-[#1a1a1a] rounded-lg p-1">
          <button
            onClick={() => setActiveTab("welcome")}
            className={`px-5 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === "welcome"
                ? "bg-white text-[#0a0a0a]"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Boas-vindas
          </button>
          <button
            onClick={() => setActiveTab("reset")}
            className={`px-5 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === "reset"
                ? "bg-white text-[#0a0a0a]"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Esqueci a Senha
          </button>
        </div>
      </div>

      {/* ── Preview frame ── */}
      <div className="px-8 pt-8 pb-12 flex justify-center">
        <div className="w-full max-w-2xl">
          <iframe
            key={activeTab}
            srcDoc={currentHtml}
            className="w-full rounded-xl border border-[#1e1e1e]"
            style={{ height: "960px" }}
            title="Email Preview"
          />
        </div>
      </div>

    </div>
  );
}
