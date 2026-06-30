type ServiceIconProps = {
  size?: number;
  className?: string;
};

const strokePrimary = "var(--color-primary-dark)";
const strokeAccent = "var(--color-primary)";
const fillSoft = "var(--color-primary-soft)";

export function OPDIcon({ size = 34, className }: ServiceIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="17" cy="9" r="5" stroke={strokePrimary} strokeWidth="1.5" />
      <path
        d="M7 28c0-5.523 4.477-10 10-10s10 4.477 10 10"
        stroke={strokePrimary}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="25"
        cy="12"
        r="3.5"
        fill={fillSoft}
        stroke={strokeAccent}
        strokeWidth="1.2"
      />
      <line
        x1="25"
        y1="10.5"
        x2="25"
        y2="13.5"
        stroke={strokeAccent}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <line
        x1="23.5"
        y1="12"
        x2="26.5"
        y2="12"
        stroke={strokeAccent}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DiagnosticIcon({ size = 34, className }: ServiceIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="5"
        y="4"
        width="18"
        height="22"
        rx="2"
        stroke={strokePrimary}
        strokeWidth="1.5"
      />
      <line
        x1="9"
        y1="10"
        x2="19"
        y2="10"
        stroke={strokeAccent}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="9"
        y1="14"
        x2="19"
        y2="14"
        stroke={strokeAccent}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="9"
        y1="18"
        x2="15"
        y2="18"
        stroke={strokeAccent}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle
        cx="25"
        cy="25"
        r="5"
        fill={fillSoft}
        stroke={strokePrimary}
        strokeWidth="1.4"
      />
      <line
        x1="28.5"
        y1="28.5"
        x2="31"
        y2="31"
        stroke={strokePrimary}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="25" cy="25" r="2" fill={strokeAccent} />
    </svg>
  );
}

export function LaboratoryIcon({ size = 34, className }: ServiceIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M13 5v11l-6 10a2 2 0 001.7 3h16.6A2 2 0 0027 26L21 16V5"
        stroke={strokePrimary}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="13"
        y1="9"
        x2="21"
        y2="9"
        stroke={strokeAccent}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="13" cy="23" r="1.5" fill={strokeAccent} />
      <circle cx="18" cy="25" r="1" fill={strokeAccent} />
      <circle cx="22" cy="22" r="1.2" fill={strokeAccent} />
    </svg>
  );
}

export function HomeServiceIcon({ size = 34, className }: ServiceIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 15L17 5l12 10"
        stroke={strokePrimary}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 13v13a1 1 0 001 1h6v-7h4v7h6a1 1 0 001-1V13"
        stroke={strokePrimary}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="26"
        cy="10"
        r="4.5"
        fill={fillSoft}
        stroke={strokeAccent}
        strokeWidth="1.2"
      />
      <line
        x1="26"
        y1="8.5"
        x2="26"
        y2="11.5"
        stroke={strokeAccent}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <line
        x1="24.5"
        y1="10"
        x2="27.5"
        y2="10"
        stroke={strokeAccent}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HelplineIcon({ size = 34, className }: ServiceIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M9 5h3.5l2 5-2.5 2a14 14 0 006 6l2-2.5 5 2V21c0 1.1-.9 2-2 2C11 23 5 12.1 5 7c0-1.1.9-2 2-2z"
        stroke={strokePrimary}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 5c3.3 0 6 2.7 6 6"
        stroke={strokeAccent}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M21 8.5c1.4 0 2.5 1.1 2.5 2.5"
        stroke={strokeAccent}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PharmacyIcon({ size = 34, className }: ServiceIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="6"
        y="10"
        width="22"
        height="18"
        rx="2"
        stroke={strokePrimary}
        strokeWidth="1.5"
      />
      <path
        d="M11 10V7a6 6 0 0112 0v3"
        stroke={strokePrimary}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="12"
        y="17"
        width="10"
        height="5"
        rx="2.5"
        stroke={strokeAccent}
        strokeWidth="1.3"
      />
      <line
        x1="17"
        y1="15.5"
        x2="17"
        y2="23.5"
        stroke={strokeAccent}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}
