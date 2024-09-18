import { useConsultationTemplatesQuery } from "@/actions/queries";
import { useProfile } from "@/lib/hooks";
import { Button, Modal, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Flex, Spinner, Text } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Editor } from "@tinymce/tinymce-react";
import { Edit } from "lucide-react";
import { z } from "zod";
import {
	createAdmissionReportsAction,
	updateAdmissionReportsAction,
} from "../../actions/config/admission";
import { FieldInfo } from "../../components/FieldInfo";
import { editor_plugins } from "../../components/textEditor/RichTextEditor";

export function RecordsAndTaskForm({
	patientId,
	isProgressNote,
	btnLable,
	dialogTitle,
}: {
	patientId: string;
	btnLable: string;
	dialogTitle: string;
	isProgressNote: boolean;
}) {
	const queryClient = useQueryClient();
	const { data, isPending } = useConsultationTemplatesQuery();
	const { isProfilePending, profile_data } = useProfile();
	const [opened, { open, close }] = useDisclosure(false);

	const form = useForm({
		defaultValues: {
			note: "",
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await createAdmissionReportsAction({
				...value,
				patient_id: patientId,
				created_by: `${profile_data?.id}`,
				is_progress_note: isProgressNote,
				branch_id: `${profile_data?.branch_id}`,
			});
			form.reset();
			close();
			queryClient.invalidateQueries({ queryKey: ["nursingReportsById"] });
		},
	});

	return (
		<>
			<Button
				size={"md"}
				onClick={open}
				loading={isProfilePending || isPending}
			>
				{btnLable}
			</Button>
			<Modal opened={opened} onClose={close} title={dialogTitle} size={"60rem"}>
				<form
					onSubmit={(e) => {
						e.stopPropagation();
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<div className="flex flex-col gap-1 w-96">
						<Select
							label="Use a template?"
							onChange={(e) => {
								form.setFieldValue("note", e!);
							}}
							data={
								data?.consultation_templates_data?.map((t) => ({
									value: t.content,
									label: t.name,
								})) ?? []
							}
						/>
					</div>
					<form.Field
						name="note"
						validators={{
							onChange: z
								.string()
								.min(10, { message: "must be atleast 3 characters" }),
						}}
					>
						{(field) => (
							<label htmlFor={field.name} className="flex flex-col">
								<Text size={"3"}>Task</Text>
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
					<Flex gap="3" justify="end">
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
						>
							{([canSubmit, isSubmitting]) => (
								<Button
									mt="8"
									loading={isSubmitting}
									type="submit"
									disabled={!canSubmit || isSubmitting}
									size={"lg"}
								>
									Save
								</Button>
							)}
						</form.Subscribe>
					</Flex>
				</form>
			</Modal>
		</>
	);
}

export function UpdateRecordsAndTaskForm(
	values: DB["nursing_report"]["Update"],
) {
	const [opened, { open, close }] = useDisclosure(false);

	const queryClient = useQueryClient();
	const { data, isPending } = useConsultationTemplatesQuery();
	const { isProfilePending, profile_data } = useProfile();

	const form = useForm({
		defaultValues: {
			...values,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await updateAdmissionReportsAction({
				...value,
				created_by: `${profile_data?.id}`,
				branch_id: `${profile_data?.branch_id}`,
			});
			form.reset();
			close();
			queryClient.invalidateQueries({ queryKey: ["nursingReportsById"] });
		},
	});

	return (
		<>
			<Button
				variant="subtle"
				size="compact-xs"
				onClick={open}
				loading={isProfilePending}
			>
				<Edit size={16} />
			</Button>

			<Modal
				opened={opened}
				onClose={close}
				title={"Update Nursing Report"}
				size={"60rem"}
			>
				<form
					onSubmit={(e) => {
						e.stopPropagation();
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<div className="flex flex-col gap-1 w-96">
						{isPending ? (
							<Spinner />
						) : (
							<Select
								label="Use a template?"
								onChange={(e) => {
									form.setFieldValue("note", e!);
								}}
								data={
									data?.consultation_templates_data?.map((t) => ({
										value: t.content,
										label: t.name,
									})) ?? []
								}
							/>
						)}
					</div>
					<form.Field
						name="note"
						validators={{
							onChange: z
								.string()
								.min(10, { message: "must be atleast 3 characters" }),
						}}
					>
						{(field) => (
							<label htmlFor={field.name} className="flex flex-col">
								<Text size={"3"}>Task</Text>
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
					<Flex gap="3" mt="4" justify="end">
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
						>
							{([canSubmit, isSubmitting]) => (
								<Button
									mt="4"
									loading={isSubmitting}
									type="submit"
									disabled={!canSubmit || isSubmitting}
									size={"lg"}
								>
									Save
								</Button>
							)}
						</form.Subscribe>
					</Flex>
				</form>
			</Modal>
		</>
	);
}
