import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
type Choice = { value: string; label: string };
type ChoiceFieldProps = SelectHTMLAttributes<HTMLSelectElement> & { choices: Choice[] };
/** A native select deliberately used for the booking flow's short static branch list. */
export function ChoiceField({ choices, className, ...props }: ChoiceFieldProps) {
  return (
    <select className={cn("toplink-field toplink-choice", className)} {...props}>
      {choices.map((choice) => (
        <option key={choice.value} value={choice.value}>
          {choice.label}
        </option>
      ))}
    </select>
  );
}
