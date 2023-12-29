import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useDownloadExcel } from "react-export-table-to-excel";
import { addResultsToChampionship, scoringSystem } from "./utils/utils";
import {
  Box,
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import kcdmlogo from "./assets/kcdmlogo.png";
import { getChampionship, updateChampionship } from "./requests/requests";

const TitleText = styled(Typography)((props) => ({
  fontFamily: "Nunito-Sans",
  fontWeight: 800,
}));

// Create Document Component

function App() {
  const inputRef = useRef(null);
  const tableRef = useRef(null);
  const [championship, setChampionship] = useState([]);
  useEffect(() => {
    getChampionship(setChampionship);
  }, []);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "CMC-Cup",
    sheet: "CMC",
  });

  const resetFileInput = () => {
    inputRef.current.value = null;
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      csvFileToArray(reader.result);
    };
    reader.onerror = () => {
      alert("erro no ficheiro");
    };

    resetFileInput();
  };

  const csvFileToArray = (string) => {
    const csvRows = string
      .replace(/"/g, "")
      .slice(string.indexOf("\n") + 1)
      .split("\n")
      //remove emptyspaces
      .filter((val) => {
        return val != "";
      });

    //remove header
    csvRows.shift();

    let bestLap = {};
    let count = 0;
    const array = csvRows.map((val, index) => {
      if (val.includes("Melhor")) {
        const arrayPiloto = val.replace(/\s+/g, " ").split(" ");
        bestLap = {
          name: arrayPiloto[3] + " " + arrayPiloto[4],
          time: arrayPiloto[6],
        };
      }

      if (val.includes(";")) {
        const arrayPiloto = val.replace(/\s+/g, " ").split(";");
        arrayPiloto.length > 5 && count++;

        if (!isNaN(arrayPiloto[1])) {
          return {
            pos: isNaN(arrayPiloto[1]) ? count.toString() : arrayPiloto[0],
            kart: isNaN(arrayPiloto[1]) ? arrayPiloto[0] : arrayPiloto[1],
            name: isNaN(arrayPiloto[1]) ? arrayPiloto[1] : arrayPiloto[2],
          };
        }
      }
    });

    const newArray = array.filter((val) => {
      if (!val || !val.kart) return false;
      return !isNaN(val.kart);
    });

    setChampionship(addResultsToChampionship(championship, newArray));
  };

  const handleSaveChampionship = () => {
    updateChampionship(championship)
      .then((value) => {
        alert("Base de dados atualizada.");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleClearChampionship = () => {
    setChampionship([]);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding="2rem"
      >
        <TitleText variant="h2" style={{ color: "black" }}>
          Classificações
        </TitleText>
        <a href="https://cabodomundokarting.pt/" target="_blank">
          <img src={kcdmlogo} className="logo cm" alt="Cm logo" />
        </a>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" sx={{backgroundColor: "lightgray"}}>
        <TitleText variant="h5" style={{ color: "black", marginTop:"3rem" }}>
          Inserir os ficheiros em formato <u>.csv</u>:
        </TitleText>
        <Box
          margin="1rem"
          padding="1rem"
          borderRadius="10px"
          sx={{ backgroundColor: "#a0a0a0", width: "fit-content" }}
        >
          <input ref={inputRef} type="file" onChange={handleFileChange} />
          <button onClick={resetFileInput} style={{backgroundColor: "ActiveBorder"}}>Clear</button>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          margin="1rem"
        >
          <TableContainer component={Paper}>
            <Table
              ref={tableRef}
              sx={{ minWidth: 500, backgroundColor: "#649d81" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Posição</TableCell>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="right">Pontuação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {championship.map((piloto, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: "white" }}
                    >
                      {piloto.pos}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {piloto.name}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "white" }}>
                      {piloto.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box display="flex" flexDirection="row">
          <button
            style={{
              marginRight: "0.5rem",
              backgroundColor: "Highlight",
            }}
            onClick={handleSaveChampionship}
          >
            Save
          </button>
          <button
            style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
            onClick={onDownload}
          >
            Download
          </button>
          <button
            style={{ marginLeft: "0.5rem" }}
            onClick={handleClearChampionship}
          >
            Limpar Tabela
          </button>
        </Box>
        <TitleText variant="h6" style={{ color: "black", marginTop: "0.5rem", marginBottom: "3rem"}}>
          * Ao clicar no botão <u>Save</u> estará a guardar as alterações na
          Base de Dados.
        </TitleText>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" paddingBottom={"2rem"}>
        <TitleText marginTop="3rem" variant="h5" style={{ color: "black" }}>
          Sistema de pontuação utilizado:
        </TitleText>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          margin="1rem"
        >
          <TableContainer component={Paper}>
            <Table
              //ref={tableRef}
              sx={{ minWidth: 200, backgroundColor: "aliceblue" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">Posição</TableCell>
                  <TableCell align="center">Pontuação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scoringSystem.map((piloto, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {piloto.pos}
                    </TableCell>
                    <TableCell align="center">{piloto.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
}

export default App;
