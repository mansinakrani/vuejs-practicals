<template>
  <nav class="fixed-top">
    <div class="nav-bar">
    <div>
      <router-link to="/" class="home-btn nav-link">Home</router-link>
    </div>
    <div class="nav-heading" v-if="!['LoginForm', 'RegisterForm'].includes($route.name)">
      <span>{{ heading }}</span>
    </div>
    <div>
      <router-link to="/LoginForm" class="login-btn nav-link" v-if="!['LoginForm', 'RegisterForm'].includes($route.name)">Login</router-link>
    </div>
     <div>
      <router-link to="/RegisterForm" class="register-btn nav-link" v-if="!['LoginForm', 'RegisterForm'].includes($route.name)">Register</router-link>
    </div>
  </div>
  </nav>
   
</template>

<script>

export default {
  name: "NavBar",
  data() {
    return {
     heading:'Car Showroom',
    };
  }
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  background-color: rgb(72, 160, 215);
}

.nav-heading {
  font-size: 35px;
  width: 100%;
  height: 48px;
  color: white;
}

.home-btn {
  float: right;
  color: rgb(27, 75, 92);
  font-size: 18px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

.home-btn:hover {
  color: rgb(251, 251, 251);
}

.login-btn {
  float: right;
  color: rgb(27, 75, 92);
  font-size: 18px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

.login-btn:hover {
  color: rgb(251, 251, 251);
}

.register-btn {
  float: right;
  color: rgb(27, 75, 92);
  font-size: 18px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

.register-btn:hover {
  color: rgb(251, 251, 251);
}
</style>