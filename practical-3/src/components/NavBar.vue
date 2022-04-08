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
import jsonData from "./jsonData.json";
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
      carData: jsonData,
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
      if (carItem.id !== " ") {
        this.carData = this.carData.map((c) => {
          if (c.id === carItem.id) {
            c.carName = carItem.carName;
            c.carPrice = carItem.carPrice;
            c.carDetails = carItem.carDetails;
            c.carImage = carItem.carImage;
          }
          return c;
          });
        alert("Created data :\n" + JSON.stringify(carItem, 2, null));
        this.resetInitialValues();     
      } else {
      carItem.id = this.uuid();
      this.carData.push(carItem);
      alert("Edited data" + JSON.stringify(carItem, 2, null));
      }
    },
    getAddshowModal(values) {
      this.isModalVisible=values;
    },
    uuid() {
      return new Date().getUTCMilliseconds();
    },
  
    resetInitialValues() {
      this.initialValues = {
        id: "",
        carName: "",
        carDetails: "",
        carImage: "",
        carPrice: undefined,
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