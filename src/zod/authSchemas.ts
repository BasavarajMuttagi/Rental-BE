import { z } from "zod";

const userLoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "password cannot be less than 8 digits" })
    .max(10, { message: "password cannot be more than 10 digits" }),
});

type userLoginType = z.infer<typeof userLoginSchema>;

const userSignUpSchema = z.object({
  fullname: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "password cannot be less than 8 digits" })
    .max(10, { message: "password cannot be more than 10 digits" }),
  confirmpassword: z
    .string()
    .min(8, { message: "password cannot be less than 8 digits" })
    .max(10, { message: "password cannot be more than 10 digits" }),
  phone: z.string().min(10),
  address: z.string().min(3).max(30),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  pincode: z.string().min(6, { message: "PIN code must be 6 characters" }),
  driversLicense: z.object({
    licenseNumber: z.string().min(16).max(16),
    expiryDate: z.string().pipe(z.coerce.date()),
    issuingState: z.string(),
  }),
  communicationPreferences: z.object({
    newsletters: z.boolean(),
    smsNotifications: z.boolean(),
  }),
});

type userSignUpType = z.infer<typeof userSignUpSchema>;

export { userLoginSchema, userSignUpSchema, userLoginType, userSignUpType };
