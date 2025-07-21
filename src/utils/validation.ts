import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmpassword: z.string(),
}).superRefine(({ password, confirmpassword }, ctx) => {
    if (password !== confirmpassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmpassword"],
      });
    }
  });

export const SignUpSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email(),
  password: z.string().min(4, { message: "Password must be at least 4 characters long" }),
  confirmpassword: z.string(),
}).superRefine(({ password, confirmpassword }, ctx) => {
    if (password !== confirmpassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmpassword"],
      })
    }
  });

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const ChangePasswordSchema = z.object({
  currentpassword: z.string().min(4, { message: "Password must be at least 4 characters long" }),
  newpassword: z.string().min(4, { message: "Password must be at least 4 characters long" }),
  confirmpassword: z.string(),
}).superRefine(({ newpassword, confirmpassword }, ctx) => {
  if (newpassword !== confirmpassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "New password and confirm password do not match",
      path: ["confirmpassword"],
    })
  }
});

export const UserProfileDialogSchema = z.object({
  name: z.string().min(2, { message: "Name is required"}),
  headline: z.string().min(2, { message: "Headline is required"}),
  avatar: z
  .any() // Use z.any() to allow File object initially
  .refine((file) => file instanceof File || typeof file === 'string' || file === null || file === undefined, {
    message: "Avatar must be an image file or a string URL",
  })
  .optional(),
})

export const PostsSchema = z.object({
  title: z.string().min(1, { message: "Error Text Helper"}),
  content: z.string().min(1, { message: "Error Text Helper"}),
  coverImage: z.union([
    z.instanceof(File), 
    z.string().url("Invalid image URL").optional(), 
    z.null(), 
    z.undefined() 
  ])
  .refine(val => {
    return (val instanceof File) || (typeof val === 'string' && val.length > 0);
  }, {
    message: "Cover image is required"
  }),
  tags: z.string().min(1, { message: "Error Text Helper" }).optional(),
})

export const CommentSchema = z.object({
  comment: z.string()
    .min(2, { message: "Minimum 2 character required" })
    .max(200, { message: "Maximum 200 characters allowed" }),
})

export type SignInFormResponse = {
  token: string;
}

export interface PostsData {
  title: string;
  content: string;
  coverImage: File;
  tags: string[];
};

export type DialogFormDataType = {
  name: string;
  headline: string;
  avatar?: string | File | null;
};

export type User = z.infer<typeof UserSchema>;
export type SignUpFormData = z.infer<typeof SignUpSchema>;
export type SignUpFormResponse = Omit<User, "name" | "password" | "confirmpassword">;
export type UserStorage = Omit<User, "password" | "confirmpassword">;
export type SignInFormData = z.infer<typeof SignInSchema>;
export type GetUserDataType = Omit<User, "confirmpassword">;
export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>;
export type UserProfileDialogData = z.infer<typeof UserProfileDialogSchema>;
export type PostsFormInput = z.infer<typeof PostsSchema>;
export type CommentFormInput = z.infer<typeof CommentSchema>;
