<template>
<div>
  <div class="edit-delete-btn">
    <p
      type="button"
      class="btn-edit"
      @click="editCarDetails(carId)"
      v-if="isAuthenticated"
    >
      <i class="fa fa-pencil"></i>
    </p>
    <p
      type="button"
      class="btn-delete"
      @click="dataDelete"
      v-if="isAuthenticated"
    >
      x
    </p>
  </div>
  <div class="carName">{{ carName }}</div>
  <div class="col-auto mb-2 card-animation">
    <img :src="carImage" alt="car-image" />
  </div>
  <div class="mb-2">
    <button
      class="info-btn"
      size="sm"
      pill
      variant="outline"
      @click="carDataDisplay"
      v-if="isAuthenticated"
    >
      <i class="fa-solid fa-circle-info"></i>
      <span class="separator" />
      <span class="text">View details</span>
    </button>
  </div>
</div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: "GalleryCard",
  emits: ["carDetailDisplay", "carDelete"],
  props: {
    carId: {
      type: Number,
      required: true,
    },
    carName: {
      type: String,
      required: true,
    },
    carImage: {
      type: String,
      required: true,
    },
    carDetails: {
      type: String,
      required: true,
    },
    carPrice: {
      type: String,
      required: true,
    },
    editCarDetails: {
      type: Function
    },
  },

  setup(props,{ emit }) {    
    const store = useStore();
    const isAuthenticated = computed(() => {
        return store.getters.isUserAuthenticated;
    });

    function dataDelete() {      
      emit("carDelete");
    }

    function carDataDisplay() {      
      emit("carDetailDisplay");
    }

    return {
      isAuthenticated,
      dataDelete,
      carDataDisplay
    }
  }
};
</script>

<style>
.card-animation:hover {
  transform: scale(0.9);
  transition: 0.3s all ease-in-out;
}

.edit-delete-btn {
  display: flex;
  justify-content: flex-end;
}

.btn-edit {
  float: right;
  border: none;
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #0b577a;
  background: transparent;
}

.btn-delete {
  float: right;
  border: none;
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #ef3925;
  background: transparent;
}

.btn-delete:hover {
  color: #dd7468;
}

.carName {  
  font-style: oblique;
  font-size: 20px;
  text-shadow: 5px 5px 5px rgb(103, 126, 128);  
}

img {
  width: 280px;
  margin: auto;
  height: 220px;
}

.info-btn {
  padding: 13px;
  color: rgb(27, 75, 92);
  background: rgb(149, 216, 249);
  justify-content: center;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  margin-top: 8px;
}

.info-btn:hover {
  background: rgb(27, 75, 92);
  color: rgb(230, 230, 230);
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