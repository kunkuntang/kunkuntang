<script lang="ts">
  import Avatar from "./Avatar.svelte";
  import { fade } from "svelte/transition";
  const fadeParams = { delay: 0, duration: 300 };
</script>

<div class="personal-car-container" in:fade={{ delay: 250, duration: 300 }}>
  <div class="left-avatar-con">
    <Avatar />
    <div class="personal-intro">
      <div class="personal-info name">CubeSuger_方糖</div>
      <div class="personal-info job">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          ><path
            d="M22 9v1.528c-.476.69-3.815 1.971-9.77 1.971-6.239 0-9.736-1.358-10.23-2.088v-1.411h20zm2-2h-24v3.491c0 2.657 6.154 4.009 12.23 4.009 5.922 0 11.77-1.284 11.77-3.895v-3.605zm-2 8.074v4.926h-20v-5.001c-.823-.337-1.478-.711-2-1.096v8.097h24v-7.949c-.583.402-1.262.741-2 1.023zm-8 1.958c0 1.087-.896 1.968-2 1.968s-2-.881-2-1.968v-1.032h4v1.032zm-5-15.032c-1.104 0-2 .896-2 2v2h2v-1.5c0-.276.224-.5.5-.5h5c.276 0 .5.224.5.5v1.5h2v-2c0-1.104-.896-2-2-2h-6z"
          /></svg
        >
        <span> Front-End Engineer </span>
      </div>
      <div class="personal-info company">
        <svg
          width="24"
          height="24"
          style="transform: scale(0.8)"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
          ><path
            d="M21 22h2v2h-22v-2h2v-22h18v22zm-10-3h-2v4h2v-4zm4 0h-2v4h2v-4zm4-17h-14v20h2v-5h10v5h2v-20zm-12 11h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-8-3h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-8-3h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-8-3h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"
          /></svg
        >
        <span> Qunyou Technology Ltd. </span>
      </div>
    </div>
  </div>
  <div class="right-self-introduce-con">
    <div class="self-intro-paragraph">
      Hello, my name is <strong>CubeSuger</strong>, I'm a
      <strong>Front-End Engineer</strong> and focus on web development technique
      have been four years. When I was graduated from my college and work at my first
      job, I'm usually crazy about web interface effect with CSS or JavaScript, and
      also thinking about user experience on the web. After a year I deep in Front-End
      field technique, I'm instrested in Front-End enginerring construction, and
      started to study in grunt, gulp, webpack, rollup, etc.
    </div>
    <div class="self-intro-paragraph">
      Nowaday, I'm a leader of FE team in Qunyou Tech Ltd., a company which
      focus on SCRM Sass System. And my job is in charge of building up
      Front-End lowcode platform, which can speed up realize our production and
      verify our PM idea via the market reaction. At current stage our low-code 
      platform is staying the beta mode, we're still trying to brings some amazing features
      into our product.
    </div>
  </div>
</div>

<style>
  .personal-car-container {
    bottom: 20px;
    width: 100%;
    z-index: 99;
    background-color: #fff;
    border-radius: 6px;
    display: flex;
    padding: 20px 0;
    max-width: 1200px;
    margin: 0 auto;
  }

  .left-avatar-con {
    text-align: center;
    position: relative;
    height: 100%;
    width: 300px;
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

  .personal-intro {
    padding: 0 20px;
    word-break: break-all;
    text-overflow: clip;
    white-space: normal;
    text-align: center;
  }

  .personal-info {
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .personal-info.name {
    font-size: 22px;
  }
  .personal-info > span {
    margin-left: 5px;
  }

  .self-intro-paragraph {
    line-height: 1.5em;
    padding-top: 20px;
    /* text-indent: 2em; */
    /* text-transform: capitalize; */
  }

  .self-intro-paragraph::first-letter {
    font-size: 24px;
  }

  .right-self-introduce-con {
    flex: 7;
    padding: 0 20px 20px 20px;
  }
</style>
