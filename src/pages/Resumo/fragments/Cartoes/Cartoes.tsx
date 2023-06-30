import React, { memo, useState } from "react";
import Month from "../Month/Month";
import { getYear } from "date-fns";
import { ParcelaData } from "../../../../hooks/useParcelados/useParcelados";

interface CartoesProps {
  parcelados: ParcelaData;
  year: Date;
}

const Cartoes = memo(({ parcelados, year }: CartoesProps) => {
  const [openOpenArvore, setOpenArvore] = useState<boolean>(false);

  const onChangeOpenArvore = () => {
    setOpenArvore((old) => !old);
  };

  return (
    <>
      <Month
        row={{
          descricao: "Cartões",
          type: "despesa",
          valor: 0,
        }}
        year={getYear(year)}
        itens={parcelados}
        eventClick={onChangeOpenArvore}
      />
      {openOpenArvore &&
        parcelados
          ?.filter(
            (item) =>
              !item.dtFim ||
              (getYear(item.dtFim) >= getYear(year) &&
                getYear(item.dtCompra || new Date()) <= getYear(year))
          )
          .map((row, idx) => (
            <Month
              row={row}
              year={getYear(year)}
              subItem={"#d6d4d4"}
              key={idx}
            />
          ))}
    </>
  );
});

export default Cartoes;
