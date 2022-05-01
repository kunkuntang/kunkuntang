<script lang="ts">
  import Nav from "./components/Nav.svelte";
  import Carousel from "./components/Carousel/Carousel.svelte";
  import PersonalCard from "./components/PersonalCard/PersonalCard.svelte";
  import Content from "./components/Content.svelte";
  import Motto from "./components/Motto/Motto.svelte";
</script>

<main>
  <Nav />
  <Carousel>
    <Motto />
    <Content>
      <PersonalCard />
    </Content>
  </Carousel>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  @media (min-width: 480px) {
  }
</style>
