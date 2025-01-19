"use client";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import PreviousButton from "@/_mycomponents/buttons/PreviousButton";
import { useRouter } from "next/navigation";
import { usePreferenceForm } from "@/hooks/forms/usePreferenceForm";
import SelectField, { SelectionType } from "@/_mycomponents/common/SelectField";

// ----------------- types -----------------

// Define the Zod schema
const formSchema = z.object({
  preService: z.string().min(1, "Required Field"),
  serviceStart: z.string().min(1, "Required Field"),
  reflectionPiece: z.string().min(1, "Required Field"),
  preService2: z.string().min(1, "Required Field"),
  serviceEnd: z.string().min(1, "Required Field"),
  viewingMusic: z.boolean().optional().default(false),
  fillerMusicPreService: z.boolean().optional().default(false),
  placingOfSymbols: z.boolean().optional().default(false),
});

type FormData = z.infer<typeof formSchema>;

export default function SecularOrCivilPreferenceForm() {
  const { setPreferenceForm } = usePreferenceForm();
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const selectOptions = [
    {
      name: "preService",
      label: "Pre Service",
      options: [{ value: "20min", name: "Instrumental 20 Mins" }],
    },
    {
      name: "serviceStart",
      label: "Service Start",
      options: [{ value: "vocal", name: "Vocal" }],
    },
    {
      name: "reflectionPiece",
      label: "Reflection Piece",
      options: [{ value: "vocal", name: "Vocal" }],
    },
    {
      name: "preService2",
      label: "Pre Service 2",
      options: [{ value: "vocal", name: "Vocal" }],
    },
    {
      name: "serviceEnd",
      label: "Service End",
      options: [{ value: "vocal", name: "Vocal" }],
    },
  ];

  const onSubmit = (data: FormData) => {
    const preferences = selectOptions.reduce((acc, select) => {
      const selectedOption = select.options.find(
        (option) => option.value === data[select.name as keyof FormData]
      );
      if (selectedOption) {
        acc[select.name] = selectedOption as SelectionType;
      }
      return acc;
    }, {} as Record<string, SelectionType>);

    setPreferenceForm({
      ...preferences,
      viewingMusic: data.viewingMusic,
      fillerMusicPreService: data.fillerMusicPreService,
      placingOfSymbols: data.placingOfSymbols,
    });
    router.push("/music/payment-and-user-registration");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5 bg-white dark:bg-[#191D31] shadow-lg md:p-[32px] p-6 rounded-xl "
      >
        <h2 className="font-bold text-2xl">Fill out the form below:</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {selectOptions.map((select) => (
            <SelectField
              key={select.name}
              fieldName={select.name}
              label={select.label}
              options={select.options}
              control={form.control}
            />
          ))}
        </div>

        <div className="flex flex-col items-stretch gap-4">
          {/* Viewing Music */}
          <FormField
            control={form.control}
            name="viewingMusic"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={field.name}
                  className="flex items-center gap-1.5"
                >
                  <input
                    id={field.name}
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-4 h-4"
                  />
                  Viewing Music
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Filler Music Pre-Service */}
          <FormField
            control={form.control}
            name="fillerMusicPreService"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={field.name}
                  className="flex items-center gap-1.5"
                >
                  <input
                    id={field.name}
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-4 h-4"
                  />
                  Filler Music Pre-Service:{" "}
                  <span className="font-normal">Vocal</span>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Placing of Symbols */}
          <FormField
            control={form.control}
            name="placingOfSymbols"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={field.name}
                  className="flex items-center gap-1.5"
                >
                  <input
                    id={field.name}
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-4 h-4"
                  />
                  Placing of Symbols: <span className="font-normal">Vocal</span>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between items-center gap-2 col-span-full">
          <PreviousButton />
          <button
            type="submit"
            className="px-10 py-2.5 rounded-full font-medium bg-[#3F72AF] hover:bg-[#172e4b] dark:text-white"
          >
            Next
          </button>
        </div>
      </form>
    </Form>
  );
}
