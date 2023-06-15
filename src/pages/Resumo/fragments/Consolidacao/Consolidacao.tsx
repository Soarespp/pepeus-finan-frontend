import React, { useState } from "react";

import {
  Input,
  Grid,
  Button,
  Menu,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useFinanContext } from "../../../../contexts/financeiro/FinanContexts";
import { endOfMonth, isAfter, isEqual } from "date-fns";
import ImportItens from "../ImportItens";
import { sumParceladosMes } from "../../../../utils/utilParcelados";

type ShcemaData = {
  descricao: string;
  valor: number;
}[];

const returnItemConsul = (
  item: { descricao: string; valor: number },
  key: number,
  changeValue: (descricao: string, key: number, value: number | string) => void
) => {
  return (
    <>
      <Grid item xs={5}>
        <InputLabel htmlFor="valor-inpt">Valor</InputLabel>
        <Input
          fullWidth
          name="valor-inpt"
          value={item?.valor}
          type="number"
          onChange={(event) => {
            changeValue("valor", key, Number(event.target.value));
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <InputLabel htmlFor="descricao-inpt">Descrição</InputLabel>
        <Input
          fullWidth
          value={item?.descricao}
          defaultValue={item.descricao}
          onChange={(event) => {
            changeValue("descricao", key, event.target.value);
          }}
        />
      </Grid>
    </>
  );
};

const Consolidacao = () => {
  const { salario, lancamentos, extras, parcelados } = useFinanContext();
  const [data, setData] = useState<ShcemaData>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openImports, setOpenImports] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeValue = (field: string, key: number, value: number | string) => {
    const filterValue = data.map((item, id) => {
      if (id === key) {
        return { ...item, [field]: value };
      }

      return item;
    });
    setData(filterValue);
  };

  function importAllLacamentos() {
    const updateLanc = lancamentos
      ?.filter(
        (lanc) =>
          !lanc?.dtFim ||
          isAfter(endOfMonth(lanc?.dtFim), endOfMonth(new Date())) ||
          isEqual(endOfMonth(lanc?.dtFim), endOfMonth(new Date()))
      )
      .map((lanc) => ({
        descricao: lanc.descricao,
        valor: lanc.type === "despesa" ? -1 * lanc.valor : lanc.valor,
      }));

    const updateCard = {
      descricao: "Cartões",
      valor: sumParceladosMes(parcelados, new Date()),
    };

    const updateExtas = {
      descricao: "extras",
      valor: extras?.reduce((sum, curr) => sum + curr.valor, 0),
    };

    importLacamentos([...updateLanc, updateExtas, updateCard]);
  }

  function importLacamentos(data: any) {
    setData((old) => [...old, ...data]);
  }

  const sumValor = () => {
    const valor =
      salario +
      data?.reduce((sum, curr) => {
        return sum + curr.valor;
      }, 0);

    return valor?.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <Grid container padding="12px">
      <Grid container item xs={12} textAlign="center">
        <Grid item xs={8}>
          <Typography> Consolidacao</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={() =>
              setData((old) => [...old, { descricao: "", valor: 0 }])
            }
          >
            ADD
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={handleClick}>Opções</Button>
        </Grid>
        <Grid container gap={2} item xs={12}>
          <Grid item xs={5}>
            <FormControl fullWidth>
              <InputLabel htmlFor="valSalario-inpt">Valor</InputLabel>
              <Input
                value={salario?.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
                readOnly
                fullWidth
                name="valSalario-inpt"
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="salario-inpt">Valor</InputLabel>
              <Input value="Salario" readOnly fullWidth name="salario-inpt" />
            </FormControl>
          </Grid>

          {data?.map((item, key) => returnItemConsul(item, key, changeValue))}
          <Grid item xs={5}>
            <Typography variant="h5">{sumValor()}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5"> Total</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            importAllLacamentos();
          }}
        >
          Importa todos
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenImports(true);
            handleClose();
          }}
        >
          Selecionar Importados
        </MenuItem>
        <MenuItem
          onClick={() => {
            setData([]);
            handleClose();
          }}
        >
          Limpar
        </MenuItem>
      </Menu>
      <ImportItens
        open={openImports}
        setOpen={setOpenImports}
        importDados={setData}
      />
    </Grid>
  );
};

export default Consolidacao;
