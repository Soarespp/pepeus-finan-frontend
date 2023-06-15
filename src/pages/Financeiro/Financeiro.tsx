import React, { useState } from "react";

import {
  Box,
  Input,
  Typography,
  Button,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Extras from "./fragments/Extras";

import { useFinanContext } from "../../contexts/financeiro/FinanContexts";
import CadastroLancamentos from "./fragments/CadastroLancamentos";
import LacamentosFinan from "./fragments/LacamentosFinanceiros/LacamentosFinanceiros";

const Financeiro = () => {
  const { salario, setSalario } = useFinanContext();
  const [openCadastro, setOpenCadastro] = useState<boolean>(false);

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const renderSalario = () => (
    <Input
      value={salario}
      type="number"
      onChange={(event) => {
        setSalario(Number(event.target.value));
      }}
      defaultValue={salario}
    />
  );

  const listFinan = [
    {
      name: "salario",
      title: "Salario",
      subTitle: "",
      content: renderSalario(),
    },
    {
      name: "receitas",
      title: "Receitas",
      subTitle: "",
      content: <LacamentosFinan type="receita" />,
    },
    {
      name: "despesas",
      title: "Despesas",
      subTitle: "",
      content: <LacamentosFinan type="despesa" />,
    },
    {
      name: "extras",
      title: "Extras",
      subTitle: "",
      content: <Extras />,
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
          />
        )}
        {!openCadastro && (
          <Grid item xs={12} textAlign="end">
            <Button onClick={() => setOpenCadastro((old) => !old)} color="info">
              Cadastrar
            </Button>
          </Grid>
        )}
        {listFinan.map((item) => (
          <Grid item xs={12}>
            <Accordion
              expanded={expanded === item.name}
              onChange={handleChange(item.name)}
              sx={{ backgroundColor: "#b3fdb384" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id={`expand-${item.name}`}
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {item.title}
                </Typography>
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
