import {
	Box,
	Button,
	Callout,
	Card,
	Flex,
	Heading,
	IconButton,
	TextField,
} from "@radix-ui/themes";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FieldInfo } from "../components/FieldInfo";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Lock } from "lucide-react";
import supabase from "../supabase/client";
import { Footer } from "../components/Footer";
import logo from "../../src/assets/logo.png";

export const Route = createFileRoute("/reset_password")({
	component: () => (
		<section className="flex flex-col justify-between h-dvh w-full">
			<div className="flex flex-col mt-40">
				<div className="flex flex-col w-full md:w-1/3 md:mx-auto px-10">
					<Card className="shadow-md">
						<img src={logo} className="size-24 mx-auto" />
						<Heading size={"7"} my={"4"} align={"center"}>
							Brightedge HMR
						</Heading>
						<Callout.Root color="red">
							<Callout.Text align={"center"}>
								Reset your password and save it somewhere safe, do not share
								this link with anyone before changing your password
							</Callout.Text>
						</Callout.Root>
						<div className="px-10">
							<ResetPassword />
						</div>
					</Card>
				</div>
			</div>
			<Footer />
		</section>
	),
});

function ResetPassword() {
	const [revealPassword, setRevealPassword] = useState(false);
	const navigate = useNavigate();
	const form = useForm({
		defaultValues: {
			password: "",
			confirm_password: "",
		},
		onSubmit: async ({ value }) => {
			const { data, error } = await supabase.auth.updateUser({
				password: value.password,
			});

			if (error) {
				toast.error(error.message);
			}
			if (data.user?.id) {
				console.log(data.user);

				toast.success("password reset successfull");
				form.reset();
				navigate({ to: "/" });
			}
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.stopPropagation(), e.preventDefault(), form.handleSubmit();
			}}
		>
			<Flex direction={"column"} gap={"3"} p={"6"}>
				<form.Field
					name="password"
					children={(field) => (
						<Box>
							<TextField.Root
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								size="3"
								placeholder="password"
								type={revealPassword ? "text" : "password"}
							>
								<TextField.Slot>
									<Lock />
								</TextField.Slot>
								<TextField.Slot>
									<IconButton
										onClick={() => setRevealPassword(!revealPassword)}
										type="button"
										size="1"
										variant="ghost"
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
					)}
				/>
				<form.Field
					name="confirm_password"
					validators={{
						onChangeListenTo: ["password"],
						onChange: ({ value, fieldApi }) => {
							if (value !== fieldApi.form.getFieldValue("password")) {
								return "password do not match";
							}
							return undefined;
						},
					}}
					children={(field) => (
						<Box>
							<TextField.Root
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								size="3"
								type={revealPassword ? "text" : "password"}
								placeholder="confirm password"
							>
								<TextField.Slot>
									<Lock />
								</TextField.Slot>
								<TextField.Slot>
									<IconButton
										onClick={() => setRevealPassword(!revealPassword)}
										type="button"
										size="1"
										variant="ghost"
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
					)}
				/>
				<Flex gap={"4"}>
					<div className="w-full">
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
							children={([canSubmit, isSubmitting]) => (
								<Button
									style={{ width: "100%" }}
									size={"4"}
									type="submit"
									disabled={!canSubmit}
									loading={isSubmitting}
								>
									Reset
								</Button>
							)}
						/>
					</div>

					<Button asChild size={"4"} variant="soft">
						<Link to="/">Login</Link>
					</Button>
				</Flex>
			</Flex>
		</form>
	);
}
