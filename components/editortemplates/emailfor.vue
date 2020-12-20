<template>
  <div v-bind:class="[(isColumndisplay ? '' : positionclass)]">
    <div v-bind:class="[(isColumndisplay ? 'row' : labelclass)]">
      <span v-bind:for="[id]" :class="[(isColumndisplay ? positionclass : '')]">
        <span>{{ label }}</span>
        <!-- <img v-bind:title="[helptext]" class="info-icon" src="@/assets/assets/images/tooltip-icon-black.svg" data-toggle="tooltip" alt="address-tooltip-icon"> -->
      </span>
      <input
        v-bind:class="['form-control'+' ' + labelclass]"
        v-bind:aria-label="[label]"
        v-bind:placeholder="[placeholder]"
        v-model="customModel"
        @blur="checkEmail"
        type="email"
      >
      <div v-if="invalidEmail" class="invalid-feedback d-block field-validation-error-Landing">
        {{ errmsg }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Emailfor',
  props: {
    value: String(''),
    label: String(''),
    helptext: String(''),
    labelclass: String(''),
    positionclass: String(''),
    id: String(''),
    placeholder: String(''),
    inputclass: String(''),
    isColumndisplay: String(''),
    v: Object({ })
  },
  data () {
    return {
      invalidEmail: false,
      errmsg: ''
    }
  },
  computed: {
    customModel: {
      get () {
        return this.value
      },
      set (value) {
        // this.v.$touch()
        this.$emit('input', value)
      }
    }
  },
  methods: {
    checkEmail () {
      const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      if (this.value.match(re)) {
        this.invalidEmail = false
      } else {
        this.invalidEmail = true
        this.errmsg = 'Plaese Enter valid Email Address '
      }
    }
  }
}
</script>
