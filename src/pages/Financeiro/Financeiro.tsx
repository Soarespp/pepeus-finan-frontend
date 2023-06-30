import React, { useMemo, useState } from "react";

import {
  Box,
  Typography,
  Button,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { isAfter } from "date-fns";

import Extras from "../../components/Extras";

import { useFinanContext } from "../../contexts/financeiro/FinanContexts";
import CadastroLancamentos from "../../components/LacamentosFinanceiros/fragments/CadastroLancamentos";
import LacamentosFinan from "../../components/LacamentosFinanceiros/LacamentosFinanceiros";

import Carteira from "../../components/Carteira/Carteira";
import Variaveis from "../../components/Variaveis";
import Categorias from "../../components/Categorias";

const Financeiro = () => {
  const {
    carteira,
    categoria,
    AtualizarDadosFinan,
    applayCarteira,
    user,
    lancamentos,
    delLancamento,
  } = useFinanContext();

  const [openCadastro, setOpenCadastro] = useState<boolean>(false);

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  /* eslint-disable */
  useMemo(() => {
    AtualizarDadosFinan();
  }, [user]);
  /* eslint-enable */

  const somaLancamento = (type: string, total: boolean = false) =>
    lancamentos
      ?.filter((item) => item.type === type)
      .filter((item) => (!!item.dtFim ? isAfter(item.dtFim, new Date()) : true))
      .reduce(
        (sum, value) =>
          sum + value.valor / (total && !!value.vezes ? value.vezes : 1),
        0
      );

  const listFinan = [
    {
      name: "salario",
      title: "Carteira",
      subTitle: "",
      content: (
        <Carteira carteiraData={carteira} applayCarteira={applayCarteira} />
      ),
    },
    {
      name: "receitas",
      title: "Receitas",
      subTitle: `Total ${somaLancamento("receita").toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      })} com parcial de ${somaLancamento("receita", true).toLocaleString(
        "pt-br",
        {
          style: "currency",
          currency: "BRL",
        }
      )}`,
      content: (
        <LacamentosFinan
          type="receita"
          lancamentos={lancamentos}
          delLancamento={delLancamento}
        />
      ),
    },
    {
      name: "despesas",
      title: "Despesas",
      subTitle: `Total ${somaLancamento("despesa").toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      })} com parcial de ${somaLancamento("despesa", true).toLocaleString(
        "pt-br",
        {
          style: "currency",
          currency: "BRL",
        }
      )}`,
      content: (
        <LacamentosFinan
          type="despesa"
          lancamentos={lancamentos}
          delLancamento={delLancamento}
        />
      ),
    },
    {
      name: "extras",
      title: "Extras",
      subTitle: "",
      content: <Extras />,
    },
    {
      name: "variaveis",
      title: "Variaveis",
      subTitle: "",
      content: <Variaveis />,
    },
    {
      name: "categorias",
      title: "Categorias financeiras",
      subTitle: "",
      content: <Categorias />,
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "95%",
        marginTop: "26px",
        boxShadow: "0px 4px 4px 4px #888888",
      }}
    >
      <Grid container>
        {openCadastro && (
          <CadastroLancamentos
            onClose={() => {
              setOpenCadastro(false);
              setExpanded(false);
            }}
            categorias={categoria}
          />
        )}
        {!openCadastro && (
          <Grid item xs={12} textAlign="end">
            <Button
              onClick={() => {
                setOpenCadastro((old) => !old);
                setExpanded(false);
              }}
              color="info"
            >
              Cadastrar
            </Button>
          </Grid>
        )}
        {listFinan.map((item) => (
          <Grid item xs={12} key={item.name}>
            <Accordion
              expanded={expanded === item.name}
              onChange={handleChange(item.name)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id={`expand-${item.name}`}
              >
                {item.title && (
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    {item.title}
                  </Typography>
                )}
                {item.subTitle && (
                  <Typography sx={{ color: "text.secondary" }}>
                    {item.subTitle}
                  </Typography>
                )}
              </AccordionSummary>
              <AccordionDetails>{item.content}</AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Financeiro;
