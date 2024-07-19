import { toast } from "sonner";
import supabase from "../../supabase/client";


export const createAppointmentTypeAction = async (values: AppointmentTypeType['Insert']) => {
    const { error } = await supabase.from("appointments_types").insert(values);
    if (error) {
        toast.error(error.message);
    } else {
        toast.success("appointment type created successfully")
    }

}

export const updateAppointmentTypeAction = async (values: AppointmentTypeType['Update']) => {
    if (values.id) {
        const { error } = await supabase.from("appointments_types").update(values).eq('id', values.id);
        if (error) {
            toast.error(error.message);
        }
        toast.success("appointment type updated successfully");
    }

}