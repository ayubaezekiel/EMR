import { toast } from "sonner";
import supabase from "../../supabase/client";

export const createLabTestAction = async (
    values: DB['lab_tests']["Insert"]
) => {
    const { error } = await supabase.from("lab_tests").insert(values);
    if (error) {
        toast.error(error.message);
    } else {
        toast.success("lab test created successfully");
    }
};

export const updateLabTestAction = async (
    values: DB['lab_tests']["Update"]
) => {
    if (values.id) {
        const { error } = await supabase
            .from("lab_tests")
            .update(values)
            .eq("id", values.id);
        if (error) {
            toast.error(error.message);
        } else {
            toast.success("lab test updated successfully")
        }
    }
};


export const deleteLabTestAction = async ({ id }: { id: string }) => {
    if (id) {
        const { error } = await supabase.from("lab_tests").delete().eq('id', id);
        if (error) {
            toast.error(error.message);
        }
        toast.success("lab test deleted successfully");
    }

}



export const createLabTestTemplateAction = async (
    values: DB['lab_test_template']["Insert"]
) => {
    const { error } = await supabase.from("lab_test_template").insert(values);
    if (error) {
        toast.error(error.message);
    } else {
        toast.success("template created successfully");
    }
};

export const updateLabTestTemplateAction = async (
    values: DB['lab_test_template']["Update"]
) => {
    if (values.id) {
        const { error } = await supabase
            .from("lab_test_template")
            .update(values)
            .eq("id", values.id);
        if (error) {
            toast.error(error.message);
        } else {
            toast.success("template updated successfully")
        }
    }
};


export const deleteLabTemplateAction = async ({ id }: { id: string }) => {
    if (id) {
        const { error } = await supabase.from("lab_test_template").delete().eq('id', id);
        if (error) {
            toast.error(error.message);
        }
        toast.success("template deleted successfully");
    }

}

export const createLabTestCategoryAction = async (
    values: DB['lab_test_category']["Insert"]
) => {
    const { error } = await supabase.from("lab_test_category").insert(values);
    if (error) {
        toast.error(error.message);
    } else {
        toast.success("category created successfully");
    }
};

export const updateLabTestCategoryAction = async (
    values: DB['lab_test_category']["Update"]
) => {
    if (values.id) {
        const { error } = await supabase
            .from("lab_test_category")
            .update(values)
            .eq("id", values.id);
        if (error) {
            toast.error(error.message);
        } else {
            toast.success("category updated successfully")
        }
    }
};


export const deleteLabTestCategoryAction = async ({ id }: { id: string }) => {
    if (id) {
        const { error } = await supabase.from("lab_test_category").delete().eq('id', id);
        if (error) {
            toast.error(error.message);
        }
        toast.success("category deleted successfully");
    }

}


export const createLabTestParamsAction = async (
    values: DB['lab_test_parameter']["Insert"]
) => {
    const { error } = await supabase.from("lab_test_parameter").insert(values);
    if (error) {
        toast.error(error.message);
    } else {
        toast.success("parameter created successfully");
    }
};

export const updateLabTestParamsAction = async (
    values: DB['lab_test_parameter']["Update"]
) => {
    if (values.id) {
        const { error } = await supabase
            .from("lab_test_parameter")
            .update(values)
            .eq("id", values.id);
        if (error) {
            toast.error(error.message);
        } else {
            toast.success("parameter updated successfully")
        }
    }
};


export const deleteLabTestParamsAction = async ({ id }: { id: string }) => {
    if (id) {
        const { error } = await supabase.from("lab_test_parameter").delete().eq('id', id);
        if (error) {
            toast.error(error.message);
        }
        toast.success("parameter deleted successfully");
    }

}