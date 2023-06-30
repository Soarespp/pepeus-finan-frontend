import React, { useEffect, useMemo, useState } from "react";

import {
  Input,
  Button,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useFinanContext } from "../../contexts/financeiro/FinanContexts";

import NotSearch from "../NotSearch/NotSearch";
import { categoriasData } from "../../hooks/useCategoria/useCategoria";

const Categorias = () => {
  const {
    categoria: dataCategoria,
    user,
    AplicarCategorias,
    getDadosCategoria,
  } = useFinanContext();

  const [categorias, setCategorias] = useState<categoriasData>();
  const [changes, setChanges] = useState<boolean>(false);

  const onChange = (valor: string, field: string, key: number) => {
    setCategorias((old) => [
      ...(old?.map((item, index) => {
        if (index !== key) {
          return { ...item };
        }

        if (item.type === "NEW") {
          return { ...item, [field]: valor };
        }

        return { ...item, type: "UPDATE" as "UPDATE", [field]: valor };
      }) || []),
    ]);
    setChanges(true);
  };

  const onDelete = (key: number) => {
    const valor = categorias?.find((categoria, idx) => idx === key);

    console.log({ valor });
    if (!valor || valor?.type === "NEW") {
      return setCategorias(
        (old) => old?.filter((categoria, idx) => idx !== key) || []
      );
    }

    setCategorias((old) => [
      ...(old?.filter((categoria, idx) => idx !== key) || []),
      { ...valor, type: "DELETE" },
    ]);
    setChanges(true);
  };

  useMemo(() => {
    setCategorias(dataCategoria);
  }, [dataCategoria]);

  useEffect(() => {
    getDadosCategoria(user.id);
  }, [user.id]);

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
                  setCategorias(dataCategoria);
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
                  if (categorias) {
                    AplicarCategorias(categorias);
                    setChanges(false);
                    // getDadosCategoria(user.id);
                  }
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
              setCategorias((old) => [
                ...(old || []),
                { descricao: "", color: "#ffffff", type: "NEW", user: user.id },
              ]);
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      {(!categorias || categorias?.length === 0) && (
        <NotSearch type="Variaveis" />
      )}
      {categorias
        ?.filter((item) => item.type !== "DELETE")
        ?.map((categorias, key: number) => (
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
                <InputLabel htmlFor="descricao-categoria">Descrição</InputLabel>
                <Input
                  value={categorias.descricao}
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
                <InputLabel htmlFor="color-categoria">Valor</InputLabel>
                <Input
                  type="color"
                  value={categorias.color}
                  fullWidth
                  name="valor-extra"
                  onChange={(event) =>
                    onChange(event.target.value, "color", key)
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

export default Categorias;
