<template>
<div class="p-4">
  <div class="card  align-items-center">
        <Form @submit="handleSubmit" :validation-schema="schema" class="p-6 row col-sm-4">
            <div class="heading">Log In</div>
 
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

             <div class="col-auto">
                <button type="submit" class="btn btn-success">Log In</button>
            </div>
            
        </Form>
    </div>
</div>
</template>
 
<script>
import axios from "axios";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: 'LoginForm',
  components: {
  Form,
  Field,
  ErrorMessage,
  },
data() {
    const schema = yup.object({
    email: yup.string().email().required("Valid E-mail is Required!*"),
    password: yup
    .string()
    .min(8, "Password is too short - should be 8 characters minimum")
    .max(12, "Password is exited maximum limit - should be 8-12 characters")
    .required()
    });
    return {
      schema,
    }
  },
   methods: {
    handleSubmit(values, formActions) {
      this.loginSubmit(values);
      formActions.resetForm();
    },
    loginSubmit(user) {
    axios.post(`https://testapi.io/api/dartya//login`,user)
      .then((response) => {
          if (response.status === 200) {
            this.$router.push('/'); 
            alert('Logged In Successfully!!');
          }
        })
        .catch(() => {
          alert(`can't login at this moment`);
        });  
    },
  },
}
</script>

<style>
.heading{
text-align: center;
font-weight: bolder;
font-size: 30px;
}

.card {
  margin-top: 40px;
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
display: flex!important;
flex-direction: row;
flex-wrap: nowrap;
align-content: center;
justify-content: center;
align-items: center;
}
</style>