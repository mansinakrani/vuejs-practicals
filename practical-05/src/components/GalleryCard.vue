<template>
  <div>
    <div class="edit-delete-btn">
          <p type="button" class="btn-edit" @click="editCarDetails(carId)"><i class="fa fa-pencil"></i></p>
          <p type="button" class="btn-delete" @click="dataDelete">x</p>  
        </div>
    <div class="carName">{{ carName }}</div>
    <div><img :src="carImage" alt="car-image" /></div>
    <br />
    <button class="btn btn-info text-black" @click="carDataDisplay">
      <span>Info</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'GalleryCard',
  props: {
    carId: Number,
    carName: String,
    carImage: String,
    carDetails: String,
    carPrice: String,
    editCarDetails: Function,
  },
  data() {
    return {};
  },

  methods: {
    dataDelete() {
      this.$emit("carDelete");
    },
    
    carDataDisplay() {
       this.$emit("carDetailDisplay");
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
}
</style>