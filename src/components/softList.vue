<template>
    <div class="form-group">
        <select
          :id="id"
          class="form-control"
          :class="getClasses(size, success, error)"
          :name="name"
          :value="value"
          :isRequired="isRequired"
          @change="$emit('input', $event.target.value)"
        >
            <option disabled value="">{{ placeholder }}</option>
          <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
  </template>
  
  <script>
  export default {
    name: "SoftSelect",
    props: {
      size: {
        type: String,
        default: "default",
      },
      success: {
        type: Boolean,
        default: false,
      },
      placeholder: {
        type: String,
        default: "Type here...",
      },
      error: {
        type: Boolean,
        default: false,
      },
      name: {
        type: String,
        default: "",
      },
      id: {
        type: String,
        default: "",
      },
      value: {
        type: String,
        default: "",
      },
      options: {
        type: Array,
        default: () => [],
      },
      isRequired: {
        type: Boolean,
        default: false,
        },
    },
    methods: {
    getClasses: (size, success, error) => {
      let sizeValue, isValidValue;

      sizeValue = size ? `form-control-${size}` : null;

      if (error) {
        isValidValue = "is-invalid";
      } else if (success) {
        isValidValue = "is-valid";
      } else {
        isValidValue = "";
      }

      return `${sizeValue} ${isValidValue}`;
    },
    getIcon: (icon) => (icon ? icon : null),
    hasIcon: (icon) => (icon ? "input-group" : null),
  },
  };
  </script>
  