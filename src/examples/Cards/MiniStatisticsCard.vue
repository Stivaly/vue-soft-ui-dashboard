<template>
  <div class="mb-4 card">
    <div class="p-3 card-body">
      <div class="d-flex" :class="directionReverse ? reverseDirection : ''">
        <div>
          <div
            class="text-center shadow icon icon-shape border-radius-md"
            :class="typeof icon === 'object' ? icon.background : ''"
          >
            <i
              class="text-lg opacity-10"
              :class="typeof icon === 'string' ? icon : icon.component"
              aria-hidden="true"
            ></i>
          </div>
        </div>
        <div :class="classContent">
          <div class="numbers">
            <p
              class="mb-0 text-sm text-capitalize font-weight-bold"
              :class="title.color"
            >
              {{ typeof title === "string" ? title : title.text }}
            </p>
            <h5 class="mb-0 font-weight-bolder" :class="value.color">
              <slot name="value-content">
                {{ formattedValue }}
              </slot>
            </h5>
              <span
                class="text-sm font-weight-bolder"
                :class="percentage.color"
              >
                {{
                  typeof percentage === "number" ||
                  typeof percentage === "string"
                    ? `${percentage}`
                    : ""
                }}

                {{
                  percentage && percentage === "object"
                    ? `${percentage.value}`
                    : ""
                }}
              </span>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniStatisticsCard",
  props: {
    isHtml: {
      type: Boolean,
      default: false,
    },
    directionReverse: {
      type: Boolean,
      default: false,
    },
    title: {
      type: [Object, String],
      default: null,
      text: {
        type: String,
      },
      color: {
        type: String,
      },
    },
    value: {
      type: [Object, String, Number],
      required: true,
      text: {
        type: [String, Number],
      },
      color: {
        type: String,
      },
    },
    percentage: {
      type: [Object, String],
      value: {
        type: String,
      },
      color: {
        type: String,
      },
      default: () => ({
        color: "text-primary",
      }),
    },
    icon: {
      type: [String, Object],
      component: {
        type: String,
      },
      background: {
        type: String,
      },
      default: () => ({
        background: "bg-white",
      }),
    },
    classContent: {
      type: String,
      default: "",
    },
  },
  computed: {
    formattedValue() {
      return typeof this.value === 'object' && this.value.text ? this.value.text : this.value;
    },
  },
  data() {
    return {
      reverseDirection: "flex-row-reverse justify-content-between",
    };
  },
};
</script>
