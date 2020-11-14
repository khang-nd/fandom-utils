<script>
  import "./Options.css";
  import utils from "../list";
  import i18n from "../dev-utils/i18n";
  import { SyncStorage } from "../dev-utils/browser";

  let options = {};

  SyncStorage.get().then((data) => (options = data));

  function set({ target }) {
    const { dataset, type } = target;
    const { util, config } = dataset;
    if (!options[util]) options[util] = {};
    options[util][config] = type === "checkbox" ? target.checked : target.value;
    options = { ...options };
    SyncStorage.set(options);
  }
</script>

<main>
  {#each Object.keys(utils) as id}
    <section>
      <h1>
        <div class="title">{id}</div>
        <label for={id}>
          <input
            {id}
            type="checkbox"
            data-util={id}
            data-config="enabled"
            on:change={set}
            checked={options[id] && options[id].enabled} />
          <span class="toggle" />
        </label>
      </h1>
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
                  on:change={set}
                  checked={options[id] && options[id][key] != null ? options[id][key] : utils[id].config[key]} />
                <span class="toggle" />
              {:else if typeof utils[id].config[key] === 'number'}
                <input
                  id={key}
                  type="number"
                  data-util={id}
                  data-config={key}
                  on:change={set}
                  value={options[id] && options[id][key] ? options[id][key] : utils[id].config[key]} />
              {:else}
                <input
                  id={key}
                  type="text"
                  data-util={id}
                  data-config={key}
                  on:change={set}
                  value={options[id] && options[id][key] ? options[id][key] : utils[id].config[key]} />
              {/if}
            </label>
          {/each}
        </fieldset>
      {:else}<i class="center">{i18n.noConfig}</i>{/if}
      <a class="doc" href="https://dev.fandom.com/wiki/{id}" target="_blank">
        [{i18n.doc}]
      </a>
    </section>
  {/each}
</main>
