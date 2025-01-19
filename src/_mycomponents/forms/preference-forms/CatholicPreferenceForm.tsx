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
import { cn } from "@/lib/utils";
import { usePreferenceForm } from "@/hooks/forms/usePreferenceForm";
import SelectField, { SelectionType } from "@/_mycomponents/common/SelectField";

// ----------------- types -----------------

// Define the Zod schema
const formSchema = z.object({
  preService: z.string().min(1, "Required Field"),
  startOfRosary: z.string().min(1, "Required Field"),
  entranceProcession: z.string().min(1, "Required Field"),
  penitentialRite: z.string().min(1, "Required Field"),
  responsorialPsalm: z.string().min(1, "Required Field"),
  offertoryProcession: z.string().min(1, "Required Field"),
  holyHoly: z.string().min(1, "Required Field"),
  memorialAcclamation: z.string().min(1, "Required Field"),
  theGreatAmen: z.string().min(1, "Required Field"),
  lambOfGod: z.string().min(1, "Required Field"),
  fillerMusicPostCommunion: z.string().min(1, "Required Field"),
  finalCommendation: z.string().min(1, "Required Field"),
  recessional: z.string().min(1, "Required Field"),
  viewingMusic: z.boolean().default(false),
  fillerMusicPreMass: z.boolean().default(false),
  placingOfSymbols: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

export default function CatholicPreferenceForm() {
  const { setPreferenceForm } = usePreferenceForm();
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const selectOptions = [
    {
      name: "preService",
      label: "Pre Service",
      options: [{ value: "instrumental", name: "Instrumental (20 minutes)" }],
    },
    {
      name: "startOfRosary",
      label: "Start of Rosary",
      options: [
        { value: "vocal", name: "Vocal", audioUrl: "/audio/audio.mp3" },
      ],
    },
    {
      name: "entranceProcession",
      label: "Entrance Procession",
      options: [{ value: "vocal", name: "Vocal" }],
    },
    {
      name: "penitentialRite",
      label: "Penitential Rite",
      options: [{ value: "lordHaveMercyVocal", name: "Lord Have Mercy Vocal" }],
    },
    {
      name: "responsorialPsalm",
      label: "Responsorial Psalm",
      options: [
        { value: "shepherdVocal", name: "The Lord is My Shepherd Vocal" },
      ],
    },
    {
      name: "offertoryProcession",
      label: "Offertory Procession",
      options: [
        { value: "vocal", name: "Vocal", audioUrl: "/audio/audio.mp3" },
      ],
    },
    {
      name: "holyHoly",
      label: "Holy Holy",
      options: [
        {
          value: "holyHolyVocal",
          name: "Holy Holy Vocal (mass part)",
          audioUrl: "/audio/audio.mp3",
        },
      ],
    },
    {
      name: "memorialAcclamation",
      label: "Memorial Acclamation",
      options: [
        {
          value: "whenWeEatVocal",
          name: "When we eat this vocal (mass part)",
          audioUrl: "/audio/audio.mp3",
        },
      ],
    },
    {
      name: "theGreatAmen",
      label: "The Great Amen",
      options: [
        {
          value: "amenVocal",
          name: "Amen Vocal",
          audioUrl: "/audio/audio.mp3",
        },
      ],
    },
    {
      name: "lambOfGod",
      label: "Lamb of God",
      options: [{ value: "communion1", name: "Communion 1" }],
    },
    {
      name: "fillerMusicPostCommunion",
      label: "Filler Music Post Communion",
      options: [{ value: "instrumental", name: "Instrumental" }],
    },
    {
      name: "finalCommendation",
      label: "Final Commendation",
      options: [
        {
          value: "jesusRememberMe",
          name: "Jesus remember me vocal (mass part)",
        },
      ],
    },
    {
      name: "recessional",
      label: "Recessional",
      options: [
        { value: "vocal", name: "Vocal", audioUrl: "/audio/audio.mp3" },
      ],
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
      fillerMusicPreMass: data.fillerMusicPreMass,
      placingOfSymbols: data.placingOfSymbols,
    });
    router.push("/music/payment-and-user-registration");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5 bg-white dark:bg-[#191D31] shadow-lg md:p-[32px] p-6 rounded-xl"
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

        {/* Checkboxes */}
        <div className="flex flex-col items-stretch gap-4">
          {[
            { name: "viewingMusic", label: "Viewing Music" },
            {
              name: "fillerMusicPreMass",
              label: "Filler Music pre-mass: Vocal",
            },
            { name: "placingOfSymbols", label: "Placing of Symbols: Vocal" },
          ].map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name as keyof FormData}
              render={({ field: controllerField }) => (
                <FormItem>
                  <FormLabel
                    htmlFor={controllerField.name}
                    className="flex items-center gap-1.5"
                  >
                    <input
                      id={controllerField.name}
                      type="checkbox"
                      checked={controllerField.value as boolean}
                      onChange={(e) =>
                        controllerField.onChange(e.target.checked)
                      }
                      className="w-4 h-4"
                    />
                    {field.label}
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
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
