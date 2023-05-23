import { defineRule, configure } from "vee-validate";
import { min, numeric, required } from "@vee-validate/rules";

defineRule("required", required);
defineRule("min", min);
defineRule("numeric", numeric);
defineRule("redberryEmail", (value) => {
  if (value && !value.endsWith("@redberry.ge")) {
    return "მეილი უნდა მთავრდებოდეს @redberry.ge დაბოლოებით.";
  }
  return true;
});
defineRule("requiredboolean", (value) => {
  if (value === false) {
    return true;
  }
  if (value === null || value === undefined || value === "") {
    return "შევსება აუცილებელია";
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
