<script lang="ts">
  import { CarouselScrollTop } from "./CarouselScrollTopStore";

  function throttle(cb: Function, time = 200) {
    let timer: NodeJS.Timer | null = null;
    return function (e) {
      if (!timer) {
        timer = setTimeout(() => {
          cb(e);
          timer = null;
        }, time);
      }
    };
  }
  const onCarouselScroll = throttle(function (event: WheelEvent) {
    const scrollTop = (event.target as HTMLElement).scrollTop;
    CarouselScrollTop.set(scrollTop);
  });
</script>

<div
  class="carousel-container"
  id="carouselContainer"
  on:scroll={onCarouselScroll}
>
  <slot />
</div>

<style>
  .carousel-container {
    width: 100%;
    height: 100vh;
    background: url("../../assets/bg2.jpg") center no-repeat;
    background-size: cover;
    background-attachment: fixed;
    z-index: -1;
    overflow-x: scroll;
  }
</style>
