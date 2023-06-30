import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ApiAxios from "../../service/ApiAxios";
import useCarteira from "../../hooks/useCarteira/useCarteira";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogDeleteUser from "./fragments/DialogDeleteUser";
import { setLogin, setLogout } from "../../utils/userLogin";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFinanContext } from "../../contexts/financeiro/FinanContexts";

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
  const { state } = useLocation();
  const { insertCarteira } = useCarteira();
  const { setUser } = useFinanContext();

  const [openCancel, setOpenCancel] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<UserData>({ resolver: zodResolver(userSchema) });

  if (localStorage.getItem("user-logado") !== null && !state?.user_id) {
    navigate("/Home");
  }

  /* eslint-disable */
  const getDadosUser = useCallback(async (userID: string) => {
    await ApiAxios.get(`/user/${userID}`).then((response) => {
      if (response.data.sucess) {
        const { user } = response.data;
        !!user &&
          reset({
            nome: user.name,
            user: user.user,
            pass: atob(user.pass),
            email: user.email,
          });
      }
    });
  }, []);
  /* eslint-enable */

  useMemo(() => {
    if (state?.user_id) {
      getDadosUser(state.user_id);
    }
  }, [state?.user_id, getDadosUser]);

  const createUser = async (data: UserData) => {
    await ApiAxios.post("/user", {
      name: data.nome,
      user: data.user,
      pass: btoa(data.pass),
      email: data.email,
    })
      .then((response) => {
        if (!response.data.sucess) {
          alert(response.data.error);
          return;
        }

        const { user } = response.data;
        insertCarteira({ user: user._id, salario: 0 });
        setLogin({ user: user.user, name: user.name, id: user._id });
        setUser({ id: user._id, name: user.name });
        navigate("/home");
      })
      .catch((error) => error);
  };

  const updateUser = async (data: UserData) => {
    await ApiAxios.put("/user", {
      _id: state.user_id,
      name: data.nome,
      user: data.user,
      pass: btoa(data.pass),
      email: data.email,
    })
      .then((response) => {
        if (!response.data.sucess) {
          alert(response.data.error);
          return;
        }

        navigate("/home");
      })
      .catch((error) => error);
  };

  const onSubmit = async (data: UserData) => {
    !!state?.user_id ? updateUser(data) : createUser(data);
  };

  const excluirUser = async (idUser: string) =>
    await ApiAxios.delete(`/user?user=${idUser}&all=true`).then((response) => {
      if (response.data.sucess) {
        console.log("usuário excluido");
      }
    });

  const excluir = () => {
    const id = state.user_id;
    try {
      excluirUser(id).then(() => {
        setOpenCancel(false);
        setLogout();
      });
    } catch {
      alert("erro ao excluir dados usuário!");
    }
  };

  const onCancel = () => {
    reset();

    !!state?.user_id ? navigate("/home") : navigate("/");
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
              focused
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("user")}
              label="Usuario"
              fullWidth
              focused
              error={!!errors?.user}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                {...register("pass")}
                label="Password"
                type={showPassword ? "text" : "password"}
                error={!!errors?.pass}
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("email")}
              label="E-mail"
              focused
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
              <Button onClick={onCancel}>Cancelar</Button>
            </Grid>
            {!!state?.user_id && (
              <Grid item xs={6} sm={3}>
                <Button
                  startIcon={<DeleteIcon />}
                  color="error"
                  onClick={() => setOpenCancel(true)}
                >
                  Excluir
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </form>
      <DialogDeleteUser
        open={openCancel}
        closeModal={() => setOpenCancel(false)}
        afterClickOpen={excluir}
      />
    </div>
  );
};

export default CadUser;
