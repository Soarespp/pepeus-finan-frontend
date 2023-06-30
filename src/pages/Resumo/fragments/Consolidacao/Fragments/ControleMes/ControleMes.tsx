import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Grid, Typography, Input, IconButton } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";

import {
  Carteira,
  typeCartoes,
  typeVariaveis,
} from "../../../../../../hooks/useCarteira/useCarteira";
import { ParcelaData } from "../../../../../../hooks/useParcelados/useParcelados";
import { sumParceladosMes } from "../../../../../../utils/utilParcelados";
import { LacamentosData } from "../../../../../../hooks/useLancamentos/useLancamentos";
import { sumLancamentosMes } from "../../../../../../utils/utilsLancamentos";
import { ExtraType } from "../../../../../../hooks/useExtras/useExtras";
import { getExtraSum } from "../../../../../../utils/utilsExtra";

interface propsControleMes {
  carteira: Carteira | undefined;
  parcelados: ParcelaData | undefined;
  lancamentos: LacamentosData | undefined;
  extras: ExtraType | undefined;
  applayCarteira: (data: Partial<Carteira>) => void;
}

const renderItemGrid = (descricao: string, valor?: string | number) => {
  return (
    <Grid container item xs={12} gap={2}>
      <Grid item xs={5} textAlign="end">
        <Typography>{descricao}</Typography>
      </Grid>
      <Grid item xs={5} textAlign="center">
        {valor && (
          <Typography>
            {valor.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

const ControleMes = memo(
  ({
    carteira,
    parcelados,
    lancamentos,
    extras,
    applayCarteira,
  }: propsControleMes) => {
    const [cartoes, setCartoes] = useState<typeCartoes>();
    const [itensVariaveis, setItensVariaveis] = useState<typeVariaveis>();
    const [alterado, setAlterado] = useState<{
      cartoes: boolean;
      variaveis: boolean;
    }>({ cartoes: false, variaveis: false });
    const [total, setTotal] = useState<number>(0);

    const valorSalario = carteira?.salario || 0;

    const valorLancamentos = sumLancamentosMes(
      lancamentos,
      new Date(),
      true,
      true
    );
    const valorParcelados = sumParceladosMes(parcelados, new Date());
    const valorExtras = getExtraSum(extras || []);

    const changeCard = (
      field: string,
      valor: string | number,
      index: number
    ) => {
      setCartoes((old) => [
        ...(old?.map((card, key) => {
          if (key !== index) {
            return { ...card };
          }

          return { ...card, [field]: valor };
        }) || []),
      ]);
      setAlterado((old) => ({ ...old, cartoes: true }));
    };

    const changeVariaveis = (
      field: string,
      valor: string | number,
      index: number
    ) => {
      setItensVariaveis((old) => [
        ...(old?.map((card, key) => {
          if (key !== index) {
            return { ...card };
          }

          return { ...card, [field]: valor };
        }) || []),
      ]);
      setAlterado((old) => ({ ...old, variaveis: true }));
    };

    useMemo(() => {
      setCartoes(carteira?.cartoes);
    }, [carteira?.cartoes]);

    useMemo(() => {
      setItensVariaveis(carteira?.variaveis);
    }, [carteira?.variaveis]);

    const sumCartoes = useCallback(
      (data: typeCartoes) => {
        const somaCartoes = Number(
          data?.reduce((sum, item) => sum + item.valor, 0)
        );

        if (somaCartoes === 0) {
          return 0;
        }
        return (valorParcelados + somaCartoes) * -1;
      },
      [valorParcelados]
    );

    const sumVariaveis = (data: typeVariaveis) =>
      data?.reduce((sum, item) => sum + item.valor, 0);

    useEffect(() => {
      const tot =
        valorSalario +
        valorLancamentos +
        valorParcelados +
        valorExtras +
        (cartoes ? sumCartoes(cartoes) : 0) +
        (itensVariaveis ? sumVariaveis(itensVariaveis) : 0);
      setTotal(tot);
    }, [
      cartoes,
      valorSalario,
      valorLancamentos,
      valorParcelados,
      valorExtras,
      itensVariaveis,
      sumCartoes,
    ]);

    return (
      <Grid
        container
        item
        xs={12}
        sm={5.9}
        sx={{
          margin: "12px 0px 0px 0px",
          boxShadow: " 0px 3px 3px 3px gray",
        }}
      >
        <Grid
          item
          xs={12}
          textAlign="center"
          sx={{ borderBottom: "1px solid gray", marginBottom: "3px" }}
        >
          <Typography>Controle Mensal</Typography>
        </Grid>
        {carteira && renderItemGrid("Salario", valorSalario)}
        {lancamentos && renderItemGrid("Lançamentos", valorLancamentos)}
        {parcelados && renderItemGrid("Parcelados", valorParcelados)}
        {extras && renderItemGrid("Extras", valorExtras)}
        {itensVariaveis && (
          <Grid container item xs={12}>
            {itensVariaveis?.map(({ descricao, valor }, index) => (
              <Grid container item xs={10} key={index} gap={2}>
                <Grid item xs={6} textAlign="end">
                  <Typography>{descricao}</Typography>
                </Grid>
                <Grid item xs={4} textAlign="center">
                  <Input
                    value={valor}
                    type="number"
                    inputProps={{ style: { textAlign: "end" } }}
                    onChange={(event) =>
                      changeVariaveis(
                        "valor",
                        Number(event.target.value),
                        index
                      )
                    }
                  />
                </Grid>
              </Grid>
            ))}
            {alterado.variaveis && (
              <Grid container item xs={2}>
                <Grid item xs={5}>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setItensVariaveis(carteira?.variaveis);
                      setAlterado((old) => ({ ...old, variaveis: false }));
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={5}>
                  <IconButton
                    color="success"
                    onClick={() => {
                      applayCarteira({
                        ...carteira,
                        variaveis: itensVariaveis,
                      });
                      setAlterado((old) => ({ ...old, variaveis: false }));
                    }}
                  >
                    <CheckCircleOutlineIcon />
                  </IconButton>
                </Grid>
              </Grid>
            )}
          </Grid>
        )}
        {cartoes && (
          <Grid container item xs={12}>
            {cartoes?.map(({ descricao, valor }, index) => (
              <Grid container item xs={10} key={index} gap={2}>
                <Grid item xs={6} textAlign="end">
                  <Typography>{descricao}</Typography>
                </Grid>
                <Grid item xs={4} textAlign="center">
                  <Input
                    value={valor}
                    type="number"
                    fullWidth
                    inputProps={{ style: { textAlign: "end" }, min: 0 }}
                    onChange={(event) =>
                      changeCard("valor", Number(event.target.value), index)
                    }
                  />
                </Grid>
              </Grid>
            ))}
            {alterado.cartoes && (
              <Grid container item xs={2}>
                <Grid item xs={5}>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setCartoes(carteira?.cartoes);
                      setAlterado((old) => ({ ...old, cartoes: false }));
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={5}>
                  <IconButton
                    color="success"
                    onClick={() => {
                      applayCarteira({ ...carteira, cartoes });
                      setAlterado((old) => ({ ...old, cartoes: false }));
                    }}
                  >
                    <CheckCircleOutlineIcon />
                  </IconButton>
                </Grid>
              </Grid>
            )}
          </Grid>
        )}
        {renderItemGrid("Total", total)}
      </Grid>
    );
  }
);

export default ControleMes;
