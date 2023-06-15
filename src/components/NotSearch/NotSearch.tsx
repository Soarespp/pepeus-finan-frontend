import React from "react";

type typeProps = { type: string };

const NotSearch = ({ type }: typeProps) => {
  return <p>{`Não foram encontrados itens de ${type}.`} </p>;
};

export default NotSearch;
