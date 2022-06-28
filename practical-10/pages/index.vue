<template>
  <div>
    <section>
      <h1 class="fa-fade">Welcome to Car Gallery</h1>
      <div id="container">
        Get Access of
        <div id="flip">
          <div><div>View Car Information</div></div>
          <div><div>Add/Edit Car Information</div></div>
          <div><div>Remove Car Information</div></div>
        </div>
       After getting inside
      </div>
      <div class="wave wave1"></div>
      <div class="wave wave2"></div>
      <div class="wave wave3"></div>
      <div class="wave wave4"></div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'IndexPage',

  computed: {
    ...mapGetters({ isAuthenticated: 'isUserAuthenticated' }),
  },
}
</script>

<style scoped>
* {
  margin: 0px;
  font-family: 'Roboto';
  text-align: center;
}

#container {
  color: #999;
  text-transform: uppercase;
  font-size: 36px;
  font-weight: bold;
  padding-top: 200px;
  position: fixed;
  width: 100%;
  bottom: 45%;
  display: block;
}

#flip {
  height: 50px;
  overflow: hidden;
}

#flip > div > div {
  color: #fff;
  padding: 4px 12px;
  height: 45px;
  margin-bottom: 45px;
  display: inline-block;
}

#flip div:first-child {
  animation: show 6s linear infinite;
}

#flip div div {
  background: #42c58a;
}

#flip div:first-child div {
  background: #4ec7f3;
}

#flip div:last-child div {
  background: #dc143c;
}

@keyframes show {
  0% {
    margin-top: -270px;
  }
  5% {
    margin-top: -180px;
  }
  33% {
    margin-top: -180px;
  }
  38% {
    margin-top: -90px;
  }
  66% {
    margin-top: -90px;
  }
  71% {
    margin-top: 0px;
  }
  99.99% {
    margin-top: 0px;
  }
  100% {
    margin-top: -270px;
  }
}

section {
  position: relative;
  width: 100%;
  height: 90vh;
  background: lightblue;
  overflow: hidden;
}

section .wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url(https://i.postimg.cc/YqcvK11W/wave.png);
  background-size: 1000px 100px;
}

section .wave.wave1 {
  animation: animate 30s linear infinite;
  z-index: 1000;
  opacity: 1;
  animation-delay: 0s;
  bottom: 0;
}

section .wave.wave2 {
  animation: animate2 15s linear infinite;
  z-index: 999;
  opacity: 0.5;
  animation-delay: -5s;
  bottom: 10px;
}

section .wave.wave3 {
  animation: animate3 30s linear infinite;
  z-index: 998;
  opacity: 0.2;
  animation-delay: 2s;
  bottom: 15px;
}

section .wave.wave4 {
  animation: animate2 5s linear infinite;
  z-index: 997;
  opacity: 0.7;
  animation-delay: -5s;
  bottom: 10px;
}

@keyframes animate {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 1000px;
  }
}
@keyframes animate2 {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: -1000px;
  }
}

h1 {
  font-size: 35px;
  width: 100%;
  height: 48px;
  color: black;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.data-btn {
  padding: 13px;
  color: rgb(27, 75, 92);
  background: rgb(149, 216, 249);
  display: flex;
  justify-content: center;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  margin-right: 5px;
}

.data-btn:hover {
  background: rgb(27, 75, 92);
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