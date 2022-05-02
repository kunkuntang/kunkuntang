<script lang="ts">
  import { CarouselScrollTop } from "../Carousel/CarouselScrollTopStore";

  let opacity = 1;

  $: {
    if ($CarouselScrollTop >= 400) {
      opacity = 0;
    } else if (!$CarouselScrollTop) {
      opacity = 1;
    } else {
      opacity = 1 - Number(($CarouselScrollTop / 400).toFixed(2));
    }
  }
</script>

<div class="motto" style="opacity: {opacity};">
  <div>Less is More...</div>
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
    opacity: 1;
    transition: all 0.5s ease-out;
  }
</style>
