/**
 * Split form error in nested forms
 * @param error
 * @param {string} name
 * @returns {any}
 */
export const getFormFieldError = (error: any, name: string) => {
  let errorField: any = null;
  name.split(".").map((e: string) => {
    if (errorField) {
      errorField = errorField?.[e];
    } else {
      errorField = error?.[e];
    }
  });

  return errorField;
};