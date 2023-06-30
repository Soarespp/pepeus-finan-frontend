import React from "react";

import {
  Input,
  Button,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Tooltip,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { useFinanContext } from "../../contexts/financeiro/FinanContexts";
import NotSearch from "../NotSearch";
import { ExtraData } from "../../hooks/useExtras/useExtras";

const Extras = () => {
  const { extras, addExtra, updateExtra, user, applyExtraItem, deleteExtra } =
    useFinanContext();

  const alterExtra = (
    value: string | number | Date,
    field: string,
    keyData: number
  ) => {
    updateExtra(
      extras.map((item, key) => {
        return key === keyData
          ? { ...item, [field]: value, isState: "update" }
          : item;
      })
    );
  };

  return (
    <Grid container item xs={12} gap={2}>
      <Grid item xs={12} textAlign="end">
        <Button
          onClick={() => {
            addExtra({
              valor: 0,
              descricao: "",
              user: user.id,
              isState: "unknown",
            });
          }}
        >
          Add
        </Button>
      </Grid>
      {extras.length === 0 && <NotSearch type="extra" />}
      {extras?.map((extra: ExtraData, key: number) => (
        <Grid
          container
          gap={2}
          xs={12}
          key={key}
          boxShadow="0px 3px 3px 3px #888888"
          sx={{ padding: "6px" }}
        >
          <Grid item sm={5} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="descricao-extra">Descrição</InputLabel>
              <Input
                value={extra.descricao}
                fullWidth
                disabled={extra?.isState === "transaction"}
                name="descricao-extra"
                onChange={(event) =>
                  alterExtra(event.target.value, "descricao", key)
                }
              />
            </FormControl>
          </Grid>
          <Grid item sm={5} xs={8}>
            <FormControl fullWidth>
              <InputLabel htmlFor="valor-extra">Valor</InputLabel>
              <Input
                type="number"
                disabled={extra?.isState === "transaction"}
                value={extra.valor}
                fullWidth
                name="valor-extra"
                onChange={(event) =>
                  alterExtra(Number(event.target.value), "valor", key)
                }
              />
            </FormControl>
          </Grid>
          <Grid item sm={1} xs={2}>
            {extra?.isState === "unknown" || !extra?.isState ? (
              <IconButton
                onClick={() => deleteExtra(key)}
                disabled={extra?.isState === "transaction"}
              >
                <DeleteOutlineIcon />
              </IconButton>
            ) : (
              <Tooltip title="Clice para aplicar as alterações">
                <IconButton
                  onClick={() => applyExtraItem(extra)}
                  disabled={extra?.isState === "transaction"}
                >
                  <CheckCircleOutlineIcon sx={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default Extras;
