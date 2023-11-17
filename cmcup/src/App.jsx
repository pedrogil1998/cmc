import { useRef, useState } from "react";
import { StyleSheet } from "@react-pdf/renderer";
import "./App.css";
import { useDownloadExcel } from "react-export-table-to-excel";
import { addResultsToChampionship } from "./utils/utils";
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
import kcdmlogo from "./assets/kcdmlogo.png";
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component

function App() {
  const [pdfDoc, setPdfDoc] = useState(null);
  const inputRef = useRef(null);
  const tableRef = useRef(null);
  const [championship, setChampionship] = useState([
    // { pos: "1", name: "HUGO CARVALHIDO", points: "0" },
    // { pos: "2", name: "PEDRO MOURA", points: "0" },
    // { pos: "3", name: "MARCO SILVA", points: "0" },
    // { pos: "4", name: "MARIO SILVA", points: "0" },
    // { pos: "5", name: "TOMAS XAVIER", points: "0" },
    // { pos: "6", name: "MIGUEL BENTO", points: "0" },
    // { pos: "7", name: "FERNANDO GOMES", points: "0" },
    // { pos: "8", name: "LUIS CUNHA", points: "0" },
    // { pos: "9", name: "PEDRO SOARES", points: "0" },
    // { pos: "10", name: "ALVARO BESSA", points: "0" },
    // { pos: "11", name: "CARLOS MOREIRA", points: "0" },
    // { pos: "12", name: "MARCO MONTENEGRO", points: "0" },
    // { pos: "13", name: "PEDRO CONCEIÇÃO", points: "0" },
    // { pos: "14", name: "LUIS DUARTE", points: "0" },
    // { pos: "15", name: "LUIS FERNANDES", points: "0" },
  ]);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "CMC-Cup",
    sheet: "CMC",
  });

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      setPdfDoc(reader.result);
      csvFileToArray(reader.result);
    };
    reader.onerror = () => {
      alert("erro no ficheiro");
      setPdfDoc(null);
    };
  };

  const resetFileInput = () => {
    inputRef.current.value = null;
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
      const arrayPiloto = val.replace(/\s+/g, " ").split(" ");
      arrayPiloto.length > 5 && count++;
      if (arrayPiloto[0] === "Melhor")
        bestLap = {
          name: arrayPiloto[3] + " " + arrayPiloto[4],
          time: arrayPiloto[6],
        };

      return {
        pos: isNaN(arrayPiloto[1]) ? count.toString() : arrayPiloto[0],
        kart: isNaN(arrayPiloto[1]) ? arrayPiloto[0] : arrayPiloto[1],
        name: isNaN(arrayPiloto[1])
          ? arrayPiloto[1] + " " + arrayPiloto[2]
          : arrayPiloto[2] + " " + arrayPiloto[3],
      };
    });

    const newArray = array.filter((val) => {
      console.log(!isNaN(val.kart));
      if (!val.kart) return false;
      return !isNaN(val.kart);
    });

    setChampionship(addResultsToChampionship(championship, newArray));
    console.log("resultados:", newArray);
    console.log("bestlap: ", bestLap);
  };
  // const MyDocument = () => (
  //   <Document>
  //     <Page size="A4" style={styles.page}>
  //       <View style={styles.section}>
  //         <Text>{pdfDoc || "null"}</Text>
  //       </View>
  //     </Page>
  //   </Document>
  // );

  const searchResults = () => {};

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box display="flex" flexDirection="row">
        <a href="https://cabodomundokarting.pt/" target="_blank">
          <img src={kcdmlogo} className="logo cm" alt="Cm logo" />
        </a>
        <h1>CABO DO MUNDO CUP</h1>
      </Box>

      <Box>
        <a href="https://convertio.co/pdf-csv/" target="_blank">
          CSV Converter
        </a>
      </Box>
      <Box>
        <input ref={inputRef} type="file" onChange={handleFileChange} />
        <button onClick={resetFileInput}>Clear</button>
      </Box>
      {/* <Box display="flex" flexDirection="column" alignItems="center">
        <table className="table table-bordered text-white" ref={tableRef}>
          <thead>
            <tr>
              <th scope="col">Pos</th>
              <th scope="col">Nome</th>
              <th scope="col">Points</th>
            </tr>
          </thead>
          <tbody>
            {championship.map((piloto, index) => (
              <tr key={index}>
                <td>{piloto.pos} </td>
                <td>{piloto.name} </td>
                <td>{piloto.points} </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </Box> */}
      <Box display="flex" flexDirection="column" alignItems="center">
        <TableContainer component={Paper}>
          <Table
            ref={tableRef}
            sx={{ minWidth: 650, backgroundColor: "#627f99" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Posição</TableCell>
                <TableCell align="left">Nome</TableCell>
                <TableCell align="right">Pontuação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {championship.map((piloto, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ color: "white" }}>
                    {piloto.pos}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
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
        <button onClick={onDownload}>Download</button>
      </Box>
    </div>
  );
}

export default App;
