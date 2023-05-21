<template>
  <div class="overlay">
    <div class="shape-transition" :class="{ 'star-shape': isStar }"></div>
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
          <Form
            class="w-1/3 block"
            @submit="submitForm"
            id="VaccineQuestionsForm"
          >
            <RadioField
              label="უკვე აცრილი ხარ ?*"
              :options="VaccineOptions"
              type="radio"
              name="had_vaccine"
              rules="requiredboolean"
              v-model="had_vaccine"
            />
            <div v-if="had_vaccine === true">
              <RadioField
                label="აირჩიე რა ეტაპზე ხარ?*"
                :options="vaccination_stageOptions"
                type="radio"
                name="vaccination_stage"
                rules="required"
                v-model="vaccination_stage"
              />
              <div
                v-if="
                  vaccination_stage === 'first_dosage_and_not_registered_yet'
                "
                class="text-center mt-5"
              >
                რომ არ გადადო, ბარემ ახლავე დარეგისტრირდი
                <a href="https://booking.moh.gov.ge/" class="text-cyan-700"
                  >https://booking.moh.gov.ge/</a
                >
              </div>
            </div>
            <div v-if="had_vaccine === false">
              <RadioField
                label="რას ელოდები?*"
                :options="i_am_waitingOptions"
                type="radio"
                name="i_am_waiting"
                rules="required"
                v-model="i_am_waiting"
              />
              <div
                v-if="
                  i_am_waiting === 'had_covid_and_planning_to_be_vaccinated'
                "
                class="text-center mt-5"
              >
                <div>
                  ახალი პროტოკოლით კოვიდის გადატანიდან 1 თვის შემდეგ შეგიძლიათ
                  ვაქცინის გაკეთება.
                </div>
                👉 რეგისტრაციის ბმული <br />
                <a href="https://booking.moh.gov.ge/" class="text-cyan-700">
                  https://booking.moh.gov.ge/</a
                >
              </div>
              <div
                v-if="i_am_waiting === 'not_planning'"
                class="text-center mt-5"
              >
                👉
                <a href="https://booking.moh.gov.ge/" class="text-cyan-700">
                  https://booking.moh.gov.ge/</a
                >
              </div>
            </div>
          </Form>
          <div class="w-full md:w-2/3 flex justify-center">
            <img
              src="@/assets/images/doctor2.png"
              alt="main image"
              class="relative bottom-16"
            />
          </div>
          <div class="w-full flex justify-center mb-24">
            <button @click="Previous" class="content">
              <IconLeftArrow />
            </button>
            <button type="submit" form="VaccineQuestionsForm" class="content">
              <IconRightArrow />
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
import router from "@/router";
import { ref, onMounted } from "vue";
import RadioField from "../components/RadioField.vue";
import IconRightArrow from "@/components/icons/IconRightArrow.vue";
import IconLeftArrow from "@/components/icons/IconLeftArrow.vue";
const had_vaccine = ref();
const vaccination_stage = ref("");
const i_am_waiting = ref("");
const isStar = ref(false);

onMounted(() => {
  setTimeout(() => {
    isStar.value = true;
  }, 600);
});

const VaccineOptions = [
  { label: "კი", value: true },
  { label: "არა", value: false },
];
const vaccination_stageOptions = [
  {
    label: "პირველი დოზა და დარეგისტრირებული ვარ მეორეზე",
    value: "first_dosage_and_registered_on_the_second",
  },
  { label: "სრულად აცრილი ვარ", value: "fully_vaccinated" },
  {
    label: "პირველი დოზა და არ დავრეგისტრირებულვარ მეორეზე",
    value: "first_dosage_and_not_registered_yet",
  },
];
const i_am_waitingOptions = [
  {
    label: "დარეგისტრირებული ვარ და ველოდები რიცხვს",
    value: "registered_and_waiting",
  },
  { label: "არ ვგეგმავ", value: "not_planning" },
  {
    label: "გადატანილი მაქვს და ვგეგმავ აცრას",
    value: "had_covid_and_planning_to_be_vaccinated",
  },
];

const store = useStore();
const submitForm = (values) => {
  store.commit("setVaccinequestionsData", values);
  router.push({ name: "Suggestions" });
};
const Previous = () => {
  router.push({ name: "CovidQuestions" });
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
  animation: transition-circle-to-star 0.6s ease-in-out forwards;
}

.star-shape {
  clip-path: circle(50%);
}

@keyframes transition-circle-to-star {
  0% {
    clip-path: circle(50%);
    transform: translate(955px, 270px);
    background-color: red;
  }
  100% {
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
    transform: rotate(10deg) scale(1.2) translate(690px, -80px);
  }
}
</style>
