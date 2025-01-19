"use client";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Shadcn UI Select
import { parsePhoneNumber } from "libphonenumber-js";
import PreviousButton from "../buttons/PreviousButton";
import usePaymentAndRegistrationForm from "@/hooks/forms/usePaymentAndRegistrationForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Define the Zod schema
const formSchema = z.object({
  serviceDate: z.string().min(1, "Required Field"),
  deceasedName: z.string().min(1, "Required Field"),
  funeralDirectorCompanyName: z.string().min(1, "Required Field"),
  yourName: z.string().min(1, "Required Field"),
  email: z.string().email(),
  relationToDeceased: z.string().min(1, "Required Field"),
  phoneNumber: z.string().min(1, "Required Field"),
  //     z.string().refine(
  //     (value) => {
  //       try {
  //         // Check if the mobile number is valid for any country
  //         const phoneNumber = parsePhoneNumber(value);
  //         return phoneNumber.isValid();
  //       } catch {
  //         return false;
  //       }
  //     },
  //     { message: "Invalid mobile number format" }
  //   ),
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

export default function PaymentFormAndUserRegistrationForm() {
  const { paymentAndUserRegistrationForm } = usePaymentAndRegistrationForm();
  const router = useRouter();
  const { setPaymentAndUserRegistrationForm } = usePaymentAndRegistrationForm();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    const selectedRelation = relationOptions.find(
      (relation) => relation.value === data.relationToDeceased
    );
    setPaymentAndUserRegistrationForm({
      serviceDate: data.serviceDate,
      deceasedName: data.deceasedName,
      funeralDirectorCompanyName: data.funeralDirectorCompanyName,
      yourName: data.yourName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      relationToDeceased: selectedRelation as {
        value: string;
        name: string;
      },
    });
    router.push("/music/make-payment");
  };
  useEffect(() => {
    if (
      paymentAndUserRegistrationForm.deceasedName &&
      paymentAndUserRegistrationForm.serviceDate &&
      paymentAndUserRegistrationForm.funeralDirectorCompanyName &&
      paymentAndUserRegistrationForm.yourName &&
      paymentAndUserRegistrationForm.email &&
      paymentAndUserRegistrationForm.phoneNumber &&
      paymentAndUserRegistrationForm.relationToDeceased
    ) {
      form.setValue(
        "deceasedName",
        paymentAndUserRegistrationForm.deceasedName
      );
      form.setValue("serviceDate", paymentAndUserRegistrationForm.serviceDate);
      form.setValue(
        "funeralDirectorCompanyName",
        paymentAndUserRegistrationForm.funeralDirectorCompanyName
      );
      form.setValue("yourName", paymentAndUserRegistrationForm.yourName);
      form.setValue("email", paymentAndUserRegistrationForm.email);
      form.setValue("phoneNumber", paymentAndUserRegistrationForm.phoneNumber);
      form.setValue(
        "relationToDeceased",
        paymentAndUserRegistrationForm.relationToDeceased.value
      );
    }
  }, [paymentAndUserRegistrationForm, form]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-white dark:bg-[#191D31] shadow-lg md:p-[32px] p-6 rounded-xl "
      >
        <h2 className="font-bold text-2xl col-span-full">
          Fill out the form below:
        </h2>
        <FormField
          control={form.control}
          name="serviceDate"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel className="font-semibold">Service Date </FormLabel>
              <FormControl>
                <input
                  className="bg-[#F8F8F8] block w-full px-4 py-2.5 rounded-[8px] outline-0 text-sm dark:bg-[#111423]"
                  {...field}
                  type="date"
                  placeholder="Type here"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deceasedName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Deceased Name </FormLabel>
              <FormControl>
                <input
                  className="bg-[#F8F8F8] block w-full px-4 py-2.5 rounded-[8px] outline-0 text-sm dark:bg-[#111423]"
                  {...field}
                  type="text"
                  placeholder="Type here"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="funeralDirectorCompanyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">
                Funeral Director Company Name
              </FormLabel>
              <FormControl>
                <input
                  className="bg-[#F8F8F8] block w-full px-4 py-2.5 rounded-[8px] outline-0 text-sm dark:bg-[#111423]"
                  {...field}
                  type="text"
                  placeholder="Type here"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="yourName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Your Name</FormLabel>
              <FormControl>
                <input
                  className="bg-[#F8F8F8] block w-full px-4 py-2.5 rounded-[8px] outline-0 text-sm dark:bg-[#111423]"
                  {...field}
                  type="text"
                  placeholder="Type here"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Email</FormLabel>
              <FormControl>
                <input
                  className="bg-[#F8F8F8] block w-full px-4 py-2.5 rounded-[8px] outline-0 text-sm dark:bg-[#111423]"
                  {...field}
                  type="email"
                  placeholder="Type here"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Phone Number</FormLabel>
              <FormControl>
                <input
                  className="bg-[#F8F8F8] block w-full px-4 py-2.5 rounded-[8px] outline-0 text-sm dark:bg-[#111423]"
                  {...field}
                  type="tel"
                  placeholder="Type here"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relationToDeceased"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">
                Relation to Deceased
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full text-sm bg-[#F8F8F8] border-[#F8F8F8] dark:bg-[#111423] dark:outline-0 dark:border-0 py-2.5 px-4 focus:border-0 focus:ring-0">
                    <SelectValue
                      className="text-sm text-gray-500"
                      placeholder="--- select ---"
                    />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-[#111423]  dark:outline-0 dark:border-0  focus:border-0 focus:ring-0">
                    {relationOptions.map((option) => (
                      <SelectItem
                        className="text-sm dark:bg-[#111423] cursor-pointer"
                        key={option.value}
                        value={option.value}
                      >
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
  );
}
