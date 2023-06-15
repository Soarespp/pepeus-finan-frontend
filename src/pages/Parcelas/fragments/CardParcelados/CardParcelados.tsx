import React, { useState } from "react";

import { IconButton, Menu, MenuItem, Grid, Tooltip } from "@mui/material";
import { MoreVertOutlined } from "@mui/icons-material";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Parcela,
  useFinanContext,
} from "../../../../contexts/financeiro/FinanContexts";
import { useNavigate } from "react-router-dom";
import { TextTitle } from "./CardParcelados.styles";

type typeCardParcelados = {
  parcela: Parcela;
};
const CardParcelados = ({ parcela }: typeCardParcelados) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { delParcelado } = useFinanContext();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const hasPessoas = (parcela.pessoas?.length || 0) + 1;
  let valParcela = parcela.valor / parcela.vezes / hasPessoas;

  return (
    <Grid
      container
      item
      boxShadow={"0px 2px 2px 2px grey"}
      direction="row"
      justifyContent="center"
    >
      <Grid item sm={4} xs={12}>
        <TextTitle paddingLeft={3}>{parcela.descricao}</TextTitle>
      </Grid>
      <Grid container item sm={4} xs={12}>
        <Grid item sm={5} xs={12}>
          <TextTitle>{`Valor Parcela: ${valParcela?.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}`}</TextTitle>
        </Grid>
        <Grid item sm={5} xs={12}>
          <TextTitle>{`Valor Total: ${parcela.valor?.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}`}</TextTitle>
        </Grid>
        {hasPessoas > 1 && (
          <Grid item sm={2}>
            <Tooltip title={parcela.pessoas?.map((div) => div.name).toString()}>
              <TextTitle>Divididos</TextTitle>
            </Tooltip>
          </Grid>
        )}
      </Grid>
      <Grid container item sm={4} xs={12}>
        <Grid item sm={10} xs={11}>
          <TextTitle>{`Ultima parcela: ${format(parcela.dtFim, "MMMM/yy", {
            locale: ptBR,
          })}`}</TextTitle>
        </Grid>
        <Grid item sm={2} xs={1}>
          <IconButton size="small" onClick={handleMenu}>
            <MoreVertOutlined color="action" fontSize="large" />
          </IconButton>
          <Menu
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorEl={anchorEl}
          >
            <MenuItem
              onClick={() => {
                navigate("/cad-parcela", { state: { idParcela: parcela.id } });
              }}
            >
              Editar
            </MenuItem>
            <MenuItem onClick={() => delParcelado(parcela.id)}>
              Excluir
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CardParcelados;
