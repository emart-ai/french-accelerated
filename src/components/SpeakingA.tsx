"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { speak } from "@/lib/tts";
import { Volume2, ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import type { SpeakingScenario } from "@/data/speaking";

interface SpeakingAProps {
  scenarios: SpeakingScenario[];
  phrases: { fr: string; es: string }[];
  onBack: () => void;
}

export function SpeakingA({ scenarios, phrases, onBack }: SpeakingAProps) {
  const [current, setCurrent] = useState(0);
  const [showPhrases, setShowPhrases] = useState(true);
  const scenario = scenarios[current];

  if (!scenario) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver / Retour
        </Button>
        <span className="text-sm text-muted-foreground">
          {current + 1}/{scenarios.length}
        </span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="space-y-1">
            <p className="text-lg">{scenario.title.es}</p>
            <p className="text-base italic text-muted-foreground">{scenario.title.fr}</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="leading-relaxed">{scenario.prompt}</p>
          <Button
            variant="outline"
            className="w-full min-h-[44px]"
            onClick={() => speak(scenario.prompt)}
          >
            <Volume2 className="w-4 h-4 mr-2" /> Escuchar todo / Écouter tout
          </Button>

          {/* Tips */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Consejos / Conseils :
            </p>
            {scenario.tips.map((tip, i) => (
              <div
                key={i}
                className="flex items-start gap-2 p-2 rounded-lg bg-muted"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0 h-8 w-8 p-0"
                  onClick={() => speak(tip.fr)}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </Button>
                <div>
                  <p className="text-sm italic">{tip.fr}</p>
                  <p className="text-xs text-muted-foreground">{tip.es}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Useful phrases */}
      <Card>
        <CardHeader
          className="cursor-pointer"
          onClick={() => setShowPhrases(!showPhrases)}
        >
          <CardTitle className="flex items-center justify-between text-base">
            <span>Frases útiles / Phrases utiles</span>
            {showPhrases ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </CardTitle>
        </CardHeader>
        {showPhrases && (
          <CardContent className="space-y-2 pt-0">
            {phrases.map((phrase, i) => (
              <div
                key={i}
                className="flex items-start gap-2 p-2 rounded-lg bg-muted"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0 h-8 w-8 p-0"
                  onClick={() => speak(phrase.fr)}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </Button>
                <div>
                  <p className="text-sm italic">{phrase.fr}</p>
                  <p className="text-xs text-muted-foreground">{phrase.es}</p>
                </div>
              </div>
            ))}
          </CardContent>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 min-h-[44px]"
          disabled={current === 0}
          onClick={() => setCurrent(current - 1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Anterior
        </Button>
        <Button
          variant="outline"
          className="flex-1 min-h-[44px]"
          disabled={current >= scenarios.length - 1}
          onClick={() => setCurrent(current + 1)}
        >
          Siguiente <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
