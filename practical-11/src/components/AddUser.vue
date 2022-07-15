<template>
  <div class="p-4">
    <div class="card-top">
      <Form
        @submit="handleSubmit"
        :validation-schema="schema"
        class="card align-items-center p-6 row col-sm-4"
      >
        <div class="heading">Add New User</div>
        <div class="form-group mb-2">
          <label for="name">Name :</label>
          <Field
            id="name"
            name="name"
            type="text"
            class="form-control"
            placeholder="Enter name"
            v-model="userData.name"
          />
          <ErrorMessage name="name" class="text-danger" />
        </div>

        <div class="form-group mb-2">
          <label for="email">Email address :</label>
          <Field
            id="email"
            name="email"
            type="email"
            class="form-control"
            placeholder="Enter E-mail"
            v-model="userData.email"
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
            v-model="userData.password"
          />
          <ErrorMessage name="password" class="text-danger" />
        </div>

        <div class="form-group mb-2">
          <label for="cnfpassword">Confirm Password :</label>
          <Field
            id="cnfpassword"
            name="cnfpassword"
            type="password"
            class="form-control"
            placeholder="********"
            v-model="userData.cnfpassword"
          />
          <ErrorMessage name="cnfpassword" class="text-danger" />
        </div>

        <div class="form-group mb-2">
          <label for="role">Role :</label>
          <Field id="role" name="role" as="select" class="form-select" v-model="userData.role">
            <option value="">please select a role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
            <option value="customer">Customer</option>
          </Field>
          <ErrorMessage class="text-danger" name="role" />
        </div>

        <div class="form-group mb-2">
          <span><label for="gender">Gender : </label></span>
          <span>
            <Field
              name="gender"
              class="form-check-input"
              type="radio"
              value="male"
              v-model="userData.gender"
            ></Field>
            Male
          </span>

          <span>
            <Field
              name="gender"
              class="form-check-input"
              type="radio"
              value="female"
              v-model="userData.gender"
            ></Field>
            Female
          </span>
          <ErrorMessage class="text-danger" name="gender" />
        </div>

        <div class="form-group mb-2">
          <label for="age">Age :</label>
          <Field
            id="age"
            name="age"
            type="number"
            class="form-control"
            placeholder="Enter age"
            v-model="userData.age"
          />
          <ErrorMessage class="text-danger" name="age" />
        </div>

        <div class="form-group mb-2">
          <label for="dob">DOB :</label>
          <Field id="dob" name="dob" type="date" :max="disableDate" class="form-control" v-model="userData.dob"/>
          <ErrorMessage class="text-danger" name="dob" />
        </div>

        <div class="col-auto">
          <button type="submit" class="btn btn-success">Submit</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { reactive, computed } from 'vue'
import { useStore } from 'vuex';

export default {  
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const store = useStore();    
    let userData = reactive({
      name: '',
      email: '',
      password: '',
      cnfpassword: '',
      role: '',
      gender: '',
      age: 0,
      dob: '',
    })
    const dateToday = new Date();

    const schema = yup.object({
      name: yup.string().required("Name is required*"),
      email: yup.string().email().required("Valid e-mail is required*"),
      password: yup
        .string()
        .min(8)
        .max(12)
        .required(
          "Password should be atleast 8 characters long, max 12 characters"
        ),
      cnfpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Password doesn't match")
        .required("Confirm password*"),
      role: yup.string().required("Select suitable role*"),
      gender: yup.string().oneOf(["male", "female"]).required(),
      age: yup.number().min(1).max(100).integer().required("Age is required!*"),
      dob: yup
        .date()
        .max(dateToday, "Future date is not allowed!")
        .required("Date of Birth is required*"),
    });

    function handleSubmit() {
      store.dispatch('userDetails',userData);                
    }

    const disableDate = computed(() => {
      let today
      today = new Date().toISOString()
      return today.slice(0, 10)
    })

    return {
      schema,
      handleSubmit,
      userData,
      disableDate
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
  background: #fff;
  text-align: left;
  padding: 10px;
  border-radius: 10px;
}

.form-control {
  display: flex !important;
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>