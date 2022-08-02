<template>
  <div class="home-view">
    <div class="row">
      <div>
        <button
          class="add-btn"
          size="sm"
          pill
          variant="outline-info"
          data-target="#formModal"
          @click="handleModel(true)"
        >
          <i class="fa-solid fa-file-circle-plus"></i>
          <span class="separator" />
          <span class="text">Add car</span>
        </button>
      </div>
      <div class="column">
        <TransitionGroup name="list" tag="">
          <div
            v-for="carItem in carData"
            :key="carItem.id"
            class="dataContainer"
          >
            <GalleryCard
              :carImage="carItem.image"
              :carName="carItem.name"
              :carDetails="carItem.details"
              :carPrice="carItem.price"
              :carId="carItem.id"
              :editCarDetails="editCarDetails"
              @carDetailDisplay="detailDisplay(carItem.id)"
              @carCheckOutCart="cartDisplay(carItem.id)"
              @carDelete="deleteCarData(carItem.id)"
            />
          </div>
        </TransitionGroup>
      </div>
    </div>

    <ModalView 
      :addCar="addCar"
      :showModel="showModel"
      :handleModel="handleModel"
      :formHeading="formHeading"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GalleryCard from '~/components/GalleryCard.vue';
import ModalView from '~/components/ModalView.vue';

export default {
  middleware: ['check-auth', 'auth'],
  components: {
    GalleryCard,
    ModalView
  },

  head: {
      title: 'Car List'
  },

  async fetch({ store }) {
    await store.dispatch('fetchCarData');
  },

  data() {
    return {
      showModel: false,
      formHeading: "",
      carValues: {
        id: "",
        name: "",
        details: "",
        image: "",
        price: undefined,
      },
    };
  },

  computed: {
    ...mapGetters({ carData: "getcarData" }),
  },

  methods: {
    ...mapActions({
      putData: "editData",
      sendData: "addData",
      deleteData: "deleteCarDetails",
    }),

    detailDisplay(id) {
      this.$router.push(`/cardata/${id}`);
    },

    cartDisplay(id) {
      this.$router.push(`/cardata/checkout/${id}`);
    },
    deleteCarData(id) {
      this.deleteData(id);
    },

    editCarDetails(carId) {
      this.formHeading = "Edit Car Details";
      const carItem = this.carData.find((carItem) => carItem.id === carId);
      this.$store.commit('INITIAL_VALUES', carItem)
      this.showModel = true;
    },

    addCar(carItem) {
      if (carItem.id == null) {
        carItem.id = new Date().getTime().toString(36);
        this.sendData(carItem);
      } else {
        this.putData(carItem);
        this.resetInitialValues();
      }
    },

    handleModel(status) {
      this.showModel = status;
      if (status === false) {
        this.formHeading = "";
        const data = {
        id: null,
        name: '',
        details: '',
        image: '',
        price: '',
      }
      this.$store.commit('INITIAL_VALUES', data)
      }
    },

    resetInitialValues() {
      this.carValues = {
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
.home-view {
  margin-top: 10px;
}

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
  margin-right: 5px;
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

.dataContainer {
  background-color: rgb(187, 234, 235);
  border-radius: 15px;
  margin: 25px;
  width: 400px;
  box-shadow: rgba(112, 112, 220, 0.1) 0px 8px 24px,
    rgba(223, 28, 28, 0.1) 0px 16px 56px, #f265651a 0px 24px 80px;
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