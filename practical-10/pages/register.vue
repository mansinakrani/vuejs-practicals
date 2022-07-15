<template>
 <section class="section">
    <div class="p-4">
      <div class="card align-items-center">
           <div class="heading">Sign Up</div>
          <form method="post" @submit.prevent="onSubmit" class="p-6 row col-sm-4">

            <div class="field">
              <label class="label">Name :</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="username"
                  v-model="username"
                  placeholder="Enter Name"
                  required 
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Email :</label>
              <div class="control">
                <input
                  type="email"
                  class="input"
                  name="email"
                  v-model="email"
                  placeholder="Enter E-mail"
                  required
                />
                <p v-if="errors.email" class="text-danger" name="email">
                {{ errors.email }}
              </p>
              </div>
            </div>

            <div class="field">
              <label class="label">Password :</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="password"
                  v-model="password"
                  placeholder="Enter Password"
                  required
                />
                <p v-if="errors.email" class="text-danger" name="email">
                {{ errors.email }}
              </p>
              </div>
            </div>

            <div class="field">
              <label class="label">Confirm Password :</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="cnfpassword"
                  v-model="cnfpassword"
                  placeholder="********"
                  required  
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Role :</label>
              <select id="role" class="input form-select" aria-label="please select a role" v-model="role" required>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
                <option value="customer">Customer</option>
              </select>
            </div>

            <div class="field">
              <span><label class="label">Gender : </label></span>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="gender" id="inlineRadio1" value="male" v-model="gender">
                <label class="form-check-label" for="inlineRadio1">Male</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="gender" id="inlineRadio2" value="female" v-model="gender">
                <label class="form-check-label" for="inlineRadio2">Female</label>
              </div>
            </div>

            <div class="field">
              <label class="label">Age :</label>
              <div class="control">
                <input
                  id="age"
                  name="age"
                  type="number"
                  class="input"
                  placeholder="Enter age"
                  v-model="age"
                  required
                />
              </div>
            </div>

            <div class="field">
              <label class="label">DOB :</label>
              <input id="dob" name="dob" type="date" class="input" v-model="dob" required/>
            </div>

            <div class="col-auto top-space">
              <button type="submit" class="btn btn-success">Register</button>
            </div>
          </form>

          <div class="top-space">
            Already got an account? <nuxt-link :to="{ name: 'login' }"><button class="btn-view">LogIn</button></nuxt-link>
          </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import ValidateForm from '../services/ValidateForm';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      cnfpassword: '',
      role: '',
      gender:'',
      age: '',
      dob: '',
      errors: [],
    }
  },

  methods: {
    onSubmit() {
        let registerData = {
          name: this.username,
          email: this.email,
          password: this.password,
          role: this.role,
          gender: this.gender,
          age: this.age,
          dob: this.dob,
          returnSecureToken: true,
        };

      this.errors = new ValidateForm(
        this.email,
        this.password
      ).validate()
      
      if (!('email' in this.errors) && !('password' in this.errors)) {
        this.registerSubmit(registerData);
      }
      
    },

    ...mapActions({ registerSubmit: "registerDetails" }),
  }
}
</script>

<style>
.heading {
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

.top-space {
  margin: 10px
}

.control {
  display: flex !important;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.btn-view {
  color: red;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

.btn-view:hover {
  color: blue;
}
</style>