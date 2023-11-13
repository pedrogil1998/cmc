import { useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  pdf,
} from "@react-pdf/renderer";
import "./App.css";

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
  const [results, setResults] = useState([]);

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

    const array = csvRows.map((val, index) => {
      const arrayPiloto = val.replace(/\s+/g, " ").split(" ");

      if (arrayPiloto[0] === "Melhor")
        bestLap = { name: arrayPiloto[3] + " " + arrayPiloto[4], time: arrayPiloto[6]};

      return {
        pos: isNaN(arrayPiloto[1]) ? (index + 1).toString() : arrayPiloto[0],
        kart: isNaN(arrayPiloto[1]) ? arrayPiloto[0] : arrayPiloto[1],
        name: isNaN(arrayPiloto[1])
          ? arrayPiloto[1] + " " + arrayPiloto[2]
          : arrayPiloto[2] + " " + arrayPiloto[3],
      };
    });

    const newArray = array.filter((val) => {
      console.log(!isNaN(val.kart))
      return !isNaN(val.kart);
    });

    setResults(newArray);
    console.log("resultados:", newArray);
    console.log("bestlap: ", bestLap)
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
    <div>
      <input type="file" onChange={handleFileChange} />
      <div key={results}>
        {results?.map((item, index) => {
          return <h3 key={index}>{item.name}</h3>;
        })}
      </div>
    </div>
  );
}

export default App;
