<template>
 <section class="section">
   <div class="p-4">
      <div class="card align-items-center">
          <div class="heading">Log In</div>
          <form
            method="post"
            @submit.prevent="onLogin"
            class="p-6 row col-sm-4"
          >
            <div class="field mb-2">
              <label class="label">Email</label>
              <div class="control">
                <input
                  type="email"
                  class="input"
                  name="email"
                  placeholder="Enter E-mail"
                  v-model="email"
                  required
                />
                <p v-if="errors.email" class="text-danger" name="email">
                {{ errors.email }}
              </p>
              </div>
            </div>
            <div class="field mb-2">
              <label class="label">Password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="password"
                  placeholder="Enter Password"
                  v-model="password"
                  required
                />
                <p v-if="errors.password" class="text-danger" name="password">
                {{ errors.password }}
              </p>
              </div>
            </div>
            <div class="col-auto top-space">
              <button type="submit" class="btn btn-success">
                Log In
              </button>
            </div>
          
          <div>
            <p class="top-space">
              Don't have an account?
              <nuxt-link :to="{ name: 'register' }"><button class="btn-view">Register</button></nuxt-link>
            </p>
          </div>
          </form>
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
      email: '',
      password: '',
      errors: [],
    }
  },

  methods: {
    onLogin() {
      let loginData = {
        email: this.email,
        password: this.password,
        returnSecureToken: true,
      };
      this.errors = new ValidateForm(
        this.email,
        this.password
      ).validate()

       if (!('email' in this.errors) && !('password' in this.errors)) {
        this.loginSubmit(loginData)
      }
    },
    ...mapActions({ loginSubmit: "loginCredentials" }),
  }
}
</script>

<style>
.heading {
  text-align: center;
  font-weight: bolder;
  font-size: 30px;
}

.top-space {
  margin-top: 10px
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