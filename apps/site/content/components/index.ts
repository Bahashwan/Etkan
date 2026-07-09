import type { ComponentDoc } from "../component-doc";

import button from "./button";
import iconButton from "./icon-button";
import input from "./input";
import textarea from "./textarea";
import select from "./select";
import checkbox from "./checkbox";
import radio from "./radio";
import switchDoc from "./switch";
import badge from "./badge";
import tag from "./tag";
import card from "./card";
import table from "./table";
import pagination from "./pagination";
import tabs from "./tabs";
import menu from "./menu";
import dialog from "./dialog";
import toast from "./toast";
import tooltip from "./tooltip";
import saudiRiyal from "./saudi-riyal";

/** All component docs in display order. */
export const docList: ComponentDoc[] = [
  button,
  iconButton,
  input,
  textarea,
  select,
  checkbox,
  radio,
  switchDoc,
  badge,
  tag,
  card,
  table,
  pagination,
  tabs,
  menu,
  dialog,
  toast,
  tooltip,
  saudiRiyal,
];

/** Lookup by slug. */
export const docs: Record<string, ComponentDoc> = Object.fromEntries(
  docList.map((d) => [d.slug, d]),
);
