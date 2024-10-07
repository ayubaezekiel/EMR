import { IconButton } from "@radix-ui/themes";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  usePDF,
  View,
} from "@react-pdf/renderer";
import { Printer } from "lucide-react";
import { toast } from "sonner";
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
    width: "50%",
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

// Sample laboratory request data
type RequestDataType = {
  patient: string;
  dateOfBirth: string;
  gender: string;
  requestingDoctor: string;
  requestDate: string;
  requests: [
    {
      note: string;
      name: string;
    },
  ];
};

// Create PDF Document
const RadiologyRequestDocument = ({
  dateOfBirth,
  gender,
  patient,
  requestDate,
  requestingDoctor,
  requests,
}: RequestDataType) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src={logo} />
        <Text style={styles.hospitalName}>Brightedge Hospital</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Radiology Request Form</Text>
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
        <Text style={styles.text}>Request Date: {requestDate}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Requested Tests</Text>
        <View style={styles.table}>
          {requests?.map((service, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{service.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{service.note}</Text>
              </View>
            </View>
          ))}
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

export default function PrintRadiologyRequests(props: RequestDataType) {
  const [instance] = usePDF({
    document: <RadiologyRequestDocument {...props} />,
  });

  if (instance.error) {
    toast.error(instance.error);
  }
  return (
    <IconButton asChild loading={instance.loading}>
      <a href={`${instance.url}`} download="imaging.pdf">
        <Printer />
      </a>
    </IconButton>
  );
}
