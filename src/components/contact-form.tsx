"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ContactFormProps = {
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submitLabel: string;
};

export function ContactForm({
  namePlaceholder,
  emailPlaceholder,
  messagePlaceholder,
  submitLabel,
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        setStatus("error");
        setStatusMessage(result.error || "Failed to send message.");
        return;
      }

      setStatus("success");
      setStatusMessage("Message sent successfully.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setStatusMessage("Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="w-full max-w-[420px] space-y-4" onSubmit={onSubmit}>
      <Input
        className="h-10 rounded-lg"
        placeholder={namePlaceholder}
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <Input
        className="h-10 rounded-lg"
        placeholder={emailPlaceholder}
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <Textarea
        className="min-h-34 rounded-lg"
        placeholder={messagePlaceholder}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
      />
      <Button className="h-10 rounded-full px-6 text-base" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending..." : submitLabel}
      </Button>
      {status !== "idle" ? (
        <p className={`text-sm ${status === "success" ? "text-emerald-700" : "text-red-600"}`}>
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}
