<template>
  <div class="row">
    <div class="column">
        <div v-for="carItem in carData" :key="carItem.id" class="dataContainer">
          <GalleryCard 
            :carImage="carItem.carImage"
            :carName="carItem.carName"
            :carDetails="carItem.carDetails"
            :carPrice="carItem.carPrice"
            :id="carItem.id"        
            />
        </div>
    </div>
  </div>
</template>

<script>
import GalleryCard from './GalleryCard.vue';
import jsonData from "./jsonData.json";

export default {
  name: 'HomeView',
  components: {
    GalleryCard,
  },
  data() {
    return {
      carData: jsonData,
    };
  },
}
</script>

<style>
.column {
  display: flex;
  flex-direction: row;
  float: left;
  justify-content: center
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

</style>
