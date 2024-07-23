import { toast } from "sonner";
import supabase from "../../supabase/client";


export const createSpecialtyAction = async (values: DB['specialties']['Insert']) => {
    const { error } = await supabase.from("specialties").insert(values);
    if (error) {
        toast.error(error.message);
    } else {
        toast.success("specialty created successfully")
    }

}

export const updateSpecialtyAction = async (values: DB['specialties']['Update']) => {
    if (values.id) {
        const { error } = await supabase.from("specialties").update(values).eq('id', values.id);
        if (error) {
            toast.error(error.message);
        }
        toast.success("specialty updated successfully");
    }

}


export const deleteSpecialtyAction = async ({ id }: { id: string }) => {
    if (id) {
        const { error } = await supabase.from("specialties").delete().eq('id', id);
        if (error) {
            toast.error(error.message);
        }
        toast.success("specialty deleted successfully");
    }

}


export const createConsultationSpecialtyAction = async (values: DB['consultation_specialties']['Insert']) => {
    const { error } = await supabase.from("consultation_specialties").insert(values);
    if (error) {
        toast.error(error.message);
    } else {
        toast.success("specialty created successfully")
    }

}

export const updateConsultationSpecialtyAction = async (values: DB['consultation_specialties']['Update']) => {
    if (values.id) {
        const { error } = await supabase.from("consultation_specialties").update(values).eq('id', values.id);
        if (error) {
            toast.error(error.message);
        }
        toast.success("specialty updated successfully");
    }

}


export const deleteConsultationSpecialtyAction = async ({ id }: { id: string }) => {
    if (id) {
        const { error } = await supabase.from("consultation_specialties").delete().eq('id', id);
        if (error) {
            toast.error(error.message);
        }
        toast.success("specialty deleted successfully");
    }

}