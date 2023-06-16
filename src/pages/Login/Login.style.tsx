import { InputLabel } from "@mui/material";
import { styled } from "@mui/system";

export const Container = styled("div")({
  backgroundColor: "#b3fdb384",
  margin: "100px auto",
  maxWidth: "500px",
  boxShadow: "0px 6px 6px 6px gray",
  borderRadius: "6px",
});

export const ContainerFields = styled("div")({
  padding: "12px",
});

export const InputLab = styled(InputLabel)({
  paddingTop: "12px",
});

export const ContainerButtons = styled("div")({
  padding: "12px",
  display: "flex",
  flexDirection: "row-reverse",
});
