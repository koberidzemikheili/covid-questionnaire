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
    return true;
  }
  if (!/^\d+$/.test(value)) {
    return "სავალდებულოა რომ რიცხვით იყოს.";
  }
  return true;
});
defineRule("mustbestring", (value) => {
  if (value === null || value === undefined || value === "") {
    return true;
  }
  if (typeof value !== "string") {
    return "სავალდებულოა ტექსტური მნიშვნელობა იყოს.";
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
      mustbestring: "შეყვანილი მონაცემი უნდა იყოს ტექსტი",
    };

    return messages[rule.name] || "Invalid field.";
  },
});
