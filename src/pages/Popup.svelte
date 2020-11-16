<script>
  import { slide } from "svelte/transition";
  import { SyncStorage } from "../dev-utils/browser";
  import i18n from "../dev-utils/i18n";
  import utils from "../list";
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
    message = i18n.message;
    timer = setTimeout(() => (message = ""), 2000);
    SyncStorage.set(options);
  }
</script>

<style>
  .head {
    display: flex;
    background: var(--color-primary);
  }

  .head:hover a {
    opacity: 0.6;
  }

  .head a {
    display: flex;
    padding: 0.8em 1.5em;
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

  main {
    max-height: 300px;
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
    padding: 0.6em;
    background: #eee;
  }
</style>

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
<main>
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
</main>
{#if message}
  <div transition:slide class="message">{message}</div>
{/if}
