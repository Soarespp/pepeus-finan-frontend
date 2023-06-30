import React, { useEffect } from "react";

import { Grid, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { endOfMonth, isAfter, isEqual } from "date-fns";

import { useFinanContext } from "../../contexts/financeiro/FinanContexts";
import { ParcelaData } from "../../hooks/useParcelados/useParcelados";

import NotSearch from "../../components/NotSearch";
import CardParcelados from "./fragments/CardParcelados/CardParcelados";

const Parcelas = () => {
  const navigate = useNavigate();
  const { parcelados, user, getDadosParcelados } = useFinanContext();

  useEffect(() => {
    if (user.id) {
      getDadosParcelados(user.id);
    }
  }, []);

  const dadosFilter = (dataFilter: ParcelaData) =>
    dataFilter?.filter((item) => {
      return (
        !item?.dtFim ||
        isAfter(endOfMonth(item.dtFim), endOfMonth(new Date())) ||
        isEqual(endOfMonth(item.dtFim), endOfMonth(new Date()))
      );
    });

  return (
    <Grid container gap={2} style={{ marginTop: "20px" }}>
      <Grid item sm={10} xs={8} justifyContent="center" textAlign="center">
        <Typography variant="h4"> Parcelados</Typography>
      </Grid>
      <Grid item sm={1} xs={3} justifyContent="center" textAlign="center">
        <Button onClick={() => navigate("/cad-parcela")}>Cadastrar</Button>
      </Grid>
      {!parcelados || dadosFilter(parcelados).length === 0 ? (
        <NotSearch type="parcela" />
      ) : (
        <Grid container item gap={2}>
          {dadosFilter(parcelados)
            ?.sort((a, b) => a?.dtFim.getTime() - b?.dtFim.getTime())
            .map((parcela, index) => (
              <CardParcelados key={index} parcela={parcela} />
            ))}
        </Grid>
      )}
    </Grid>
  );
};

export default Parcelas;
