<template>
<div class="row">
  <div class="column">
      <div v-for="carItem in carData" :key="carItem.id" class="dataContainer">
        <div class="carName">{{ carItem.carName }}</div>
        <div v-if="carItem.carImage"><img :src="carItem.carImage" alt=" " /></div>
        <div class="carDetails">{{ carItem.carDetails }}</div>
        <button type="button" class="btn btn-info" @click="clickInfo(carItem.carPrice)" v-if="carItem.carPrice">Info
        </button>
        <button type="button" class="btn btn-secondary" v-else :disabled="!isPrice" >Available soon
        </button>
      </div>
  </div>
</div>
</template>

<script>
import jsonData from "./jsonData.json";

export default {
  name: 'GalleryCard',
  props: {
      carName: String,
      carImage: URL,
      carDetails: String,
      carPrice: String
  },
  data() {
    return {
      carData: jsonData,
    };
  },
  methods: {
    clickInfo(carPrice) {
      alert(carPrice);
    },
  },
  computed: {
    isPrice() {
      return (this.carPrice === undefined)
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.column {
  display: flex;
  flex-direction: row;
  float: left;
  justify-content: center
}


/* Responsive columns */
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

.carName {
  margin: 20px 0 0;
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
  height: 160px;
}

button {
  align-items: center;
  border: 0;
  border-radius: 8px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #1a1818;
  font-family: Phantomsans, sans-serif;
  font-size: 20px;
  justify-content: center;
  line-height: 1em;
  max-width: 100%;
  min-width: 140px;
  padding: 15px 20px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
  margin-block-end: 8px;
}

.button:active,
.button:hover {
  outline: 0;
}

@media (min-width: 768px) {
  .button {
    font-size: 24px;
    min-width: 196px;
  }
}

@media (max-width: 300px) {
  img {
    height: 100px;
    width: 150px;
  }
}

@media (max-width: 700px) {
  img {
    height: 150px;
    width: 250px;
  }

  .carName {
    margin: 20px 0 0;
    font-style: oblique;
    font-size: 20px;
  }

  .carDetails {
    font-size: small;
    height: 100px;
  }
}
</style>
