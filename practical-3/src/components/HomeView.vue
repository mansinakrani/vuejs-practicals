<template>
   <NavBar heading="Car Showroom" />
    <button class="add-btn"  type="button" @click="handleModel(true), handleFormHeading('Add Car Details')">Add car</button>
    <div class="d-flex justify-content-center">
      <div class="col-md-10">
        <div class="column">
            <div v-for="carItem in carData" :key="carItem.id" class="dataContainer">
              <GalleryCard 
                :carImage="carItem.carImage"
                :carName="carItem.carName"
                :carDetails="carItem.carDetails"
                :carPrice="carItem.carPrice"
                :id="carItem.id" 
                :editCarDetails="editCarDetails"
                :handleFormHeading="handleFormHeading"     
                />
            </div>
        </div>
      </div>
    </div>
    <ModalView
      :addCar="addCar"
      :showModel="showModel"
      :handleModel="handleModel"
      :initialValues="initialValues"
      :formHeading="formHeading"
      :handleFormHeading="handleFormHeading"
    />
</template>

<script>
import GalleryCard from './GalleryCard.vue';
import jsonData from "./jsonData.json";
import ModalView from "./ModalView.vue";

export default {
  name: 'HomeView',

  components: {
    GalleryCard,
    ModalView,
  },

  data() {
    return {
      showModel: false,
      formHeading: "",
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
    addCar(carItem) {
      if (carItem.id !== "") {
        this.carData = this.carData.map((car) => {
          if (car.id === carItem.id) {
            car.carName = carItem.carName;
            car.carPrice = carItem.carPrice;
            car.carDetails = carItem.carDetails;
            car.carImage = carItem.carImage;
          }
          return car;
        });
        alert("Edited data  :\n" + JSON.stringify(carItem, 2, null));
        this.resetInitialValues();     
      } 
      else {
        carItem.id = this.uuid();
        this.carData.push(carItem);
        alert("Created data : \n" + JSON.stringify(carItem, 2, null));
      }
    },
   
   uuid() {
      return new Date().getUTCMilliseconds();
    },

    editCarDetails(id) {
      const carItem = this.carData.find((carItem) => carItem.id === id);
      this.initialValues = carItem;
      this.showModel = true;
    },

    handleModel(status) {
      this.showModel = status;
      this.resetInitialValues();
    },

    handleFormHeading(heading) {
      this.formHeading = heading;
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
}
</script>

<style>
.column {
  display: flex;
  flex-direction: row;
  float: left;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  align-items: center;
}

@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center
  }
}

.dataContainer{
background-color: rgb(187, 234, 235);
border-radius: 15px;
margin: 25px;
width: 400px;
box-shadow: rgba(112, 112, 220, 0.1) 0px 8px 24px, rgba(223, 28, 28, 0.1) 0px 16px 56px, #f265651a 0px 24px 80px;
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
  margin-top: -48px;
}
.add-btn:hover {
  background: rgb(251, 251, 251);
}
</style>
