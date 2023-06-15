import { endOfMonth, isAfter, isBefore, isEqual } from "date-fns";

export const ValidaPeriodo = (
  dtItem: Date | undefined,
  dtValida: Date,
  dtCompra?: Date
): boolean => {
  return (
    (!dtItem ||
      isAfter(endOfMonth(dtItem), endOfMonth(dtValida)) ||
      isEqual(endOfMonth(dtItem), endOfMonth(dtValida))) &&
    (!dtCompra ||
      (!!dtCompra && !dtItem) ||
      isBefore(endOfMonth(dtCompra), endOfMonth(dtValida)))
  );
};
