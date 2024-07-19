import { toast } from "sonner";
import supabase from "../../supabase/client";


// Insurance plan

export const createInsurancePlanAction = async (values: InsuranceType['Insert']) => {
    const { error } = await supabase.from("insurance_plan").insert(values);
    if (error) {
        toast.error(error.message);
    } else {
        toast.success("insurance plan created successfully")
    }

}

export const updateInsurancePlanAction = async (values: InsuranceType['Update']) => {
    if (values.id) {
        const { error } = await supabase.from("insurance_plan").update(values).eq('id', values.id);
        if (error) {
            toast.error(error.message);
        }
        toast.success("insurance plan updated successfully");
    }

}


export const deleteInsurancePlanAction = async ({ id }: { id: string }) => {
    if (id) {
        const { error } = await supabase.from("insurance_plan").delete().eq('id', id);
        if (error) {
            toast.error(error.message);
        }
        toast.success("insurance plan deleted successfully");
    }

}


// Insurance Billers

export const createInsuranceBillerAction = async (values: DB['insurance_billers']['Insert']) => {
    const { error } = await supabase.from("insurance_billers").insert(values);
    if (error) {
        toast.error(error.message);
    } else {
        toast.success("insurance biller created successfully")
    }

}

export const updateInsuranceBillerAction = async (values: DB['insurance_billers']['Update']) => {
    if (values.id) {
        const { error } = await supabase.from("insurance_billers").update(values).eq('id', values.id);
        if (error) {
            toast.error(error.message);
        }
        toast.success("insurance biller updated successfully");
    }

}


export const deleteInsuranceBillerAction = async ({ id }: { id: string }) => {
    if (id) {
        const { error } = await supabase.from("insurance_billers").delete().eq('id', id);
        if (error) {
            toast.error(error.message);
        }
        toast.success("insurance biller deleted successfully");
    }

}