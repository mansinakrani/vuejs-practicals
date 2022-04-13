<template>
  <div class="heading">
    {{ heading }}
     <button class="add-btn"  type="button" @click="showModal">Add car</button>
  </div>
     <ModalView
      :addCar="addCar"
      :initialValues="initialValues"      
      v-show="isModalVisible"
      @checkAddCarModalFlag="getAddshowModal"
      @close="closeModal"
    />
</template>

<script>
import ModalView from "./ModalView.vue";

export default {
  name: "NavBar",
  components: {
    ModalView,
  },
  props: {
    heading: String,
  },
  data() {
    return {
      isModalVisible: false,
      initialValues: {
        id: "",
        carName: "",
        carDetails: "",
        carImage: "",
        carPrice: undefined,
      },
      carData: [],
    };
  },

  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
   addCar(carItem) {
      carItem.id = new Date().getTime().toString(36);
      this.$parent.sendData(carItem);
    },
    getAddshowModal(values) {
      this.isModalVisible=values;
    },
  
    resetInitialValues() {
      this.initialValues = {
        id: "",
        name: "",
        details: "",
        image: "",
        price: undefined,
      };
    },
  },
};
</script>

<style scoped>
.heading {
  font-size: 35px;
  width: 100%;
  height: 48px;
  color: white;
  background-color: rgb(72, 160, 215);
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
}
.add-btn:hover {
  background: rgb(251, 251, 251);
}
</style>