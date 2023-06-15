import React from "react";

import {
  Input,
  Button,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useFinanContext } from "../../../../contexts/financeiro/FinanContexts";

const Extras = () => {
  const { extras, addExtra, updateExtra } = useFinanContext();

  const delExtra = (idDel: number) => {
    updateExtra(extras.filter((item, key) => key !== idDel));
  };

  const alterExtra = (
    value: string | number | Date,
    field: string,
    keyData: number
  ) => {
    updateExtra(
      extras.map((item, key) => {
        return key === keyData ? { ...item, [field]: value } : item;
      })
    );
  };
  return (
    <Grid container xs={12} gap={2}>
      <Grid item xs={12} textAlign="end">
        <Button
          onClick={() =>
            addExtra({ valor: 0, descricao: "", dtFim: undefined })
          }
        >
          Add
        </Button>
      </Grid>
      {extras?.map(
        (
          extra: {
            valor: number;
            descricao: string;
            dtFim?: Date;
          },
          key: number
        ) => (
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
              <IconButton onClick={() => delExtra(key)}>
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
        )
      )}
    </Grid>
  );
};

export default Extras;
