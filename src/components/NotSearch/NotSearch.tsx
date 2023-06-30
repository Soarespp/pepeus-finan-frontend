import React from "react";
import { Typography } from "@mui/material";

type typeProps = { type: string };

const NotSearch = ({ type }: typeProps) => {
  return (
    <Typography variant="subtitle1">
      {`Não foram encontrados itens de ${type}.`}{" "}
    </Typography>
  );
};

export default NotSearch;
