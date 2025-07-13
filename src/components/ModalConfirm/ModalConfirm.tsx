import { Modal, Box, Typography, Button } from "@mui/material";
import styles from "./ModalConfirm.module.css";

export default function ModalConfirm({
  isVisible,
  handleClose,
  text,
  confirmFn,
}: {
  isVisible: boolean;
  handleClose: () => void;
  text: string;
  confirmFn: () => void;
}) {
  return (
    <Modal open={isVisible} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          maxWidth: "85%",
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h5" component="h5">
          {text}
        </Typography>
        <div className={styles.modalButtonBlock}>
          <Button onClick={handleClose}>Отмена</Button>
          <Button
            onClick={() => {
              handleClose();
              confirmFn();
            }}
          >
            Подтвердить
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
