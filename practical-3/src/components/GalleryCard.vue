<template>
  <div>
      <div class="edit-delete-btn">
          <p type="button" class="btn-edit" @click="editCarDetails(id), handleFormHeading('Edit Car Details')" ><i class="fa fa-pencil"></i></p>
          <p type="button" class="btn-delete" @click="dataDelete(carName)">x</p>  
        </div>
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
    id: String,
    carName: String,
    carImage: String,
    carDetails: String,
    carPrice: Number,
    editCarDetails: Function,
    handleFormHeading: Function,
  },
  computed: {
    isPrice() {
      return (this.carPrice === undefined)
    },
  },
  methods: {
    dataDelete(carName) {
      alert(`Deleted ${carName} !!`);
    },
    clickInfo() {
      alert(`car price is ₹ ${this.carPrice}`);
    },
  },
};
</script>

<style>
.edit-delete-btn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: -40px;
}

.btn-edit {
  float: right;
  border: none;
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #0b577a;
  background: transparent;
}

.btn-delete {
  float: right;
  border: none;
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #ef3925;
  background: transparent;
}

.btn-delete:hover {
  color: #dd7468;
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

.btn:active,
.btn:hover {
  outline: 0;
  background-color: #f9fafb!important;
  border-color: #87cbd9!important;
} 

.btn-info.disabled, .btn-info:disabled {
  color: rgb(81, 77, 77)!important;
  background-color: #f9fafb!important;
  border-color: rgb(81, 77, 77)!important;
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
