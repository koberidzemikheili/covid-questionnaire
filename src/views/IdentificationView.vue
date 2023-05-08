<template>
  <div>
    <div class="mx-32 mt-10 py-10">
      <div class="mb-10">
        <img
          src="../assets/images/redberry.png"
          alt="Left image"
          class="float-left"
        />
        <img
          src="../assets/images/right1.png"
          alt="Right image"
          class="float-right"
        />
      </div>
      <hr class="h-px mt-8 border-1 border-black" />
      <br />
      <div class="flex flex-wrap">
        <form
          class="w-full md:w-1/3 max-w-lg flex flex-col"
          @submit.prevent="Submit"
        >
          <label for="name" class="font-semibold text-gray-800 mb-2 mt-4"
            >სახელი*</label
          >
          <input
            type="text"
            id="name"
            class="border border-gray-700 border-solid bg-transparent h-8"
            v-model="newFirstName"
          />
          <label for="lastname" class="font-semibold text-gray-800 mb-2 mt-4"
            >გვარი*</label
          >
          <input
            type="text"
            id="lastname"
            class="border border-gray-700 border-solid bg-transparent h-8"
            v-model="newLastName"
          />
          <label for="email" class="font-semibold text-gray-800 mb-2 mt-4"
            >მეილი*</label
          >
          <input
            type="email"
            id="email"
            class="border border-gray-700 border-solid bg-transparent h-8"
            v-model="newEmail"
          />
          <button>next</button>
        </form>

        <div class="w-full md:w-2/3 flex justify-center">
          <img
            src="../assets/images/scan2.png"
            alt="main image"
            class="relative bottom-28"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";

export default {
  setup() {
    const store = useStore();
    const newFirstName = ref("");
    const newLastName = ref("");
    const newEmail = ref("");

    const fullName = computed(function () {
      return store.getters.fullName;
    });

    const Submit = function () {
      store.commit("setFirstName", newFirstName.value);
      store.commit("setLastName", newLastName.value);
      store.commit("setEmail", newEmail.value);
      newFirstName.value = "";
      newLastName.value = "";
      newEmail.value = "";
    };

    return {
      fullName,
      newFirstName,
      newLastName,
      newEmail,
      Submit,
    };
  },
};
</script>
