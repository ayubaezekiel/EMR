import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import {
	Button,
	Callout,
	Card,
	Dialog,
	Flex,
	IconButton,
	Select,
	Text,
	TextField,
} from "@radix-ui/themes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
	drugOrGenericQueryOptions,
	patientsQueryOptions,
} from "../../actions/queries";
import PendingComponent from "../../components/PendingComponent";
import { checkAuth } from "../../lib/utils";
import supabase from "../../supabase/client";

export function CreateConsumableRequestForm() {
	const [isLoading, setIsLoading] = useState(false);

	const { data: drug_data, isPending: isDrugPending } = useQuery(
		drugOrGenericQueryOptions,
	);

	const { data: patient_data, isPending: patientsPending } =
		useQuery(patientsQueryOptions);
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			services: [
				{
					consumable: "",
					quantity: "",
					note: "",
					key: randomId(),
				},
			],
			patients_id: "",
		},
	});

	const consumable_items = useMemo(
		() =>
			drug_data?.drug_or_generic_data?.filter((c) => c.is_consumable === true),
		[drug_data?.drug_or_generic_data],
	);

	if (patientsPending || isDrugPending) return <PendingComponent />;

	const fields = form.getValues().services.map((item, index) => (
		<div key={item.key} className="mt-4 flex gap-2 items-center">
			<Card className="w-full">
				<div className="grid grid-cols-2 gap-2">
					<div className="flex flex-col gap-1 w-full">
						<Text size={"3"}>Consumable*</Text>
						<Select.Root
							required
							size={"3"}
							key={form.key(`services.${index}.consumable`)}
							onValueChange={(e) =>
								form.getInputProps(`services.${index}.consumable`).onChange(e)
							}
						>
							<Select.Trigger placeholder="select an item..." />
							<Select.Content position="popper">
								{consumable_items?.map((v) => (
									<Select.Item
										key={v.id}
										value={JSON.stringify({
											name: v.name,
											amount: v.default_price,
										})}
									>
										{v.name}
									</Select.Item>
								))}
							</Select.Content>
						</Select.Root>
					</div>
					<div className="flex flex-col gap-1 w-full">
						<Text size={"3"}>Quantity*</Text>
						<TextField.Root
							type="number"
							size={"3"}
							placeholder="quantity..."
							key={form.key(`services.${index}.quantity`)}
							onChange={(e) =>
								form.getInputProps(`services.${index}.quantity`).onChange(e)
							}
						/>
					</div>
				</div>

				<div className="flex justify-between mt-2 gap-4">
					<div className="flex flex-col gap-1 w-full">
						<Text size={"3"}>Note*</Text>
						<TextField.Root
							required
							size={"3"}
							key={form.key(`services.${index}.note`)}
							{...form.getInputProps(`services.${index}.note`)}
						/>
					</div>
				</div>
			</Card>
			<IconButton
				type="button"
				color="red"
				size={"1"}
				onClick={() => form.removeListItem("services", index)}
			>
				<Trash size="1rem" />
			</IconButton>
		</div>
	));

	return (
		<div>
			<Dialog.Root open={open} onOpenChange={onOpenChange}>
				<Dialog.Trigger>
					<Button size={"4"}>New Request</Button>
				</Dialog.Trigger>

				<Dialog.Content>
					<Dialog.Title>Consumable Request</Dialog.Title>
					<Dialog.Description size="2" mb="4">
						Fill out the form information
					</Dialog.Description>

					<form
						onSubmit={form.onSubmit(async (values) => {
							setIsLoading(true);

							const user = await checkAuth();
							const { error } = await supabase.from("requests").insert([
								{
									patients_id: `${values.patients_id}`,
									taken_by: `${user?.id}`,
									is_consumable: true,
									services: values.services.map((v) => ({
										consumable: JSON.parse(v.consumable),
										quantity: v.quantity,
										note: v.note,
									})),
								},
							]);
							if (error) {
								toast.error(error.message);
								setIsLoading(false);
							} else {
								toast.success("request issued successfully");
								form.reset();
								queryClient.invalidateQueries({ queryKey: ["requests"] });
								setIsLoading(false);
								onOpenChange(false);
							}
						})}
					>
						<div className="flex flex-col">
							<Text size={"3"}>Patient*</Text>
							<Select.Root
								size={"3"}
								onValueChange={(e) =>
									form.getInputProps("patients_id").onChange(e)
								}
							>
								<Select.Trigger placeholder="select patient..." />
								<Select.Content position="popper">
									{patient_data?.patient_data?.map((p) => (
										<Select.Item key={p.id} value={p.id}>
											{p.first_name} {p.middle_name} {p.last_name} - [
											{p.id.slice(0, 8).toUpperCase()}]
										</Select.Item>
									))}
								</Select.Content>
							</Select.Root>
						</div>

						{fields.length === 0 && (
							<Callout.Root color="red" mt={"4"}>
								<Callout.Icon>
									<AlertCircle />
									<Callout.Text ml={"2"}>Empty</Callout.Text>
								</Callout.Icon>
							</Callout.Root>
						)}

						{fields}
						<Flex justify="end" mt="4">
							<Button
								type="button"
								variant="soft"
								onClick={() =>
									form.insertListItem("services", {
										consumable: "",
										quantity: "",
										note: "",
										key: randomId(),
									})
								}
							>
								Add more
							</Button>
						</Flex>
						<Button
							loading={isLoading}
							disabled={!form.isValid() || isLoading || fields.length === 0}
							size={"4"}
							type="submit"
						>
							Request
						</Button>
					</form>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	);
}
