<template>
<div>
  <div class="row">
     <div>
        <button class="add-btn" size="sm" pill variant="outline-info" @click="handleModel(true)">
          <i class="fa-solid fa-file-circle-plus"></i>
          <span class="separator"/>
          <span class="text">Add car</span>
        </button>
     </div>
    <div class="column">
      <TransitionGroup name="list" tag="">
      <div v-for="carItem in carData" :key="carItem.name" class="dataContainer">
        <GalleryCard 
          :carImage="carItem.image"
          :carName="carItem.name"
          :carDetails="carItem.details"
          :carPrice="carItem.price"
          :carId="carItem.id"  
          :editCarDetails="editCarDetails"
          @carDetailDisplay="detailDisplay(carItem.id)"
          @carDelete="deleteData(carItem.id)"
          />
      </div>
      </TransitionGroup>
    </div>
  </div>
  
  <ModalView
      :addCar="addCar"
      :showModel="showModel"
      :handleModel="handleModel"
      :initialValues="initialValues"
      :formHeading="formHeading"
    />
</div>
</template>

<script>
import GalleryCard from './GalleryCard.vue';
import axios from "axios";
import ModalView from "./ModalView.vue";

export default {
  name: 'HomeView',
  components: {
    GalleryCard,
    ModalView
  },
  data() {
    return {
      carData: [],
      showModel: false,
      formHeading: "",
      initialValues: {
        id: "",
        name: "",
        details: "",
        image: "",
        price: undefined,
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: { 
    fetchData() {
      axios
        .get("https://testapi.io/api/dartya/resource/cardata")
        .then((res) => {
          this.carData = res.data.data;
        })
        .catch(() => {
          alert("Something went wrong please try again");
        });
    },
  
    detailDisplay(id) {
      this.$router.push(`/car/${id}`);
    },
    deleteData(id) {
      axios
        .delete(`https://testapi.io/api/dartya/resource/cardata/${id}`)
        .then((response) => {
          if (response.status === 204) {
            this.fetchData();
          }
        })
        .catch(() => {
          alert("can't delete at this moment");
        });
    },

    sendData(data) {
      axios
        .post("https://testapi.io/api/dartya/resource/cardata", data)
        .then((response) => {
          if (response.status === 201) {
            this.fetchData();
          }
        })
        .catch(() => {
          alert("Something went wrong please try again");
        });
    },
    addCar(carItem) {
      if (carItem.id !== "") {
        this.carData = this.carData.map((car) => {
          if (car.carId === carItem.id) {
            car.carName = carItem.name;
            car.carPrice = carItem.price;
            car.carDetails = carItem.details;
            car.carImage = carItem.image;
          }
          return car;
        });
        alert("Edited data  :\n" + JSON.stringify(carItem, 2, null));
        axios.put(`https://testapi.io/api/dartya/resource/cardata/${carItem.id}`,carItem)
        .then((response) => {
          if (response.status === 200) {
            this.fetchData();
          }
        })
        .catch(() => {
          alert(`cannot update at this moment`);
        });
        this.resetInitialValues();     
      } 
      else {
        carItem.id = new Date().getTime().toString(36);
        this.sendData(carItem);
        alert("Created data : \n" + JSON.stringify(carItem, 2, null));
      }
    },

    editCarDetails(carId) {
      this.formHeading = "Edit Car Details";
      const carItem = this.carData.find((carItem) => carItem.id === carId);
      this.initialValues = carItem;
      this.showModel = true;
    },
    
    handleModel(status) {
      this.showModel = status;
      if (status === false) {
        this.formHeading = "";
        this.resetInitialValues();
      }
    },

    resetInitialValues() {
      this.initialValues = {
        carId: "",
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
  flex-wrap: wrap;
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
  margin-top: 55px;
}
.add-btn:hover {
  background: rgb(27, 75, 92);
  color: rgb(230, 230, 230);
}

@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
  }
}

.dataContainer{
 background-color: rgb(187, 234, 235);
 border-radius: 15px;
 margin: 25px;
 width: 400px;
 box-shadow: rgba(112, 112, 220, 0.1) 0px 8px 24px, rgba(223, 28, 28, 0.1) 0px 16px 56px, #f265651a 0px 24px 80px;
 overflow: hidden;
 position: relative;
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

.list-move, 
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>