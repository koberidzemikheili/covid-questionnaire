<template>
  <div class="overlay">
    <div class="shape-transition" :class="{ 'heart-shape': isHeart }"></div>
    <div class="w-full">
      <div class="mx-24 mt-28">
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
          <Form class="w-1/3 block" @submit="submitForm">
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
            <button
              class="bg-blue-500 px-4 py-2 rounded-3xl text-white float-right mt-12"
            >
              დასრულება
            </button>
          </Form>
          <div class="w-full md:w-2/3 flex justify-center">
            <img
              src="@/assets/images/office.png"
              alt="main image"
              class="relative w-2/3 h-2/3"
            />
          </div>
          <div class="w-full flex justify-center mb-24">
            <button type="submit" form="VaccineQuestionsForm" class="content">
              <IconLeftArrow />
            </button>
          </div>
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
import IconLeftArrow from "@/components/icons/IconLeftArrow.vue";
import { ref, onMounted } from "vue";
const isHeart = ref(false);

onMounted(() => {
  setTimeout(() => {
    isHeart.value = true;
  }, 600);
});
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

.shape-transition {
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: gold;
  opacity: 0.5;
  animation: transition-circle-to-heart 0.6s ease-in-out forwards;
}

@keyframes transition-circle-to-heart {
  0% {
    clip-path: polygon(
      50% 0%,
      60.5% 34.4%,
      94.5% 34.4%,
      66.7% 55.6%,
      77.2% 89.6%,
      50% 70.7%,
      22.8% 89.6%,
      33.3% 55.6%,
      5.5% 34.4%,
      39.5% 34.4%
    );
    transform: rotate(10deg) translate(690px, -80px);
  }
  100% {
    clip-path: path(
      "M96 31.992c-25.428-43.848-96-31.104-96 19.104 0 30.294 36.132 61.278 96 105.216 59.868-43.938 96-74.922 96-105.216 0-50.208-70.572-62.856-96-19.104z"
    );
    transform: translate(900px, 200px);
    background-color: red;
  }
}
</style>
