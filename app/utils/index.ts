import { getDriedFruits, getFehydratedFruits } from "@/lib/products";
import { Section } from "../models";

export const sections: Section[] = [
  {
    name: "Frutos Secos",
    function: getDriedFruits,
  },
  {
    name: "Frutas Deshidratadas",
    function: getFehydratedFruits,
  },
];
