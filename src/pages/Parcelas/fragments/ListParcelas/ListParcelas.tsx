import React, { memo } from "react";

import { Grid } from "@mui/material";
import CardParcelados from "../CardParcelados";
import { ParcelaData } from "../../../../hooks/useParcelados/useParcelados";

const ListParcelas = memo(({ parcelados }: { parcelados: ParcelaData }) => {
  return (
    <Grid container item gap={2}>
      {parcelados
        ?.sort((a, b) => a?.dtFim.getTime() - b?.dtFim.getTime())
        .map((parcela, index) => (
          <CardParcelados key={index} parcela={parcela} />
        ))}
    </Grid>
  );
});

export default ListParcelas;
