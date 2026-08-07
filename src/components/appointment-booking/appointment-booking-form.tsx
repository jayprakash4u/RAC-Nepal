"use client";

import { appointmentBookingContent } from "@/data/appointment-booking";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import { useState } from "react";
import type { AppointmentBookingOptions } from "./appointment-booking-provider";

const fieldClassName = cn(
  "w-full rounded-md border border-slate-200 bg-background px-md py-sm",
  "text-body text-navy placeholder:text-slate-600",
  "transition-colors duration-normal",
  "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
);

type AppointmentBookingFormProps = {
  options?: AppointmentBookingOptions;
  onSuccess?: () => void;
};

export function AppointmentBookingForm({
  options,
  onSuccess,
}: AppointmentBookingFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const { form, appointmentTypes, preferredTimes, success } =
    appointmentBookingContent;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    onSuccess?.();
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-primary/20 bg-primary-soft/40 p-xl text-center">
        <p className="text-body font-semibold text-navy">{success.title}</p>
        <p className="mt-sm text-small leading-relaxed text-slate-600">
          {success.description}
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
          <span className="text-small font-medium text-navy">{form.phoneLabel}</span>
          <input
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            placeholder={form.phonePlaceholder}
            className={fieldClassName}
          />
        </label>
      </div>

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

      <label className="flex flex-col gap-xs">
        <span className="text-small font-medium text-navy">{form.typeLabel}</span>
        <select
          name="appointmentType"
          required
          defaultValue=""
          className={cn(fieldClassName, "cursor-pointer")}
        >
          <option value="" disabled>
            {form.typePlaceholder}
          </option>
          {appointmentTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-lg sm:grid-cols-2">
        <label className="flex flex-col gap-xs">
          <span className="text-small font-medium text-navy">{form.dateLabel}</span>
          <input
            type="date"
            name="preferredDate"
            min={new Date().toISOString().split("T")[0]}
            className={fieldClassName}
          />
        </label>

        <label className="flex flex-col gap-xs">
          <span className="text-small font-medium text-navy">{form.timeLabel}</span>
          <select
            name="preferredTime"
            defaultValue=""
            className={cn(fieldClassName, "cursor-pointer")}
          >
            <option value="">{form.timePlaceholder}</option>
            {preferredTimes.map((time) => (
              <option key={time.value} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-xs">
        <span className="text-small font-medium text-navy">{form.messageLabel}</span>
        <textarea
          name="message"
          rows={4}
          defaultValue={options?.subject ?? ""}
          placeholder={form.messagePlaceholder}
          className={cn(fieldClassName, "resize-y")}
        />
      </label>

      {options?.source ? (
        <input type="hidden" name="source" value={options.source} readOnly />
      ) : null}

      <div>
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          {form.submitLabel}
        </Button>
      </div>
    </form>
  );
}
