import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface DialogDeleteUserProps {
  open: boolean;
  closeModal: () => void;
  afterClickOpen?: () => void;
}

const DialogDeleteUser = ({
  open,
  closeModal,
  afterClickOpen,
}: DialogDeleteUserProps) => {
  return (
    <Dialog
      open={open}
      onClose={closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Deseja excluir o usuário?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Excluir o usuário acarretara em excluir todos os lançamentos
          financeiros do mesmo, deseja continuar?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancelar</Button>
        <Button onClick={afterClickOpen} autoFocus variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogDeleteUser;
