import { Card, DataList, Flex, Heading } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { branchQueryOptions } from "../../actions/queries";
import {
  CreateBranchForm,
  DeleteBranchForm,
  UpdateBranchForm,
} from "../../forms/config/BranchForm";

export function Branch() {
  // const { data } = useLoaderData({ from: "/_layout/dashboard/config/" });
  const { data } = useSuspenseQuery(branchQueryOptions);
  return (
    <Card>
      <Flex justify={"between"} mb={"4"}>
        <Heading>Branches</Heading>
        <CreateBranchForm />
      </Flex>
      <Card>
        {data.branch_data?.map((b) => (
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
              <DeleteBranchForm id={b.id} />
            </Flex>
          </div>
        ))}
      </Card>
    </Card>
  );
}
