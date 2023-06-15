import React, { createContext, useContext, useState } from "react";

type FinanProviderProps = {
  children: React.ReactNode;
};

export type Parcela = {
  id: string;
  valor: number;
  descricao: string;
  cartao: string;
  vezes: number;
  dtFim: Date;
  dtCompra: Date;
  observacao?: string;
  pessoas?: { name: string }[];
};

export type ParcelaData = Parcela[];

export type LacamentosType = {
  id: string;
  descricao: string;
  type: "despesa" | "receita";
  valor: number;
  dtCompra?: Date;
  vezes?: number;
  dtFim?: Date;
  default?: boolean;
};

export type LacamentosData = LacamentosType[];
export const FinanContext = createContext({} as FinanContextData);

export type ExtraData = {
  valor: number;
  descricao: string;
  dtFim?: Date;
};

type FinanContextData = {
  salario: number;
  parcelados: ParcelaData;
  lancamentos: LacamentosData;
  extras: ExtraData[];
  setSalario: (param: number) => void | undefined;
  setParcelados: (param: ParcelaData) => void;
  addParcelado: (newItem: Parcela) => void;
  delParcelado: (idItem: string) => void;
  updateParcelado: (newItem: Parcela) => void;
  addLancamento: (newItem: LacamentosType) => void;
  delLancamento: (idDel: string) => void;
  addExtra: (param: ExtraData) => void;
  updateExtra: (item: ExtraData[]) => void;
};

export const FinanProvider = ({ children }: FinanProviderProps) => {
  const [parcelados, setParcelados] = useState<ParcelaData>([]);
  const [lancamentos, setLancamentos] = useState<LacamentosData>([]);
  const [salario, setSalario] = useState<number>(7000);
  const [extras, setExtras] = useState<ExtraData[]>([]);

  const addParcelado = (newItem: Parcela) => {
    setParcelados((oldVal) => [...oldVal, newItem]);
  };

  const delParcelado = (idItem: string) => {
    setParcelados((oldVal) => oldVal.filter((parc) => parc.id !== idItem));
  };

  const updateParcelado = (newItem: Parcela) => {
    setParcelados((oldVal) => [
      ...oldVal.filter((oldParcel) => oldParcel.id !== newItem.id),
      newItem,
    ]);
  };

  const addLancamento = (newItem: LacamentosType) => {
    setLancamentos((oldVal) => [...oldVal, newItem]);
  };

  const delLancamento = (idDel: string) => {
    setLancamentos((oldVal) => oldVal.filter((item) => item.id !== idDel));
  };

  const addExtra = (item: ExtraData) => {
    setExtras((old) => [...old, item]);
  };

  const updateExtra = (data: ExtraData[]) => {
    setExtras(data);
  };

  const finan = {
    salario,
    parcelados,
    lancamentos,
    extras,
    setSalario,
    setParcelados,
    addParcelado,
    delParcelado,
    updateParcelado,
    addLancamento,
    delLancamento,
    addExtra,
    updateExtra,
  };
  return (
    <FinanContext.Provider value={finan}>{children}</FinanContext.Provider>
  );
};

export const useFinanContext = () => useContext(FinanContext);
