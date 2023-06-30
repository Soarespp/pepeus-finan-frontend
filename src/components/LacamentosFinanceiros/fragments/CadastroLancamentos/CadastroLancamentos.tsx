import React from "react";

import {
  Input,
  InputLabel,
  MenuItem,
  Button,
  TextField,
  Grid,
  Switch,
  FormControlLabel,
  Select,
} from "@mui/material";

import { addMonths, format } from "date-fns";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useFinanContext } from "../../../../contexts/financeiro/FinanContexts";
import { LacamentosType } from "../../../../hooks/useLancamentos/useLancamentos";

import { categoriasData } from "../../../../hooks/useCategoria/useCategoria";

const lancamentoSchema = z.object({
  descricao: z.string().nonempty({
    message: "Descrição obrigatória",
  }),
  valor: z.coerce.number().min(0.01),
  vezes: z.coerce.number().optional(),
  dtCompra: z.coerce.date().optional(),
  type: z.enum(["despesa", "receita"]),
  lancamentoCard: z.coerce.boolean().optional(),
  resumo: z.coerce.boolean().optional(),
  categoria: z.any().optional(),
});

type LancamentoData = z.infer<typeof lancamentoSchema>;

const CadastroLancamentos = ({
  onClose,
  categorias,
}: {
  onClose: () => void;
  categorias: categoriasData | undefined;
}) => {
  const { addLancamento } = useFinanContext();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LancamentoData>({
    resolver: zodResolver(lancamentoSchema),
  });

  const onSubmit = (data: LancamentoData) => {
    let dadosInsert: Partial<LacamentosType> = {
      ...data,
      categoria: { _id: data.categoria },
    };

    !!data?.vezes
      ? (dadosInsert.dtFim = addMonths(data.dtCompra || new Date(), data.vezes))
      : delete dadosInsert.vezes;

    addLancamento(dadosInsert);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "auto" }}>
      <Grid
        container
        xs={12}
        sx={{
          padding: "12px",
          justifyContent: "center",
        }}
      >
        <Grid container item xs={12} sm={6} sx={{ padding: "12px" }} gap={2}>
          <Grid item sm={6} xs={12}>
            <InputLabel id="input-dtcompra">Tipo Lançamento</InputLabel>
            <Select
              label="Tipo lacamento"
              fullWidth
              defaultValue="receita"
              {...register("type")}
              error={!!errors?.type}
            >
              <MenuItem value="receita">Receita</MenuItem>
              <MenuItem value="despesa">Despesa</MenuItem>
            </Select>
          </Grid>
          <Grid item sm={5} xs={12}>
            <InputLabel id="input-dtcompra">Dt. Compra</InputLabel>
            <TextField
              id="input-dtcompra"
              type="date"
              fullWidth
              error={!!errors?.dtCompra}
              defaultValue={format(new Date(), "yyyy-MM-dd")}
              {...register("dtCompra")}
            />
          </Grid>
          <Grid item sm={11} xs={12}>
            <Input
              placeholder="Descrição"
              fullWidth
              {...register("descricao")}
              error={!!errors?.descricao}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <InputLabel id="input-valor">Valor</InputLabel>
            <Input
              id="input-valor"
              type="number"
              fullWidth
              {...register("valor")}
              error={!!errors?.valor}
            />
          </Grid>
          <Grid item sm={5} xs={12}>
            <InputLabel id="input-vezes">Vezes</InputLabel>
            <Input
              placeholder="Vezes"
              id="input-vezes"
              fullWidth
              type="number"
              {...register("vezes")}
              error={!!errors?.vezes}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <InputLabel id="select-categoria">Tipo Lançamento</InputLabel>
            <Select
              label="Categorias"
              fullWidth
              id="select-categoria"
              {...register("categoria")}
              error={!!errors?.type}
            >
              {categorias?.map((categoria) => (
                <MenuItem value={categoria._id}>{categoria.descricao}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={5.8}>
            <FormControlLabel
              {...register("lancamentoCard")}
              control={<Switch color="primary" />}
              label="Lançameto em cartão"
              labelPlacement="start"
            />
          </Grid>
          <Grid item xs={12} sm={5.8}>
            <FormControlLabel
              {...register("resumo")}
              control={<Switch color="primary" />}
              label="Apenas para Prospecção"
              labelPlacement="start"
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={10}
            justifyContent="flex-end"
            textAlign="end"
            gap={3}
          >
            <Button variant="text" type="reset" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit">
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default CadastroLancamentos;
