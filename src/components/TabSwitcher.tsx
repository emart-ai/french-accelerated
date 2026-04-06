"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DayPlanner } from "./DayPlanner";

export function TabSwitcher() {
  const [tab, setTab] = useState<string>("clb5");

  useEffect(() => {
    const saved = localStorage.getItem("tef-active-tab");
    if (saved === "clb5" || saved === "clb7") setTab(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tef-active-tab", tab);
  }, [tab]);

  useEffect(() => {
    fetch("/api/user").catch(() => {});
  }, []);

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList className="w-full grid grid-cols-2 h-14 bg-gray-100 rounded-2xl p-1">
        <TabsTrigger
          value="clb5"
          className="text-base font-bold rounded-xl data-active:bg-orange-500 data-active:text-white"
        >
          CLB 5 — 4 Semanas
        </TabsTrigger>
        <TabsTrigger
          value="clb7"
          className="text-base font-bold rounded-xl data-active:bg-blue-500 data-active:text-white"
        >
          CLB 7 — 5 Meses
        </TabsTrigger>
      </TabsList>
      <TabsContent value="clb5" className="mt-5">
        <DayPlanner tab="clb5" />
      </TabsContent>
      <TabsContent value="clb7" className="mt-5">
        <DayPlanner tab="clb7" />
      </TabsContent>
    </Tabs>
  );
}
