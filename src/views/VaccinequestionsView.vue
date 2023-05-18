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
            <button>
              <img src="@/assets/images/Vector 2.png" alt="arrow right" />
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
//import router from "@/router";
import { ref } from "vue";
import RadioField from "../components/RadioField.vue";
const had_vaccine = ref();
const vaccination_stage = ref("");
const i_am_waiting = ref("");

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
  console.log(values);
  store.commit("setVaccinequestionsData", values);
};
</script>
