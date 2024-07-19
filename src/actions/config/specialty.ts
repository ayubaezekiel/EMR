import { toast } from "sonner";
import supabase from "../../supabase/client";


export const createSpecialtyAction = async (values: SpecialtiesType['Insert']) => {
    const { error } = await supabase.from("specialties").insert(values);
    if (error) {
        toast.error(error.message);
    } else {
        toast.success("specialty created successfully")
    }

}

export const updateSpecialtyAction = async (values: SpecialtiesType['Update']) => {
    if (values.id) {
        const { error } = await supabase.from("specialties").update(values).eq('id', values.id);
        if (error) {
            toast.error(error.message);
        }
        toast.success("specialty updated successfully");
    }

}