<template>
  <button
    @click="$emit('clicked')"
    :class="[
      disabled ? 'cursor-not-allowed opacity-50' : '',
      bgColor
        ? `bg-${bgColor}-600 hover:bg-${bgColor}-700 focus:ring-${bgColor}-500`
        : ``,
      size === small ? `py-2 px-3 text-sm` : `py-4 px-4 text-lg`,
    ]"
    class="
      group
      relative
      flex
      justify-center
      shadow
      font-semibold
      rounded-md
      text-white
      focus:outline-none focus:ring-2 focus:ring-offset-2
    "
  >
    <div v-if="loading"><loading-icon class="w-12" /></div>
    <div v-else class="flex items-center">
      <slot name="icon" class="mr-2" />
      {{ label }}
    </div>
  </button>
</template>
<script>
import LoadingIcon from "../icons/LoadingIcon.vue";
export default {
  components: {
    LoadingIcon,
  },
  props: {
    bgColor: {
      type: String,
      default: "green",
    },
    label: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
