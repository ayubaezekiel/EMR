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
	Spinner,
	Text,
	TextField,
} from "@radix-ui/themes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
	drugOrGenericBrandQueryOptions,
	drugOrGenericQueryOptions,
	patientsQueryOptions,
} from "@/actions/queries";
import { useQuantityType } from "@/lib/hooks";
import { getProfile } from "@/lib/utils";
import supabase from "@/supabase/client";

const time = [
	"minute(s)",
	"hours(s)",
	"days(s)",
	"week(s)",
	"month(s)",
	"year(s)",
];

export function CreatePharmRequestForm({ patientId }: { patientId?: string }) {
	const [isLoading, setIsLoading] = useState(false);
	const { data: brand_data, isPending: isBrandPending } = useQuery(
		drugOrGenericBrandQueryOptions,
	);
	const { data: drug_data, isPending: isDrugPending } = useQuery(
		drugOrGenericQueryOptions,
	);
	const { isQuantityTypePending, quantity_type_data } = useQuantityType();

	const { data: patient_data, isPending: isPatientsPending } =
		useQuery(patientsQueryOptions);
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			services: [
				{
					generic_drug: "",
					brand: "",
					dose: "",
					quantity: 1,
					quantity_type: "",
					frequency: "",
					duration: "",
					note: "",
					time: "",
					key: randomId(),
				},
			],
			patients_id: "",
		},
	});

	const fields = form.getValues().services.map((item, index) => (
		<div key={item.key} className="mt-4 flex gap-2 items-center">
			<Card>
				<div className="grid grid-cols-4 gap-2">
					<div className="flex flex-col gap-1 w-full">
						<Text size={"3"}>Generic Drug*</Text>
						<Select.Root
							required
							size={"3"}
							key={form.key(`services.${index}.generic_drug`)}
							onValueChange={(e) =>
								form.getInputProps(`services.${index}.generic_drug`).onChange(e)
							}
						>
							<Select.Trigger placeholder="select a drug..." />
							<Select.Content position="popper">
								{drug_data?.drug_or_generic_data?.map((v) => (
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
						<Text size={"3"}>Brand*</Text>
						<Select.Root
							required
							size={"3"}
							key={form.key(`services.${index}.brand`)}
							onValueChange={(e) =>
								form.getInputProps(`services.${index}.brand`).onChange(e)
							}
						>
							<Select.Trigger placeholder="select a brand..." />
							<Select.Content position="popper">
								{brand_data?.drug_or_generic_brand_data?.map((v) => (
									<Select.Item key={v.id} value={v.name}>
										{v.name}
									</Select.Item>
								))}
							</Select.Content>
						</Select.Root>
					</div>
					<div className="flex flex-col gap-1 w-full">
						<Text size={"3"}>Qauntity*</Text>
						<TextField.Root
							type="number"
							size={"3"}
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

				<div className="grid grid-cols-4 mt-2 gap-2">
					<div className="flex flex-col gap-1 w-full">
						<Text size={"3"}>Frequency*</Text>
						<TextField.Root
							size={"3"}
							key={form.key(`services.${index}.frequency`)}
							onChange={(e) =>
								form.getInputProps(`services.${index}.frequency`).onChange(e)
							}
						/>
					</div>
					<div className="flex flex-col gap-1 w-full">
						<Text size={"3"}>Duration*</Text>
						<TextField.Root
							type="number"
							size={"3"}
							placeholder="number..."
							key={form.key(`services.${index}.duration`)}
							onChange={(e) =>
								form.getInputProps(`services.${index}.duration`).onChange(e)
							}
						/>
					</div>
					<div className="flex flex-col gap-1 w-full mt-7">
						<Select.Root
							required
							size={"3"}
							key={form.key(`services.${index}.time`)}
							onValueChange={(e) =>
								form.getInputProps(`services.${index}.time`).onChange(e)
							}
						>
							<Select.Trigger placeholder="time options..." />
							<Select.Content position="popper">
								{time.map((v) => (
									<Select.Item key={v} value={v}>
										{v}
									</Select.Item>
								))}
							</Select.Content>
						</Select.Root>
					</div>
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
			<Dialog.Trigger
				disabled={
					isBrandPending ||
					isDrugPending ||
					isQuantityTypePending ||
					isPatientsPending
				}
			>
				<Button
					loading={
						isBrandPending ||
						isDrugPending ||
						isQuantityTypePending ||
						isPatientsPending
					}
					size={"4"}
				>
					New Request
				</Button>
			</Dialog.Trigger>

			<Dialog.Content minWidth={"50rem"}>
				<Dialog.Title>Pharmacy Request</Dialog.Title>
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
							is_pharm: true,
							services: values.services.map((v) => ({
								generic_drug: JSON.parse(v.generic_drug),
								brand: v.brand,
								dose: v.dose,
								quantity: v.quantity,
								quantity_type: v.quantity_type,
								frequency: v.frequency,
								duration: v.duration,
								time: v.time,
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
							{isPatientsPending ? (
								<Spinner />
							) : (
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
							)}
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
									quantity: 1,
									quantity_type: "",
									generic_drug: "",
									brand: "",
									dose: "",
									frequency: "",
									duration: "",
									time: "",
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

// export function UpdatePharmRequestForm(pharmData: DB["requests"]["Update"]) {
// 	const [isLoading, setIsLoading] = useState(false);
// 	const { data: brand_data, isPending: isBrandPending } = useQuery(
// 		drugOrGenericBrandQueryOptions,
// 	);
// 	const { isQuantityTypePending, quantity_type_data } = useQuantityType();

// 	const { data: drug_data, isPending: isDrugPending } = useQuery(
// 		drugOrGenericQueryOptions,
// 	);
// 	const [open, onOpenChange] = useState(false);
// 	const queryClient = useQueryClient();

// 	const services = JSON.parse(JSON.stringify(pharmData.services)).map(
// 		(s: {
// 			generic_drug: { id: string; name: string; amount: string };
// 			quantity: number;
// 			brand: string;
// 			dose: string;
// 			quantity_type: string;
// 			frequency: string;
// 			duration: number;
// 			time: string;
// 			note: string;
// 			key: string;
// 		}) => ({
// 			generic_drug: JSON.stringify({
// 				id: s.generic_drug.id,
// 				name: s.generic_drug.name,
// 				amount: s.generic_drug.amount,
// 			}),
// 			brand: s.brand,
// 			dose: s.dose,
// 			frequency: s.frequency,
// 			quantity_type: s.quantity_type,
// 			duration: s.duration,
// 			note: s.note,
// 			time: s.time,
// 			key: randomId(),
// 		}),
// 	);

// 	const form = useForm({
// 		mode: "uncontrolled",
// 		initialValues: {
// 			services: [...services],
// 		},
// 	});

// 	const fields = form.getValues().services.map((item, index) => (
// 		<div key={item.key} className="mt-4 flex gap-2 items-center">
// 			<Card>
// 				{isBrandPending || isDrugPending ? (
// 					<Spinner />
// 				) : (
// 					<div className="grid grid-cols-4 gap-2">
// 						<div className="flex flex-col gap-1 w-full">
// 							<Text size={"3"}>Generic Drug*</Text>
// 							<Select.Root
// 								required
// 								size={"3"}
// 								defaultValue={form.values.services[index].generic_drug}
// 								key={form.key(`services.${index}.generic_drug`)}
// 								onValueChange={(e) =>
// 									form
// 										.getInputProps(`services.${index}.generic_drug`)
// 										.onChange(e)
// 								}
// 							>
// 								<Select.Trigger placeholder="select a drug..." />
// 								<Select.Content position="popper">
// 									{drug_data?.drug_or_generic_data?.map((v) => (
// 										<Select.Item
// 											key={v.id}
// 											value={JSON.stringify({
// 												id: v.id,
// 												name: v.name,
// 												amount: v.default_price,
// 											})}
// 										>
// 											{v.name}
// 										</Select.Item>
// 									))}
// 								</Select.Content>
// 							</Select.Root>
// 						</div>
// 						<div className="flex gap-1 flex-col">
// 							<Text size={"3"}>Quantity Type*</Text>
// 							<Select.Root
// 								size={"3"}
// 								key={form.key(`services.${index}.quantity_type`)}
// 								onValueChange={(e) =>
// 									form
// 										.getInputProps(`services.${index}.quantity_type`)
// 										.onChange(e)
// 								}
// 							>
// 								<Select.Trigger placeholder="type..." />
// 								<Select.Content position="popper">
// 									{quantity_type_data?.map((q) => (
// 										<Select.Item key={q.id} value={q.name!}>
// 											{q.name}
// 										</Select.Item>
// 									))}
// 								</Select.Content>
// 							</Select.Root>
// 						</div>
// 						<div className="flex flex-col gap-1 w-full">
// 							<Text size={"3"}>Brand*</Text>
// 							<Select.Root
// 								required
// 								size={"3"}
// 								defaultValue={form.values.services[index].brand}
// 								key={form.key(`services.${index}.brand`)}
// 								onValueChange={(e) =>
// 									form.getInputProps(`services.${index}.brand`).onChange(e)
// 								}
// 							>
// 								<Select.Trigger placeholder="select a brand..." />
// 								<Select.Content position="popper">
// 									{brand_data?.drug_or_generic_brand_data?.map((v) => (
// 										<Select.Item key={v.id} value={v.name}>
// 											{v.name}
// 										</Select.Item>
// 									))}
// 								</Select.Content>
// 							</Select.Root>
// 						</div>
// 						<div className="flex flex-col gap-1 w-full">
// 							<Text size={"3"}>Frequency*</Text>
// 							<TextField.Root
// 								size={"3"}
// 								defaultValue={form.values.services[index].frequency}
// 								key={form.key(`services.${index}.frequency`)}
// 								onChange={(e) =>
// 									form.getInputProps(`services.${index}.frequency`).onChange(e)
// 								}
// 							/>
// 						</div>
// 					</div>
// 				)}

// 				<div className="flex justify-between mt-2 gap-4">
// 					<div className="flex flex-col gap-1 w-full">
// 						<Text size={"3"}>Duration*</Text>
// 						<TextField.Root
// 							type="number"
// 							size={"3"}
// 							defaultValue={form.values.services[index].duration}
// 							placeholder="number..."
// 							key={form.key(`services.${index}.duration`)}
// 							onChange={(e) =>
// 								form.getInputProps(`services.${index}.duration`).onChange(e)
// 							}
// 						/>
// 					</div>
// 					<div className="flex flex-col gap-1 w-full mt-7">
// 						<Select.Root
// 							required
// 							size={"3"}
// 							defaultValue={form.values.services[index].time}
// 							key={form.key(`services.${index}.time`)}
// 							onValueChange={(e) =>
// 								form.getInputProps(`services.${index}.time`).onChange(e)
// 							}
// 						>
// 							<Select.Trigger placeholder="time options..." />
// 							<Select.Content position="popper">
// 								{time.map((v) => (
// 									<Select.Item key={v} value={v}>
// 										{v}
// 									</Select.Item>
// 								))}
// 							</Select.Content>
// 						</Select.Root>
// 					</div>
// 					<div className="flex flex-col gap-1 w-full">
// 						<Text size={"3"}>Note*</Text>
// 						<TextField.Root
// 							required
// 							size={"3"}
// 							key={form.key(`services.${index}.note`)}
// 							{...form.getInputProps(`services.${index}.note`)}
// 						/>
// 					</div>
// 				</div>
// 			</Card>
// 			<IconButton
// 				type="button"
// 				color="red"
// 				size={"1"}
// 				onClick={() => form.removeListItem("services", index)}
// 			>
// 				<Trash size="1rem" />
// 			</IconButton>
// 		</div>
// 	));

// 	return (
// 		<Dialog.Root open={open} onOpenChange={onOpenChange}>
// 			<Dialog.Trigger
// 				disabled={isBrandPending || isDrugPending || isQuantityTypePending}
// 			>
// 				<Button
// 					size={"1"}
// 					color="red"
// 					variant="ghost"
// 					disabled={isBrandPending || isDrugPending || isQuantityTypePending}
// 				>
// 					<Edit />
// 				</Button>
// 			</Dialog.Trigger>

// 			<Dialog.Content minWidth={"50rem"}>
// 				<Dialog.Title>Update Pharmacy Request</Dialog.Title>
// 				<Dialog.Description size="2" mb="4">
// 					Fill out the form information
// 				</Dialog.Description>

// 				<form
// 					onSubmit={form.onSubmit(async (values) => {
// 						setIsLoading(true);

// 						const prof = await getProfile();
// 						const { error } = await supabase
// 							.from("requests")
// 							.update({
// 								patients_id: `${pharmData.patients_id}`,
// 								taken_by: `${prof?.id}`,
// 								is_pharm: true,
// 								services: values.services.map((v) => ({
// 									generic_drug: JSON.parse(v.generic_drug),
// 									brand: v.brand,
// 									dose: v.dose,
// 									quantity_type: v.quantity_type,
// 									frequency: v.frequency,
// 									duration: v.duration,
// 									time: v.time,
// 									note: v.note,
// 								})),
// 							})
// 							.eq("id", `${pharmData.id}`);
// 						if (error) {
// 							toast.error(error.message);
// 							setIsLoading(false);
// 						} else {
// 							toast.success("request issued successfully");
// 							form.reset();
// 							queryClient.invalidateQueries({ queryKey: ["requests"] });
// 							setIsLoading(false);
// 							onOpenChange(false);
// 						}
// 					})}
// 				>
// 					{fields.length === 0 && (
// 						<Callout.Root color="red" mt={"4"}>
// 							<Callout.Icon>
// 								<AlertCircle />
// 								<Callout.Text ml={"2"}>Empty</Callout.Text>
// 							</Callout.Icon>
// 						</Callout.Root>
// 					)}

// 					{fields}
// 					<Flex justify="end" mt="4">
// 						<Button
// 							type="button"
// 							variant="soft"
// 							onClick={() =>
// 								form.insertListItem("services", {
// 									quantity: 1,
// 									quantity_type: "",
// 									generic_drug: "",
// 									brand: "",
// 									dose: "",
// 									frequency: "",
// 									duration: "",
// 									time: "",
// 									note: "",
// 									key: randomId(),
// 								})
// 							}
// 						>
// 							Add more
// 						</Button>
// 					</Flex>
// 					<Button
// 						loading={isLoading}
// 						disabled={!form.isValid() || isLoading || fields.length === 0}
// 						size={"4"}
// 						type="submit"
// 					>
// 						Update
// 					</Button>
// 				</form>
// 			</Dialog.Content>
// 		</Dialog.Root>
// 	);
// }
