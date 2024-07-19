import { toast } from "sonner";
import supabase from "../supabase/client";

export async function patientAction(values: PatientsType['Insert']) {
    const { error } = await supabase.from('patients').insert(values);
    if (error) {
        toast.error(error.message);
    } else {
        toast.success("patient created successfully")
    }
}

export const updatePatientAction = async (values: PatientsType['Update']) => {
    if (values.id) {
        const { error } = await supabase.from("patients").update(values).eq('id', values.id);
        if (error) {
            toast.error(error.message);
        }
        toast.success("patient updated successfully");
    }
}