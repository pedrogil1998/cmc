import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import "./RaceModal.css";
import { TitleText } from "../utils/utils";
import { styled } from "@mui/material/styles";

const TextInput = ({ name, register, required, ...rest }) => (
  <TextField {...register(name, { required })} {...rest} />
);

TextInput.propTypes = {
  name: PropTypes.string,
  register: PropTypes.func,
  required: PropTypes.bool,
};

const CssSelectInput = styled(Select)({
  "& .MuiSelect-select": {
    backgroundColor: "#d6d6d6",
  },
});

const RaceModal = ({ open, handleClose, handleFileChange }) => {
  const inputRef = useRef(null);
  const form = useRef();

  const [ronda, setRonda] = useState(1);

  const handleChangeRonda = (event) => {
    setRonda(event.target.value);
  };

  const onClose = () => {
    handleClose();
  };

  const onSelectFile = (e) => {
    handleFileChange(e, ronda);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form ref={form} className="modal-box">
        <Box>
          <FormControl
            fullWidth
            sx={{
              m: 1,
            }}
          >
            <TitleText
              variant="h5"
              style={{ color: "white", marginTop: "3rem", textAlign: "center" }}
            >
              Inserir os ficheiros em formato <u>.csv</u>:
            </TitleText>
            <Box
              margin="1rem"
              padding="1rem"
              borderRadius="10px"
              sx={{ backgroundColor: "#a0a0a0", width: "auto" }}
            >
              <input ref={inputRef} type="file" onChange={onSelectFile} />
            </Box>

            <CssSelectInput
              value={ronda}
              name="ronda"
              style={{ margin: "1.5rem" }}
              onChange={handleChangeRonda}
            >
              <MenuItem value={1}>Ronda 1</MenuItem>
              <MenuItem value={2}>Ronda 2</MenuItem>
              <MenuItem value={3}>Ronda 3</MenuItem>
              <MenuItem value={4}>Ronda 4</MenuItem>
              <MenuItem value={5}>Ronda 5</MenuItem>
              <MenuItem value={6}>Ronda 6</MenuItem>
            </CssSelectInput>
            <Button
              className="send-button"
              size={"small"}
              type="submit"
              variant="outlined"
              color="primary"
            >
              Adicionar Corrida
            </Button>
          </FormControl>
        </Box>
      </form>
    </Modal>
  );
};

RaceModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleFileChange: PropTypes.func,
  fileName: PropTypes.string,
  setFileName: PropTypes.func,
};

export default RaceModal;
