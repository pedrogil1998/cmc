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
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setResults(array);
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

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <div key={results}>
        {results?.map((item, index) => {
          return Object.values(item).map((val) => (
            <h3 key={val}>{val.replace(/"/g, "")}</h3>
          ));
        })}
      </div>
    </div>
  );
}

export default App;
