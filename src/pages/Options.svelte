<script>
  import "./Options.css";
  import icon from "../../public/images/icon.svg";
  import { slide } from "svelte/transition";
  import utils from "../list";
  import i18n from "../dev-utils/i18n";
  import { SyncStorage, LocalStorage } from "../dev-utils/browser";

  let options = {};
  let messages = {};
  let timers = {};

  Object.keys(utils).forEach((util) => (messages[util] = ""));

  SyncStorage.get().then((data) => (options = data));

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
    const { util, config, isarray } = dataset;
    if (type === "checkbox") value = target.checked;
    if (type === "number") value = Number(value);
    if (isarray)
      value = value
        .split(",")
        .map((v) => (Number(v) !== NaN ? Number(v) : v.trim()));

    if (!options[util]) options[util] = {};
    options[util][config] = value;
    options = { ...options };
    SyncStorage.set(options);
    alert(util, "saved");
  }

  function clearCache({ target }) {
    const { id } = target;
    const storage = { [id]: null };
    LocalStorage.set(storage);
    SyncStorage.set(storage);
    options[id] = null;
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
        <label for={id}>
          <input
            {id}
            type="checkbox"
            data-util={id}
            data-config="enabled"
            on:change={setConfig}
            checked={options[id] && options[id].enabled} />
          <span class="toggle" />
        </label>
      </h2>
      {#if utils[id].config}
        <fieldset disabled={!options[id] || !options[id].enabled}>
          {#each Object.keys(utils[id].config).filter((key) => key !== '_scope') as key}
            <label class="config" for={key}>
              <span class="label">{key}</span>
              {#if typeof utils[id].config[key] === 'boolean'}
                <input
                  id={key}
                  type="checkbox"
                  data-util={id}
                  data-config={key}
                  on:change={setConfig}
                  checked={options[id] && options[id][key] != null ? options[id][key] : utils[id].config[key]} />
                <span class="toggle" />
              {:else if typeof utils[id].config[key] === 'number'}
                <input
                  id={key}
                  type="number"
                  data-util={id}
                  data-config={key}
                  on:change={setConfig}
                  value={options[id] && options[id][key] ? options[id][key] : utils[id].config[key]} />
              {:else}
                <input
                  id={key}
                  type="text"
                  data-util={id}
                  data-config={key}
                  data-isarray={Array.isArray(utils[id].config[key]) ? true : null}
                  on:change={setConfig}
                  value={options[id] && options[id][key] ? options[id][key] : utils[id].config[key]} />
              {/if}
            </label>
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
