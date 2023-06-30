import React, { useMemo, useState } from "react";

import {
  Input,
  Button,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useFinanContext } from "../../../../contexts/financeiro/FinanContexts";
import NotSearch from "../../../../components/NotSearch";
import { typeVariaveis } from "../../../../hooks/useCarteira/useCarteira";

const Variaveis = () => {
  const { carteira, applayCarteira } = useFinanContext();
  const [dataVariaveis, setDataVariaveis] = useState<typeVariaveis>();
  const [changes, setChanges] = useState<boolean>(false);

  const onChange = (valor: number | string, field: string, key: number) => {
    setDataVariaveis((old) => [
      ...(old?.map((item, index) =>
        index === key ? { ...item, [field]: valor } : { ...item }
      ) || []),
    ]);
    setChanges(true);
  };

  const onDelete = (key: number) => {
    setDataVariaveis((old) => [
      ...(old?.filter((item, index) => index !== key) || []),
    ]);
    setChanges(true);
  };

  useMemo(() => {
    setDataVariaveis(carteira?.variaveis);
  }, [carteira?.variaveis]);

  return (
    <Grid container item xs={12} gap={1}>
      <Grid container item xs={12} justifyContent="end" gap={1}>
        {changes && (
          <>
            <Grid item xs={5} sm={2}>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={() => {
                  setDataVariaveis(carteira?.variaveis);
                  setChanges(false);
                }}
              >
                Cancelar Alterações
              </Button>
            </Grid>
            <Grid item xs={5} sm={2} textAlign="end">
              <Button
                variant="outlined"
                color="info"
                fullWidth
                onClick={() => {
                  applayCarteira({ ...carteira, variaveis: dataVariaveis });
                  setChanges(false);
                }}
              >
                APLICAR VALORES
              </Button>
            </Grid>
          </>
        )}
        <Grid item xs={6} sm={1} textAlign="end">
          <Button
            onClick={() => {
              setDataVariaveis((old) => [
                ...(old || []),
                {
                  valor: 0,
                  descricao: "",
                  type: "receita",
                },
              ]);
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      {(!dataVariaveis || dataVariaveis?.length === 0) && (
        <NotSearch type="Variaveis" />
      )}
      {dataVariaveis?.map((variavel, key: number) => (
        <Grid
          container
          gap={2}
          xs={12}
          key={key}
          boxShadow="0px 3px 3px 3px #888888"
          sx={{ padding: "6px" }}
        >
          <Grid item sm={5} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="descricao-extra">Descrição</InputLabel>
              <Input
                value={variavel.descricao}
                fullWidth
                name="descricao-extra"
                onChange={(event) =>
                  onChange(event.target.value, "descricao", key)
                }
              />
            </FormControl>
          </Grid>
          <Grid item sm={4} xs={8}>
            <FormControl fullWidth>
              <InputLabel htmlFor="valor-extra">Valor</InputLabel>
              <Input
                type="number"
                value={variavel.valor}
                fullWidth
                name="valor-extra"
                onChange={(event) =>
                  onChange(Number(event.target.value), "valor", key)
                }
              />
            </FormControl>
          </Grid>

          <Grid item sm={1} xs={2}>
            <IconButton onClick={() => onDelete(key)}>
              <DeleteOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default Variaveis;
