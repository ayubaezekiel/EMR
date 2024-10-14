// @ts-nocheck

import { Button } from "@radix-ui/themes";
import {
  Document,
  Image,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Printer } from "lucide-react";
import logo from "../../../assets/logo.png";

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  hospitalName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
  },
});

type ResultsDataType = {
  patient: string;
  dateOfBirth: string;
  gender: string;
  requestingDoctor: string;
  recordedBy: string;
  requestDate: string;
  results: string;
};

const RadiologyResultsDocument = ({
  dateOfBirth,
  gender,
  patient,
  requestDate,
  requestingDoctor,
  results,
  recordedBy,
}: ResultsDataType) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src={logo} />
        <Text style={styles.hospitalName}>Brightedge Hospital</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Radiology Report</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Patient Information</Text>
        <Text style={styles.text}>Name: {patient}</Text>
        <Text style={styles.text}>Date of Birth: {dateOfBirth}</Text>
        <Text style={styles.text}>Gender: {gender}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Request Details</Text>
        <Text style={styles.text}>Requesting Doctor: {requestingDoctor}</Text>
        <Text style={styles.text}>Recoreded By: {recordedBy}</Text>
        <Text style={styles.text}>Request Date: {requestDate}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Requested Tests Results</Text>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{results}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Additional Notes</Text>
        <Text style={styles.text}>
          ______________________________________________________
        </Text>
        <Text style={styles.text}>
          ______________________________________________________
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>
          Doctor's Signature: _________________________________
        </Text>
      </View>
    </Page>
  </Document>
);

export default function PrintRadiologyResult(props: ResultsDataType) {
  return (
    <PDFDownloadLink
      document={<RadiologyResultsDocument {...props} />}
      fileName="radiology_result.pdf"
    >
      {({ loading }) => (
        <Button loading={loading}>
          <Printer />
        </Button>
      )}
    </PDFDownloadLink>
  );
}
