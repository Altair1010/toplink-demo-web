import type { ComponentType, ReactNode, SVGProps } from "react";

export type GlyphName =
  | "arrow-left"
  | "arrow-right"
  | "badge-check"
  | "book-open"
  | "calendar"
  | "check"
  | "clock"
  | "heart"
  | "heart-pulse"
  | "leaf"
  | "map-pin"
  | "menu"
  | "message"
  | "minus"
  | "phone"
  | "plus"
  | "play"
  | "quote"
  | "sparkles"
  | "x"
  | "clipboard"
  | "hand"
  | "eye"
  | "target"
  | "graduation"
  | "alert"
  | "navigation"
  | "handshake"
  | "user"
  | "mail"
  | "facebook"
  | "image"
  | "loader"
  | "info";

export type GlyphProps = SVGProps<SVGSVGElement> & { name: GlyphName; label?: string };

/** Toplink's compact, stroke-based glyph vocabulary. Decorative glyphs are hidden by default. */
export function Glyph({ name, label, children, ...props }: GlyphProps) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const path = paths[name];
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      {...common}
      {...props}
    >
      {label ? <title>{label}</title> : null}
      {path}
      {children}
    </svg>
  );
}

const paths: Record<GlyphName, ReactNode> = {
  "arrow-left": (
    <>
      <path d="m14 6-6 6 6 6" />
      <path d="M8 12h10" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="m10 6 6 6-6 6" />
      <path d="M6 12h10" />
    </>
  ),
  check: <path d="m5 12 4.5 4.5L19 7" />,
  "badge-check": (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="m8.5 12 2.3 2.3 4.8-5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="1" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  phone: <path d="M7 4h3l1 5-2 1c1 2 2 3 4 4l1-2 5 1v3c0 1-1 2-2 2C10 18 6 14 6 7c0-2 1-3 1-3Z" />,
  message: <path d="M5 5h14v10H9l-4 4V5Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  x: <path d="m6 6 12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  play: <path d="m9 7 8 5-8 5V7Z" />,
  quote: <path d="M7 10H4v5h4v-5c0-2 1-3 3-4M17 10h-3v5h4v-5c0-2 1-3 3-4" />,
  image: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="1" />
      <circle cx="9" cy="10" r="1" />
      <path d="m5 17 5-5 3 3 2-2 4 4" />
    </>
  ),
  leaf: <path d="M19 4C10 4 5 8 5 15c0 3 2 5 5 5 7 0 9-9 9-16ZM5 20c3-4 6-6 10-8" />,
  heart: <path d="M12 20S4 15 4 9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 6-6 11-6 11Z" />,
  "heart-pulse": (
    <path d="M3 12h4l2-4 3 8 2-4h7M12 20S5 16 5 10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 6-7 10-7 10Z" />
  ),
  sparkles: (
    <>
      <path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" />
      <path d="m19 16 .5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2Z" />
    </>
  ),
  loader: <path d="M20 12a8 8 0 1 1-2.3-5.7" />,
  info: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4 3 20h18L12 4Z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  "book-open": (
    <>
      <path d="M4 5c3-1 5 0 8 2v13c-3-2-5-3-8-2V5Z" />
      <path d="M20 5c-3-1-5 0-8 2v13c3-2 5-3 8-2V5Z" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="5" width="14" height="16" rx="1" />
      <path d="M9 5V3h6v2M9 10h6M9 14h6" />
    </>
  ),
  hand: (
    <path d="M8 12V6a1 1 0 0 1 2 0v5V5a1 1 0 0 1 2 0v6V6a1 1 0 0 1 2 0v6l1-2a1 1 0 0 1 2 1l-2 6c-1 3-3 4-6 4-3 0-5-2-5-5v-4a1 1 0 0 1 2 0Z" />
  ),
  eye: (
    <>
      <path d="M3 12s3-5 9-5 9 5 9 5-3 5-9 5-9-5-9-5Z" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  graduation: (
    <>
      <path d="m3 10 9-5 9 5-9 5-9-5Z" />
      <path d="M7 12v4c3 2 7 2 10 0v-4" />
    </>
  ),
  navigation: <path d="m20 4-7 16-2-7-7-2 16-7Z" />,
  handshake: <path d="m4 10 4-4 4 3 4-3 4 4-6 6-2-2-2 2-6-6Z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="3" />
      <path d="M5 20c1-4 3-6 7-6s6 2 7 6" />
    </>
  ),
  mail: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="1" />
      <path d="m5 7 7 6 7-6" />
    </>
  ),
  facebook: (
    <path d="M14 21v-8h3l.5-3H14V8.5c0-1 .4-1.5 1.7-1.5H18V4.2c-.5-.1-1.5-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.4V10H8v3h3.3v8H14Z" />
  ),
};

function named(name: GlyphName): ComponentType<SVGProps<SVGSVGElement>> {
  return function NamedGlyph(props) {
    return <Glyph {...props} name={name} />;
  };
}
export const ArrowLeft = named("arrow-left");
export const ArrowRight = named("arrow-right");
export const BadgeCheck = named("badge-check");
export const BookOpen = named("book-open");
export const CalendarDays = named("calendar");
export const Check = named("check");
export const CheckIcon = Check;
export const CircleCheckIcon = named("badge-check");
export const ClipboardList = named("clipboard");
export const Clock = named("clock");
export const Eye = named("eye");
export const Facebook = named("facebook");
export const GraduationCap = named("graduation");
export const Hand = named("hand");
export const Handshake = named("handshake");
export const Heart = named("heart");
export const HeartPulse = named("heart-pulse");
export const ImageIcon = named("image");
export const InfoIcon = named("info");
export const Leaf = named("leaf");
export const Loader2 = named("loader");
export const Loader2Icon = Loader2;
export const Mail = named("mail");
export const MapPin = named("map-pin");
export const Menu = named("menu");
export const MessageCircle = named("message");
export const MessagesSquare = MessageCircle;
export const Minus = named("minus");
export const Navigation = named("navigation");
export const OctagonXIcon = named("x");
export const Phone = named("phone");
export const Play = named("play");
export const Plus = named("plus");
export const Quote = named("quote");
export const Sparkles = named("sparkles");
export const Target = named("target");
export const TriangleAlertIcon = named("alert");
export const UserRound = named("user");
export const X = named("x");
