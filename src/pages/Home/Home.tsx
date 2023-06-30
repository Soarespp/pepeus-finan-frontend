import React from "react";

import { Typography, Grid } from "@mui/material";
import { CreditCard, LocalAtm, AssessmentOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import * as S from "./Home.styles";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "calc(100vh - 120px)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={3}
        gap={4}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Grid item md>
          <S.ButtonMaterial
            variant="text"
            onClick={() => navigate("/financeiro")}
          >
            <S.ContainerButton>
              <LocalAtm fontSize="large" />
              <Typography>Financeiro</Typography>
            </S.ContainerButton>
          </S.ButtonMaterial>
        </Grid>
        <Grid item md>
          <S.ButtonMaterial
            variant="text"
            onClick={() => navigate("/parcelados")}
          >
            <S.ContainerButton>
              <CreditCard fontSize="large" />
              <Typography>Parcelados</Typography>
            </S.ContainerButton>
          </S.ButtonMaterial>
        </Grid>
        <Grid item md>
          <S.ButtonMaterial variant="text" onClick={() => navigate("/resumo")}>
            <S.ContainerButton>
              <AssessmentOutlined fontSize="large" />
              <Typography>Resumo</Typography>
            </S.ContainerButton>
          </S.ButtonMaterial>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
