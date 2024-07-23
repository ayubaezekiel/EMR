import { Step } from "./step";
import { Button, Spinner, TextField } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";

import { zodValidator } from "@tanstack/zod-form-adapter";
import { toast } from "sonner";
import { FieldInfo } from "../FieldInfo";
import { Label } from "../ui/label";
import { Stepper, useStepper } from ".";
import { z } from "zod";
import { ReactNode } from "react";
import { ArrowLeftCircle } from "lucide-react";

const steps = [
  { label: "Patient Vitals", description: "Here are the patient vitals" },
  { label: "History Taking", description: "Record or view patient history" },
  { label: "Examination", description: "Record or view patient examination" },
  { label: "Diagnosis", description: "diagnose" },
  { label: "Plan", description: "Record treatment plan" },
  { label: "Issue Requests", description: "Issue requests for the patient" },
];

export function ConsultationStepperForm() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper variant="circle-alt" initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          if (index === 0) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <FirstStepForm />
              </Step>
            );
          }
          return (
            <Step key={stepProps.label} {...stepProps}>
              <SecondStepForm />
            </Step>
          );
        })}
        <MyStepperFooter />
      </Stepper>
    </div>
  );
}

function FirstStepForm() {
  const { nextStep } = useStepper();

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      username: "",
    },
    onSubmit: () => {
      nextStep();
      toast.success("First step submitted!");
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <form.Field
          validators={{ onChange: z.string().min(10) }}
          name="username"
          children={(field) => (
            <>
              <Label>Username</Label>
              <TextField.Root
                placeholder="shadcn"
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </>
          )}
        />
        <StepperFormActions
          submitComp={
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit} size={"4"}>
                  {isSubmitting && <Spinner />} Save
                </Button>
              )}
            />
          }
        />
      </form>
    </div>
  );
}

function SecondStepForm() {
  const { nextStep } = useStepper();
  const { isLastStep } = useStepper();

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      password: "",
    },
    onSubmit: () => {
      nextStep();
      toast.success("Second step submitted!");
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <form.Field
          name="password"
          children={(field) => (
            <>
              <Label>Password</Label>
              <TextField.Root
                placeholder="shadcn"
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </>
          )}
        />
        <StepperFormActions
          submitComp={
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit} size={"4"}>
                  {isSubmitting && <Spinner />}
                  {isLastStep ? "Finish" : "Save and Continue"}
                </Button>
              )}
            />
          }
        />
      </form>
    </div>
  );
}

function StepperFormActions({ submitComp }: { submitComp: ReactNode }) {
  const { prevStep, resetSteps, isDisabledStep, hasCompletedAllSteps } =
    useStepper();
  return (
    <div className="w-full flex justify-end gap-2">
      {hasCompletedAllSteps ? (
        <Button size="1" type="button" onClick={resetSteps}>
          Reset
        </Button>
      ) : (
        <>
          <Button
            disabled={isDisabledStep}
            onClick={prevStep}
            size={"4"}
            variant="soft"
            type="button"
          >
            Prev
          </Button>
          {submitComp}
        </>
      )}
    </div>
  );
}

function MyStepperFooter() {
  const { activeStep, resetSteps, steps } = useStepper();

  if (activeStep !== steps.length) {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Button size={"4"} onClick={resetSteps}>
        <ArrowLeftCircle /> Back
      </Button>
    </div>
  );
}
