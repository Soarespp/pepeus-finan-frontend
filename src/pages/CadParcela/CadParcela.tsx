import React, { useMemo } from "react";

import {
  TextField,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useForm, useFieldArray } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { addMonths, format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useFinanContext } from "../../contexts/financeiro/FinanContexts";

const finanSchema = z.object({
  descricao: z.string().nonempty({
    message: "Descrição obrigatória",
  }),
  valor: z.coerce.number().min(0.01),
  vezes: z.coerce.number().min(1),
  dtCompra: z.string().nonempty("Data de compra é obrigatorio"),
  observacao: z.string(),
  pessoas: z.array(
    z.object({
      name: z.string().nonempty("nome e obrigatorio"),
    })
  ),
});

type FinanData = z.infer<typeof finanSchema>;

const CadParcela = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<FinanData>({
    resolver: zodResolver(finanSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pessoas",
  });

  const { addParcelado, parcelados, updateParcelado } = useFinanContext();
  const { state } = useLocation();

  const addDivisao = () => {
    append({ name: "" });
  };

  useMemo(() => {
    if (!!state?.idParcela) {
      const dataUpdate = parcelados?.find(
        (itens) => itens.id === state.idParcela
      );

      reset({
        descricao: dataUpdate?.descricao,
        valor: dataUpdate?.valor,
        vezes: dataUpdate?.vezes,
        dtCompra: format(dataUpdate?.dtCompra as Date, "yyyy-MM-dd"),
        observacao: dataUpdate?.observacao,
        pessoas: dataUpdate?.pessoas,
      });
    }
  }, [parcelados, state, reset]);

  const onSubmit = (data: FinanData) => {
    const dtFim = addMonths(new Date(data.dtCompra), data.vezes);

    let dadosInsert = {
      valor: data.valor,
      descricao: data.descricao,
      cartao: "particular",
      vezes: data.vezes,
      dtFim,
      dtCompra: new Date(data.dtCompra),
      observacao: data.observacao,
      pessoas: data.pessoas,
    };

    !!state?.idParcela
      ? updateParcelado({ ...dadosInsert, id: state?.idParcela })
      : addParcelado({
          ...dadosInsert,
          id: `P-${format(new Date(), "yyyyMMddhhmmssT")}`,
        });
    navigate("/parcelados");
  };

  const onCancel = () => {
    navigate("/parcelados");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        xs={12}
        sm={6}
        gap={2}
        sx={{
          margin: "20px auto",
          boxShadow: "0px 2px 2px 2px grey",
          padding: "6px",
        }}
      >
        <Grid item xs={12}>
          <Typography>Cadastro de Parcelas</Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            {...register("descricao")}
            label="Descrição"
            error={!!errors?.descricao}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl>
            <InputLabel htmlFor="valor">Valor</InputLabel>
            <OutlinedInput
              id="valor"
              error={!!errors?.valor}
              {...register("valor")}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Valor"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            {...register("vezes")}
            label="Num. Parcelas"
            error={!!errors?.vezes}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <label htmlFor="dtcompra">dtCompra</label>
          <TextField
            id="dtcompra"
            type="date"
            error={!!errors?.dtCompra}
            defaultValue={format(new Date(), "yyyy-MM-dd")}
            {...register("dtCompra")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            {...register("observacao")}
            label="Obervação"
          />
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={10} sm={11}>
            <Typography variant="subtitle2" paddingLeft={2}>
              Divididos
            </Typography>
          </Grid>
          <Grid item xs={2} sm={1}>
            <IconButton onClick={addDivisao}>
              <PersonAddAltIcon />
            </IconButton>
          </Grid>
          <Grid container item xs={12}>
            {fields.map((field, index) => (
              <Grid container item xs={12} key={field.id}>
                <Grid item xs={11} key={field.id}>
                  <TextField
                    label="Nome"
                    fullWidth
                    {...register(`pessoas.${index}.name`)}
                  />
                </Grid>
                <Grid item xs={1} key={field.id}>
                  <IconButton onClick={() => remove(index)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid container item xs={12} direction="row-reverse">
          <Grid item xs={6} sm={3}>
            <Button variant="contained" type="submit">
              Salvar
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button type="reset" onClick={() => onCancel()}>
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default CadParcela;
