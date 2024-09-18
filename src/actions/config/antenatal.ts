import { toast } from "sonner";
import supabase from "@/supabase/client";

export const createAntenatalPackageAction = async (
	values: DB["antenatal_package"]["Insert"],
) => {
	const { error, data } = await supabase
		.from("antenatal_package")
		.insert(values);
	if (error && !data) {
		toast.error(error.message);
	} else {
		toast.success("antenatal package created successfully");
	}
};

export const updateAntenatalPackageAction = async (
	values: DB["antenatal_package"]["Update"],
) => {
	if (values.id) {
		const { error, data } = await supabase
			.from("antenatal_package")
			.update(values)
			.eq("id", values.id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("antenatal package updated successfully");
	}
};

export const deleteAntenatalPackageAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error, data } = await supabase
			.from("antenatal_package")
			.delete()
			.eq("id", id);
		if (error && !data) {
			toast.error(error.message);
		}
		toast.success("antenatal package deleted successfully");
	}
};
