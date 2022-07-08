<template>
  <nav class="fixed-top">
    <div class="nav-bar" id="nav">
      <div>
        <router-link to="/" class="btn-view nav-link">Home</router-link>
      </div>

      <div
        class="nav-heading"
        v-if="!['LoginForm', 'RegisterForm'].includes($route.name)"
      >
        <span>{{ heading }}</span>               
      </div>

      <div>
        <router-link
          to="/LoginForm"
          class="btn-view nav-link"
          v-if="!isAuthenticated"
          >Login
        </router-link>
      </div>

      <div>
        <router-link
          to="/RegisterForm"
          class="btn-view nav-link"
          v-if="!isAuthenticated"
          >Register
        </router-link>
      </div>

      <div>
        <router-link
          to="/UserList"
          class="btn-view nav-link"
          v-if="isAuthenticated"
          >UserList
        </router-link>
      </div>

      <div>
        <a
          href="#"
          class="btn-view nav-link"
          v-if="isAuthenticated"
          @click.prevent="onLogout()"
          >Logout
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "NavBar",

  setup() {
    let heading = ref("Car Showroom");
    const store = useStore();

    const isAuthenticated = computed(() => {
      return store.getters.isUserAuthenticated;
    });

    function onLogout() {
      store.dispatch("logOut");
    }

    return {
      heading,
      isAuthenticated,
      onLogout
    };
  },
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
  height: 47px;
  color: white;
  text-align: center;
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

#nav a.router-link-exact-active {
  color: #ffffff;
}
</style>