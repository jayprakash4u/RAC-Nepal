"use client";

import { contactPage } from "@/data/contact-page";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import { useState } from "react";

const fieldClassName = cn(
  "w-full rounded-md border border-slate-200 bg-background px-md py-sm",
  "text-body text-navy placeholder:text-slate-600",
  "transition-colors duration-normal",
  "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
);

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { form } = contactPage;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-primary/20 bg-primary-soft/50 p-xl text-center">
        <p className="text-body font-semibold text-navy">Thank you for reaching out.</p>
        <p className="mt-sm text-small text-slate-600">
          Our team has received your message and will respond shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
      <div className="grid gap-lg sm:grid-cols-2">
        <label className="flex flex-col gap-xs">
          <span className="text-small font-medium text-navy">{form.nameLabel}</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder={form.namePlaceholder}
            className={fieldClassName}
          />
        </label>

        <label className="flex flex-col gap-xs">
          <span className="text-small font-medium text-navy">{form.emailLabel}</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder={form.emailPlaceholder}
            className={fieldClassName}
          />
        </label>
      </div>

      <div className="grid gap-lg sm:grid-cols-2">
        <label className="flex flex-col gap-xs">
          <span className="text-small font-medium text-navy">{form.phoneLabel}</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder={form.phonePlaceholder}
            className={fieldClassName}
          />
        </label>

        <label className="flex flex-col gap-xs">
          <span className="text-small font-medium text-navy">{form.subjectLabel}</span>
          <input
            type="text"
            name="subject"
            required
            placeholder={form.subjectPlaceholder}
            className={fieldClassName}
          />
        </label>
      </div>

      <label className="flex flex-col gap-xs">
        <span className="text-small font-medium text-navy">{form.messageLabel}</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder={form.messagePlaceholder}
          className={cn(fieldClassName, "resize-y")}
        />
      </label>

      <div>
        <Button type="submit" size="lg">
          {form.submitLabel}
        </Button>
      </div>
    </form>
  );
}
