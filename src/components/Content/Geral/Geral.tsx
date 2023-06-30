import React from "react";
import Header from "../../Header";
import { useNavigate } from "react-router-dom";

type propsGeral = { children: React.ReactElement };

const Geral = ({ children }: propsGeral) => {
  const navigate = useNavigate();

  if (localStorage.getItem("user-logado") === null) {
    navigate("/");
  }

  return (
    <>
      <Header />
      <div
        style={{
          minHeight: "calc(100vh - 112px)",
          margin: "0px 12px",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Geral;
