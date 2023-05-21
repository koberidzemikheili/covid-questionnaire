<template>
  <div class="overlay">
    <div class="red-overlay"></div>
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
            id="CovidQuestionsForm"
          >
            <RadioField
              label="გაქვს გადატანილი covid-19?*"
              :options="covidOptions"
              type="radio"
              name="had_covid"
              rules="required"
              v-model="hadCovid"
            />

            <div v-if="hadCovid === 'yes'">
              <RadioField
                label="ანტისხეულების ტესტი გაქვს გაკეთებული?*"
                :options="covidOptions2"
                type="radio"
                name="had_antibody_test"
                rules="requiredboolean"
                v-model="hadantibodytest"
              />
            </div>
            <div v-if="hadantibodytest === false">
              <Field type="date" name="covid_sickness_date" rules="required" />
              <div>
                <ErrorMessage name="covid_sickness_date" class="text-red-600" />
              </div>
            </div>
            <div v-if="hadantibodytest === true">
              <div>
                <label
                  >თუ გახსოვს, გთხოვ მიუთითე ტესტის მიახლოებითი რიცხვი და
                  ანტისხეულების რაოდენობა*</label
                >
              </div>
              <Field
                type="date"
                name="antibodies.test_date"
                class="bg-transparent"
              />
              <div>
                <ErrorMessage
                  name="antibodies.test_date"
                  class="text-red-600"
                />
              </div>
              <Field
                type="text"
                name="antibodies.number"
                rules="numeric"
                class="bg-transparent"
              />
              <div>
                <ErrorMessage name="antibodies.number" class="text-red-600" />
              </div>
            </div>
          </Form>
          <div class="w-full md:w-2/3 flex justify-center">
            <img
              src="@/assets/images/vaccinate2.png"
              alt="main image"
              class="relative bottom-16"
            />
          </div>
          <div class="w-full flex justify-center mb-24">
            <button @click="Previous" class="content">
              <IconLeftArrow />
            </button>
            <button type="submit" form="CovidQuestionsForm" class="content">
              <IconRightArrow />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import IconRightArrow from "@/components/icons/IconRightArrow.vue";
import IconLeftArrow from "@/components/icons/IconLeftArrow.vue";
import router from "@/router";
import "@/Rules/rules";
import RadioField from "../components/RadioField.vue";
const hadCovid = ref("");
const hadantibodytest = ref();
const store = useStore();
const covidOptions = [
  { label: "კი", value: "yes" },
  { label: "არა", value: "no" },
  { label: "ახლა მაქვს", value: "have_right_now" },
];
const covidOptions2 = [
  { label: "კი", value: true },
  { label: "არა", value: false },
];
const submitForm = (values) => {
  store.commit("setCovidquestionsData", values);
  router.push({ name: "VaccineQuestions" });
};
const Previous = () => {
  router.push({ name: "Identification" });
};
</script>

<style scoped>
.overlay {
  position: relative;
  display: flex;
}

.red-overlay {
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: yellow;
  opacity: 0.5;
}

@keyframes move-overlay {
  0% {
    transform: translate(955px, 270px);
    width: 400px;
    height: 50px;
    border-radius: 0%;
  }
  100% {
    transform: translate(780px, 325px);
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: red;
  }
}

.red-overlay {
  animation: move-overlay 0.6s ease-in-out forwards;
  width: 400px;
  height: 50px;
}
</style>
