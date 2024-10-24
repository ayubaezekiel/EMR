import { usePatientsQuery } from "@/actions/queries";
import {
  Box,
  Callout,
  Card,
  Flex,
  IconButton,
  Popover,
  Spinner,
  TextField,
} from "@radix-ui/themes";
import { Link } from "@tanstack/react-router";
import { AlertCircle, Search } from "lucide-react";
import { useState } from "react";

export function NavPatientFilters() {
  const [patient, setPatient] = useState({ match: "", startLoading: false });
  const [open, onOpenChange] = useState(false);

  const { data, isPending } = usePatientsQuery();

  const filtered_patients = data?.patient_data?.filter(
    (p) =>
      p.first_name.toLowerCase().includes(patient.match.toLowerCase()) ||
      p.middle_name?.toLowerCase().includes(patient.match.toLowerCase()) ||
      p.last_name.toLowerCase().includes(patient.match.toLowerCase())
  );

  return (
    <div className="">
      <Popover.Root open={open} onOpenChange={onOpenChange}>
        <Popover.Trigger>
          <IconButton variant="soft" size={"4"} radius="full">
            <Search />
          </IconButton>
        </Popover.Trigger>
        <Popover.Content width="360px" maxHeight={"250px"}>
          <Flex gap="3">
            <Box flexGrow="1">
              <TextField.Root
                onChange={(e) =>
                  setPatient({
                    match: e.target.value,
                    startLoading:
                      e.target.value.length < 3 && e.target.value.length > 0
                        ? true
                        : false,
                  })
                }
                placeholder="type aleast 3 letters..."
              >
                <TextField.Slot side="right">
                  <Search />
                </TextField.Slot>
              </TextField.Root>
              {isPending || patient.startLoading ? (
                <div className="flex justify-center mt-4">
                  <Spinner />
                </div>
              ) : filtered_patients?.length === 0 ? (
                <Callout.Root mt={"4"}>
                  <Callout.Icon>
                    <AlertCircle />
                  </Callout.Icon>
                  <Callout.Text ml={"2"}>No patient found</Callout.Text>
                </Callout.Root>
              ) : (
                patient.match.length > 2 &&
                patient.match.length > 0 &&
                filtered_patients?.map((f) => (
                  <Card
                    key={f.id}
                    mt={"5"}
                    variant="ghost"
                    style={{ background: "var(--accent-3)" }}
                  >
                    <Link
                      onClick={() => onOpenChange(false)}
                      to={`/dashboard/patients/${f.id}/`}
                      className="hover:text-[var(--accent-9)] hover:underline"
                    >
                      {f.first_name} {f.last_name} {f.last_name} [
                      {f.id.slice(0, 8).toUpperCase()}]
                    </Link>
                  </Card>
                ))
              )}
            </Box>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}
