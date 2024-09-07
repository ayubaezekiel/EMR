import { DataTable } from "@/components/table/DataTable";
import { antenatal_package_column } from "@/components/table/columns/antenatal/antenatal_package";
import { CreateAntenatalPackageForm } from "@/forms/antenatal/AntenatalForm";
import { useAntenatalPackage } from "@/lib/hooks";
import { Flex, Heading, Spinner } from "@radix-ui/themes";

export function AntenatalPackage() {
	const { antenatal_package_data, isAntenatalPackagePending } =
		useAntenatalPackage();

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Antenatal Package</Heading>
				<CreateAntenatalPackageForm />
			</Flex>
			{isAntenatalPackagePending ? (
				<Spinner />
			) : (
				<DataTable
					filterLabel="filter by name..."
					filterer="name"
					columns={antenatal_package_column}
					data={antenatal_package_data ?? []}
				/>
			)}
		</div>
	);
}
