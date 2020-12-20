<template>
  <div>
    <div class="typo__label">
      Simple select / dropdown
    </div>
    <div v-bind:class="[inputclass]" v-for="(item, index) in refData" v-bind:key="index">
      <input
        v-bind:id="[id]+'true'"
        v-bind:checked="[item[valueProp]]"
        aria-hidden="true"
        type="checkbox"
      >
      <label v-bind:for="[id]+'true'" aria-label="Yes" role="button" class="toggle-button">
        {{ item[textProp] }}
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Multiselect',
  props: {
    label: String(''),
    inputclass: String(''),
    id: String(''),
    labelclass: String(''),
    positionclass: String(''),
    isColumndisplay: String(''),
    valueprop: String(''),
    textprop: String(''),
    refData: {
      type: Array,
      default: () => {}
    }
  }
}
</script>
