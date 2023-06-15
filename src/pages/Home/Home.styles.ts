import { styled, Button } from "@mui/material";

export const ContainerButton = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "220px",
  height: "180px",
  backgroundColor: "#b3fdb384",
  boxShadow: "0px 4px 4px 4px #888888",
}));

export const ButtonMaterial = styled(Button)(() => ({
  color: "#000",
}));
