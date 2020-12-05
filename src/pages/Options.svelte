<script>
  import "./Options.css";
  import icon from "../../public/images/icon.svg";
  import { slide } from "svelte/transition";
  import utils from "../data/list.json";
  import i18n from "../dev-utils/i18n";
  import { SyncStorage, LocalStorage } from "../dev-utils/browser";
  import Input from "../components/Input.svelte";

  let options = {};
  let messages = {};
  let timers = {};

  Object.keys(utils).forEach((util) => {
    messages[util] = "";
    options[util] = {};
    options[util].enabled = false;
  });

  SyncStorage.get().then((data) => {
    Object.keys(data).forEach((key) => (options[key] = data[key]));
  });

  function alert(util, msg) {
    clearTimeout(timers[util]);
    messages[util] = msg;
    messages = { ...messages };
    timers[util] = setTimeout(() => {
      messages[util] = "";
      messages = { ...messages };
    }, 3000);
  }

  function setConfig({ target }) {
    let { dataset, type, value } = target;
    const { util, config, isArray } = dataset;
    if (type === "checkbox") value = target.checked;
    if (type === "number") value = Number(value);
    if (isArray) value = value.split(",").map((v) => Number(v) || v.trim());

    options[util][config] = value;
    options = { ...options };
    SyncStorage.set(options);
    alert(util, "saved");
  }

  function clearCache({ target }) {
    const { id } = target;
    const storage = { [id]: {} };
    LocalStorage.set(storage);
    SyncStorage.set(storage);
    options[id] = {};
    options = { ...options };
    alert(id, "cleared");
  }
</script>

<div class="head">
  <h1 class="logo">
    <a href="https://github.com/khang-nd/fandom-utils" target="_blank">
      <img src={icon} alt="Logo" />
      Fandom Utils</a>
  </h1>
</div>
<main>
  {#each Object.keys(utils) as id}
    <section>
      {#if messages[id]}
        <div transition:slide class="message">{i18n[messages[id]]}</div>
      {/if}
      <h2>
        <div class="title">{id}</div>
        <Input
          util={id}
          config="enabled"
          bind:option={options[id].enabled}
          {setConfig} />
      </h2>
      {#if utils[id].config}
        <fieldset disabled={!options[id].enabled}>
          {#each Object.keys(utils[id].config).filter((key) => key !== '_scope') as key}
            <div class="config" for={key}>
              <span class="label">{key}</span>
              <Input
                util={id}
                config={key}
                bind:option={options[id][key]}
                {setConfig} />
            </div>
          {/each}
        </fieldset>
      {:else}
        <fieldset><i class="center">{i18n.noConfig}</i></fieldset>
      {/if}
      <footer>
        <a href="https://dev.fandom.com/wiki/{id}" target="_blank">
          {i18n.doc}
        </a>
        <div {id} on:click={clearCache}>{i18n.clearCache}</div>
      </footer>
    </section>
  {/each}
</main>
