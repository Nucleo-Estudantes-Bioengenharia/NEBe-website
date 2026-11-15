import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BrainCircuit,
  Bus,
  ChartColumn,
  Factory,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Hexagon,
  Landmark,
  Layers,
  Leaf,
  Library,
  Lightbulb,
  Mic,
  Microscope,
  PartyPopper,
  PersonStanding,
  Dna,
  Search,
  School,
  Users,
  Wrench,
  BookOpen,
} from "lucide-react";

/**
 * Configuração central do site: tudo o que não é texto traduzível
 * (contactos, ligações, datas e ícones) vive aqui.
 */
export const siteConfig = {
  shortName: "NEBe",
  // TODO: confirmar os contactos oficiais do núcleo.
  email: "nebe.ualg@gmail.com",
  instagram: "https://www.instagram.com/nebe.ualg/",
  linkedin: "https://www.linkedin.com/company/nebe-ualg/",
  courseUrl: "https://www.ualg.pt/curso/1907",
  mapsUrl:
    "https://maps.google.com/?q=Campus+de+Gambelas+Universidade+do+Algarve",
} as const;

/** Secções da página, pela ordem em que aparecem na navbar. */
export const navSections = [
  { id: "sobre", key: "about" },
  { id: "atividades", key: "activities" },
  { id: "recursos", key: "resources" },
] as const;

export const joinSectionId = "junta-te";

/** Áreas do diagrama, no sentido dos ponteiros do relógio a partir do topo. */
export const areas: { key: AreaKey; icon: LucideIcon }[] = [
  { key: "health", icon: HeartPulse },
  { key: "tissue", icon: Hexagon },
  { key: "cellular", icon: Microscope },
  { key: "materials", icon: Layers },
  { key: "data", icon: ChartColumn },
  { key: "industry", icon: Factory },
  { key: "food", icon: FlaskConical },
  { key: "environment", icon: Leaf },
  { key: "biotech", icon: Dna },
  { key: "biomechanics", icon: PersonStanding },
  { key: "signals", icon: BrainCircuit },
  { key: "devices", icon: Activity },
];

export type AreaKey =
  | "health"
  | "tissue"
  | "cellular"
  | "materials"
  | "data"
  | "industry"
  | "food"
  | "environment"
  | "biotech"
  | "biomechanics"
  | "signals"
  | "devices";

export const pillars = [
  { key: "represent", icon: Mic },
  { key: "connect", icon: Users },
  { key: "learn", icon: Lightbulb },
  { key: "unite", icon: PartyPopper },
] as const;

export const activities = [
  { key: "workshops", icon: Wrench },
  { key: "talks", icon: Mic },
  { key: "visits", icon: Bus },
  { key: "conference", icon: GraduationCap },
  { key: "mentoring", icon: BookOpen },
  { key: "social", icon: PartyPopper },
] as const;

export const resources = [
  { key: "course", icon: GraduationCap, href: siteConfig.courseUrl },
  { key: "ualg", icon: School, href: "https://www.ualg.pt/" },
  { key: "aaualg", icon: Users, href: "https://www.aaualg.pt/" },
  { key: "pubmed", icon: Search, href: "https://pubmed.ncbi.nlm.nih.gov/" },
  { key: "bon", icon: Library, href: "https://www.b-on.pt/" },
  { key: "oe", icon: Landmark, href: "https://www.ordemengenheiros.pt/" },
] as const;
