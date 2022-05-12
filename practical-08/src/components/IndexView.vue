<template>
<div>
  <div class="row ">
    <div class="column demo">
      <TransitionGroup name="list" tag="">
      <div v-for="carItem in carData" :key="carItem.id" class="dataContainer">
        <GalleryCard 
          :carImage="carItem.image"
          :carName="carItem.name"
          :carId="carItem.id"  
          />
      </div>
      </TransitionGroup>
    </div>
  </div>
  
</div>
</template>

<script>
import GalleryCard from './GalleryCard.vue';

import { mapGetters, mapActions } from "vuex";

export default {
  name: 'IndexView',
  components: {
    GalleryCard,
  },
  data() {
    return {

    };
  },
 computed: { 
    ...mapGetters({carData:'getcarData'})
  },

   created() {
    this.fetchCarData();
  },

  methods: { 
    ...mapActions({
      fetchCarData: "fetchData",
    }),
  },
}
</script>

<style>
.demo{
      margin-top: 60px;
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
 overflow: hidden;
 position: relative;
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