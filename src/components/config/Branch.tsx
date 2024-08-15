import { Card, DataList, Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { DeleteActionForm } from "../../actions/DeleteAction";
import { deleteBranchAction } from "../../actions/config/branch";
import { branchQueryOptions } from "../../actions/queries";
import {
	CreateBranchForm,
	UpdateBranchForm,
} from "../../forms/config/BranchForm";
import PendingComponent from "../PendingComponent";

export function Branch() {
	const { data, isPending } = useQuery(branchQueryOptions);
	if (isPending) return <PendingComponent />;
	return (
		<Card>
			<Flex justify={"between"} mb={"4"}>
				<Heading>Branches</Heading>
				<CreateBranchForm />
			</Flex>
			<Card>
				{data?.branch_data?.map((b) => (
					<div key={b.id}>
						<DataList.Root>
							<DataList.Item>
								<DataList.Label minWidth="88px">Name</DataList.Label>
								<DataList.Value>{b.name}</DataList.Value>
							</DataList.Item>

							<DataList.Item>
								<DataList.Label minWidth="88px">Address</DataList.Label>
								<DataList.Value>{b.address}</DataList.Value>
							</DataList.Item>
							<DataList.Item>
								<DataList.Label minWidth="88px">Date created</DataList.Label>
								<DataList.Value>
									{new Date(b.created_at!).toDateString()}
								</DataList.Value>
							</DataList.Item>
						</DataList.Root>
						<Flex justify={"end"} gap={"2"} mt={"4"}>
							<UpdateBranchForm {...b} />
							<DeleteActionForm
								inValidate="branch"
								title="Delete Branch"
								warning="Are you sure? this branch will be parmanently deleted from the
          database."
								actionFn={async () => await deleteBranchAction({ id: b.id })}
								id={b.id}
							/>
						</Flex>
					</div>
				))}
			</Card>
		</Card>
	);
}
