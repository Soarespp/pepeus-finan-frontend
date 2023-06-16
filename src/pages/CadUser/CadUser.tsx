import React, { useEffect } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ApiAxios from "../../service/ApiAxios";

const userSchema = z.object({
  nome: z.string().nonempty({ message: "Nome e obrigatório" }),
  user: z.string().nonempty({ message: "Nome de usuário e obrigatório" }),
  pass: z.string().nonempty({ message: "Senha e obrigatório" }),
  email: z
    .string()
    .nonempty({ message: "E-mail e obrigatório" })
    .email("Não é um email valido"),
});

type UserData = z.infer<typeof userSchema>;

const CadUser = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<UserData>({ resolver: zodResolver(userSchema) });

  if (sessionStorage.getItem("user-logado") !== null) {
    navigate("/Home");
  }

  const onSubmit = async (data: UserData) => {
    await ApiAxios.post("/user", {
      name: data.nome,
      user: data.user,
      pass: data.pass,
      email: data.email,
    })
      .then((response) => {
        if (!response.data.sucess) {
          alert(response.data.error);
          return;
        }
        navigate("/home");
      })
      .catch((error) => error)
      .then((response) => console.log(response));
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "80px auto",
        boxShadow: "0px 6px 6px 6px gray",
        padding: "16px",
        borderRadius: "4px",
        backgroundColor: "#b3fdb384",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container gap={2}>
          <Grid item xs={12}>
            <Typography>Cadastro de usuário</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("nome")}
              label="Nome"
              fullWidth
              error={!!errors?.nome}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("user")}
              label="Usuario"
              fullWidth
              error={!!errors?.user}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("pass")}
              label="senha"
              type="password"
              error={!!errors?.pass}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("email")}
              label="E-mail"
              error={!!errors?.email}
              fullWidth
            />
          </Grid>
          <Grid container item xs={12} direction="row-reverse">
            <Grid item xs={6} sm={3}>
              <Button type="submit" variant="contained" fullWidth>
                Salvar
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button
                onClick={() => {
                  reset();
                  navigate("/");
                }}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CadUser;
