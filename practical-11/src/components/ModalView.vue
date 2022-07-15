<template>
  <transition name="modal-fade">
    <div v-show="showModel" class="modal-backdrop">
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
              <Form
                ref="form"
                @submit="handleSubmit"
                :validation-schema="schema"                      
              >
                <Field type="hidden" name="id" class="form-control" v-model="id" />
                <div class="form-group mb-2">
                  <label for="name">Car Name : </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    class="form-control"
                    placeholder="Enter car name"
                    v-model="name"
                  />
                  <ErrorMessage name="name" class="text-danger" />
                </div>

                <div class="form-group mb-2">
                  <label for="details">Car Details : </label>
                  <Field
                    id="details"
                    name="details"
                    type="text"
                    class="form-control"
                    placeholder="Enter car details"
                    v-model="details"
                  />
                  <ErrorMessage name="details" class="text-danger" />
                </div>

                <div class="form-group mb-2">
                  <label for="image">Car Image : </label>
                  <Field
                    id="image"
                    name="image"
                    type="text"
                    class="form-control"
                    placeholder="Enter car image URL"
                    v-model="image"
                  />
                  <ErrorMessage name="image" class="text-danger" />
                </div>

                <div class="form-group mb-2">
                  <label for="price">Car Price : </label>
                  <Field
                    id="price"
                    name="price"
                    type="number"
                    class="form-control"
                    placeholder="Enter car price"
                    v-model="price"
                  />
                  <ErrorMessage name="price" class="text-danger" />
                </div>

                <div class="add-car">
                  <button
                    class="submit submit-btn"
                    type="submit"
                    size="sm"
                    pill
                    variant="outline"
                    @click="carDataDisplay"
                  >
                    <i class="fa-solid fa-circle-check"></i>
                    <span class="separator" />
                    <span class="text">Submit</span>
                  </button>
                </div>
              </Form>
            </div>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { computed } from 'vue'
import { useStore } from 'vuex';

export default {
  name: "ModalView",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
 
  props: {
    addCar: Function,
    showModel: Boolean,
    handleModel: Function,
    formHeading: String,    
  },

  setup(props) {
    const store = useStore()
  
    const schema = yup.object({
      id: yup.string(),
      name: yup.string().required("Car Name is Required!*"),
      details: yup
        .string()
        .required("Car Details is Required!*")
        .min(30)
        .max(120),
      image: yup
        .string()
        .required("Car Image is Required!*")
        .url("Car Image must be in URL Format!**"),
      price: yup.number().required("Car Price is Required!*"),
    });

    function handleSubmit() {
      let values = {
        id: id.value,
        name: name.value,
        image: image.value,
        price: price.value,
        details: details.value,
      }      
     props.addCar(values);
     resetForm();
    }

    const id = computed({
      get() {
        return store.state.selectedCar.id
      },
      set(value) {
        store.commit('updateId', value)
      },
    })

    const name = computed({
      get() {
        return store.state.selectedCar.name
      },
      set(value) {
        store.commit('updateName', value)
      },
    })

    const price = computed({
      get() {
        return store.state.selectedCar.price
      },
      set(value) {
        store.commit('updatePrice', value)
      },
    })

    const details = computed({
      get() {
        return store.state.selectedCar.details
      },
      set(value) {
        store.commit('updateDetails', value)
      },
    })

    const image = computed({
      get() {
        return store.state.selectedCar.image
      },
      set(value) {
        store.commit('updateImage', value)
      },
    })

    function resetForm() {
      id.value= ''
      name.value= ''
      details.value= ''
      image.value= ''
      price.value= undefined
    }

    function handleModelClose() {
      props.handleModel(false);
      resetForm()      
    }

    return {
      schema,
      handleSubmit,
      resetForm,
      id,
      name,
      image,
      price,
      details,
      handleModelClose
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