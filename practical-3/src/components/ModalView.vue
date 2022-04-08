<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            Car Details
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

        <section
          class="modal-body"
        >
          <slot name="body">
             <div class="form">
              
              <Form
              @submit="handleSubmit"
              :validation-schema="schema"
              :initial-values="initialValues"
              >
                <div>
                  <label for="carName">Car Name : </label>                 
                  <Field id="carName" name="carName" type="text" class="form-control" placeholder="Enter car name" />
                  <ErrorMessage name="carName" class="text-danger" />
                </div>
                            
                <div>
                  <label for="carDetails">Car Details : </label>                 
                  <Field
                  id="carDetails"
                  name="carDetails"
                  type="text"
                  class="form-control"
                  placeholder="Enter car details"
                  />
                  <ErrorMessage name="carDetails" class="text-danger" />                 
                </div>
      
                <div>
                  <label for="carImage">Car Image : </label>                
                  <Field
                  id="carImage"
                  name="carImage"
                  type="text"
                  class="form-control"
                  placeholder="Enter car image URL"
                  />
                  <ErrorMessage name="carImage" class="text-danger" />                
                </div>
               
                <div>
                  <label for="carPrice">Car Price : </label>                  
                  <Field
                  id="carPrice"
                  name="carPrice"
                  type="number"
                  class="form-control"
                  placeholder="Enter car price"
                  />
                  <ErrorMessage name="carPrice" class="text-danger" />
                </div>
              
                <br />

                <div class="add-car">
                  <button class="submit add-button" type="submit">ADD CAR</button>
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
export default {
  name: 'ModalView',
  components: {
  Form,
  Field,
  ErrorMessage,
  },
  data() {
    const schema = yup.object({
    id: yup.string(),
    carName: yup.string().required("Car Name is Required!*"),
    carDetails: yup
      .string()
      .required("Car Details is Required!*")
      .min(30)
      .max(120),
    carImage: yup
      .string()
      .required("Car Image is Required!*")
      .url("Car Image must be in URL Format!**"),
    carPrice: yup
      .number()
      .required("Car Price is Required!*"),
    });
    return {
      schema,
    }
  },
  props: {
    addCar: Function,
    initialValues: Object,
  },
  methods: {
    handleSubmit(values, formActions) {
    this.addCar(values);
    formActions.resetForm();
    this.$emit('checkAddCarModalFlag',false);
    },
    close() {
      this.$emit('close');
    },
  },
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
  background: #FFFFFF;
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

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}

.uploading-image{
  display:flex;
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
  display:inline-block;
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

.add-button {
  background: #0d6f73;
  border: 0;
  padding: 10px 20px;
  color: white;
  border-radius: 20px;
  cursor: pointer;
}

.add-button:hover {
  background: #52a2a5;
}

.add-car {
  display: flex;
  justify-content: center;
  align-items: center;
}
.submit {
  text-align: center;
}

</style>