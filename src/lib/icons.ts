import {
  Activity,
  ArrowUp,
  Copy,
  DraftingCompass,
  FileText,
  Folder,
  FolderOpen,
  Gauge,
  Mail,
  Minus,
  Moon,
  Share2,
  Square,
  Sun,
  UserRound,
  X,
} from 'lucide';
import { siGithub } from 'simple-icons';

type IconNode = ReadonlyArray<readonly [string, Record<string, string | number | undefined>]>;
export interface IconDef {
  node: IconNode;
  /** true = glyphe plein (logos de marque), false = trait Lucide */
  fill: boolean;
}

const stroke = (node: unknown): IconDef => ({ node: node as IconNode, fill: false });

/** Glyphe « in » (tracé CC0 issu d'anciennes versions de Simple Icons). */
const linkedinPath =
  'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z';

export const icons = {
  activity: stroke(Activity),
  'arrow-up': stroke(ArrowUp),
  restore: stroke(Copy),
  'drafting-compass': stroke(DraftingCompass),
  'file-text': stroke(FileText),
  folder: stroke(Folder),
  'folder-open': stroke(FolderOpen),
  gauge: stroke(Gauge),
  mail: stroke(Mail),
  minus: stroke(Minus),
  moon: stroke(Moon),
  share: stroke(Share2),
  square: stroke(Square),
  sun: stroke(Sun),
  'user-round': stroke(UserRound),
  x: stroke(X),
  github: { node: [['path', { d: siGithub.path }]], fill: true },
  linkedin: { node: [['path', { d: linkedinPath }]], fill: true },
} satisfies Record<string, IconDef>;

export type IconName = keyof typeof icons;
