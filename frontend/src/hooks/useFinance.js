import { useContext } from "react";
import { FinanceContext } from "../context/FinancesContext";

export const useFinance = () => {
  const context = useContext(FinanceContext);
  return context;
}