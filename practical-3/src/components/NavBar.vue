<template>
  <div class="heading">
    {{ heading }}
  </div>
 
</template>

<script>
export default {
  name: "NavBar",
  props: {
    heading: String,
  },
};
</script>

<style scoped>
.heading {
  font-size: 35px;
  width: 100%;
  height: 48px;
  color: white;
  background-color: rgb(72, 160, 215);
}

</style>