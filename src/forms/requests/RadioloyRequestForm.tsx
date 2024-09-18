import { useImagingQuery, usePatientsQuery } from "@/actions/queries";
import { useProfile } from "@/lib/hooks";
import supabase from "@/supabase/client";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import {
	Button,
	Callout,
	Dialog,
	Flex,
	IconButton,
	Select,
	Text,
	TextField,
} from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Edit, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function CreateRadiologyRequestForm({
	patientId,
}: { patientId?: string }) {
	const [isLoading, setIsLoading] = useState(false);
	const { data: imaging_data, isPending: isRadiologyPending } =
		useImagingQuery();

	const { data: patient_data, isPending: isPatientsPending } =
		usePatientsQuery();
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();
	const { isProfilePending, profile_data } = useProfile();

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			services: [{ service: "", note: "", key: randomId() }],
			patients_id: "",
		},
	});

	const fields = form.getValues().services.map((item, index) => (
		<Flex key={item.key} gap={"2"} mt={"4"}>
			<div className="flex flex-col gap-1 w-full">
				<Text size={"3"}>Service*</Text>
				<Select.Root
					required
					size={"3"}
					key={form.key(`services.${index}.service`)}
					onValueChange={(e) =>
						form.getInputProps(`services.${index}.service`).onChange(e)
					}
				>
					<Select.Trigger placeholder="select an imaging service..." />
					<Select.Content position="popper">
						{imaging_data?.imaging_data?.map((v) => (
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

			<div className="flex flex-col gap-1">
				<Text size={"3"}>Note*</Text>
				<TextField.Root
					required
					size={"3"}
					style={{ flex: 1 }}
					key={form.key(`services.${index}.note`)}
					{...form.getInputProps(`services.${index}.note`)}
				/>
			</div>

			<div className="flex flex-col mt-8 items-center">
				<IconButton
					type="button"
					color="red"
					size={"1"}
					onClick={() => form.removeListItem("services", index)}
				>
					<Trash size="1rem" />
				</IconButton>
			</div>
		</Flex>
	));

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger
				disabled={isRadiologyPending || isPatientsPending || isProfilePending}
			>
				<Button loading={isProfilePending || isRadiologyPending} size={"4"}>
					New Request
				</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>Radiology Request</Dialog.Title>
				<Dialog.Description size="2" mb="4">
					Fill out the form information
				</Dialog.Description>

				<form
					onSubmit={form.onSubmit(async (values) => {
						setIsLoading(true);
						const { error, data } = await supabase.from("requests").insert({
							patients_id: patientId ?? `${values.patients_id}`,
							taken_by: `${profile_data?.id}`,
							branch_id: `${profile_data?.branch_id}`,
							is_radiology: true,
							services: values.services.map((v) => ({
								service: JSON.parse(v.service),
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

					{fields.length < 0 && (
						<Callout.Root color="red">
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
									service: "",
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
						disabled={!form.isValid() || isLoading}
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

export function UpdateRadiologyRequestForm(radData: DB["requests"]["Update"]) {
	const [isLoading, setIsLoading] = useState(false);
	const { data: imaging_data, isPending: isRadiologyPending } =
		useImagingQuery();

	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();
	const { isProfilePending, profile_data } = useProfile();

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			services: [{ service: "", note: "", key: randomId() }],
		},
	});

	const fields = form.getValues().services.map((item, index) => (
		<Flex key={item.key} gap={"2"} mt={"4"}>
			<div className="flex flex-col gap-1 w-full">
				<Text size={"3"}>Service*</Text>
				<Select.Root
					required
					size={"3"}
					key={form.key(`services.${index}.service`)}
					onValueChange={(e) =>
						form.getInputProps(`services.${index}.service`).onChange(e)
					}
				>
					<Select.Trigger placeholder="select an imaging service..." />
					<Select.Content position="popper">
						{imaging_data?.imaging_data?.map((v) => (
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

			<div className="flex flex-col gap-1">
				<Text size={"3"}>Note*</Text>
				<TextField.Root
					required
					size={"3"}
					style={{ flex: 1 }}
					key={form.key(`services.${index}.note`)}
					{...form.getInputProps(`services.${index}.note`)}
				/>
			</div>

			<div className="flex flex-col mt-8 items-center">
				<IconButton
					type="button"
					color="red"
					size={"1"}
					onClick={() => form.removeListItem("services", index)}
				>
					<Trash size="1rem" />
				</IconButton>
			</div>
		</Flex>
	));

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger disabled={isRadiologyPending || isProfilePending}>
				<Button
					loading={isProfilePending || isRadiologyPending}
					size={"1"}
					color="red"
					variant="ghost"
				>
					<Edit />
				</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>Radiology Request</Dialog.Title>
				<Dialog.Description size="2" mb="4">
					Fill out the form information
				</Dialog.Description>

				<form
					onSubmit={form.onSubmit(async (values) => {
						setIsLoading(true);

						const { error, data } = await supabase
							.from("requests")
							.update({
								patients_id: `${radData.patients_id}`,
								taken_by: `${profile_data?.id}`,
								branch_id: `${profile_data?.branch_id}`,
								is_radiology: true,
								services: values.services.map((v) => ({
									service: JSON.parse(v.service),
									note: v.note,
								})),
							})
							.eq("id", `${radData.id}`);
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
					{fields.length < 0 && (
						<Callout.Root color="red">
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
									service: "",
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
						disabled={!form.isValid() || isLoading}
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
