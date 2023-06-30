import { endOfMonth, isAfter, isBefore, isEqual } from "date-fns";

export const ValidaPeriodo = (
  dtFim: Date | undefined,
  dtValida: Date,
  dtCompra?: Date
): boolean => {
  return (
    (!dtFim ||
      isAfter(endOfMonth(dtFim), endOfMonth(dtValida)) ||
      isEqual(endOfMonth(dtFim), endOfMonth(dtValida))) &&
    (!dtCompra ||
      isBefore(endOfMonth(dtCompra), endOfMonth(dtValida)) ||
      isEqual(endOfMonth(dtCompra), endOfMonth(dtValida)))
  );
};
