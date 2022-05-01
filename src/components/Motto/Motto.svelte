<script lang="ts">
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { CarouselScrollTop } from "../Carousel/CarouselScrollTopStore";

  export let scrollTop = 0;
  // let show = true

  // if (scrollTop >= 100) {
  //   show = false
  // }
  let opacity = 1;

  // const opacity = fly(1);

  // if (scrollTop > 200) {
  //   opacity.set(0);
  // } else if (!scrollTop) {
  //   opacity.set(1);
  // } else {
  //   opacity.set(scrollTop * 0.005);
  // }

  $: {
    console.log("scrollTop", scrollTop);
    if ($CarouselScrollTop > 200) {
      opacity = 0;
    } else if (!$CarouselScrollTop) {
      opacity = 1;
    } else {
      opacity = (200 - $CarouselScrollTop * 0.05);
    }
  }
</script>

<div class="motto">
  <div style="opacity: {opacity};">Less is More...</div>
  {$CarouselScrollTop}
</div>

<style>
  .motto {
    position: absolute;
    top: 20%;
    left: 50%;
    width: 500px;
    text-align: center;
    margin-left: -250px;
    color: #fff;
    font-style: italic;
    font-size: 92px;
  }
</style>
