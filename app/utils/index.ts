import { getDriedFruits, getFehydratedFruits } from "@/lib/products";
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
];
