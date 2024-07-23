import { Spinner } from "@radix-ui/themes";

export default function PendingComponent() {
  return (
    <div>
      <div className="translate-x-1/2 absolute inset-0 top-1/3">
        <Spinner
          size={"3"}
          style={{
            height: "50px",
          }}
        />
      </div>
      <div className="bg-black/40 absolute h-full w-full inset-0" />
    </div>
  );
}
