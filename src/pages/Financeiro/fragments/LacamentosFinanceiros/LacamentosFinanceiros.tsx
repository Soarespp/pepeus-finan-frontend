import React, { memo } from "react";
import { useFinanContext } from "../../../../contexts/financeiro/FinanContexts";

import { Grid, IconButton, Chip, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NotSearch from "../../../../components/NotSearch";
import { isAfter, isBefore } from "date-fns";
import { LacamentosData } from "../../../../hooks/useLancamentos/useLancamentos";

interface typoLancamentos {
  type: "receita" | "despesa";
  lancamentos: LacamentosData;
  delLancamento: (idDel: string) => void;
}

const LacamentosFinan = memo(
  ({ type, lancamentos, delLancamento }: typoLancamentos) => {
    const filterLancamentos = () =>
      lancamentos
        ?.filter((item) => item.type === type)
        .filter((item) =>
          !!item.dtFim ? isAfter(item.dtFim, new Date()) : true
        );

    return (
      <Grid container item xs={12}>
        {filterLancamentos()?.length === 0 && <NotSearch type={type} />}
        {filterLancamentos()
          ?.sort((a, b) => {
            if (a.descricao < b.descricao) {
              return -1;
            }
            if (a.descricao > b.descricao) {
              return 1;
            }
            return 0;
          })
          .map((lancamento) => (
            <Grid
              container
              item
              xs={12}
              key={lancamento?._id}
              boxShadow="0px 3px 3px 3px #888888"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={5.5}>
                <Typography paddingLeft="6px">
                  {lancamento?.descricao}
                </Typography>
              </Grid>
              <Grid container item xs={10} sm={6}>
                <Grid item xs={6} sm={5}>
                  {lancamento?.lancamentoCard && (
                    <Chip
                      label="Cartão"
                      sx={{ marginTop: "12px" }}
                      color="primary"
                      variant="outlined"
                    />
                  )}
                  {lancamento?.resumo && (
                    <Chip
                      label="Prospecção"
                      sx={{ marginTop: "12px" }}
                      color="primary"
                      variant="outlined"
                    />
                  )}
                </Grid>
                <Grid item xs={6} sm={3}>
                  <p>
                    {lancamento?.valor.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </Grid>
                <Grid item xs={12} sm={3}>
                  {lancamento?.dtFim && (
                    <p>{`Dt.fim: ${lancamento?.dtFim?.toLocaleDateString()}`}</p>
                  )}
                </Grid>
              </Grid>
              {!lancamento?.default && (
                <Grid item xs={1} sm={0.5}>
                  <IconButton onClick={() => delLancamento(lancamento._id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          ))}
      </Grid>
    );
  }
);

export default LacamentosFinan;
