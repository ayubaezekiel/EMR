import { useBranchQuery } from "@/actions/queries";
import {
	Callout,
	Card,
	DataList,
	Flex,
	Heading,
	Spinner,
} from "@radix-ui/themes";
import { FileQuestion } from "lucide-react";
import { DeleteActionForm } from "../../actions/DeleteAction";
import { deleteBranchAction } from "../../actions/config/branch";
import {
	CreateBranchForm,
	UpdateBranchForm,
} from "../../forms/config/BranchForm";

export function Branch() {
	const { data, isPending } = useBranchQuery();

	return (
		<Card>
			<Flex justify={"between"} mb={"4"}>
				<Heading>Branches</Heading>
				<CreateBranchForm />
			</Flex>
			<Card>
				{data?.branch_data?.length === 0 ? (
					<Flex justify={"center"}>
						<Callout.Root color="red">
							<Callout.Icon>
								<FileQuestion />
							</Callout.Icon>
							<Callout.Text ml={"1"}>
								Please create your first branch
							</Callout.Text>
						</Callout.Root>
					</Flex>
				) : (
					<div>
						{isPending ? (
							<Spinner />
						) : (
							data?.branch_data?.map((b) => (
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
											<DataList.Label minWidth="88px">
												Date created
											</DataList.Label>
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
											actionFn={() => deleteBranchAction({ id: b.id })}
											id={b.id}
										/>
									</Flex>
								</div>
							))
						)}
					</div>
				)}
			</Card>
		</Card>
	);
}
