"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import {
  resources,
  clb7Resources,
  techniques,
  shadowingGuide,
} from "@/data/listening";

interface ListenGuideProps {
  tab: string;
  onBack: () => void;
}

const levelConfig = {
  easy: { label: "Fácil / Facile", badge: "default" as const },
  medium: { label: "Medio / Moyen", badge: "secondary" as const },
  hard: { label: "Difícil / Difficile", badge: "outline" as const },
};

export function ListenGuide({ tab, onBack }: ListenGuideProps) {
  const allResources = tab === "clb7" ? [...resources, ...clb7Resources] : resources;
  const grouped = {
    easy: allResources.filter((r) => r.level === "easy"),
    medium: allResources.filter((r) => r.level === "medium"),
    hard: allResources.filter((r) => r.level === "hard"),
  };

  return (
    <div className="space-y-4">
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver / Retour
      </Button>

      {/* Resources by level */}
      {(["easy", "medium", "hard"] as const).map((level) => {
        const cfg = levelConfig[level];
        return (
          <Card key={level}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                {cfg.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              {grouped[level].map((r, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted">
                  <p className="font-medium text-sm">{r.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{r.description.es}</p>
                  <p className="text-xs italic text-muted-foreground mt-0.5">
                    {r.description.fr}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}

      {/* Technique */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Técnica / Technique
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {techniques.map((t) => (
            <div key={t.step} className="flex gap-3">
              <Badge
                variant="outline"
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
              >
                {t.step}
              </Badge>
              <div>
                <p className="text-sm font-medium">{t.title.es}</p>
                <p className="text-xs italic text-muted-foreground">{t.title.fr}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.description.es}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Shadowing guide for CLB7 */}
      {tab === "clb7" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              <span>{shadowingGuide.title.es}</span>
              <span className="text-muted-foreground italic text-sm ml-2">
                {shadowingGuide.title.fr}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            {shadowingGuide.steps.map((step, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <span className="shrink-0">{i + 1}.</span>
                <div>
                  <p>{step.es}</p>
                  <p className="text-xs italic text-muted-foreground">{step.fr}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
