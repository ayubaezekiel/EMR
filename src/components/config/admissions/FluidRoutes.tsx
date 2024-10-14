import { useFluidRoutesQuery } from "@/actions/queries";
import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { CreateFluidRoutesForm } from "../../../forms/config/admission/FluidRoutes";
import { DataTable } from "../../table/DataTable";
import { fluid_routes_column } from "../../table/columns/admission/fluid_routes";

export function FluidRoutes() {
  const { data, isPending } = useFluidRoutesQuery();

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Fluid Routes</Heading>
        <CreateFluidRoutesForm />
      </Flex>
      {isPending ? (
        <Spinner />
      ) : (
        <DataTable
          columns={fluid_routes_column}
          data={data?.fluid_routes_data ?? []}
        />
      )}
    </div>
  );
}
