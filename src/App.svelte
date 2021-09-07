<script>
  import Dice from './Dice.svelte';
	export let data;
  let cutoff=100, cutoffIncrement = cutoff;;
  let highSelected, lowSelected, patternSelected;
  let sort = 'id';
  function filterAndSort(highSelected, lowSelected, patternSelected, sort) {
    let filtered = data.annotated;
    if (highSelected) filtered = filtered.filter(d => d.highestSide === highSelected);
    if (lowSelected) filtered = filtered.filter(d => d.lowestSide === lowSelected);
    if (patternSelected) filtered = filtered.filter(d => d[`is${patternSelected}`]);
    if (sort === 'fairness') {
      const sorted = [...filtered];
      sorted.sort((a, b) => a.variance - b.variance);
      return sorted;
    } else if (sort == 'unfairness') {
      const sorted = [...filtered];
      sorted.sort((a, b) => b.variance - a.variance);
      return sorted;
    }
    return filtered;
  }
  $: filtered = filterAndSort(highSelected, lowSelected, patternSelected, sort);
</script>

<main>
  <div id="marketplace">
    <div id="sidebar">
      <h3>
        <span>Sort by</span>
      </h3>
        <select bind:value={sort}>
          <option value="id">ID</option>
          <option value="fairness">Fairness</option>
          <option value="unfairness">Unfairness</option>
        </select>
          <h3>High</h3>
          <div class="selector">
            {#each [1,2,3,4,5,6] as v (v)}
            <div class:selected={highSelected === v} on:click={() => highSelected = highSelected === v? null: v}>
              <span>{v}</span>
              <span>{data.stats[`high${v}`]}</span>
            </div>
            {/each}
          </div>
          <h3>Low</h3>
          <div class="selector">
            {#each [1,2,3,4,5,6] as v (v)}
            <div class:selected={lowSelected === v} on:click={() => lowSelected = lowSelected === v? null: v}>
              <span>{v}</span>
              <span>{data.stats[`low${v}`]}</span>
            </div>
            {/each}
          </div>
      <h3>Pattern</h3>
          <div class="selector">
            <div class:selected={patternSelected === 'Ascending'} on:click={() => patternSelected = patternSelected === 'Ascending'? null: 'Ascending'}>
              <span>Ascending</span>
              <span>{data.stats.ascendingCount}</span>
            </div>
            <div class:selected={patternSelected === 'Descending'} on:click={() => patternSelected = patternSelected === 'Descending'? null: 'Descending'}>
              <span>Descending</span>
              <span>{data.stats.descendingCount}</span>
            </div>
            <div class:selected={patternSelected === 'Sawtooth'} on:click={() => patternSelected = patternSelected === 'Sawtooth'? null: 'Sawtooth'}>
              <span>Sawtooth</span>
              <span>{data.stats.sawtoothCount}</span>
            </div>
          </div>
    </div>
    <div id="dice-container">
      <div>
        <h1>Dice Marketplace</h1>
        <ul class="links">
          <li><a href="https://opensea.io/collection/dice-loot" target="_blank" rel="noopener noreferrer">OpenSea</a></li>
          <li><a href="https://twitter.com/DiceForLoot" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          <li><a href="https://discord.gg/z6fbJcAADj" target="_blank" rel="noopener noreferrer">Discord</a></li>
          <li><a href="https://etherscan.io/address/0x4Cec6Dca972BB810A1af1Ef3C8366B22b390c5Bc" target="_blank" rel="noopener noreferrer">Contract</a></li>
        </ul>
        <p>Dice is randomized weighted dice generated and stored on chain. Some dice are more fair, others are luckier. Dice was inspired by the Loot community.</p>
      </div>
      <div>
        {#each filtered.slice(0, cutoff) as d (d.id)}
          <div class="dice"> <Dice dice={d}/> </div>
        {/each}
      </div>
      {#if cutoff < filtered.length}
        <button on:click={() => cutoff += cutoffIncrement}>Show more</button>
      {/if}
    </div>
  </div>
</main>

<style>
  .links {
    list-style-type: none;
    margin: 10px auto 30px;
    padding: 0;
    display: block;
  }
  .links li {
    display: inline-block;
    margin: 0 10px;
    font-size: 22px;
  }
  .links a {
    text-decoration: none;
    color: white;
  }
  .links a:hover {
    text-decoration: underline;
  }
  #marketplace {
    display: flex;
  }
  #sidebar {
    width: 10%;
    height: 100vh;
    overflow: scroll;
    position: fixed;
    padding: 24px;
    padding-top: 0;
    border-right: 1px solid white;
  }
  #dice-container {
    margin-left: 10%;
    flex: 1 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  #dice-container > div {
    margin: auto;
    display: flex;
    max-width: 1000px;
    width: 82%;
    flex-wrap: wrap;
  }
  #dice-container button {
    display: inline-block;
    margin: auto;
  }
  .dice {
    margin: 20px;
  }

	h1 {
    margin: 15px 0;
    font-size: 5rem;
    font-weight: 400;
    text-align: center;
    width: 100%;
	}

  p {
    color: #8e8e8e;
    margin: 0;
    font-size: 22px;
    text-align: center;
    margin-bottom: 30px;
  }

  h3 {
    margin-bottom: 0.5em;
  }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
  .selected {
    background: rgba(127,255,168,.6);
  }

  .selector div {
    cursor: pointer;
    padding: 4px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
  }

  .selector div:hover {
    background: rgba(127,255,168,.5);
  }
</style>
