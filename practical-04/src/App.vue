<template>
<div>
  <NavBar heading="Car Showroom" />
  <div class="row">
    <div class="column">
        <div v-for="carItem in carData" :key="carItem.id" class="dataContainer">
          <GalleryCard 
            :carImage="carItem.image"
            :carName="carItem.name"
            :carDetails="carItem.details"
            :carPrice="carItem.price"
            :id="carItem.id"  
            :editCarDetails="editCarDetails"
            />
          <div class="edit-form">
          <EditModalView v-show="isModalVisible"
            @close="closeModal" 
            @checkEditCarModalFlag="getshowModal"
            :initialValues="initialValues"
          />      
          </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import GalleryCard from './components/GalleryCard.vue';
import axios from "axios";
import EditModalView from "./components/EditModalView.vue";

export default {
  name: 'App',
  components: {
    GalleryCard,
    EditModalView
  },
  data() {
    return {
      carData: [],
      isModalVisible: false,
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
        .catch((err) => {
          console.log(err);
          alert("Something went wrong please try again");
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
        .catch((err) => {
          console.log(err);
          alert("Something went wrong please try again");
        });
    },

     deleteData(id) {
      axios
        .delete(`https://testapi.io/api/dartya/resource/cardata/${id}`)
        .then((response) => {
          if (response.status === 204) {
            this.fetchData();
          }
        })
        .catch((err) => {
          console.log(err);
          alert("can't delete at this moment");
        });
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {     
      this.isModalVisible = false;
    },
   
    editCarDetails(id) {  
      // console.log(id);
      const carItem = this.carData.find((carItem) => carItem.id === id);
      this.initialValues = carItem;
      this.isModalVisible = true;
    },
     getshowModal(values) {
      this.isModalVisible=values;
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.column {
  display: flex;
  flex-direction: row;
  float: left;
  justify-content: center;
  flex-wrap: wrap;
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
}

</style>
