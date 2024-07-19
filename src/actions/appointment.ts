import { toast } from "sonner";
import supabase from "../supabase/client";

// interface ActionType<T> {
//     values: T,
//     operation: 'Insert' | 'Update'
// }

export const createAppointmentAction = async (values: AppointmentType['Insert']) => {
    const { error } = await supabase.from("appointments").insert(values);
    if (error) {
        toast.error(error.message);
    } else {
        toast.success("appointment created successfully")
    }

}

export const updateAppointmentAction = async (values: AppointmentType['Update']) => {
    if (values.id) {
        const { error } = await supabase.from("appointments").update(values).eq('id', values.id);
        if (error) {
            toast.error(error.message);
        }
        toast.success("appointment updated successfully");
    }

}

// export function Practice<VType>({ values, operation }: ActionType<VType>) {
//     console.log('TYPE', values);
//     console.log('OPT', operation)

// }

// const b = Practice<AppointmentType['Insert']>({operation:'Insert',values:{appointments_type_id:''}})
