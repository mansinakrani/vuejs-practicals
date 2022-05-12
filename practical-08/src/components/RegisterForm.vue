<template>
   <div class="p-4">
        <div class="card  align-items-center">
        <Form @submit="handleSubmit" :validation-schema="schema" class="p-6 row col-sm-4">
            <div class="heading">Sign Up</div>
               <div class="form-group mb-2">
                <label for="username">Name :</label>
                <Field id="username" name="username" type="text" class="form-control" placeholder="Enter name" />
                <ErrorMessage name="username" class="text-danger" />
            </div>

            <div class="form-group mb-2">
                <label for="email">Email address :</label>
                <Field id="email" name="email" type="email" class="form-control" placeholder="Enter E-mail" />
                <ErrorMessage name="email" class="text-danger" />
            </div>
 
           <div class="form-group mb-2">
                <label for="password">Password :</label>
                <Field id="password" name="password" type="password" class="form-control" placeholder="Enter Password" />
                <ErrorMessage name="password" class="text-danger" />
            </div>
           
            <div class="form-group mb-2">
                <label for="cnfpassword">Confirm Password :</label>
                <Field id="cnfpassword" name="cnfpassword" type="password" class="form-control" placeholder="********" />
                <ErrorMessage name="cnfpassword" class="text-danger" />
            </div>

            <div class="form-group mb-2">
                <label for="role">Role :</label>
                <Field id="role" name="role" as="select" class="form-select">
                    <option value="">please select a role</option>
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                    <option value="customer">Customer</option>
                </Field>
                <ErrorMessage class="text-danger" name="role" />
            </div>

            <div class="form-group mb-2">
                <span><label for="gender">Gender : </label></span> 
                <span><Field name="gender" class="form-check-input" type="radio" value="male"></Field>Male</span>
                
                <span> <Field name="gender" class="form-check-input" type="radio" value="female"></Field>Female</span>
               
                <ErrorMessage class="text-danger" name="gender" />
            </div>

            <div class="form-group mb-2">
                <label for="age">Age :</label>
                <Field id="age" name="age" type="number" class="form-control" placeholder="Enter age" />
                <ErrorMessage class="text-danger" name="age" />
            </div>

            <div class="form-group mb-2">
                <label for="dob">DOB :</label>
                <Field id="dob" name="dob" type="date" class="form-control" />
                <ErrorMessage class="text-danger" name="dob" />
            </div>
            
            <div class="col-auto">
                <button type="submit" class="btn btn-success">Sign Up</button>
            </div>
 
            <p class="forgot-password text-right">
                Already registered 
                <router-link :to="{name: 'LoginForm'}">sign in?</router-link>
            </p>
        </Form>
    </div>
   </div>
</template>
 
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import { mapActions } from "vuex";

export default {
  name: 'RegisterForm',
  components: {
  Form,
  Field,
  ErrorMessage,
  },
   data() {
    const dateToday = new Date();
    const schema = yup.object({
    username: yup.string().required("Name is required*"),
    email: yup.string().email().required("Valid e-mail is required*"),
    password: yup.string().min(8).max(12).required("Password should be atleast 8 characters long, max 12 characters"),
    cnfpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password doesn't match")
    .required("Confirm password*"),
    role: yup.string().required("Select suitable role*"),
    gender: yup.string().oneOf(["male", "female"]).required(),
    age: yup.number().min(1).max(100).integer().required("Age is required!*"),
    dob: yup.date().max(dateToday, "Future date is not allowed!").required("Date of Birth is required*"),
    });
    return {
      schema,
    }
  },
   methods: {
    handleSubmit(values, formActions) {
        let registerData = {
            name: values.username,
            email: values.email,
            password: values.password,
            role: values.role,
            gender: values.gender,
            age: values.age,
            dob: values.dob,
            returnSecureToken: true
        }
      this.registerSubmit(registerData);
      formActions.resetForm();
    },
    
    ...mapActions({
      registerSubmit: "registerDetails", 
    }),
  },
}
</script>

<style>
.heading{
text-align: center;
font-weight: bolder;
font-size: 30px;
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
display: flex!important;
flex-direction: row;
flex-wrap: nowrap;
}
</style>