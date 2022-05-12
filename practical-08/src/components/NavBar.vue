<template>
  <nav class="fixed-top">
    <div class="nav-bar" id="nav">
      <div>
      <router-link to="/" class="home-btn nav-link" v-if="!isAuthenticated">View</router-link>
    </div>
    <div>
      <router-link to="/HomeView" class="home-btn nav-link" v-if="isAuthenticated">Home</router-link>
    </div>
    <div class="nav-heading" v-if="!['LoginForm', 'RegisterForm'].includes($route.name)">
      <span>{{ heading }}</span>
    </div>
    <div>
      <router-link to="/LoginForm" class="login-btn nav-link" v-if="!isAuthenticated">Login</router-link>
    </div>
    <div>
      <router-link to="/RegisterForm" class="register-btn nav-link" v-if="!isAuthenticated">Register</router-link>
    </div>
    <div>
      <a href="#" class="logout-btn nav-link" v-if="isAuthenticated" @click.prevent="onLogout()">Logout</a>
    </div>
  </div>
  </nav>
   
</template>

<script>
import { mapGetters, mapActions} from "vuex";
export default {
  name: "NavBar",
  data() {
    return {
     heading:'Car Showroom',
    };
  },
  
 computed: {
    ...mapGetters({isAuthenticated:'isUserAuthenticated'})
  },

  methods: {
     ...mapActions({
      logout: "logOut",
    }),
     onLogout() {
            this.logout();
            this.$router.replace('/');
        },
     
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

#nav a.router-link-exact-active {
  color: #ffffff;
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

.logout-btn {
  float: right;
  color: rgb(27, 75, 92);
  font-size: 18px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

.logout-btn:hover {
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