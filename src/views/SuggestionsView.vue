<template>
  <div class="overlay">
    <div class="yellow-overlay"></div>
    <div>
      <div class="mx-32 mt-10 py-10 min-w-full">
        <div class="mb-10">
          <img
            src="@/assets/images/redberry.png"
            alt="Left image"
            class="float-left"
          />
          <img
            src="@/assets/images/right1.png"
            alt="Right image"
            class="float-right"
          />
        </div>
        <hr class="h-px mt-8 border-1 border-black" />
        <br />
        <div class="flex flex-wrap">
          <Form
            class="w-full md:w-1/3 max-w-lg flex flex-col"
            @submit="submitForm"
          >
            <div class="mb-5">
              რედბერის მთავარი ღირებულება ჩვენი გუნდის თითოეული წევრია. გარემო,
              რომელსაც ჩვენი თანამშრომლები ქმნით, ბევრისთვის არის და ყოფილა
              წლების განმავლობაში მიზნებისთვის ერთად ბრძოლის მიზეზი, ბევრისთვის
              კი — ჩვენთან გადმოსვლის.
            </div>
            <div class="mb-5">
              პანდემიის პერიოდში ერთმანეთსაც იშვიათად ვნახულობთ პირისპირ და
              ყოველდღიური კომუნიკაციაც გაიშვიათდა.
            </div>
            <RadioField
              label="რა სიხშირით შეიძლება გვქონდეს საერთო არაფორმალური ონლაინ შეხვედრები, სადაც ყველა სურვილისამებრ ჩაერთვება?**"
              :options="SuggestPatternOptions"
              type="radio"
              name="non_formal_meetings"
              rules="required"
            />
            <RadioField
              label="კვირაში რამდენი დღე ისურვებდი ოფისიდან მუშაობას?***"
              :options="SuggestDaysOptions"
              type="radio"
              name="number_of_days_from_office"
              rules="required"
            />
            <InputField
              label="რას ფიქრობ ფიზიკურ შეკრებებზე?"
              type="textarea"
              name="what_about_meetings_in_live"
              rules="mustbestring"
              addclass="h-32"
              as="textarea"
            />
            <InputField
              label="რას ფიქრობ არსებულ გარემოზე: 
                რა მოგწონს, რას დაამატებდი, რას შეცვლიდი??"
              type="textarea"
              name="tell_us_your_opinion_about_us"
              rules="mustbestring"
              addclass="h-32"
              as="textarea"
            />
            <button>
              <IconRightArrow />
            </button>
          </Form>
          <div class="w-full md:w-2/3 flex justify-center">
            <img
              src="@/assets/images/scan2.png"
              alt="main image"
              class="relative bottom-28"
            />
          </div>
          <div class="w-full flex justify-center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import { useStore } from "vuex";
import RadioField from "../components/RadioField.vue";
import InputField from "../components/InputField.vue";
import IconRightArrow from "@/components/icons/IconRightArrow.vue";
const SuggestPatternOptions = [
  {
    label: "კვირაში ორჯერ",
    value: "twice_a_week",
  },
  { label: "კვირაში ერთხელ", value: "once_a_week" },
  {
    label: "ორ კვირაში ერთხელ",
    value: "once_in_a_two_weeks",
  },
  {
    label: "თვეში ერთხელ",
    value: "once_in_a_month",
  },
];
const SuggestDaysOptions = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
];

const store = useStore();
const submitForm = (values) => {
  store.commit("setSuggestionsData", values);
  store.dispatch("sendDataToServer");
};
</script>

<style scoped>
.overlay {
  position: relative;
  display: flex;
}

.yellow-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background-color: yellow;
  opacity: 0.5;
}

@keyframes move-overlay {
  0% {
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
  }
  100% {
    transform: translate(-5%, -425%);
    width: 400px;
    height: 50px;
  }
}

.yellow-overlay {
  animation: move-overlay 0.6s ease-in-out forwards;
  width: 400px;
  height: 50px;
}
</style>
