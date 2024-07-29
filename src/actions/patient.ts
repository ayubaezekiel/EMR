import { toast } from "sonner";
import supabase from "../supabase/client";

export async function patientAction(values: DB['patients']['Insert']) {
    const { error } = await supabase.from('patients').insert(values);
    if (error) {
        toast.error(error.message);
    } else {
        toast.success("patient created successfully")
    }
}

export const updatePatientAction = async (values: DB['patients']['Update']) => {
    if (values.id) {
        const { error } = await supabase.from("patients").update(values).eq('id', values.id);
        if (error) {
            toast.error(error.message);
        } else {
            toast.success("patient updated successfully");
        }

    }
}

export const deletePatientAction = async ({ id }: { id: string }) => {
    if (id) {
        const { error } = await supabase.from("patients").delete().eq('id', id);
        if (error) {
            toast.error(error.message);
        } else {
            toast.success("patient deleted successfully");
        }

    }
}