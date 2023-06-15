import React from "react";

import { Grid, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useFinanContext } from "../../contexts/financeiro/FinanContexts";
import CardParcelados from "./fragments/CardParcelados/CardParcelados";
import { endOfMonth, isAfter, isEqual } from "date-fns";
import NotSearch from "../../components/NotSearch";

const Parcelas = () => {
  const navigate = useNavigate();
  const { parcelados } = useFinanContext();

  const dadosFilter = parcelados?.filter(
    (item) =>
      !item?.dtFim ||
      isAfter(endOfMonth(item?.dtFim), endOfMonth(new Date())) ||
      isEqual(endOfMonth(item?.dtFim), endOfMonth(new Date()))
  );

  return (
    <Grid container gap={2} style={{ marginTop: "20px" }}>
      <Grid item sm={8} justifyContent="center" textAlign="center">
        <Typography variant="h4"> Parcelados</Typography>
      </Grid>
      <Grid item sm={3} justifyContent="center" textAlign="center">
        <Button onClick={() => navigate("/cad-parcela")}>Cadastrar</Button>
      </Grid>
      <Grid container item gap={2}>
        {dadosFilter.length === 0 && <NotSearch type="parcela" />}
        {dadosFilter
          ?.sort((a, b) => a.dtFim.getTime() - b.dtFim.getTime())
          .map((parcela, index) => (
            <CardParcelados key={index} parcela={parcela} />
          ))}
      </Grid>
    </Grid>
  );
};

export default Parcelas;
