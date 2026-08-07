"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { APPOINTMENT_BOOKING_HREF } from "@/lib/appointment-booking";
import { AppointmentBookingModal } from "./appointment-booking-modal";

export type AppointmentBookingOptions = {
  subject?: string;
  source?: string;
};

type AppointmentBookingContextValue = {
  isOpen: boolean;
  openBookingModal: (options?: AppointmentBookingOptions) => void;
  closeBookingModal: () => void;
  registerTrigger: (element: HTMLElement | null) => void;
  options: AppointmentBookingOptions;
};

const AppointmentBookingContext =
  createContext<AppointmentBookingContextValue | null>(null);

export function AppointmentBookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AppointmentBookingOptions>({});
  const triggerRef = useRef<HTMLElement | null>(null);

  const registerTrigger = useCallback((element: HTMLElement | null) => {
    triggerRef.current = element;
  }, []);

  const openBookingModal = useCallback((nextOptions?: AppointmentBookingOptions) => {
    setOptions(nextOptions ?? {});
    setIsOpen(true);
  }, []);

  const closeBookingModal = useCallback(() => {
    setIsOpen(false);
    setOptions({});
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash !== APPOINTMENT_BOOKING_HREF) {
        return;
      }

      openBookingModal();
      history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);

    return () => {
      window.removeEventListener("hashchange", openFromHash);
    };
  }, [openBookingModal]);

  const value = useMemo(
    () => ({
      isOpen,
      openBookingModal,
      closeBookingModal,
      registerTrigger,
      options,
    }),
    [closeBookingModal, isOpen, openBookingModal, options, registerTrigger],
  );

  return (
    <AppointmentBookingContext.Provider value={value}>
      {children}
      <AppointmentBookingModal />
    </AppointmentBookingContext.Provider>
  );
}

export function useAppointmentBooking() {
  const context = useContext(AppointmentBookingContext);

  if (!context) {
    throw new Error(
      "useAppointmentBooking must be used within AppointmentBookingProvider",
    );
  }

  return context;
}
