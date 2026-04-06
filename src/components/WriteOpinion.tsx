"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { speak } from "@/lib/tts";
import { Volume2, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

interface Connector {
  fr: string;
  es: string;
  level: "clb5" | "clb7";
}

interface WriteOpinionProps {
  template: { title: { es: string; fr: string }; template: string };
  connectors: Connector[];
  examples?: { title: { es: string; fr: string }; content: string }[];
  tab: string;
  onBack: () => void;
}

export function WriteOpinion({
  template,
  connectors,
  examples,
  tab,
  onBack,
}: WriteOpinionProps) {
  const [openExample, setOpenExample] = useState<number | null>(null);

  const visibleConnectors =
    tab === "clb7" ? connectors : connectors.filter((c) => c.level === "clb5");

  return (
    <div className="space-y-4">
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver / Retour
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="space-y-1">
            <p className="text-lg">{template.title.es}</p>
            <p className="text-base italic text-muted-foreground">{template.title.fr}</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
            {template.template}
          </pre>
        </CardContent>
      </Card>

      {/* Connectors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Conectores / Connecteurs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1.5 pt-0">
          {visibleConnectors.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-2 rounded-lg bg-muted"
            >
              <Button
                variant="ghost"
                size="sm"
                className="shrink-0 h-8 w-8 p-0"
                onClick={() => speak(c.fr)}
              >
                <Volume2 className="w-3.5 h-3.5" />
              </Button>
              <div className="flex-1 min-w-0">
                <span className="text-sm italic">{c.fr}</span>
                <span className="text-sm text-muted-foreground"> — {c.es}</span>
              </div>
              {c.level === "clb7" && (
                <Badge variant="outline" className="text-[10px] shrink-0">
                  CLB7
                </Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Examples */}
      {examples && examples.length > 0 && tab === "clb7" && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground px-1">
            Ejemplos (CLB 7) / Exemples (NCLC 7) :
          </p>
          {examples.map((ex, i) => (
            <Card key={i}>
              <CardHeader
                className="cursor-pointer py-3"
                onClick={() => setOpenExample(openExample === i ? null : i)}
              >
                <CardTitle className="flex items-center justify-between text-sm">
                  <div>
                    <span>{ex.title.es}</span>
                    <span className="text-muted-foreground italic ml-2">— {ex.title.fr}</span>
                  </div>
                  {openExample === i ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                </CardTitle>
              </CardHeader>
              {openExample === i && (
                <CardContent className="pt-0">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                    {ex.content}
                  </pre>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
