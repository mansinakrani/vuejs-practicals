<template>
  <div class="nav-bar">
    <div>
      <router-link to="/"><span><button class="home-btn"  type="button">Home</button></span></router-link>
    </div>
    <div class="heading">
      <span>{{ heading }}</span>
    </div>
    <div>
      <router-link to="/LoginForm"><span><button class="login-btn"  type="button">Login</button></span></router-link>
    </div>
     <div>
      <router-link to="/RegisterForm"><span><button class="register-btn"  type="button">Register</button></span></router-link>
    </div>
  </div>
   
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
  justify-content: center;
  align-items: center;
  background-color: rgb(72, 160, 215);
}

.heading {
  font-size: 35px;
  width: 100%;
  height: 48px;
  color: white;
}
.home-btn {
  float: right;
  padding: 13px;
  color: rgb(27, 75, 92);
  background: rgb(149, 216, 249);
  justify-content: center;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

.home-btn:hover {
  background: rgb(251, 251, 251);
}
.login-btn {
  float: right;
  padding: 13px;
  color: rgb(27, 75, 92);
  background: rgb(149, 216, 249);
  justify-content: center;
  font-size: 14px;
  border: none;
  cursor: pointer;
  margin-right: 4px;
  border-radius: 8px;
}

.login-btn:hover {
  background: rgb(251, 251, 251);
}

.register-btn {
  float: right;
  padding: 13px;
  color: rgb(27, 75, 92);
  background: rgb(149, 216, 249);
  justify-content: center;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

.register-btn:hover {
  background: rgb(251, 251, 251);
}
</style>