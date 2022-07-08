<template>
  <div class="userlist-top">
    <div class="userlist">
      <h3 id="animated_div">USERLIST</h3>
    </div>

    <div>
      <div>
        <button
          class="add-btn"
          size="sm"
          pill
          variant="outline-info"          
          v-if="isAuthenticated"
          @click="addUser"
        >
          <i class="fa fa-user-plus" aria-hidden="true"></i>
          <span class="separator" />
          <span class="text">Add User</span>
        </button>
      </div>

      <table class="table table-striped"  v-cloak>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Age</th>
            <th scope="col">Birth Date</th>
            <th scope="col">Gender</th>            
            <th scope="col"><i class='fas fa-trash' style='color:#f50000'></i></th>
          </tr>
        </thead>
        <tbody>          
          <tr v-for="userList in result" :key="userList.id">
              <th scope="row">{{ userList.id }}</th>
              <td>{{ userList.name }}</td>
              <td>{{ userList.email }}</td>
              <td>{{ userList.role }}</td>
              <td>{{ userList.age }}</td>
              <td>{{ userList.dob }}</td>
              <td>{{ userList.gender }}</td>              
              <td><button type="submit" class="btn btn-danger" @click="deleteUserData(userList.id)">DELETE</button></td>
          </tr>
        </tbody>
      </table>

      <p>page {{ currentPage }} of {{ lastPage }}</p>    
      <button @click="prev" type="button" class="btn btn-info">&lt;&lt; PREV</button>    
      <button @click="next" type="button" class="btn btn-info">NEXT &gt;&gt;</button>   
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { usePagination } from "vue-composable";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    
    onMounted(() => {
        store.dispatch("fetchUserData");
    });

    const userLists = computed(() => {
        return store.getters.getUserList;
    })

    const addUser = () => {
        router.push("/AddUser");
    }

    const isAuthenticated = computed(() => {
        return store.getters.isUserAuthenticated;
    })

    function deleteUserData(id) {
        store.dispatch("deleteUserDetails", id);
    }

    const {
      currentPage,
      lastPage,
      next,
      prev,
      offset,
      pageSize,
    } = usePagination({
      currentPage: 0,
      pageSize: 10,
      total: computed(() => userLists.value.length),
    });

    const result = computed(() => {
      const array = userLists.value;
      if (!Array.isArray(array)) return [];
      return array.slice(offset.value, offset.value + pageSize.value);
    });
      
    return {
      userLists,
      isAuthenticated,
      addUser,
      deleteUserData,
      currentPage,
      lastPage,
      next,
      prev,
      result         
    };
  }
};
</script>

<style scoped>
[v-cloak] {
  display: none!important;
}

.userlist {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  background: #223f50;
}

#animated_div {
  width: 150px;
  height: 38px;       
  color: #ffffff;
  position: relative;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;    
  animation: animated_div 5s 1;
  -moz-animation: animated_div 5s 1;
  -webkit-animation: animated_div 5s 1;
  -o-animation: animated_div 5s 1;
  border-radius: 5px;
  -webkit-border-radius: 5px;
}

*, *:before, *:after {
  box-sizing: inherit;
}

@keyframes animated_div {
  0% {
    transform: rotate(0deg);
    left: -1000px;
  }
  25% {
    transform: rotate(20deg);
    left: -700px;
  }
  50% {
    transform: rotate(0deg);
    left: 600px;
  }
  55% {
    transform: rotate(0deg);
    left: 560px;
  }
  70% {
    transform: rotate(0deg);    
    left: 900px;     
  }
  100% {
    transform: rotate(-360deg);
    left: 0px;
  }
}

.userlist-top {
  margin-top: 48px;
}

.add-btn {
  float: right;
  padding: 13px;
  color: rgb(27, 75, 92);
  background: rgb(149, 216, 249);
  justify-content: center;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  margin: 5px;
}

.add-btn:hover {
  background: rgb(27, 75, 92);
  color: rgb(230, 230, 230);
}

.btn-info {
  margin: 3px;
}

button .text {
  max-width: 0;
  transition: max-width 0.5s;
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
  overflow: hidden;
}

button:hover .text {
  max-width: 7rem;
  transition-delay: 0.1s;
}

button .separator {
  display: inline-block;
  width: 0;
  transition: width 0.1s;
  transition-delay: 0.5s;
}

button:hover .separator {
  width: 0.3em;
  transition-delay: unset;
}
</style>