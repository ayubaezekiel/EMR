import {
	Button,
	Dialog,
	Flex,
	Select,
	Text,
	TextArea,
	TextField,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useState } from "react";
import { z } from "zod";
import { updateCenterAction } from "../../actions/config/branch";
import { FieldInfo } from "../../components/FieldInfo";
import states from "../../lib/statesAndLocalGov.json";

export function UpdateCenterForm({ ...values }: DB["center"]["Update"]) {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();
	const [myStates, setMyState] = useState<string[] | undefined>([]);

	const form = useForm({
		defaultValues: {
			...values,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await updateCenterAction(value);
			form.reset();
			onOpenChange(false);

			queryClient.invalidateQueries({ queryKey: ["center"] });
		},
	});

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger>
				<Button>Update</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>Update Branch</Dialog.Title>
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
						name="name"
						validators={{
							onChange: z
								.string()
								.min(3, { message: "field must be atleast 3 characters" }),
						}}
					>
						{(field) => (
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
					</form.Field>

					<form.Field
						defaultValue=""
						name="state"
						validators={{
							onChange: z.string(),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>State*</Text>
								<Select.Root
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => {
										field.handleChange(e);
										setMyState(states.find((s) => s.state === e)?.lgas);
									}}
								>
									<Select.Trigger />
									<Select.Content position="popper">
										<Select.Group>
											{states.map((s) => (
												<Select.Item key={s.state} value={s.state}>
													{s.state}
												</Select.Item>
											))}
										</Select.Group>
									</Select.Content>
								</Select.Root>
								<FieldInfo field={field} />
							</div>
						)}
					/>
					<form.Field
						name="lga"
						validators={{
							onChange: z.string(),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>LGA*</Text>
								<Select.Root
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger />
									<Select.Content position="popper">
										<Select.Group>
											{myStates?.map((l, i) => (
												<Select.Item key={i} value={l}>
													{l}
												</Select.Item>
											))}
										</Select.Group>
									</Select.Content>
								</Select.Root>
								<FieldInfo field={field} />
							</div>
						)}
					/>

					<form.Field
						name="logo_url"
						validators={{
							onChange: z.string().url(),
						}}
					>
						{(field) => (
							<label htmlFor={field.name} className="flex flex-col">
								<Text size={"3"}>Logo Url</Text>
								<TextField.Root
									name={field.name}
									id={field.name}
									value={field.state.value!}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
								/>
								<FieldInfo field={field} />
							</label>
						)}
					</form.Field>
					<form.Field
						name="footer"
						validators={{
							onChange: z
								.string()
								.min(3, { message: "field must be atleast 3 characters" }),
						}}
					>
						{(field) => (
							<label htmlFor={field.name} className="flex flex-col">
								<Text size={"3"}>Footer Text</Text>
								<TextField.Root
									name={field.name}
									id={field.name}
									value={field.state.value!}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
								/>
								<FieldInfo field={field} />
							</label>
						)}
					</form.Field>
					<form.Field
						name="address"
						validators={{
							onChange: z
								.string()
								.min(5, { message: "field must be atleast 5 characters" }),
						}}
						children={(field) => (
							<label htmlFor={field.name} className="flex flex-col">
								<Text size={"3"}>Address*</Text>
								<TextArea
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
	);
}
