import * as yup from 'yup';

export const loginSchemaValidation = yup.object({
  email: yup.string().email("* L'email n'est pas valide").required(),
  password: yup.string().required(),
});

export const forgotSchemaValidation = yup.object({
  email: yup.string().email("* L'email n'est pas valide").required(),
});

export const newpasswordSchemaValidation = yup.object({
  password: yup
    .string()
    //.min(6, '* Votre mot de passe doit avoir 6 caractères au minimum')
    .required(),
  confirm_password: yup
    .string()
    .required()
    .test(
      'password-match',
      'Les mots de passe ne sont pas identiques',
      function (value) {
        return this.parent.password === value;
      },
    ),
});

export const changeEmailSchemaValidation = yup.object({
  email: yup.string().email("* L'email n'est pas valide").required(),
  confirm_email: yup
    .string()
    .test('email-match', 'Les emails ne sont pas identiques', function (value) {
      return this.parent.email === value;
    })
    .required(),
});

export const changePasswordSchemaValidation = yup.object({
  old_password: yup
    .string()
    //.min(6, '* Votre mot de passe doit avoir 6 caractères au minimum')
    .required(),
  password: yup
    .string()
    //.min(6, '* Votre mot de passe doit avoir 6 caractères au minimum')
    .required(),
  confirm_password: yup
    .string()
    .test(
      'password-match',
      'Les mots de passe ne sont pas identiques',
      function (value) {
        return this.parent.password === value;
      },
    )
    .required(),
});

export const registerValidationSchema = yup.object({
  email: yup.string().email("* L'email n'est pas valide").required(),
  // birthdate: yup.date().required(),
  password: yup
    .string()
    //.min(6, "* Votre mot de passe doit avoir 6 caractères au minimum")
    .required(),
  newsletter: yup.boolean(),
  notification: yup.boolean(),
  password_confirm: yup
    .string()
    .test(
      'password-match',
      'Les mots de passe ne sont pas identiques',
      function (value) {
        return this.parent.password === value;
      },
    ),
});

export const registerNameValidationSchema = yup.object({
  family: yup.string().required(),
  first: yup.string().required(),
  surname: yup.string().required(),
  godfather: yup.string(),
});

export const editProfilValidationSchema = yup.object({
  email: yup.string(),
  birthday: yup.string(),
  last_name: yup.string().required(),
  first_name: yup.string().required(),
  mobile_phone: yup.string(),
  godfather: yup.string(),
  zip_code: yup.string(),
  city: yup.string(),
  street: yup.string(),
  country_code: yup.string(),
});
