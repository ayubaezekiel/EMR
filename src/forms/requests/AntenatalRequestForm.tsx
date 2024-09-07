import {
	useConsultationTemplatesQuery,
	usePatientsQuery,
} from "@/actions/queries";
import { FieldInfo } from "@/components/FieldInfo";
import { editor_plugins } from "@/components/textEditor/RichTextEditor";
import { useAntenatalPackage } from "@/lib/hooks";
import { getProfile } from "@/lib/utils";
import supabase from "@/supabase/client";
import { Button, Group, Modal, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { Text } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Editor } from "@tinymce/tinymce-react";
import { addMonths } from "date-fns";
import { toast } from "sonner";
import { z } from "zod";

export function CreateAntenatalRequestForm() {
	const [opened, { open, close }] = useDisclosure(false);
	const { antenatal_package_data, isAntenatalPackagePending } =
		useAntenatalPackage();
	const { data, isPending } = useConsultationTemplatesQuery();
	const { data: patient_data, isPending: isPatientsPending } =
		usePatientsQuery();

	const queryClient = useQueryClient();

	const form = useForm({
		defaultValues: {
			services: {
				package: "",
				note: "",
				expected_delivary_date: addMonths(new Date(), 9),
				amount: 0,
			},
			patients_id: "",
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			const prof = await getProfile();
			const { error } = await supabase.from("requests").insert({
				patients_id: `${value.patients_id}`,
				taken_by: `${prof?.id}`,
				is_antenatal: true,
				services: {
					package: value.services.package,
					note: value.services.note,
					expected_delivary_date: addMonths(new Date(), 9).toISOString(),
					amount: value.services.amount,
				},
			});
			if (error) {
				toast.error(error.message);
				console.log(value.services);
			} else {
				toast.success("patient enrolled successfully");
				form.reset();
				queryClient.invalidateQueries({ queryKey: ["requests"] });
				close();
			}
		},
	});

	return (
		<>
			<Button
				size={"md"}
				onClick={open}
				loading={isPatientsPending || isPending || isAntenatalPackagePending}
			>
				New Request
			</Button>
			<Modal
				opened={opened}
				onClose={close}
				title={"Antenatal Request"}
				size={"60rem"}
			>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<Select
						label="Use a template?"
						onChange={(e) => {
							form.setFieldValue("services.note", e!);
						}}
						data={
							data?.consultation_templates_data?.map((t) => ({
								value: t.content,
								label: t.name,
							})) ?? []
						}
					/>

					<div className="grid grid-cols-3 gap-2 mt-4">
						<form.Field
							name="patients_id"
							validators={{
								onChange: z.string().min(2, { message: "required" }),
							}}
							children={(field) => (
								<div className="flex flex-col">
									<Select
										allowDeselect={false}
										label="Patient"
										nothingFoundMessage="No Antenatal Package Fount"
										required
										name={field.name}
										value={field.state.value}
										onChange={(e) => field.handleChange(e!)}
										data={patient_data?.patient_data?.map((p) => ({
											label: `${p.first_name} ${p.middle_name ?? ""} ${p.last_name} - [${p.id.slice(0, 8).toUpperCase()}]`,
											value: p.id,
										}))}
									/>
									<FieldInfo field={field} />
								</div>
							)}
						/>
						<form.Field
							name="services.expected_delivary_date"
							validators={{
								onChange: z.date(),
							}}
							children={(field) => (
								<div className="flex flex-col">
									<DateInput
										required
										value={field.state.value}
										onChange={(e) => field.handleChange(e!)}
										label="Expected Delivary Date"
										placeholder="Select date"
									/>
									<FieldInfo field={field} />
								</div>
							)}
						/>
						<form.Field
							name="services.package"
							validators={{
								onChange: z.string().min(2, { message: "required" }),
							}}
							children={(field) => (
								<div className="flex flex-col">
									<Select
										allowDeselect={false}
										label="Antenatal Package"
										required
										name={field.name}
										nothingFoundMessage="No Antenatal Package Fount"
										value={field.state.value}
										onChange={(e) => field.handleChange(e!)}
										data={antenatal_package_data?.map((p) => p.name)}
									/>

									<FieldInfo field={field} />
								</div>
							)}
						/>
					</div>

					<form.Field
						name="services.note"
						validators={{
							onChange: z
								.string()
								.min(10, { message: "must be atleast 3 characters" }),
						}}
					>
						{(field) => (
							<label htmlFor={field.name} className="flex flex-col">
								<Text size={"3"}>Note*</Text>
								<Editor
									tinymceScriptSrc="/tinymce/tinymce.min.js"
									licenseKey="gpl"
									onChange={(e) => field.handleChange(e.target.getContent())}
									initialValue={field.state.value}
									init={editor_plugins}
								/>
								<FieldInfo field={field} />
							</label>
						)}
					</form.Field>
					<Group gap="3" mt="lg" justify="end">
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
							children={([canSubmit, isSubmitting]) => (
								<Button
									loading={isSubmitting}
									type="submit"
									disabled={!canSubmit || isSubmitting}
									size={"md"}
								>
									Enroll Patient
								</Button>
							)}
						/>
					</Group>
				</form>
			</Modal>
		</>
	);
}
