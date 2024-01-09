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
import { TitleText, scoringSystem } from "../utils/utils";

const Scoring = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      paddingBottom={"2rem"}
      sx={{ backgroundColor: "lightgray" }}
    >
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
            sx={{ minWidth: 200, backgroundColor: "aliceblue" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Posição</TableCell>
                {scoringSystem.map((piloto, index) => (
                  <TableCell
                    key={index}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    {piloto.pos}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">Pontuação</TableCell>
                {scoringSystem.map((piloto, index) => (
                  <TableCell key={index} align="center">
                    {piloto.points}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Scoring;
