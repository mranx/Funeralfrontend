"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"; // Shadcn UI Button
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PaymentCompleteDialog from "../dialogs/PaymentCompleteDialog";
import { useState } from "react";
import PreviousButton from "../buttons/PreviousButton";

// Define the Zod schema
const formSchema = z.object({
  cardNumber: z
    .string()
    .refine((val) => val.replace(/\D/g, "").length >= 13, {
      message: "Card number must be at least 13 digits",
    })
    .refine((val) => val.replace(/\D/g, "").length <= 19, {
      message: "Card number must be at most 19 digits",
    })
    .refine((val) => /^\d+$/.test(val.replace(/\D/g, "")), {
      message: "Card number must contain only digits",
    }),
  MMYY: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Expiration date must be in MM/YY format"
    )
    .nonempty("Expiration date is required"),
  cvv: z
    .string()
    .min(3, "CVV must be at least 3 digits")
    .max(4, "CVV must be at most 4 digits")
    .regex(/^\d+$/, "CVV must contain only digits")
    .nonempty("CVV is required"),
  zip: z
    .string()
    .min(5, "ZIP code must be at least 5 digits")
    .max(10, "ZIP code must be at most 10 characters")
    .regex(/^\d+$/, "ZIP code must contain only digits")
    .nonempty("ZIP code is required"),
});

type FormData = z.infer<typeof formSchema>;

const relationOptions = [
  {
    value: "Brother",
    name: "Brother",
  },
  {
    value: "Sister",
    name: "Sister",
  },
  {
    value: "Son",
    name: "Son",
  },
  {
    value: "Daughter",
    name: "Daughter",
  },
];

export default function PaymentForm() {
  const [paymentCompleteDialogOpened, setpaymentCompleteDialogOpened] =
    useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    setpaymentCompleteDialogOpened(true);
  };

  return (
    <div>
      <PaymentCompleteDialog
        open={paymentCompleteDialogOpened}
        setOpen={setpaymentCompleteDialogOpened}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 "
        >
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Card Number</FormLabel>
                <FormControl>
                  <input
                    className="bg-[#F8F8F8] block w-full px-4 py-2.5 rounded-[8px] outline-0 text-sm dark:bg-[#111423]"
                    {...field}
                    type="text"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    onChange={(e) => {
                      // Remove all non-digit characters
                      let value = e.target.value.replace(/\D/g, "");

                      // Add dashes every 4 digits
                      value = value.replace(/(\d{4})(?=\d)/g, "$1-");

                      // Update the field value
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="MMYY"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">MM/YY</FormLabel>
                <FormControl>
                  <input
                    className="bg-[#F8F8F8] block w-full px-4 py-2.5 rounded-[8px] outline-0 text-sm dark:bg-[#111423]"
                    {...field}
                    type="text"
                    placeholder="MM/YY"
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
                      if (value.length >= 3) {
                        // Add a slash after the second digit
                        value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
                      }
                      field.onChange(value); // Update the field value
                    }}
                    maxLength={5} // Limit to 5 characters (MM/YY)
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">CVV</FormLabel>
                <FormControl>
                  <input
                    className="bg-[#F8F8F8] block w-full px-4 py-2.5 rounded-[8px] outline-0 text-sm dark:bg-[#111423]"
                    {...field}
                    type="text"
                    placeholder="000"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Zip</FormLabel>
                <FormControl>
                  <input
                    className="bg-[#F8F8F8] block w-full px-4 py-2.5 rounded-[8px] outline-0 text-sm dark:bg-[#111423]"
                    {...field}
                    type="text"
                    placeholder="00000"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center gap-2 col-span-full">
            <PreviousButton />
            <button
              type="button"
              className="  px-10 py-2.5 rounded-full  font-medium bg-[#3F72AF] hover:bg-[#172e4b] dark:text-white"
            >
              Next
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
