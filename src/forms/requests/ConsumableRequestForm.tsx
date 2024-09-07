import { useDrugOrGenericQuery, usePatientsQuery } from "@/actions/queries";
import { useQuantityType } from "@/lib/hooks";
import { getProfile } from "@/lib/utils";
import supabase from "@/supabase/client";
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
import { useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export function CreateConsumableRequestForm({
	patientId,
}: { patientId?: string }) {
	const [isLoading, setIsLoading] = useState(false);

	const { isQuantityTypePending, quantity_type_data } = useQuantityType();

	const { data: drug_data, isPending: isDrugPending } = useDrugOrGenericQuery();

	const { data: patient_data, isPending: isPatientsPending } =
		usePatientsQuery();
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			services: [
				{
					consumable: "",
					quantity_type: "",
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

	const fields = form.getValues().services.map((item, index) => (
		<div key={item.key} className="mt-4 flex gap-2 items-center">
			<Card className="w-full">
				<div className="grid grid-cols-3 gap-2 items-center">
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
											id: v.id,
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
					<div className="flex gap-1 flex-col">
						<Text size={"3"}>Quantity Type*</Text>
						<Select.Root
							size={"3"}
							key={form.key(`services.${index}.quantity_type`)}
							onValueChange={(e) =>
								form
									.getInputProps(`services.${index}.quantity_type`)
									.onChange(e)
							}
						>
							<Select.Trigger placeholder="type..." />
							<Select.Content position="popper">
								{quantity_type_data?.map((q) => (
									<Select.Item key={q.id} value={q.name!}>
										{q.name}
									</Select.Item>
								))}
							</Select.Content>
						</Select.Root>
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
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger disabled={isDrugPending || isPatientsPending}>
				<Button
					loading={isDrugPending || isPatientsPending || isQuantityTypePending}
					size={"4"}
				>
					New Request
				</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>Consumable Request</Dialog.Title>
				<Dialog.Description size="2" mb="4">
					Fill out the form information
				</Dialog.Description>

				<form
					onSubmit={form.onSubmit(async (values) => {
						setIsLoading(true);

						const prof = await getProfile();
						const { error } = await supabase.from("requests").insert({
							patients_id: patientId ?? `${values.patients_id}`,
							taken_by: `${prof?.id}`,
							is_consumable: true,
							services: values.services.map((v) => ({
								consumable: JSON.parse(v.consumable),
								quantity: v.quantity,
								quantity_type: v.quantity_type,
								note: v.note,
							})),
						});
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
					{!patientId && (
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
					)}

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
									quantity_type: "",
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
	);
}
