import React from "react";
import { useFinanContext } from "../../../../contexts/financeiro/FinanContexts";

import { Grid, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NotSearch from "../../../../components/NotSearch";

type typoLancamentos = { type: "receita" | "despesa" };

const LacamentosFinan = ({ type }: typoLancamentos) => {
  const { lancamentos, delLancamento } = useFinanContext();
  const Dados = lancamentos?.filter((item) => item.type === type);

  return (
    <Grid container item xs={12}>
      {Dados.length === 0 && <NotSearch type={type} />}
      {Dados.map((lancamento) => (
        <Grid
          container
          item
          xs={12}
          key={lancamento?.id}
          boxShadow="0px 3px 3px 3px #888888"
        >
          <Grid item xs={12} sm={5}>
            <p>{lancamento?.descricao}</p>
          </Grid>
          <Grid item xs={12} sm={3}>
            <p>
              {lancamento?.valor.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </Grid>
          <Grid item xs={9} sm={3}>
            <p>{lancamento?.dtFim?.toLocaleDateString()}</p>
          </Grid>
          {!lancamento?.default && (
            <Grid item xs={3} sm={1}>
              <IconButton onClick={() => delLancamento(lancamento.id)}>
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default LacamentosFinan;
