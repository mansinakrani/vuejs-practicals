<template>
  <div>
      <div class="carName">{{ carName }}</div>
      <div v-if="carImage"><img :src="carImage" alt="car-image" /></div>
      <div class="carDetails">{{ carDetails }}</div>
      <button :disabled="isPrice" class="btn btn-info text-black" @click="clickInfo">
        <span v-if="carPrice">Info</span>
        <span v-else>Available soon...</span>
      </button>
  </div>
</template>

<script>
export default {
  name: 'GalleryCard',
  props: {
      carName: String,
      carImage: URL,
      carDetails: String,
      carPrice: Number
  },
  data() {
    return {};
  },
  methods: {
    clickInfo() {
      alert(`car price is ₹ ${this.carPrice}`);
    },
  },
  computed: {
    isPrice() {
      return (this.carPrice === undefined)
    },
  },
};
</script>

<style>
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

.btn:active,
.btn:hover {
  outline: 0;
   background-color: #f9fafb;
    border-color: #87cbd9;
} 

.btn-info.disabled, .btn-info:disabled {
    color: #000;
    background-color: #f9fafb;
    border-color: #055160;
}
 
@media (min-width: 768px) {
  .btn {
    font-size: 14px;
    min-width: 106px;
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
