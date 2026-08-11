"use client";

import { isAppointmentBookingHref } from "@/lib/appointment-booking";
import Link from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";
import { useAppointmentBooking } from "./appointment-booking-provider";

type AppointmentBookingLinkProps = {
  href: string;
  className?: string;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
} & Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "href" | "className" | "children" | "onClick"
>;

export function AppointmentBookingLink({
  href,
  onClick,
  children,
  className,
  ...rest
}: AppointmentBookingLinkProps) {
  const { openBookingModal, registerTrigger } = useAppointmentBooking();

  if (!isAppointmentBookingHref(href)) {
    return (
      <Link href={href} className={className} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    registerTrigger(event.currentTarget);
    openBookingModal();
    onClick?.(event);
  }

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
