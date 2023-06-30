import React, { useEffect, useState } from "react";

import {
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Grid,
  Button,
  Typography,
} from "@mui/material";

import { addYears, getYear } from "date-fns";

import { useFinanContext } from "../../contexts/financeiro/FinanContexts";

import Month from "./fragments/Month";
import Consolidacao from "./fragments/Consolidacao";
import { getExtraSum } from "../../utils/utilsExtra";
import ControleMes from "./fragments/Consolidacao/Fragments/ControleMes/ControleMes";
import Lancamentos from "./fragments/Lancamentos";
import Cartoes from "./fragments/Cartoes/Cartoes";

const Resumo = () => {
  const {
    lancamentos,
    carteira,
    extras,
    parcelados,
    AtualizarDadosGeral,
    applayCarteira,
  } = useFinanContext();
  const [year, setYear] = useState(new Date());

  /* eslint-disable */
  useEffect(() => {
    AtualizarDadosGeral();
  }, []);
  /* eslint-enable */

  return (
    <Grid
      container
      sx={{
        margin: "20px auto",
        display: "flex",
      }}
      gap={2}
    >
      <Grid container item xs={12} gap={2} justifyContent="center">
        <ControleMes
          carteira={carteira}
          parcelados={parcelados}
          lancamentos={lancamentos}
          extras={extras}
          applayCarteira={applayCarteira}
        />
        <Consolidacao />
      </Grid>
      <Grid container item xs={12}>
        <Grid
          item
          justifyContent="center"
          textAlign="center"
          xs={12}
          display="flex"
          sx={{ boxShadow: "0px 2px 2px 2px gray" }}
        >
          <Button onClick={() => setYear(addYears(year, -1))}>Prev</Button>
          <Typography variant="h6">{getYear(year)}</Typography>
          <Button onClick={() => setYear(addYears(year, 1))}>Next</Button>
        </Grid>
        <Grid container sx={{ boxShadow: "0px 1px 1px 1px gray" }}>
          <Grid
            container
            item
            xs={12}
            justifyContent="center"
            textAlign="center"
          >
            <TableContainer style={{ maxWidth: "85vw" }}>
              <TableHead>
                <TableRow>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">Janeiro</TableCell>
                  <TableCell align="right">Fevereiro</TableCell>
                  <TableCell align="right">Março</TableCell>
                  <TableCell align="right">Abril</TableCell>
                  <TableCell align="right">Maio</TableCell>
                  <TableCell align="right">Junho</TableCell>
                  <TableCell align="right">Julho</TableCell>
                  <TableCell align="right">Agosto</TableCell>
                  <TableCell align="right">Setembro</TableCell>
                  <TableCell align="right">Outubro</TableCell>
                  <TableCell align="right">Novembro</TableCell>
                  <TableCell align="right">Dezembro</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <Month
                  row={{
                    descricao: "Salario",
                    type: "receita",
                    valor: carteira?.salario || 0,
                  }}
                  year={getYear(year)}
                />
                <Lancamentos
                  lancamentos={lancamentos}
                  type="receita"
                  year={year}
                />
                {parcelados && <Cartoes parcelados={parcelados} year={year} />}
                <Lancamentos
                  lancamentos={lancamentos}
                  type="despesa"
                  year={year}
                />
                <Month
                  row={{
                    descricao: "Extras",
                    type: "receita",
                    valor: getExtraSum(extras),
                  }}
                  year={getYear(year)}
                />
                <Month
                  row={{
                    descricao: "Total",
                    valor: carteira?.salario,
                  }}
                  total={[
                    {
                      descricao: "lancamentos",
                      itens: lancamentos,
                    },
                    {
                      descricao: "parcelados",
                      itens: parcelados,
                    },
                    {
                      descricao: "extras",
                      itens: extras,
                    },
                  ]}
                  year={getYear(year)}
                />
              </TableBody>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Resumo;
