<script lang="ts">
import { ref } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import axios from "axios";
import router from "../router";

export default {
  mounted() {
    localStorage.removeItem('user_token');
  },
  setup() {
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        email: yup.string().email(),
        password: yup.string(),
      },
    });

    const email = useField<string>("email");
    const password = useField<string>("password");
    const isError = ref<boolean>(false);
    const errorMessage = ref<string>("");

    const submit = handleSubmit(async (values) => {
      const response = await axios.post(
        "http://localhost:4000/api/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.user.error) {
        errorMessage.value = await response.data.user.message;
      } else {
        localStorage.setItem("user_token", response.data.user.token);
        router.push("/");
        window.location.href = "/"
      }
    });

    return { email, password, submit, isError, errorMessage };
  },
};
</script>

<template>
  <div class="d-flex justify-center">
    <v-card width="400" class="text-center" style="padding: 15px">
      <h1 class="text-center">Log in</h1>

      <v-form @submit.prevent="submit">
        <div>
          <v-text-field
            type="email"
            label="Email"
            v-model="email.value.value"
            variant="outlined"
            :error-messages="email.errorMessage.value"
          ></v-text-field>
          <v-text-field
            type="password"
            label="Password"
            v-model="password.value.value"
            variant="outlined"
            :error-messages="password.errorMessage.value"
          ></v-text-field>
          <div class="d-flex flex-column">
            <v-btn
              type="submit"
              color="primary"
              append-icon="mdi-arrow-right"
              class="text-capitalize"
            >
              Log in
            </v-btn>
            <v-btn variant="text" class="text-none"> Sign up here </v-btn>
          </div>
        </div>
      </v-form>
      <!-- <v-alert
        :v-if="errorMessage!=''"
        :text="errorMessage"
        class="mt-3"
        type="error"
      ></v-alert> -->
    </v-card>
  </div>
</template>
