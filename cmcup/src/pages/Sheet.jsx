import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  TitleText,
  addResultsToChampionship,
  getDriverFinalPoints,
  getDriverTotalPoints,
  getKeyString,
  getMostKeys,
  sortByFinalPoints,
} from "../utils/utils";
import { getChampionship, updateChampionship } from "../requests/requests";
import { useDownloadExcel } from "react-export-table-to-excel";
import RaceModal from "./RaceModal";

const Sheet = () => {
  const inputRef = useRef(null);
  const tableRef = useRef(null);
  const [fileName, setFileName] = useState("CMC-Cup");
  const [championship, setChampionship] = useState([]);

  //MODAL
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getChampionship(setChampionship);
  }, []);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: fileName,
    sheet: "CMC",
  });

  const resetFileInput = () => {
    inputRef.current.value = null;
  };
  const csvFileToArray = (string, raceName = "", roundNumber = 0) => {
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
    const array = csvRows.map((val) => {
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
            raceName: raceName,
            roundNumber: roundNumber,
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
    confirm("Tem a certeza que deseja guardar as alterações?") &&
      updateChampionship(championship)
        .then(() => {
          alert("Base de dados atualizada.");
        })
        .catch((err) => {
          alert(err);
        });
  };

  const handleClearChampionship = () => {
    setChampionship([]);
  };

  const handleFileChange = (e, roundNumber) => {
    e.preventDefault();
    const file = e.target.files[0];
    const raceName = file.name.split(".")[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      csvFileToArray(reader.result, raceName, roundNumber);
    };
    reader.onerror = () => {
      alert("erro no ficheiro");
    };

    //resetFileInput();
  };

  const handleSortByFinalPoints = (e) => {
    setChampionship(sortByFinalPoints(championship));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ backgroundColor: "lightgray" }}
    >
      {/* <TitleText variant="h5" style={{ color: "black", marginTop: "3rem" }}>
        Inserir os ficheiros em formato <u>.csv</u>:
      </TitleText>
      <Box
        margin="1rem"
        padding="1rem"
        borderRadius="10px"
        sx={{ backgroundColor: "#a0a0a0", width: "fit-content" }}
      >
        <input ref={inputRef} type="file" onChange={handleFileChange} />
      </Box>*/}
      <Box padding={"1rem"} bgcolor={"darkgray"}>
        <label htmlFor="fileName">Nome do ficheiro: </label>
        <input
          name="fileName"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        ></input>
      </Box>
      <Box display="flex" flexDirection="row" margin="1rem">
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
        <button
          style={{ marginLeft: "0.5rem" }}
          onClick={handleSortByFinalPoints}
        >
          Sort
        </button>
        <button style={{ marginLeft: "0.5rem" }} onClick={handleOpen}>
          Inserir Corrida
        </button>
      </Box>
      <RaceModal
        open={open}
        handleClose={handleClose}
        handleFileChange={handleFileChange}
        fileName={fileName}
        setFileName={setFileName}
      />

      <TitleText
        variant="h6"
        style={{ color: "black", marginTop: "0.5rem", marginBottom: "0.5rem" }}
      >
        * Ao clicar no botão <u>Save</u> estará a guardar as alterações na Base
        de Dados.
      </TitleText>
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
                {championship.length &&
                  getMostKeys(championship).map(
                    (key) =>
                      key != "index" && (
                        <TableCell align="center" key={key}>
                          {getKeyString(key)}
                        </TableCell>
                      )
                  )}
                <TableCell align="center">PT</TableCell>
                <TableCell align="center">PF</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {championship.map((piloto, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {getMostKeys(championship).map((key, index) => {
                    return (
                      key != "index" && (
                        <TableCell
                          key={key + index}
                          align="center"
                          sx={{ color: "white" }}
                        >
                          {piloto[key] ||
                            (key.includes("group") && "NP") ||
                            "0"}
                        </TableCell>
                      )
                    );
                  })}
                  <TableCell
                    key={"pointsCell"}
                    align="center"
                    sx={{ color: "white" }}
                  >
                    {getDriverTotalPoints(piloto)}
                  </TableCell>
                  <TableCell
                    key={"finalPointsCell"}
                    align="center"
                    sx={{ color: "white" }}
                  >
                    {getDriverFinalPoints(championship, piloto)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Sheet;
