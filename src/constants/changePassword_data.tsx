type ChangePassword_dataProps = {
  label: string,
  placeholder: string,
  type: string,
};

export const changePassword_data: ChangePassword_dataProps[] = [
  {label: "Current Password", placeholder: "Enter your current password", type: "password"},
  {label: "New Password", placeholder: "Enter your new password", type: "password"},
  {label: "Confirm Password", placeholder: "Enter your confirm password", type: "password"},
];