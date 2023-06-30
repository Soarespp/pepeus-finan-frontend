import React, { memo, useState } from "react";
import { LacamentosData } from "../../../../hooks/useLancamentos/useLancamentos";
import Month from "../Month/Month";
import { getYear } from "date-fns";

interface LancamentosProps {
  lancamentos: LacamentosData;
  year: Date;
  type: "despesa" | "receita";
}

const Lancamentos = memo(({ lancamentos, year, type }: LancamentosProps) => {
  const [openLancamentos, setOpenLancamentos] = useState<boolean>(false);

  const onChangeOpenLancamentos = () => {
    setOpenLancamentos((old) => !old);
  };

  return (
    <>
      <Month
        row={{
          descricao: "Lançamentos",
          type: type,
          valor: 0,
        }}
        lancamentos={{
          lancamentos,
          type: type,
        }}
        year={getYear(year)}
        eventClick={onChangeOpenLancamentos}
      />
      {openLancamentos &&
        lancamentos
          ?.filter(
            (item) =>
              (!item.dtFim ||
                (getYear(item.dtFim) >= getYear(year) &&
                  getYear(item.dtCompra || new Date()) <= getYear(year))) &&
              item?.type === type
          )
          .map((row, idx) => (
            <Month
              row={row}
              year={getYear(year)}
              subItem={row.categoria?.color || "#d6d4d4"}
              key={idx}
            />
          ))}
    </>
  );
});

export default Lancamentos;
