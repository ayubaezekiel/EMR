import { toast } from "sonner";
import supabase from "../../supabase/client";


export const createBrandAction = async (values: DB['drug_or_generic_brand']['Insert']) => {
    const { error } = await supabase.from("drug_or_generic_brand").insert(values);
    if (error) {
        toast.error(error.message);
    } else {
        toast.success("drug/generic brand created successfully")
    }

}

export const updateBrandAction = async (values: DB['drug_or_generic_brand']['Update']) => {
    if (values.id) {
        const { error } = await supabase.from("drug_or_generic_brand").update(values).eq('id', values.id);
        if (error) {
            toast.error(error.message);
        }
        toast.success("drug/generic brand updated successfully");
    }

}


export const deleteBrandAction = async ({ id }: { id: string }) => {
    if (id) {
        const { error } = await supabase.from("drug_or_generic_brand").delete().eq('id', id);
        if (error) {
            toast.error(error.message);
        }
        toast.success("drug/generic brand deleted successfully");
    }

}