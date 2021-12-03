<template>
  <button
    @click="$emit('clicked')"
    :class="[
      disabled ? 'cursor-not-allowed opacity-50' : '',
      bgColor
        ? `bg-${bgColor}-600 hover:bg-${bgColor}-700 focus:ring-${bgColor}-500`
        : ``,
    ]"
    class="
      group
      relative
      w-full
      flex
      justify-center
      py-4
      px-4
      shadow
      text-lg
      font-semibold
      rounded-md
      text-white
      focus:outline-none focus:ring-2 focus:ring-offset-2
    "
  >
    <div v-if="loading"><loading-icon class="w-12" /></div>
    <div v-else>
      {{ label }}
    </div>
  </button>
</template>
<script>
import LoadingIcon from "../../components/icons/LoadingIcon.vue";
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
