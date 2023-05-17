<template>
  <div class="overlay">
    <div class="red-overlay"></div>
    <div>
      <div class="mx-32 mt-10 py-10">
        <div class="mb-10">
          <img
            src="@/assets/images/redberry.png"
            alt="Left image"
            class="float-left"
          />
          <img
            src="@/assets/images/4.png"
            alt="Right image"
            class="float-right"
          />
        </div>
        <hr class="h-px mt-8 border-1 border-black" />
        <br />
        <div class="flex flex-wrap">
          <form
            class="w-full md:w-1/3 max-w-lg flex flex-col"
            @submit.prevent="submitForm"
            :initial-values="setFieldValue"
          >
            <label for="had_covid" class="font-semibold text-gray-800 mb-2 mt-4"
              >გაქვს გადატანილი covid-19?*</label
            >
            <input
              type="radio"
              id="yes"
              value="yes"
              v-model="had_covid"
            /><label>კი</label>
            <input type="radio" id="no" value="no" v-model="had_covid" /><label
              >არა</label
            >
            <input
              type="radio"
              id="no"
              value="i have it now"
              v-model="had_covid"
            /><label>ახლა მაქვს</label>
            <div class="text-red-600" v-if="errors.had_covid">
              {{ errors.had_covid }}
            </div>
            <div v-if="had_covid === 'yes'" class="flex flex-col">
              <label
                for="vaccine_received"
                class="font-semibold text-gray-800 mb-2 mt-4"
                >ანტისხეულების ტესტი გაქვს გაკეთებული?*</label
              >
              <input
                type="radio"
                id="had_antibody_test_true"
                name="had_antibody_test_true"
                :value="true"
                v-model="had_antibody_test"
              /><label>კი</label>
              <div class="text-red-600" v-if="errors.had_covid">
                {{ errors.had_antibody_test }}
              </div>
              <input
                type="radio"
                id="had_antibody_test_false"
                name="had_antibody_test_false"
                :value="false"
                v-model="had_antibody_test"
              /><label>არა</label>
              <div class="text-red-600" v-if="errors.had_antibody_test">
                {{ errors.had_antibody_test }}
              </div>
              <div v-if="had_antibody_test === false">
                <label
                  for="test_date"
                  class="font-semibold text-gray-800 mb-2 mt-4"
                  >თუ გახსოვს გთხოვ მიუთითე ტესტის მიახლოებული რიცხვი და
                  ანტისხეულების რაოდენობა</label
                >
                <input type="date" v-model="test_date" />
                <input type="text" v-model="number" />
                <div class="text-red-600" v-if="errors['antibodies.number']">
                  {{ errors["antibodies.number"] }}
                </div>
              </div>
              <div v-else>
                <label
                  for="test_date"
                  class="font-semibold text-gray-800 mb-2 mt-4"
                  >თუ გახსოვს გთხოვ მიუთითე ტესტის მიახლოებული რიცხვი და
                  ანტისხეულების რაოდენობა</label
                >
                <input
                  type="date"
                  id="covid_sickness_date"
                  v-model="covid_sickness_date"
                />
                <div class="text-red-600" v-if="errors.covid_sickness_date">
                  {{ errors.covid_sickness_date }}
                </div>
              </div>
            </div>

            <button>
              <img src="@/assets/images/Vector 2.png" alt="arrow right" />
            </button>
          </form>

          <div class="w-full md:w-2/3 flex justify-center">
            <img
              src="@/assets/images/vaccinate2.png"
              alt="main image"
              class="relative top-6"
            />
          </div>
          <div class="w-full flex justify-center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

const schema = yup.object().shape({
  had_covid: yup.string().required("შევსება სავალდებულოა"),
  had_antibody_test: yup.boolean().when("had_covid", {
    is: "yes",
    then: () => yup.string().required("შევსება სავალდებულოა"),
  }),
  antibodies: yup.object().when("had_antibody_test", {
    is: "false",
    then: () =>
      yup.object().shape({
        number: yup.string().matches(/^[0-9]+$/, "მონაცემი უნდა იყოს რიცხვი"),
        test_date: yup.date(),
      }),
  }),
  covid_sickness_date: yup.date().when("had_antibody_test", {
    is: "false",
    then: () => yup.date("5lari").required(),
  }),
});

const store = useStore();
const { handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: {
    had_covid: store.getters.getIdentificationData.had_covid,
    had_antibody_test: store.getters.getIdentificationData.had_antibody_test,
    test_date: store.getters.getIdentificationData.test_date,
    number: store.getters.getIdentificationData.antibodies.number,
    covid_sickness_date:
      store.getters.getIdentificationData.covid_sickness_date,
  },
});
const { value: had_covid } = useField("had_covid");
const { value: had_antibody_test } = useField("had_antibody_test");
const { value: test_date } = useField("antibodies.test_date");
const { value: number } = useField("antibodies.number");
const { value: covid_sickness_date } = useField("covid_sickness_date");
const submitForm = handleSubmit((data) => {
  console.log(data);
  store.commit("setCovidquestionsData", data);
});
</script>

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.red-overlay {
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
    transform: translate(-5%, -425%);
    width: 400px;
    height: 50px;
  }
  100% {
    transform: translate(-50%, -50%);
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
