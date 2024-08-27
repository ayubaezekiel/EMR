import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
	Box,
	Button,
	Card,
	Dialog,
	Flex,
	Heading,
	IconButton,
	Spinner,
	TextField,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { FieldInfo } from "../components/FieldInfo";
import { Footer } from "../components/Footer";
import supabase from "../supabase/client";
import logo from "../../src/assets/logo.png";

export const Route = createFileRoute("/")({
	component: Login,
});

function Login() {
	const [open, onOpenChange] = useState(false);
	const form = useForm({
		validatorAdapter: zodValidator(),
		defaultValues: {
			email: "",
		},
		onSubmit: async ({ value }) => {
			const { error } = await supabase.auth.resetPasswordForEmail(value.email, {
				redirectTo: `${window.location.href}reset_password`,
			});
			if (error) {
				toast.error(error.message);
			}
			if (error) {
				toast.success(error.message);
			} else {
				toast.success(
					"A confirmation has been sent to your email, open your mail to continue",
				);
				form.reset();
				onOpenChange(false);
			}
		},
	});

	return (
		<section className="flex flex-col justify-between h-dvh w-full">
			<div className="flex flex-col mt-40">
				<div className="flex flex-col w-full md:w-1/3 md:mx-auto px-10">
					<Card className="shadow-md">
						<img src={logo} className="size-24 mx-auto" />
						<Heading size={"7"} my={"4"} align={"center"}>
							Brightedge HMR
						</Heading>
						<div className="p-10">
							<SignIn />
							<Flex justify={"end"} my={"4"}>
								<Dialog.Root onOpenChange={onOpenChange} open={open}>
									<Dialog.Trigger>
										<Button variant="ghost" color="red">
											Forgot Password
										</Button>
									</Dialog.Trigger>

									<Dialog.Content>
										<Dialog.Title>Send Confirmation Mail</Dialog.Title>
										<Dialog.Description size="2" mb="4">
											Fill the form with your email and wait for a confirmation
											in your mailbox
										</Dialog.Description>
										<form
											onSubmit={(e) => {
												e.preventDefault();
												e.stopPropagation();
												form.handleSubmit();
											}}
										>
											<form.Field
												name="email"
												validators={{
													onChange: z.string().email(),
												}}
											>
												{(field) => (
													<Box>
														<TextField.Root
															id={field.name}
															name={field.name}
															value={field.state.value}
															onBlur={field.handleBlur}
															onChange={(e) =>
																field.handleChange(e.target.value)
															}
															size="3"
															placeholder="email"
														>
															<TextField.Slot>
																<Mail />
															</TextField.Slot>
															<TextField.Slot>
																<Mail height="14" width="14" />
															</TextField.Slot>
														</TextField.Root>
														<FieldInfo field={field} />
													</Box>
												)}
											</form.Field>
											<Flex justify={"end"} mt={"4"}>
												<form.Subscribe
													selector={(state) => [
														state.canSubmit,
														state.isSubmitting,
													]}
													children={([canSubmit, isSubmitting]) => (
														<Button
															size={"4"}
															type="submit"
															disabled={!canSubmit}
															loading={isSubmitting}
														>
															Send Confirmation Mail
														</Button>
													)}
												/>
											</Flex>
										</form>
									</Dialog.Content>
								</Dialog.Root>
							</Flex>
						</div>
					</Card>
				</div>
			</div>
			<Footer />
		</section>
	);
}

function SignIn() {
	const [revealPassword, setRevealPassword] = useState(false);
	const navigate = useNavigate();
	const form = useForm({
		validatorAdapter: zodValidator(),
		defaultValues: {
			password: "",
			email: "",
		},
		onSubmit: async ({ value }) => {
			const authData = {
				email: value.email,
				password: value.password,
			};
			const { data, error } = await supabase.auth.signInWithPassword(authData);
			if (error) {
				toast.error(error.message);
			}
			if (data.user?.id) {
				toast.success("Logged in successfully");
				form.reset();
				navigate({ to: "/dashboard", replace: true });
			}
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<Flex direction={"column"} gap={"3"}>
				<form.Field
					name="email"
					validators={{
						onChange: z.string().email(),
					}}
					children={(field) => {
						return (
							<Box>
								<TextField.Root
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									size="3"
									placeholder="email"
								>
									<TextField.Slot>
										<Mail />
									</TextField.Slot>
									<TextField.Slot>
										<Mail height="14" width="14" />
									</TextField.Slot>
								</TextField.Root>
								<FieldInfo field={field} />
							</Box>
						);
					}}
				/>

				<form.Field
					validators={{
						onChange: z.string().min(5, {
							message: "password must be atleast more than 5 characters ",
						}),
					}}
					name="password"
					children={(field) => {
						return (
							<Box>
								<TextField.Root
									type={revealPassword ? "text" : "password"}
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									size="3"
									placeholder="password"
								>
									<TextField.Slot>
										<Lock />
									</TextField.Slot>
									<TextField.Slot>
										<IconButton
											size="1"
											type="button"
											variant="ghost"
											onClick={() => setRevealPassword(!revealPassword)}
										>
											{revealPassword ? (
												<Eye height="14" width="14" />
											) : (
												<EyeOff height="14" width="14" />
											)}
										</IconButton>
									</TextField.Slot>
								</TextField.Root>
								<FieldInfo field={field} />
							</Box>
						);
					}}
				/>

				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
					children={([canSubmit, isSubmitting]) => (
						<Button size={"4"} type="submit" disabled={!canSubmit}>
							{isSubmitting ? <Spinner /> : "Login"}
						</Button>
					)}
				/>
			</Flex>
		</form>
	);
}
