import { Badge, Card, DataList, Flex, Spinner, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { bedsQueryOptions } from "../../actions/queries";

export function AvailableBeds() {
	const { data, isPending } = useQuery(bedsQueryOptions);

	const filtered_beds = useMemo(
		() => data?.beds_data?.filter((b) => b.is_available),
		[data?.beds_data],
	);

	return isPending ? (
		<Spinner />
	) : (
		<div>
			<Flex gap={"4"} my={"4"}>
				<Badge size={"3"}>
					Total Beds <Text color="red">{data?.beds_data?.length}</Text>
				</Badge>
				<Badge size={"3"}>
					Available Beds <Text color="red">{filtered_beds?.length}</Text>
				</Badge>
				<Badge size={"3"}>
					Beds Taken
					<Text color="red">
						{Number(data?.beds_data?.length) - Number(filtered_beds?.length)}
					</Text>
				</Badge>
			</Flex>

			<div className="grid md:grid-cols-4 gap-2">
				{filtered_beds?.map((b) => (
					<Card key={b.id}>
						<DataList.Root>
							<DataList.Item align="center">
								<DataList.Label minWidth="88px">Status</DataList.Label>
								<DataList.Value>
									{b.is_available ? (
										<Badge variant="soft" radius="full">
											Available
										</Badge>
									) : (
										<Badge color="red" variant="soft" radius="full">
											Unavailable
										</Badge>
									)}
								</DataList.Value>
							</DataList.Item>

							<DataList.Item>
								<DataList.Label minWidth="88px">Name</DataList.Label>
								<DataList.Value>{b.name}</DataList.Value>
							</DataList.Item>
							<DataList.Item>
								<DataList.Label minWidth="88px">Ward</DataList.Label>
								<DataList.Value>{b.wards?.name}</DataList.Value>
							</DataList.Item>
							<DataList.Item>
								<DataList.Label minWidth="88px">Labor</DataList.Label>
								<DataList.Value>
									{b.wards?.is_labor ? (
										<Badge variant="soft" radius="full">
											Allowed
										</Badge>
									) : (
										<Badge color="red" variant="soft" radius="full">
											Not Allowed
										</Badge>
									)}
								</DataList.Value>
							</DataList.Item>
							<DataList.Item>
								<DataList.Label minWidth="88px">Bed Price</DataList.Label>
								<DataList.Value>
									N{new Intl.NumberFormat().format(Number(b.default_price))}
								</DataList.Value>
							</DataList.Item>
							<DataList.Item>
								<DataList.Label minWidth="88px">Ward Price</DataList.Label>
								<DataList.Value>
									N
									{new Intl.NumberFormat().format(
										Number(b.wards?.default_price),
									)}
								</DataList.Value>
							</DataList.Item>
						</DataList.Root>
					</Card>
				))}
			</div>
		</div>
	);
}
