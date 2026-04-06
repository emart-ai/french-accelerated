"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

interface WriteEmailProps {
  template: { title: { es: string; fr: string }; template: string };
  examples?: { title: { es: string; fr: string }; content: string }[];
  onBack: () => void;
}

export function WriteEmail({ template, examples, onBack }: WriteEmailProps) {
  const [openExample, setOpenExample] = useState<number | null>(null);

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

      {examples && examples.length > 0 && (
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
