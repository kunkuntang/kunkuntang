<script lang="ts">
  import Avatar from "./Avatar.svelte";
  import { fade } from 'svelte/transition';
  const fadeParams = {delay: 0, duration: 300}
</script>

<div class="personal-car-container" in:fade="{{delay: 250, duration: 300}}">
  <div class="left-avatar-con">
    <Avatar />
    <div>
      <span>Hello, I'm CubeSuger, ....</span>
    </div>
  </div>
  <div class="right-self-introduce-con">
    <span>iiiii</span>
  </div>
</div>

<style>
  .personal-car-container {
    bottom: 20px;
    width: 100%;
    height: 450px;
    z-index: 99;
    background-color: #fff;
    border-radius: 6px;
    display: flex;
  }

  .left-avatar-con {
    flex: 3;
    text-align: center;
    position: relative;
    height: 100%;
    /* align-items: center;
    justify-content: center;
    justify-items: center; */
  }

  .left-avatar-con::after {
    content: " ";
    width: 1px;
    height: 95%;
    background-color: #dadada;
    position: absolute;
    right: 10px;
    top: 2.5%;
  }

  .right-self-introduce-con {
    flex: 7;
    padding: 20px;
  }
</style>
