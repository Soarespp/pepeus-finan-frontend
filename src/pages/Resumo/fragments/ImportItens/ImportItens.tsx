import React, { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useFinanContext } from "../../../../contexts/financeiro/FinanContexts";
import { sumParceladosMes } from "../../../../utils/utilParcelados";
import { getLancamentosMes } from "../../../../utils/utilsLancamentos";

type ItemSelectType = { info: string; id: string; checked: boolean };

const ImportItens = ({
  open,
  setOpen,
  importDados,
}: {
  open: boolean;
  setOpen: (param: boolean) => void;
  importDados: (
    param: {
      descricao: string;
      valor: number;
    }[]
  ) => void;
}) => {
  const { lancamentos, parcelados, extras } = useFinanContext();

  const [dataImprot, setDataImport] = useState([
    { info: "Cartões", id: "1", checked: true },
    { info: "Extra", id: "2", checked: true },
    ...lancamentos.map((lanc) => ({
      info: lanc.descricao,
      id: lanc._id,
      checked: true,
    })),
  ]);

  const changeSelect = (itemSelected: ItemSelectType) => {
    setDataImport((old) => [
      ...old.map((ft) => {
        if (ft === itemSelected) {
          return { ...itemSelected, checked: !itemSelected.checked };
        }
        return ft;
      }),
    ]);
  };

  const importaDados = () => {
    let imp: { descricao: string; valor: number }[] = [];

    if (dataImprot.filter((item) => item.id === "1").length > 0) {
      imp.push({
        descricao: "Cartão",
        valor: sumParceladosMes(parcelados, new Date()),
      });
    }

    if (dataImprot.filter((item) => item.id === "2").length > 0) {
      imp.push(
        extras?.reduce(
          (sum, currente) => ({ ...sum, valor: -currente.valor }),
          { descricao: "Extras", valor: 0 }
        )
      );
    }

    const getLancamentosCheckeds = dataImprot
      .filter((item) => item.id !== "1" && item.id !== "2")
      .filter((item) => item.checked);

    const returnLancCheckeds = lancamentos.filter(
      (lancFilter) =>
        getLancamentosCheckeds.filter(
          (testeFil) => testeFil.info === lancFilter.descricao
        ).length > 0
    );

    const sumLancamentosChecked = getLancamentosMes(
      returnLancCheckeds,
      new Date()
    );

    importDados([...imp, ...sumLancamentosChecked]);
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        <FormControlLabel
          label="Seleciona todos"
          control={
            <Checkbox
              checked={dataImprot.filter((item) => !item.checked).length === 0}
              onChange={() =>
                setDataImport((old) =>
                  old.map((item) => ({
                    ...item,
                    checked: !(
                      dataImprot.filter((item) => !item.checked).length === 0
                    ),
                  }))
                )
              }
            />
          }
        />
      </DialogTitle>
      <DialogContent dividers>
        <FormGroup>
          {dataImprot?.map((imp, key) => (
            <FormControlLabel
              key={key}
              label={imp.info}
              control={
                <Checkbox
                  checked={imp.checked}
                  onChange={() => changeSelect(imp)}
                />
              }
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={importaDados}>Importar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImportItens;
