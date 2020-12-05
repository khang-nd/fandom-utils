<script>
  import utils from "../data/list.json";

  export let util = "";
  export let config = "";
  export let setConfig = null;
  export let option = null;

  const hasConfig = utils[util].config && utils[util].config[config] != null;
  const initial = hasConfig ? utils[util].config[config] : false;

  let type = "text";
  if (typeof initial === "boolean") type = "checkbox";
  if (typeof initial === "number") type = "number";

  $: configValue = option === null || option === undefined ? initial : option;
</script>

<label>
  <input
    id={config}
    {type}
    data-util={util}
    data-config={config}
    data-is-array={Array.isArray(initial) || null}
    checked={configValue}
    value={configValue}
    on:change={setConfig} />
  {#if type === 'checkbox'}<span class="toggle" />{/if}
</label>
