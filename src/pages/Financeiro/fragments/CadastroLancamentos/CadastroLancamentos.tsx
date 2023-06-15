import React from "react";

import {
  Input,
  InputLabel,
  MenuItem,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import Select from "@mui/material/Select";

import { format } from "date-fns";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  LacamentosType,
  useFinanContext,
} from "../../../../contexts/financeiro/FinanContexts";

const lancamentoSchema = z.object({
  descricao: z.string().nonempty({
    message: "Descrição obrigatória",
  }),
  valor: z.coerce.number().min(0.01),
  vezes: z.coerce.number().optional(),
  dtCompra: z.coerce.date().optional(),
  type: z.enum(["despesa", "receita"]),
});

type LancamentoData = z.infer<typeof lancamentoSchema>;

const CadastroLancamentos = ({ onClose }: { onClose: () => void }) => {
  const { addLancamento } = useFinanContext();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LancamentoData>({
    resolver: zodResolver(lancamentoSchema),
  });

  const onSubmit = (data: LancamentoData) => {
    let dadosInsert: LacamentosType = {
      ...data,
      id: `L-${format(new Date(), "yyyyMMddhhmmssT")}`,
    };

    !!data?.vezes ? (dadosInsert.dtFim = new Date()) : delete dadosInsert.vezes;

    addLancamento(dadosInsert);
    onClose();
  };

  return (
    <Grid container item xs={12} textAlign="center" justifyContent="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          item
          sm={8}
          gap={3}
          xs={12}
          justifyContent="center"
          textAlign="center"
        >
          <Grid item sm={4}>
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
          <Grid item sm={4}>
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
          <Grid item sm={10}>
            <Input
              placeholder="Descrição"
              fullWidth
              {...register("descricao")}
              error={!!errors?.descricao}
            />
          </Grid>
          <Grid item sm={5}>
            <InputLabel id="input-valor">Valor</InputLabel>
            <Input
              id="input-valor"
              type="number"
              fullWidth
              {...register("valor")}
              error={!!errors?.valor}
            />
          </Grid>
          <Grid item sm={5}>
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

          <Grid
            container
            item
            xs={8}
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
      </form>
    </Grid>
  );
};

export default CadastroLancamentos;
