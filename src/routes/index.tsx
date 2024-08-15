import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
	Box,
	Button,
	Card,
	Container,
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

export const Route = createFileRoute("/")({
	component: Login,
});

function Login() {
	return (
		<section className="flex flex-col justify-between h-dvh w-full">
			<div className="flex flex-col mt-10 md:mt-20 lg:mt-40 gap-10">
				<Heading size={"7"} align={"center"}>
					Brightedge HMR
				</Heading>
				<Container size={"3"} mx={"2"}>
					<Flex
						direction={{
							initial: "column",
							md: "row",
							lg: "column",
							xl: "row",
						}}
						justify={"center"}
						align={"center"}
						gap={"6"}
					>
						<div className="flex flex-col">
							<SignIn />
						</div>
					</Flex>
				</Container>
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
		<Box>
			<Card className="shadow-md">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<Flex direction={"column"} gap={"3"} p={"6"}>
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
			</Card>
		</Box>
	);
}
