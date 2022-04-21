<template>
<div class="containerCard">
     <router-link to="/">
     <i class="fa fa-arrow-circle-left btn-back"></i>
    </router-link>
    <div class="containerDetails">
    <div class="carName">{{ carInfo.name }}</div>
    <img :src="carInfo.image" alt="car-image" />
    <div class="carDetails">{{ carInfo.details }}</div>
    <div><b>Price:</b>{{ carInfo.price }}</div>
    </div>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: 'CarDetails',
  created() {
    this.getCarDetails(this.carId);
  },

  data() {
    return {
      carInfo: {}
    };
  },

  methods: {
    getCarDetails() {
      axios
        .get(
          `https://testapi.io/api/dartya/resource/cardata/${this.$route.params.id}}`
        )
        .then((response) => {
          console.log("car display : ",response.data)
          this.carInfo = response.data;
        })
        .catch((err) => {
          console.log(err);
          alert("something went wrong please try after some time");
        });
    },
  },     
};
</script>

<style>
.containerCard {
  background-color: rgb(187, 234, 235);
  border-radius: 15px;
  margin: 25px;
  box-shadow: rgba(112, 112, 220, 0.1) 0px 8px 24px, rgba(223, 28, 28, 0.1) 0px 16px 56px, #f265651a 0px 24px 80px;
}

.containerDetails {
  display: flex;
  height: fit-content;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.carName {
  font-style: oblique;
  font-size: 20px;
  text-shadow: 5px 5px 5px rgb(103, 126, 128);
}

img {
  height: 200px;
  width: 280px;
}

.carDetails {
  font-size: medium;
}

.btn-back {
  float: left;
  margin-left: 2px;
}
</style>