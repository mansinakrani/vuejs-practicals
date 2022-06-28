<template>
  <transition name="modal-fade">
    <div v-show="showModel" class="modal-backdrop" id="formModal">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot v-if="formHeading" name="header">{{ formHeading }}</slot>
          <slot v-else>Add Car Details</slot>
          <button
            type="button"
            class="btn-close"
            @click="handleModelClose"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

        <section class="modal-body">
          <slot name="body">
            <div class="form">
              <form
                @submit.prevent="handleSubmit"
              >
                <input type="hidden" name="id" class="form-control" v-model="id"/>

                <div class=" field form-group mb-2">
                  <label class="label" for="name">Car Name : </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    class="input form-control"
                    placeholder="Enter car name"
                    v-model="name"                   
                    required
                  />
                  <p v-if="errors.name" class="text-danger" name="email">
                  {{ errors.name }}
                </p>
                </div>

                <div class="field form-group mb-2">
                  <label class="label" for="details">Car Details : </label>
                  <input
                    id="details"
                    name="details"
                    type="text"
                    class="input form-control"
                    placeholder="Enter car details"
                    v-model="details"                  
                    required
                  />
                  <p v-if="errors.details" class="text-danger" name="email">
                  <span>{{ errors.details }}</span>
                </p>
                </div>

                <div class="field form-group mb-2">
                  <label class="label" for="image">Car Image : </label>
                  <input
                    id="image"
                    name="image"
                    type="text"
                    class="input form-control"
                    placeholder="Enter car image URL"
                    v-model="image"                
                    required
                  />
                   <p v-if="errors.image" class="text-danger" name="email">
                  {{ errors.image }}
                </p>
                </div>

                <div class="field form-group mb-2">
                  <label class="label" for="price">Car Price : </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    class="input form-control"
                    placeholder="Enter car price"
                    v-model="price"            
                    required
                  />
                  <p v-if="errors.price" class="text-danger" name="price">
                  {{ errors.price }}
                </p>
                </div>

                <div class="control add-car">
                  <button
                    class="submit submit-btn"
                    type="submit"
                    size="sm"
                    pill
                    variant="outline"
                  >
                    <i class="fa-solid fa-circle-check"></i>
                    <span class="separator" />
                    <span class="text">Submit</span>
                  </button>
                </div>
              </form>
            </div>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import ValidateModalViewForm from '~/services/ValidateModalViewForm';
export default {
  name: "ModalView",
  data() {
    return {
      show: true,
      errors: [],
    };
  },

  props: {
    addCar: Function,
    showModel: Boolean,
    handleModel: Function,
    handleFormHeading: Function,
    formHeading: String,
  },
  
  computed: {
    id: {
      get() {
        return this.$store.state.selectedCar.id
      },
      set(value) {
        this.$store.commit('updateId', value)
      },
    },

    name: {
      get() {
        return this.$store.state.selectedCar.name
      },
      set(value) {
        this.$store.commit('updateName', value)
      },
    },

    image: {
      get() {
        return this.$store.state.selectedCar.image
      },
      set(value) {
        this.$store.commit('updateImage', value)
      },
    },

    price: {
      get() {
        return this.$store.state.selectedCar.price
      },
      set(value) {
        this.$store.commit('updatePrice', value)
      },
    },

    details: {
      get() {
        return this.$store.state.selectedCar.details
      },
      set(value) {
        this.$store.commit('updateDetails', value)
      },
    }
  },
    
  methods: {
    resetForm() {
      this.id= ''
      this.name= ''
      this.details= ''
      this.image= ''
      this.price= undefined
    },

    handleSubmit() {
       this.errors = new ValidateModalViewForm(
        this.name,
        this.image,
        this.price,
        this.details
       ).validate()
      
      if (
        !('name' in this.errors) &&
        !('image' in this.errors) &&
        !('price' in this.errors) &&
        !('details' in this.errors)
      ) {
        this.addCar({
          id: this.id,
          name: this.name,
          image: this.image,
          price: this.price,
          details: this.details,
        });
        this.handleModel(false);
        this.resetForm()
      }
    },

    handleModelClose() {
      this.handleModel(false);
      this.errors = [];
      this.resetForm()      
    }
  }
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(102, 151, 158, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  width: 50%;
  height: 88%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  position: fixed;
  top: initial;
  left: initial;
  z-index: 1055;
  outline: 0;
}

.modal-header,
.modal-footer {
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #0d6f73;
  justify-content: center;
  font-weight: bold;
}

.modal-body {
  position: relative;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #0d6f73;
  background: transparent;
  margin-right: 10px;
  justify-content: center;
}

.btn-green {
  color: white;
  background: #0d6f73;
  border: 1px solid #0d6f73;
  border-radius: 2px;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  transform: translateY(-200px);
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  transform: translateY(0px);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: transform 0.3s;
}

.uploading-image {
  display: flex;
}

form {
  background: #fff;
  text-align: left;
  padding: 10px;
  border-radius: 10px;
}

label {
  font-size: small;
  color: #aaa;
  display: inline-block;
  text-transform: uppercase;
}

input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: bordre-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}

textarea {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: bordre-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}

.add-car {
  display: flex;
  justify-content: center;
  align-items: center;
}

.submit {
  text-align: center;
}

.submit-btn {
  padding: 10px;
  color: white;
  background: #52a2a5;
  justify-content: center;
  font-size: 18px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  margin-top: 8px;
}

.submit-btn:hover {
  background: #0d6f73;
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
