import {
  getDriedFruits,
  getFehydratedFruits,
  getGranola,
  getMix,
} from "@/lib/products";
import { Section } from "../models";

export const sections: Section[] = [
  {
    name: "Frutos Secos",
    ref: "frutos-secos",
    function: getDriedFruits,
  },
  {
    name: "Frutas Deshidratadas",
    ref: "frutas-deshidratadas",
    function: getFehydratedFruits,
  },
  {
    name: "Granola",
    ref: "granola",
    function: getGranola,
  },
  {
    name: "Mix",
    ref: "mix",
    function: getMix,
  },
];
