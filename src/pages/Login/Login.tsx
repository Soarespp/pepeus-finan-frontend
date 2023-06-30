import React, { useState } from "react";
import { Button, Input, Typography } from "@mui/material";
import {
  Container,
  ContainerButtons,
  ContainerFields,
  InputLab,
} from "./Login.style";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../utils/userLogin";
import { useFinanContext } from "../../contexts/financeiro/FinanContexts";

type UserData = { user: string; pass: string };

const Login = () => {
  const navigate = useNavigate();

  const { setUser } = useFinanContext();

  if (sessionStorage.getItem("user-logado") !== null) {
    navigate("/Home");
  }

  const [dadosLogin, setDadosLogin] = useState<UserData>({
    user: "",
    pass: "",
  });

  const onChangeData = (field: string, value: string) => {
    setDadosLogin((old) => ({ ...old, [field]: value.replace(/([\s])/g, "") }));
  };

  const ValidateUser = async () => {
    await fetch(
      `http://localhost:8000/user/login/${dadosLogin.user}/${btoa(
        dadosLogin.pass
      )}`
    )
      .then((response) => response.json())
      .then((result) => {
        if (!result.sucess) {
          alert(result.error);
          return;
        }
        const { user, name, _id: id } = result.usuario;
        setLogin({ user, name, id });
        setUser({ id, name });
        navigate("/home");
      });
  };

  return (
    <div style={{ margin: "200px auto", maxWidth: "500px" }}>
      <Container>
        <ContainerFields>
          <Typography>Pepeu's FINANCEIRO</Typography>
          <InputLab htmlFor="user-login">Usuário</InputLab>
          <Input
            name="user-login"
            fullWidth
            value={dadosLogin.user}
            onChange={(event) => onChangeData("user", event.target.value)}
          />
          <InputLab htmlFor="pass-login">Senha</InputLab>
          <Input
            name="pass-login"
            fullWidth
            value={dadosLogin.pass}
            type="password"
            onChange={(event) => onChangeData("pass", event.target.value)}
          />
        </ContainerFields>
        <ContainerButtons>
          <Button
            variant="contained"
            disabled={!dadosLogin.pass && !dadosLogin.user}
            onClick={ValidateUser}
          >
            Login
          </Button>
          <Button onClick={() => navigate("/cad-usuario")}>Cadastrar</Button>
        </ContainerButtons>
      </Container>
    </div>
  );
};

export default Login;
