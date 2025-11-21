import type React from "react";
import { useEffect, useState } from "react";

// Type definition for the beforeinstallprompt Event (not yet standard)
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

// Extend Navigator interface to include 'standalone'
interface NavigatorStandalone extends Navigator {
  standalone?: boolean;
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as NavigatorStandalone).standalone === true
  );
}

export const PWAInstall: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState<boolean>(isStandalone());

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setInstalled(true);
      setDeferredPrompt(null);
    });
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  if (installed || !deferredPrompt) return null;

  const onInstallClick = async () => {
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setInstalled(true);
        setDeferredPrompt(null);
      }
    } catch (err) {
      console.error("PWA install failed", err);
    }
  };

  return (
    <button
      type="button"
      onClick={onInstallClick}
      className="ml-auto inline-flex items-center gap-1 rounded-md border border-border bg-background/60 px-2 py-1 text-xs font-medium text-foreground hover:bg-accent/10 transition-colors"
    >
      <svg
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Install App Icon</title>
        <path d="M12 3v14" />
        <path d="M5 10l7 7 7-7" />
        <path d="M5 21h14" />
      </svg>
      Install App
    </button>
  );
};
