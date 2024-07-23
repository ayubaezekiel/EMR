import { toast } from "sonner";
import supabase from "../../supabase/client";

export const createConsultationTemplatesAction = async (values: DB['consultation_templates']['Insert']) => {
    const { error } = await supabase.from("consultation_templates").insert(values);
    if (error) {
        toast.error(error.message);
    } else {
        toast.success("template created successfully")
    }

}

export const updateConsultationTemplatesAction = async (values: DB['consultation_templates']['Update']) => {
    if (values.id) {
        const { error } = await supabase.from("consultation_templates").update(values).eq('id', values.id);
        if (error) {
            toast.error(error.message);
        }
        toast.success("template updated successfully");
    }

}


export const deleteConsultationTemplatesAction = async ({ id }: { id: string }) => {
    if (id) {
        const { error } = await supabase.from("consultation_templates").delete().eq('id', id);
        if (error) {
            toast.error(error.message);
        }
        toast.success("template deleted successfully");
    }

}