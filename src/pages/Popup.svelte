<script>
  import { slide } from "svelte/transition";
  import { SyncStorage } from "../dev-utils/browser";
  import i18n from "../dev-utils/i18n";
  import utils from "../data/list.json";
  import config from "../../public/images/config.svg";
  import bug from "../../public/images/bug.svg";

  let options = {};
  let message = "";
  let timer;

  SyncStorage.get().then((data) => (options = { ...data }));

  function set({ target }) {
    clearTimeout(timer);
    if (options[target.id]) {
      options[target.id].enabled = target.checked;
    } else {
      options[target.id] = { enabled: true };
    }
    options = { ...options };
    SyncStorage.set(options);

    message = i18n.message;
    timer = setTimeout(() => (message = ""), 2000);
  }
</script>

<style>
  main {
    font-size: 15px;
    min-width: 290px;
  }

  .head {
    display: flex;
    background: var(--color-primary);
    position: relative;
    margin-bottom: 0.3em;
  }

  .head::after {
    content: "";
    background: linear-gradient(to right, #a5ec09, #08d7d7);
    height: 0.3em;
    width: 100%;
    position: absolute;
    top: 100%;
  }

  .head:hover a {
    opacity: 0.6;
  }

  .head a {
    display: flex;
    padding: 0.8rem 1rem;
    width: 100%;
    justify-content: center;
    text-decoration: none;
    white-space: nowrap;
    color: #fff;
    transition: opacity 0.2s;
  }

  .head a:hover {
    opacity: 1;
  }

  .head a > img {
    margin-right: 0.3em;
  }

  .wrapper {
    max-height: 350px;
    overflow: auto;
  }

  label {
    display: flex;
    padding: 0.8em 2em;
    cursor: pointer;
    transition: background 0.15s;
  }

  label:hover {
    background: #f8f8f8;
  }

  .toggle {
    margin-right: 1em;
  }

  .message {
    padding: 0.4rem 1rem;
    background: #eee;
    position: fixed;
    top: 0;
    z-index: 1;
  }
</style>

<main>
  <div class="head">
    <a target="_blank" href="options.html">
      <img src={config} alt="config" width="18" />
      {i18n.config}
    </a>
    <a
      target="_blank"
      href="https://github.com/khang-nd/fandom-utils#report-issues">
      <img src={bug} alt="github" width="18" />
      {i18n.report}
    </a>
  </div>
  <div class="wrapper">
    {#each Object.keys(utils) as id}
      <label for={id}>
        <input
          {id}
          type="checkbox"
          on:change={set}
          checked={options[id] && options[id].enabled} />
        <span class="toggle" />
        <span class="label">{id}</span>
      </label>
    {/each}
  </div>
  {#if message}
    <div transition:slide class="message">{message}</div>
  {/if}
</main>
