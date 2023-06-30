import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFinanContext } from "../../contexts/financeiro/FinanContexts";
import { setLogout } from "../../utils/userLogin";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useFinanContext();
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box
      style={{
        display: "flex",
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",
        backgroundColor: "#20B2AA",
      }}
    >
      <Grid container margin="22px 0px" justifyContent="center">
        <Grid item xs={10} sm={11} justifyContent="center" paddingLeft="16px">
          <Typography variant="h3">Pepeu's FINAN</Typography>
        </Grid>
        <Grid item xs={2} sm={1} justifyContent="end" textAlign="end">
          <IconButton size="large" onClick={handleMenu}>
            <MenuIcon fontSize="large" />
          </IconButton>
          <Menu
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorEl={anchorEl}
          >
            <MenuItem
              onClick={() => {
                navigate("/Home");
                handleClose();
              }}
            >
              Home
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/cad-usuario", {
                  state: { user_id: user.id },
                });
                handleClose();
              }}
            >
              Perfil
            </MenuItem>
            <MenuItem
              onClick={() => {
                setLogout();
                handleClose();
                navigate("/");
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
