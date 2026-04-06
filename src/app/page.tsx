"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

const TabSwitcher = dynamic(() => import("@/components/TabSwitcher").then(m => ({ default: m.TabSwitcher })), {
  ssr: false,
  loading: () => (
    <div className="h-14 w-full rounded-2xl bg-gray-100 animate-pulse" />
  ),
});

export default function Home() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return (
    <main className="min-h-screen w-full px-5 py-6 pb-12 font-[family-name:var(--font-nunito-sans)]">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight font-[family-name:var(--font-nunito)]">
          <span className="text-indigo-600">TEF</span>{" "}
          <span className="text-orange-500">Accelerator</span>
        </h1>
        <p className="text-base text-gray-400 mt-2 font-semibold">
          Aprende francés diferente del español
        </p>
      </header>
      <TabSwitcher />
    </main>
  );
}
