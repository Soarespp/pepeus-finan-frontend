import { ExtraData, ExtraType } from "../hooks/useExtras/useExtras";

export const getExtraSum = (dados: ExtraType): number => {
  const resultSum = dados?.reduce(
    (previus: number, currente: Partial<ExtraData> | undefined) => {
      return previus + (currente?.valor || 0);
    },
    0
  );

  return resultSum;
};
