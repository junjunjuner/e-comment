<template>
<div>
  <h3>Hover us.</h3>
  <main>
    <Firstchild :isShowing="isShowing">
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/cartoonvideo2.jpg" />
    </Firstchild>
    <Firstchild :isShowing="isShowing" >
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/cartoonvideo13.jpg" />
    </Firstchild>
    <Firstchild :isShowing="isShowing">
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/cartoonvideo14.jpeg" />
    </Firstchild>
    <Firstchild :isShowing="isShowing">
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/cartoonvideo5.jpg" />
    </Firstchild>
  </main>
</div>
</template>

<script>
import Firstchild from './Firstchild'
export default {
  name: 'FirstPage',
  components: {Firstchild},
  data () {
    return {
      isShowing: false
    }
  }
}
</script>

<style>
  body {
    font-family: 'Bitter', serif;
    background: #333;
    color: white;
  }

  #app {
    text-align: center;
    margin: 60px;
    margin: 0 auto;
    display: table;
  }

  button {
    font-family: 'Bitter';
    background: #c62735;
    color: white;
    border: 0;
    padding: 5px 15px;
    margin: 0 10px;
    border-radius: 4px;
    outline: 0;
    cursor: pointer;
  }

  .img-contain {
    width: 250px;
    height: 160px;
    overflow: hidden;
  }

  img {
    width: 100%;
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    cursor: pointer;
    -webkit-transform: scaleY(1) translateZ(0);
    transform: scaleY(1) translateZ(0);
    margin: 5px;
  }

  main {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .img-contain:hover .overlay {
    opacity: 1;
    background: rgba(0, 0, 0, 0.6);
    transition: 0.3s opacity ease-out;
  }

  .img-contain .overlay {
    position: absolute;
    z-index: 1000;
    display: block;
    width: 245px;
    height: 155px;
    margin: 5px;
    opacity: 0;
    overflow: hidden;
    transition: 0.3s opacity ease-in;
  }

  .overlay-text {
    margin-top: 40px;
  }

  h4 {
    margin: 0 0 15px;
  }

  .flip-enter-active {
    transition: all 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  }

  .flip-leave-active {
    transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .flip-enter, .flip-leave-to {
    -webkit-transform: scaleY(0) translateZ(0);
    transform: scaleY(0) translateZ(0);
    opacity: 0;
  }

</style>
