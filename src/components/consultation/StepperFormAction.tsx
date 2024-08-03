import { ReactNode } from "react";
import { useStepper } from "../stepper";
import { Button } from "@radix-ui/themes";

export function StepperFormActions({ submitComp }: { submitComp: ReactNode }) {
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
