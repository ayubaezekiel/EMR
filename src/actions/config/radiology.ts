import { toast } from "sonner";
import supabase from "../../supabase/client";

export const createImagingAction = async (values: DB["imaging"]["Insert"]) => {
	const { error } = await supabase.from("imaging").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("imaging created successfully");
	}
};

export const updateImagingAction = async (values: DB["imaging"]["Update"]) => {
	if (values.id) {
		const { error } = await supabase
			.from("imaging")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("imaging updated successfully");
		}
	}
};

export const createImagingTemplateAction = async (
	values: DB["imaging_templates"]["Insert"],
) => {
	const { error } = await supabase.from("imaging_templates").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("template created successfully");
	}
};

export const updateImagingTemplateAction = async (
	values: DB["imaging_templates"]["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("imaging_templates")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("template updated successfully");
		}
	}
};

export const createImagingCategoryAction = async (
	values: DB["imaging_category"]["Insert"],
) => {
	const { error } = await supabase.from("imaging_category").insert(values);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("category created successfully");
	}
};

export const updateImagingCategoryAction = async (
	values: DB["imaging_category"]["Update"],
) => {
	if (values.id) {
		const { error } = await supabase
			.from("imaging_category")
			.update(values)
			.eq("id", values.id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("category updated successfully");
		}
	}
};

export const deleteImagingCategoryAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase
			.from("imaging_category")
			.delete()
			.eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("category deleted successfully");
	}
};
export const deleteImagingAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase.from("imaging").delete().eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("imaging deleted successfully");
	}
};
export const deleteImagingTemplateAction = async ({ id }: { id: string }) => {
	if (id) {
		const { error } = await supabase
			.from("imaging_templates")
			.delete()
			.eq("id", id);
		if (error) {
			toast.error(error.message);
		}
		toast.success("template deleted successfully");
	}
};
