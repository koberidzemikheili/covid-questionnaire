import { defineRule, configure } from "vee-validate";
import { required, min } from "@vee-validate/rules";

defineRule("required", required);
defineRule("min", min);
defineRule("redberryEmail", (value) => {
  if (value && !value.endsWith("@redberry.ge")) {
    return "მეილი უნდა მთავრდებოდეს @redberry.ge დაბოლოებით.";
  }
  return true;
});
defineRule("numeric", (value) => {
  if (value === null || value === undefined || value === "") {
    return true; // The field is considered valid if it is empty
  }
  if (!/^\d+$/.test(value)) {
    return "სავალდებულოა რომ რიცხვით იყოს.";
  }
  return true;
});
configure({
  generateMessage: ({ rule }) => {
    const messages = {
      required: "შევსება აუცილებელია",
      min: `უნდა შეიცავდეს მინიმუმ ${rule.params.length} სიმბოლოს.`,
      redberryEmail: "მეილი უნდა მთავრდებოდეს @redberry.ge დაბოლოებით",
      numeric: "შეყვანილი მოაცემი უნდა იყოს რიცხვი",
    };

    return messages[rule.name] || "Invalid field.";
  },
});
