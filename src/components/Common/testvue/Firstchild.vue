<template>
  <div class="img-contain">
    <div class="overlay">
      <p class="overlay-text">I don't like this one</p>
      <button @click="toggleShow">Replace!</button>
    </div>
    <transition name="flip">
      <slot v-if="!isShowing"></slot>
      <img v-else src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/cartoonvideo14.jpeg" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Firstchild',
  props: ['isShowing'],
  methods: {
    toggleShow () {
      this.isShowing = !this.isShowing
    } }
}
</script>

<style scoped>

</style>
