import {
  Button,
  Dialog,
  Flex,
  Select,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Edit } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { patientAction, updatePatientAction } from "../actions/patient";
import { hmoPlansQueryOptions } from "../actions/queries";
import { FieldInfo } from "../components/FieldInfo";
import PendingComponent from "../components/PendingComponent";
import states from "../lib/statesAndLocalGov.json";
import supabase from "../supabase/client";

export function PatientForm() {
  const [myStates, setMyState] = useState<string[] | undefined>([]);
  const [open, onOpenChange] = useState(false);
  const navigate = useNavigate();

  const { data, isPending } = useQuery(hmoPlansQueryOptions);

  const form = useForm({
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      dob: "",
      phone: "",
      gender: "",
      residential_address: "",
      state_of_origin: "",
      lga: "",
      parmanent_home_address: "",
      next_of_kin_address: "",
      next_of_kin: "",
      next_of_kin_phone: "",
      next_of_kin_relationship: "",
      relationship_status: "",
      hmo_plan_id: "",
      hmo_code: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        await patientAction({ ...value, created_by: data.session.user.id });
        form.reset();
        onOpenChange(false);
      } else {
        navigate({ to: "/", replace: true });
      }
    },
  });

  if (isPending) return <PendingComponent />;
  return (
    <div>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Trigger>
          <Button>New Patient File</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="auto" maxHeight="auto">
          <Dialog.Title>New patient file</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Fill out your information on the form
          </Dialog.Description>
          <form
            onSubmit={(e) => {
              e.stopPropagation();
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="grid md:grid-cols-3 gap-4">
              <form.Field
                name="first_name"
                validators={{
                  onChange: z
                    .string()
                    .min(3, { message: "field must be atleast 3 characters" }),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>First Name*</Text>
                    <TextField.Root
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />

              <form.Field
                name="middle_name"
                validators={{
                  onChange: z.string().optional(),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>Middle Name</Text>
                    <TextField.Root
                      name={field.name}
                      id={field.name}
                      value={field.state.value ?? ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />

              <form.Field
                name="last_name"
                validators={{
                  onChange: z
                    .string()
                    .min(3, { message: "field must be atleast 3 characters" })
                    .trim(),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>Last Name*</Text>
                    <TextField.Root
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />

              <form.Field
                name="dob"
                validators={{
                  onChange: z.string(),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>DoB*</Text>
                    <TextField.Root
                      type="date"
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />

              <form.Field
                name="gender"
                validators={{
                  onChange: z
                    .string()
                    .min(3, { message: "field must be atleast 3 characters" })
                    .trim(),
                }}
                children={(field) => (
                  <div className="flex flex-col">
                    <Text size={"3"}>Gender*</Text>
                    <Select.Root
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(e) => field.handleChange(e)}
                    >
                      <Select.Trigger />
                      <Select.Content position="popper">
                        <Select.Group>
                          <Select.Item value="male">Male</Select.Item>
                          <Select.Item value="female">Female</Select.Item>
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                    <FieldInfo field={field} />
                  </div>
                )}
              />

              <form.Field
                name="phone"
                validators={{
                  onChange: z
                    .string()
                    .min(11, { message: "field must be 11 numbers" })
                    .max(11, {
                      message: "field can not be more than 11 numbers",
                    }),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>Phone*</Text>
                    <TextField.Root
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />
              <form.Field
                name="relationship_status"
                validators={{
                  onChange: z.string(),
                }}
                children={(field) => (
                  <div className="flex flex-col">
                    <Text size={"3"}>Relationship Status*</Text>
                    <Select.Root
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(e) => field.handleChange(e)}
                    >
                      <Select.Trigger />
                      <Select.Content position="popper">
                        <Select.Group>
                          <Select.Item value="single">SINGLE</Select.Item>
                          <Select.Item value="married">MARRIED</Select.Item>
                          <Select.Item value="divorsed">DIVORSED</Select.Item>
                          <Select.Item value="widow">WIDOW</Select.Item>
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <form.Field
                name="residential_address"
                validators={{
                  onChange: z
                    .string()
                    .min(5, { message: "field must be atlest 5 characters" }),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>Residential Address*</Text>
                    <TextField.Root
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />

              <form.Field
                defaultValue=""
                name="state_of_origin"
                validators={{
                  onChange: z.string(),
                }}
                children={(field) => (
                  <div className="flex flex-col">
                    <Text size={"3"}>State of Origin*</Text>
                    <Select.Root
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(e) => {
                        field.handleChange(e);
                        setMyState(states.find((s) => s.state === e)?.lgas);
                      }}
                    >
                      <Select.Trigger />
                      <Select.Content position="popper">
                        <Select.Group>
                          {states.map((s) => (
                            <Select.Item key={s.state} value={s.state}>
                              {s.state}
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <form.Field
                name="lga"
                validators={{
                  onChange: z.string(),
                }}
                children={(field) => (
                  <div className="flex flex-col">
                    <Text size={"3"}>LGA*</Text>
                    <Select.Root
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(e) => field.handleChange(e)}
                    >
                      <Select.Trigger />
                      <Select.Content position="popper">
                        <Select.Group>
                          {myStates?.map((l, i) => (
                            <Select.Item key={i} value={l}>
                              {l}
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <form.Field
                name="parmanent_home_address"
                validators={{
                  onChange: z
                    .string()
                    .min(3, { message: "field must be atleast 3 characters" })
                    .trim(),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>Parmanent Home Address*</Text>
                    <TextField.Root
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />
              <form.Field
                name="next_of_kin"
                validators={{
                  onChange: z
                    .string()
                    .min(3, { message: "field must be atleast 3 characters" }),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>Next of Kin*</Text>
                    <TextField.Root
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />

              <form.Field
                name="next_of_kin_phone"
                validators={{
                  onChange: z
                    .string()
                    .min(11, { message: "field must be 11 numbers" })
                    .max(11, {
                      message: "field can not be more than 11 numbers",
                    }),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>Next of Kin Phone*</Text>
                    <TextField.Root
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />

              <form.Field
                name="next_of_kin_address"
                validators={{
                  onChange: z
                    .string()
                    .min(5, { message: "field must be atlest 5 characters" }),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>Next of Kin Address*</Text>
                    <TextField.Root
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />
              <form.Field
                name="next_of_kin_relationship"
                validators={{
                  onChange: z.string(),
                }}
                children={(field) => (
                  <div className="flex flex-col">
                    <Text size={"3"}>Next of Kin Relationship*</Text>
                    <Select.Root
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(e) => field.handleChange(e)}
                    >
                      <Select.Trigger />
                      <Select.Content position="popper">
                        <Select.Group>
                          <Select.Item value="father">FATHER</Select.Item>
                          <Select.Item value="mother">MOTHER</Select.Item>
                          <Select.Item value="brother">BROTHER</Select.Item>
                          <Select.Item value="sister">SISTER</Select.Item>
                          <Select.Item value="son">SON</Select.Item>
                          <Select.Item value="uncle">UNCLE</Select.Item>
                          <Select.Item value="sibling">SIBLING</Select.Item>
                          <Select.Item value="other">OTHER</Select.Item>
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                    <FieldInfo field={field} />
                  </div>
                )}
              />

              <form.Field
                name="hmo_plan_id"
                validators={{
                  onChange: z.string(),
                }}
                children={(field) => (
                  <div className="flex flex-col">
                    <Text size={"3"}>HMO Plan*</Text>
                    <Select.Root
                      name={field.name}
                      value={field.state.value!}
                      onValueChange={(e) => field.handleChange(e)}
                    >
                      <Select.Trigger />
                      <Select.Content position="popper">
                        <Select.Group>
                          {data?.hmo_plans_data!.map((p) => (
                            <Select.Item key={p.id} value={p.id}>
                              {p.name}
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                    <FieldInfo field={field} />
                  </div>
                )}
              />

              <form.Field
                name="hmo_code"
                validators={{
                  onChange: z.string().optional(),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>HMO Code(fill if insured)</Text>
                    <TextField.Root
                      name={field.name}
                      id={field.name}
                      value={field.state.value!}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />
            </div>
            <Flex gap="3" mt="4" justify="end">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit} size={"4"}>
                    {isSubmitting && <Spinner />} Save
                  </Button>
                )}
              />
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

export function UpdatePatientForm({ id, ...values }: DB["patients"]["Update"]) {
  const [myStates, setMyState] = useState<string[] | undefined>([]);
  const [open, onOpenChange] = useState(false);

  const { data, isPending } = useQuery(hmoPlansQueryOptions);

  const form = useForm({
    defaultValues: {
      id: id,
      hmo_plan_id: values.hmo_plan_id,
      first_name: values.first_name,
      dob: values.dob,
      gender: values.gender,
      hmo_code: values.hmo_code,
      last_name: values.last_name,
      lga: values.lga,
      middle_name: values.middle_name,
      next_of_kin: values.next_of_kin,
      next_of_kin_address: values.next_of_kin_address,
      next_of_kin_phone: values.next_of_kin_phone,
      next_of_kin_relationship: values.next_of_kin_relationship,
      parmanent_home_address: values.parmanent_home_address,
      phone: values.phone,
      relationship_status: values.relationship_status,
      residential_address: values.residential_address,
      state_of_origin: values.state_of_origin,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await updatePatientAction(value);
      form.reset();
      onOpenChange(false);
    },
  });

  if (isPending) return <PendingComponent />;

  return (
    <div>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Trigger>
          <Button variant="ghost">
            <Edit size={16} />
          </Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="auto" maxHeight="auto">
          <Dialog.Title>Update patient file</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Fill out your information on the form
          </Dialog.Description>
          <form
            onSubmit={(e) => {
              e.stopPropagation();
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="grid md:grid-cols-3 gap-4">
              <form.Field
                name="first_name"
                validators={{
                  onChange: z
                    .string()
                    .min(3, { message: "field must be atleast 3 characters" }),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>First Name*</Text>
                    <TextField.Root
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />

              <form.Field
                name="middle_name"
                validators={{
                  onChange: z.string().optional(),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>Middle Name</Text>
                    <TextField.Root
                      name={field.name}
                      id={field.name}
                      value={field.state.value ?? ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />

              <form.Field
                name="last_name"
                validators={{
                  onChange: z
                    .string()
                    .min(3, { message: "field must be atleast 3 characters" })
                    .trim(),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>Last Name*</Text>
                    <TextField.Root
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />

              <form.Field
                name="dob"
                validators={{
                  onChange: z.string(),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>DoB*</Text>
                    <TextField.Root
                      type="date"
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />

              <form.Field
                name="gender"
                validators={{
                  onChange: z
                    .string()
                    .min(3, { message: "field must be atleast 3 characters" })
                    .trim(),
                }}
                children={(field) => (
                  <div className="flex flex-col">
                    <Text size={"3"}>Gender*</Text>
                    <Select.Root
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(e) => field.handleChange(e)}
                    >
                      <Select.Trigger />
                      <Select.Content position="popper">
                        <Select.Group>
                          <Select.Item value="male">Male</Select.Item>
                          <Select.Item value="female">Female</Select.Item>
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                    <FieldInfo field={field} />
                  </div>
                )}
              />

              <form.Field
                name="phone"
                validators={{
                  onChange: z
                    .string()
                    .min(11, { message: "field must be 11 numbers" })
                    .max(11, {
                      message: "field can not be more than 11 numbers",
                    }),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>Phone*</Text>
                    <TextField.Root
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />
              <form.Field
                name="relationship_status"
                validators={{
                  onChange: z.string(),
                }}
                children={(field) => (
                  <div className="flex flex-col">
                    <Text size={"3"}>Relationship Status*</Text>
                    <Select.Root
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(e) => field.handleChange(e)}
                    >
                      <Select.Trigger />
                      <Select.Content position="popper">
                        <Select.Group>
                          <Select.Item value="single">SINGLE</Select.Item>
                          <Select.Item value="married">MARRIED</Select.Item>
                          <Select.Item value="divorsed">DIVORSED</Select.Item>
                          <Select.Item value="widow">WIDOW</Select.Item>
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <form.Field
                name="residential_address"
                validators={{
                  onChange: z
                    .string()
                    .min(5, { message: "field must be atlest 5 characters" }),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>Residential Address*</Text>
                    <TextField.Root
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />

              <form.Field
                defaultValue=""
                name="state_of_origin"
                validators={{
                  onChange: z.string(),
                }}
                children={(field) => (
                  <div className="flex flex-col">
                    <Text size={"3"}>State of Origin*</Text>
                    <Select.Root
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(e) => {
                        field.handleChange(e);
                        setMyState(states.find((s) => s.state === e)?.lgas);
                      }}
                    >
                      <Select.Trigger />
                      <Select.Content position="popper">
                        <Select.Group>
                          {states.map((s) => (
                            <Select.Item key={s.state} value={s.state}>
                              {s.state}
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <form.Field
                name="lga"
                validators={{
                  onChange: z.string(),
                }}
                children={(field) => (
                  <div className="flex flex-col">
                    <Text size={"3"}>LGA*</Text>
                    <Select.Root
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(e) => field.handleChange(e)}
                    >
                      <Select.Trigger />
                      <Select.Content position="popper">
                        <Select.Group>
                          {myStates?.map((l, i) => (
                            <Select.Item key={i} value={l}>
                              {l}
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <form.Field
                name="parmanent_home_address"
                validators={{
                  onChange: z
                    .string()
                    .min(3, { message: "field must be atleast 3 characters" })
                    .trim(),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>Parmanent Home Address*</Text>
                    <TextField.Root
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />
              <form.Field
                name="next_of_kin"
                validators={{
                  onChange: z
                    .string()
                    .min(3, { message: "field must be atleast 3 characters" }),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>Next of Kin*</Text>
                    <TextField.Root
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />

              <form.Field
                name="next_of_kin_phone"
                validators={{
                  onChange: z
                    .string()
                    .min(11, { message: "field must be 11 numbers" })
                    .max(11, {
                      message: "field can not be more than 11 numbers",
                    }),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>Next of Kin Phone*</Text>
                    <TextField.Root
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />

              <form.Field
                name="next_of_kin_address"
                validators={{
                  onChange: z
                    .string()
                    .min(5, { message: "field must be atlest 5 characters" }),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>Next of Kin Address*</Text>
                    <TextField.Root
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />
              <form.Field
                name="next_of_kin_relationship"
                validators={{
                  onChange: z.string(),
                }}
                children={(field) => (
                  <div className="flex flex-col">
                    <Text size={"3"}>Next of Kin Relationship*</Text>
                    <Select.Root
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(e) => field.handleChange(e)}
                    >
                      <Select.Trigger />
                      <Select.Content position="popper">
                        <Select.Group>
                          <Select.Item value="father">FATHER</Select.Item>
                          <Select.Item value="mother">MOTHER</Select.Item>
                          <Select.Item value="brother">BROTHER</Select.Item>
                          <Select.Item value="sister">SISTER</Select.Item>
                          <Select.Item value="son">SON</Select.Item>
                          <Select.Item value="uncle">UNCLE</Select.Item>
                          <Select.Item value="sibling">SIBLING</Select.Item>
                          <Select.Item value="other">OTHER</Select.Item>
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                    <FieldInfo field={field} />
                  </div>
                )}
              />

              <form.Field
                name="hmo_plan_id"
                validators={{
                  onChange: z.string(),
                }}
                children={(field) => (
                  <div className="flex flex-col">
                    <Text size={"3"}>HMO Plan*</Text>
                    <Select.Root
                      name={field.name}
                      value={field.state.value!}
                      onValueChange={(e) => field.handleChange(e)}
                    >
                      <Select.Trigger />
                      <Select.Content position="popper">
                        <Select.Group>
                          {data?.hmo_plans_data!.map((p) => (
                            <Select.Item key={p.id} value={p.id}>
                              {p.name}
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                    <FieldInfo field={field} />
                  </div>
                )}
              />

              <form.Field
                name="hmo_code"
                validators={{
                  onChange: z.string().optional(),
                }}
                children={(field) => (
                  <label htmlFor={field.name}>
                    <Text size={"3"}>HMO Code(fill if insured)</Text>
                    <TextField.Root
                      name={field.name}
                      id={field.name}
                      value={field.state.value!}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />
            </div>
            <Flex gap="3" mt="4" justify="end">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit} size={"4"}>
                    {isSubmitting && <Spinner />} Save
                  </Button>
                )}
              />
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
