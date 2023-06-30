import React, { memo, useMemo, useState } from "react";
import { Carteira as PropCarteira } from "../../hooks/useCarteira/useCarteira";
import {
  Input,
  Typography,
  Button,
  Grid,
  IconButton,
  InputLabel,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface CarteiraProps {
  carteiraData: PropCarteira | undefined;
  applayCarteira: (carteira: Partial<PropCarteira>) => void;
}

const Carteira = memo(({ carteiraData, applayCarteira }: CarteiraProps) => {
  const [data, setData] = useState<Partial<PropCarteira>>();

  const changeData = (valor: string | number, field: string) => {
    setData((old) => ({ ...old, [field]: valor, alterado: true }));
  };

  const changeCard = (valor: string | number, field: string, index: number) => {
    if (!data || !data.cartoes) {
      return;
    }

    setData((old) => ({
      ...old,
      alterado: true,
      cartoes:
        old?.cartoes?.map((item, key) => {
          if (key === index) {
            return { ...item, [field]: valor };
          }

          return { ...item };
        }) || [],
    }));
  };

  const deleteCard = (key: number) => {
    setData((old) => ({
      ...old,
      alterado: true,
      cartoes: [
        ...(old?.cartoes?.filter((item, index) => index !== key) || []),
      ],
    }));
  };

  const saveCard = () => {
    if (!data) {
      return;
    }

    if (
      (data.cartoes?.filter((item) => item.descricao === "")?.length || 0) > 0
    ) {
      alert("informar os dados para os cartões!");
      return;
    }

    applayCarteira(data);
  };

  useMemo(() => {
    setData(carteiraData);
  }, [carteiraData]);

  return (
    <Grid container sx={{ boxShadow: "0px 2px 2px 2px gray", padding: "12px" }}>
      <Grid container item xs={12} gap={5}>
        <Grid item sm={6} xs={12}>
          <InputLabel htmlFor="salario">Salario</InputLabel>
          <Input
            fullWidth
            value={data?.salario}
            type="number"
            id="salario"
            onChange={(event) => {
              changeData(Number(event.target.value), "salario");
            }}
            defaultValue={data?.salario}
          />
        </Grid>
        {data?.alterado && (
          <Grid container item sm={5} xs={12} textAlign="center">
            <Grid item sm={6} xs={12} textAlign="center">
              <Button
                onClick={() => {
                  setData(carteiraData);
                }}
                fullWidth
                color="error"
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item sm={6} xs={12} textAlign="center">
              <Button
                onClick={saveCard}
                fullWidth
                color="success"
                variant="contained"
              >
                Aplicar Dados
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid
        container
        item
        xs={12}
        sx={{
          paddingTop: "12px",
          boxShadow: " 0px 0px 2px 0px gray",
          padding: "12px",
          margin: " 8px 0px",
        }}
      >
        <Grid item xs={10}>
          <Typography>Cartoes</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={() => {
              !!data &&
                setData((old) => ({
                  ...old,
                  alterado: true,
                  cartoes: [
                    ...(old?.cartoes || []),
                    { descricao: "", valor: 0 },
                  ],
                }));
            }}
          >
            Add
          </Button>
        </Grid>

        {data?.cartoes?.map((cartao, key) => (
          <Grid
            container
            item
            xs={12}
            gap={2}
            key={key}
            sx={{ padding: "3px 0px" }}
          >
            <Grid item xs={12} sm={4}>
              <InputLabel htmlFor="descicao-card">Nome Cartão</InputLabel>
              <Input
                fullWidth
                value={cartao.descricao}
                id="descicao-card"
                onChange={(event) => {
                  changeCard(event.target.value, "descricao", key);
                }}
                defaultValue={cartao?.descricao}
              />
            </Grid>
            <Grid item xs={10} sm={4}>
              <InputLabel htmlFor="valor-card">Valor</InputLabel>
              <Input
                fullWidth
                value={cartao.valor}
                type="number"
                id="valor-card"
                onChange={(event) => {
                  changeCard(Number(event.target.value), "valor", key);
                }}
                defaultValue={cartao?.valor}
              />
            </Grid>
            <Grid item xs={1} justifyContent="center">
              <IconButton onClick={() => deleteCard(key)}>
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
});

export default Carteira;
