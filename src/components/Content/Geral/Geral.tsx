import React from "react";
import Header from "../../Header";
import { useNavigate } from "react-router-dom";

type propsGeral = { children: React.ReactElement };

const Geral = ({ children }: propsGeral) => {
  const navigate = useNavigate();
  if (sessionStorage.getItem("user-logado") === null) {
    navigate("/");
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Geral;
