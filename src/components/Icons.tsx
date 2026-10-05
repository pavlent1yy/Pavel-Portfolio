type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const TelegramIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M21 4 3 11l6 2.5M21 4l-3.5 16-8.5-6.5M21 4 9 13.5V19l3-3.2" />
  </svg>
);

export const MailIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const GithubIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </svg>
);

export const VkIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <path d="M7 8.5c.3 4.3 2.4 7 5.8 7v-2.7c1.2.1 2.1 1.2 2.6 2.7H17.5c-.5-1.9-1.9-3.1-2.7-3.5.8-.5 2-1.7 2.4-3.5h-1.9c-.5 1.6-1.5 2.7-2.5 2.9V8.5h-1.9v5c-1.2-.3-2.6-1.8-2.7-5Z" />
  </svg>
);

export const LinkedinIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0" />
  </svg>
);

export const SparkIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 3c.5 4.5 2.5 6.5 7 7-4.5.5-6.5 2.5-7 7-.5-4.5-2.5-6.5-7-7 4.5-.5 6.5-2.5 7-7ZM19 16v4M17 18h4" />
  </svg>
);

export const ExternalIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export const GlobeIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
  </svg>
);

export const SunIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
  </svg>
);

export const MoonIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
  </svg>
);

const bulbGlass = "M12 4a5.6 5.6 0 0 0-3.4 10.1c.6.5.9 1.1.9 1.9v.5h5v-.5c0-.8.3-1.4.9-1.9A5.6 5.6 0 0 0 12 4Z";

export const BulbOffIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d={bulbGlass} />
    <path d="M9.8 19h4.4M10.6 21.5h2.8" />
  </svg>
);

export const BulbOnIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d={bulbGlass} fill="var(--accent)" />
    <path d="M9.8 19h4.4M10.6 21.5h2.8M12 1v.6M4.2 4.2l.5.5M19.8 4.2l-.5.5M1.5 10h.7M21.8 10h.7" />
  </svg>
);

export const FileIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
);

export const ChevronLeftIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export const BracesIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M8 4C6 4 5.5 5 5.5 7v2c0 1.3-.8 2.2-2 2.5 1.2.3 2 1.2 2 2.5v2c0 2 .5 3 2.5 3M16 4c2 0 2.5 1 2.5 3v2c0 1.3.8 2.2 2 2.5-1.2.3-2 1.2-2 2.5v2c0 2-.5 3-2.5 3" />
  </svg>
);
