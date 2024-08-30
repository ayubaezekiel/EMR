import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Edit } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import {
	createImagingTemplateAction,
	updateImagingTemplateAction,
} from "../../../actions/config/radiology";
import { FieldInfo } from "../../../components/FieldInfo";
import { editor_plugins } from "../../../components/textEditor/RichTextEditor";
import { Editor } from "@tinymce/tinymce-react";

export function CreateImagingTemplateForm() {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm({
		defaultValues: {
			title: "",
			note: "",
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await createImagingTemplateAction(value);
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["imagingTemp"] });
		},
	});

	return (
		<div>
			<Dialog.Root open={open} onOpenChange={onOpenChange}>
				<Dialog.Trigger>
					<Button variant="soft">New</Button>
				</Dialog.Trigger>

				<Dialog.Content>
					<Dialog.Title>New Template</Dialog.Title>
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
						<form.Field
							name="title"
							validators={{
								onChange: z
									.string()
									.min(3, { message: "field must be atleast 3 characters" }),
							}}
							children={(field) => (
								<label htmlFor={field.name} className="flex flex-col">
									<Text size={"3"}>Name*</Text>
									<TextField.Root
										name={field.name}
										id={field.name}
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
									/>
									<FieldInfo field={field} />
								</label>
							)}
						/>

						<form.Field
							name="note"
							validators={{
								onChange: z
									.string()
									.min(10, { message: "field must be atleast 10 characters" }),
							}}
							children={(field) => (
								<div className="flex flex-col">
									<Text size={"3"}>
										Note
										<Text size={"1"}> (should be atleast 10 characters)</Text>*
									</Text>
									<Editor
										tinymceScriptSrc="/tinymce/tinymce.min.js"
										licenseKey="gpl"
										onChange={(e) => field.handleChange(e.target.getContent())}
										initialValue={field.state.value}
										init={editor_plugins}
									/>
									<FieldInfo field={field} />
								</div>
							)}
						/>
						<Flex gap="3" mt="4" justify="end">
							<form.Subscribe
								selector={(state) => [state.canSubmit, state.isSubmitting]}
								children={([canSubmit, isSubmitting]) => (
									<Button
										loading={isSubmitting}
										type="submit"
										disabled={!canSubmit || isSubmitting}
										size={"4"}
									>
										Save
									</Button>
								)}
							/>
						</Flex>
					</form>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	);
}

export function UpdateImagingTemplateForm({
	id,
	...values
}: DB["imaging_templates"]["Update"]) {
	const [open, onOpenChange] = useState(false);

	const queryClient = useQueryClient();

	const form = useForm({
		defaultValues: {
			id: id,
			...values,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await updateImagingTemplateAction(value);
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["imagingTemp"] });
		},
	});

	return (
		<div>
			<Dialog.Root open={open} onOpenChange={onOpenChange}>
				<Dialog.Trigger>
					<Button variant="ghost">
						<Edit size={16} />
					</Button>
				</Dialog.Trigger>

				<Dialog.Content>
					<Dialog.Title>Update Template</Dialog.Title>
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
						<form.Field
							name="title"
							validators={{
								onChange: z
									.string()
									.min(3, { message: "field must be atleast 3 characters" }),
							}}
							children={(field) => (
								<label htmlFor={field.name} className="flex flex-col">
									<Text size={"3"}>Name*</Text>
									<TextField.Root
										name={field.name}
										id={field.name}
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
									/>
									<FieldInfo field={field} />
								</label>
							)}
						/>

						<form.Field
							name="note"
							validators={{
								onChange: z
									.string()
									.min(10, { message: "field must be atleast 10 characters" }),
							}}
							children={(field) => (
								<div className="flex flex-col">
									<Text size={"3"}>
										Note
										<Text size={"1"}>(should be atleast 10 characters)</Text>*
									</Text>
									<Editor
										tinymceScriptSrc="/tinymce/tinymce.min.js"
										licenseKey="gpl"
										onChange={(e) => field.handleChange(e.target.getContent())}
										initialValue={field.state.value}
										init={editor_plugins}
									/>
									<FieldInfo field={field} />
								</div>
							)}
						/>
						<Flex gap="3" mt="4" justify="end">
							<form.Subscribe
								selector={(state) => [state.canSubmit, state.isSubmitting]}
								children={([canSubmit, isSubmitting]) => (
									<Button
										loading={isSubmitting}
										type="submit"
										disabled={!canSubmit || isSubmitting}
										size={"4"}
									>
										Save
									</Button>
								)}
							/>
						</Flex>
					</form>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	);
}
