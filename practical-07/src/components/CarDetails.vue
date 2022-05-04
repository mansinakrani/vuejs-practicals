<template>
<div class="containerCard">
    <router-link to="/">
      <button class="back-btn" size="sm" pill variant="outline">
          <i class="fa fa-arrow-circle-left btn-back"></i>
          <span class="separator"/>
          <span class="text">Back</span>
      </button>
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
export default {
  name: 'CarDetails',
  created() {
    this.getCarDetails(this.$route.params.id);
  },

  data() {
    return {
      
    };
  },

  methods: {
     getCarDetails(id) {
      this.$store.dispatch('getCarInfo',id); 
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
  overflow: hidden;
  position: relative;
  margin-top: 55px;
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

.back-btn {
  float: left;
  margin: 6px;
  color: rgb(27, 75, 92);
  background: rgb(149, 216, 249);
  justify-content: center;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  margin-top: 8px;
}
.back-btn:hover {
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