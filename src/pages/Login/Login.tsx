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

type UserData = { user: string; pass: string };

const Login = () => {
  const navigate = useNavigate();

  if (sessionStorage.getItem("user-logado") !== null) {
    navigate("/Home");
  }

  const [dadosLogin, setDadosLogin] = useState<UserData>({
    user: "pedro",
    pass: "cGVkcm8xMjM",
  });

  const onChangeData = (field: string, value: string) => {
    setDadosLogin((old) => ({ ...old, [field]: value.replace(/([\s])/g, "") }));
  };

  const ValidateUser = async () => {
    fetch(
      `http://localhost:8000/user/login/${dadosLogin.user}/${dadosLogin.pass}`
    )
      .then((response) => response.json())
      .then((result) => {
        if (!result.sucess) {
          console.log(result);
          alert(result.error);
          return;
        }
        const { user, name } = result.usuario;
        setLogin({ user, name });
        navigate("/home");
      });
  };

  return (
    <Container>
      <ContainerFields>
        <Typography>Dados de login</Typography>
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
  );
};

export default Login;
