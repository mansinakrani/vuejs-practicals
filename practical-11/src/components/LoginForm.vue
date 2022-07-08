<template>
  <div class="p-4">
    <div class="card-top">
      <Form
        @submit="handleSubmit"
        :validation-schema="schema"
        class="card align-items-center p-6 row col-sm-4"
      >
        <div class="heading">Log In</div>

        <div class="form-group mb-2">
          <label for="email">Email address :</label>
          <Field
            id="email"
            name="email"
            type="email"
            class="form-control"
            placeholder="Enter E-mail"  
            v-model="email"          
          />
          <ErrorMessage name="email" class="text-danger" />
        </div>

        <div class="form-group mb-2">
          <label for="password">Password :</label>
          <Field
            id="password"
            name="password"
            type="password"
            class="form-control"
            placeholder="Enter Password"
            v-model="password"
          />
          <ErrorMessage name="password" class="text-danger" />
        </div>

        <div class="col-auto">
          <button type="submit" class="btn btn-success">Log In</button>
        </div>

        <p class="forgot-password text-right">
          Doesn't have an account ?
          <router-link :to="{ name: 'RegisterForm' }">Sign Up</router-link>
        </p>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { ref } from 'vue'
import { useStore } from 'vuex';

export default {
  name: "LoginForm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const store = useStore();
    let email = ref('')
    let password = ref('')
    
    const schema = yup.object({
      email: yup.string().email().required("Valid E-mail is Required!*"),
      password: yup
        .string()
        .min(8, "Password is too short - should be 8 characters minimum")
        .max(12, "Password is exited maximum limit - should be 8-12 characters")
        .required(),
    });

    function handleSubmit() {
      let loginData = {
        email: email.value,
        password: password.value,
        returnSecureToken: true,
      };
      store.dispatch('loginCredentials',loginData);            
    }

    return {
      schema,
      handleSubmit,
      email,
      password
    }
  }
};
</script>

<style>
.heading {
  text-align: center;
  font-weight: bolder;
  font-size: 30px;
}

.card-top {
  margin-top: 40px;
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.card {
  max-width: 500px;
  background-color: #cae6ff8c;
}

form {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  background: #fff;
  text-align: left;
  padding: 10px;
  border-radius: 10px;
}

.form-control {
  display: flex !important;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
}
</style>