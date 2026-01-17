"use client";
import { Typography, useStepContext } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./recipe-instructions.scss";

interface RecipeInstructionsProps {
  steps: string[];
}

class Voices {
  voices: SpeechSynthesisVoice[];

  constructor() {
    this.voices = [];
  }

  getVoices = () => {
    return this.voices;
  };

  setVoices = (voices: SpeechSynthesisVoice[]) => {
    this.voices = voices;
  };
}

const synthesisVoices = new Voices();

const KEY_CODE_ARROW_RIGHT = "ArrowRight";
const KEY_CODE_ARROW_LEFT = "ArrowLeft";
const KEY_CODE_ARROW_DOWN = "ArrowDown";

const NEXT_STEP_TRANSCRIPTIONS = [
  "volgende",
  "volgende stap",
  "Next",
  "en dan",
  "en nu",
  "Wat moet ik nu doen",
  "Wat moet ik dan doen",
  "wat komt hierna",
];

const PREVIOUS_STEP_TRANSCRIPTIONS = [
  "vorige",
  "vorige stap",
  "terug",
  "Wat zat hiervoor",
  "Wat was het vorige",
];

const CURRENT_STEP_TRANSCRIPTIONS = [
  "herhaal",
  "opnieuw",
  "lees opnieuw",
  "lees nog een keer",
  "sorry",
  "even opnieuw",
  "herhaal de stap",
  "herhaal deze stap",
  "Lees de stap opnieuw",
];

const CANCEL_STEP_TRANSCRIPTIONS = ["stop"];

const RecipeInstructions: React.FC<RecipeInstructionsProps> = ({ steps }) => {
  const orderedList = useRef<HTMLOListElement | null>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [repeatCount, setRepeatCount] = useState(0);
  const [speechRecognition, setSpeechRecognition] = useState<any>(null);
  const [isCookingMode, setIsCookingMode] = useState(false);
  const [cookingText, setCookingText] = useState<string | null>(null);

  const speak = useCallback((text: string): void => {
    speechSynthesis.cancel();
    const voices = synthesisVoices.getVoices();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice =
      voices.find((v) => v.voiceURI === "Google Nederlands") || voices[0];
    speechSynthesis.speak(utterance);
  }, []);

  const getStepText = useCallback((index: number): string => {
    const element: HTMLOListElement | null = orderedList.current;
    const text: string | undefined = element
      ?.querySelectorAll("li")
      [index].querySelector("p")?.textContent;

    return `Stap ${index + 1}, ${text}`;
  }, []);

  const onDetectSpeech = useCallback(() => {
    setIsCookingMode(true);
    setCurrentStep(0);
    const hasSpeechRecognition: boolean =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!hasSpeechRecognition) {
      return;
    }
    speak(getStepText(currentStep) ?? "");

    const recognition = new (
      window.SpeechRecognition || window.webkitSpeechRecognition
    )();
    setSpeechRecognition(recognition);

    recognition.lang = "nl-NL";

    recognition.onresult = async (event: {
      results: SpeechRecognitionResultList;
    }) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      console.log(transcript);

      if (NEXT_STEP_TRANSCRIPTIONS.some((value) => value === transcript)) {
        setCurrentStep((currentStep) =>
          currentStep + 1 !== steps.length ? currentStep + 1 : currentStep,
        );
        setRepeatCount(0);
      }

      if (PREVIOUS_STEP_TRANSCRIPTIONS.some((value) => value === transcript)) {
        setCurrentStep((currentStep) =>
          currentStep !== 0 ? currentStep - 1 : 0,
        );
        setRepeatCount(0);
      }

      if (CURRENT_STEP_TRANSCRIPTIONS.some((value) => value === transcript)) {
        setRepeatCount((repeat) => repeat + 1);
      }

      if (CANCEL_STEP_TRANSCRIPTIONS.some((value) => value === transcript)) {
        speechSynthesis.cancel();
      }
    };

    recognition.start();
  }, [speak, currentStep, getStepText, steps]);

  useEffect(() => {
    const text = getStepText(currentStep) ?? "";
    speak(text);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCookingText(text);
  }, [currentStep, repeatCount, speak, getStepText]);

  // to activate
  const onKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "ArrowUp") {
        onDetectSpeech();
      }
      if (event.code === "Escape") {
        console.log(event.code, speechRecognition);
        setIsCookingMode(false);
        speechSynthesis.cancel();
      }
    },
    [onDetectSpeech, speechRecognition],
  );

  useEffect(() => {
    const fn = () => {
      if (isCookingMode) {
        speechRecognition.start();
      } else {
        speechRecognition.stop();
      }
    };
    if (!isCookingMode) {
      speechRecognition?.stop();
      speechRecognition?.removeEventListener("end", fn);
    }
    speechRecognition?.addEventListener("end", fn);

    return () => {
      speechRecognition?.removeEventListener("end", fn);
    };
  }, [speechRecognition, isCookingMode]);

  useEffect(() => {
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [onKeyUp]);

  useEffect(() => {
    speechSynthesis.onvoiceschanged = () => {
      synthesisVoices.setVoices(speechSynthesis.getVoices());
    };
  }, []);

  return (
    <div className="instructions">
      <div
        className="overlay"
        style={isCookingMode ? { display: "flex" } : { display: "none" }}
      >
        <div className="text">{cookingText}</div>
      </div>
      <ol ref={orderedList}>
        {steps.map((step, key) => (
          <li key={key} className="flex mt-5" aria-label={`stap ${key + 1}`}>
            <div className="step-count" aria-hidden={true}>
              {key + 1}
            </div>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {step}
            </Typography>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeInstructions;
