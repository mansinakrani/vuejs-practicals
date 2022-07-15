<template>
  <div class="nav-bar" id="navbar">
    <div>
      <nuxt-link to="/" class="btn-view nav-link" v-if="!isAuthenticated">Home</nuxt-link>
    </div>
    <div
      class="nav-heading"
      v-if="!['login', 'register'].includes($route.name)"
    >
      <span>{{ heading }}</span>
    </div>
    <div>
      <nuxt-link
        to="/login"
        class="btn-view nav-link"
        v-if="!isAuthenticated"
        >Login</nuxt-link
      >
    </div>
    <div>
      <nuxt-link
        to="/register"
        class="btn-view nav-link"
        v-if="!isAuthenticated"
        >Register</nuxt-link
      >
    </div>
    <div>
      <a
        href="#"
        class="btn-view nav-link"
        v-if="isAuthenticated"
        @click.prevent="onLogout()"
        >Logout</a
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "NavBar",
  data() {
    return {
      heading: "Car Showroom",
    };
  },

  computed: {
    ...mapGetters({ isAuthenticated: "isUserAuthenticated" }),
  },

methods: {
    ...mapActions({ logout: "logOut" }),

    onLogout() {
      this.logout();
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
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: center
}

.btn-view {
  float: right;
  color: rgb(27, 75, 92);
  font-size: 18px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

.btn-view:hover {
  color: rgb(251, 251, 251);
}

#navbar a.nuxt-link-exact-active {
  color: #ffffff;
}
</style>