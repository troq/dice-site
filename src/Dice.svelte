<script>
  export let dice;
</script>

<div class="container">
  <div class="image">
    <span>#{dice.id}</span>
    <ul>
      {#each dice.values as v}
        <li>{v}</li>
      {/each}
    </ul>
  </div>
  <a href={`https://opensea.io/assets/0x4Cec6Dca972BB810A1af1Ef3C8366B22b390c5Bc/${dice.id}`} target="_blank" rel="noopener noreferrer">
    Buy
  </a>
</div>

<style>
  .image {
    width: 200px;
    height: 200px;
    background: black;
    position: relative;
    display: relative;
    color: white;
    border: 1px solid white;
    box-sizing: border-box;
    border-bottom: none;
  }
  ul {
    list-style-type: none;
    padding: 10px;
  }
  span {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  a {
    display: inline-block;
    margin: auto;
    background: rgba(127,255,168,.9);
    color: black;
    padding: 10px 0px;;
    width: 100%;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
  }
  .container {
    width: 200px;
  }
</style>
