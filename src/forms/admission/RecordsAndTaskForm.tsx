import { Button, Dialog, Flex, Select, Text } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useState } from "react";
import { z } from "zod";
import {
	createAdmissionReportsAction,
	updateAdmissionReportsAction,
} from "../../actions/config/admission";
import { consultationTemplatesQueryOptions } from "../../actions/queries";
import { FieldInfo } from "../../components/FieldInfo";
import PendingComponent from "../../components/PendingComponent";
import { RichEditor } from "../../components/textEditor/RichTextEditor";
import { useProfile } from "../../lib/hooks";
import { Edit } from "lucide-react";

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
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();
	const [template, setTemplate] = useState("");
	const { data, isPending } = useQuery(consultationTemplatesQueryOptions);
	const { isProfilePending, profile_data } = useProfile();

	const form = useForm({
		defaultValues: {
			note: template,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await createAdmissionReportsAction({
				...value,
				patient_id: patientId,
				created_by: `${profile_data?.id}`,
				is_progress_note: isProgressNote,
			});
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["nursingReports"] });
		},
	});

	if (isPending || isProfilePending) return <PendingComponent />;

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger>
				<Button size={"4"}>{btnLable}</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>{dialogTitle}</Dialog.Title>
				<Dialog.Description size="2" mb="4">
					Fill out the form information
				</Dialog.Description>

				<form
					onSubmit={(e) => {
						e.stopPropagation();
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<div className="flex flex-col gap-1 w-96">
						<Text size={"3"}>Use a template?</Text>
						<Select.Root onValueChange={(e) => setTemplate(e)}>
							<Select.Trigger placeholder="select a template..." />
							<Select.Content position="popper">
								{data?.consultation_templates_data?.map((t) => (
									<Select.Item key={t.id} value={t.content}>
										{t.name}
									</Select.Item>
								))}
							</Select.Content>
						</Select.Root>
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
								<RichEditor
									initialValue={field.state.value}
									onChange={(e) => field.handleChange(e)}
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
									loading={isSubmitting}
									type="submit"
									disabled={!canSubmit || isSubmitting}
									size={"4"}
								>
									Save
								</Button>
							)}
						</form.Subscribe>
					</Flex>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	);
}

export function UpdateRecordsAndTaskForm(
	values: DB["nursing_report"]["Update"],
) {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();
	const [template, setTemplate] = useState(values.note);
	const { data, isPending } = useQuery(consultationTemplatesQueryOptions);
	const { isProfilePending, profile_data } = useProfile();

	const form = useForm({
		defaultValues: {
			note: template,
			...values,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await updateAdmissionReportsAction({
				...value,
				created_by: `${profile_data?.id}`,
			});
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["nursingReports"] });
		},
	});

	if (isPending || isProfilePending) return <PendingComponent />;

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger>
				<Button variant="ghost">
					<Edit size={16} />
				</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>Update Nursing Report</Dialog.Title>
				<Dialog.Description size="2" mb="4">
					Fill out the form information
				</Dialog.Description>

				<form
					onSubmit={(e) => {
						e.stopPropagation();
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<div className="flex flex-col gap-1 w-96">
						<Text size={"3"}>Use a template?</Text>
						<Select.Root onValueChange={(e) => setTemplate(e)}>
							<Select.Trigger placeholder="select a template..." />
							<Select.Content position="popper">
								{data?.consultation_templates_data?.map((t) => (
									<Select.Item key={t.id} value={t.content}>
										{t.name}
									</Select.Item>
								))}
							</Select.Content>
						</Select.Root>
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
								<RichEditor
									initialValue={field.state.value!}
									onChange={(e) => field.handleChange(e)}
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
									loading={isSubmitting}
									type="submit"
									disabled={!canSubmit || isSubmitting}
									size={"4"}
								>
									Save
								</Button>
							)}
						</form.Subscribe>
					</Flex>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	);
}
