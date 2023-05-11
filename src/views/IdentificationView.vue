<template>
  <div class="overlay">
    <div class="yellow-overlay"></div>
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
          <form class="w-full md:w-1/3 max-w-lg flex flex-col">
            <label for="name" class="font-semibold text-gray-800 mb-2 mt-4"
              >სახელი*</label
            >
            <input
              type="text"
              id="name"
              class="border border-gray-700 border-solid bg-transparent h-8"
              v-model="newFirstName"
            />
            <span>{{ firstNameerrorMessage }}</span>
            <label for="lastname" class="font-semibold text-gray-800 mb-2 mt-4"
              >გვარი*</label
            >
            <input
              type="text"
              id="lastname"
              class="border border-gray-700 border-solid bg-transparent h-8"
              v-model="newLastName"
            />
            <span>{{ lastNameerrorMessage }}</span>
            <label for="email" class="font-semibold text-gray-800 mb-2 mt-4"
              >მეილი*</label
            >
            <input
              type="text"
              id="email"
              class="border border-gray-700 border-solid bg-transparent h-8"
              v-model="newEmail"
            />
            <span>{{ emailerrorMessage }}</span>
          </form>

          <div class="w-full md:w-2/3 flex justify-center">
            <img
              src="../assets/images/scan2.png"
              alt="main image"
              class="relative bottom-28"
            />
          </div>
          <div class="w-full flex justify-center">
            <button @click="Submit">
              <img src="../assets/images/Vector 2.png" alt="arrow right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useField } from "vee-validate";

export default {
  setup() {
    function validateField(value) {
      if (!value) {
        return "ველის შევსება სავალდებულოა";
      }

      if (value.length < 3) {
        return "მინიმუმ 3 სიმბოლო";
      }
      return true;
    }
    function validateEmailField(value) {
      if (!value) {
        return "ველის შევსება სავალდებულოა";
      }

      if (value.length < 3) {
        return "მინიმუმ 3 სიმბოლო";
      }
      const regex = /^[A-Z0-9._%+-]+@redberry\.ge$/i;
      if (!regex.test(value)) {
        return "უნდა შეესაბამებოდეს მეილის ფორმატს";
      }
      return true;
    }
    const store = useStore();
    const { value: newFirstName, errorMessage: firstNameerrorMessage } =
      useField("newFirstName", validateField);
    const { value: newLastName, errorMessage: lastNameerrorMessage } = useField(
      "lastName",
      validateField
    );
    const { value: newEmail, errorMessage: emailerrorMessage } = useField(
      "email",
      validateEmailField
    );

    const Submit = function () {
      if (
        newFirstName.value &&
        newLastName.value &&
        newEmail.value &&
        !firstNameerrorMessage.value &&
        !lastNameerrorMessage.value &&
        !emailerrorMessage.value
      ) {
        store.commit("setFirstName", newFirstName.value);
        store.commit("setLastName", newLastName.value);
        store.commit("setEmail", newEmail.value);
      } else {
        return false;
      }
    };

    return {
      newFirstName,
      newLastName,
      newEmail,
      Submit,
      firstNameerrorMessage,
      lastNameerrorMessage,
      emailerrorMessage,
    };
  },
};
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
    transform: translate(-5%, -450%);
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
