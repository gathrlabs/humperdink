<template>
  <div>
    <div class="mt-1 relative rounded-md">
      <div
        class="
          absolute
          inset-y-0
          left-0
          pl-3
          flex
          items-center
          pointer-events-none
        "
      >
        <slot v-if="!loading" name="icon"></slot>
        <loading-icon class="w-8" stroke="text-gray-400" v-else />
      </div>
      <input
        @keydown.enter="$emit('enter')"
        ref="inputIconLeft"
        :disabled="disabledOrLoading"
        :type="type"
        :name="name"
        :id="id"
        class="
          focus:outline-none focus:bg-white focus:border-green-500
          block
          w-full
          pl-12
          rounded-md
          border-2 border-gray-200
          py-4
          text-lg
        "
        :placeholder="placeholder"
        v-on:input="$emit('input', $event.target.value)"
        :value="value"
      />
    </div>
  </div>
</template>
<script>
import LoadingIcon from "@/components/icons/LoadingIcon";

export default {
  props: {
    placeholder: {
      type: String,
      default: "Placeholder",
      required: true,
    },
    type: {
      type: String,
      default: "text",
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: true,
    },
    value: {
      type: String,
      default: "",
      required: true,
    },
    name: {
      type: String,
      default: "",
      required: true,
    },
    id: {
      type: String,
      default: "",
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  components: {
    LoadingIcon,
  },
  computed: {
    disabledOrLoading() {
      return this.loading || this.disabled;
    },
  },
  methods: {
    focus() {
      this.$refs.inputIconLeft.focus();
    },
    clear() {
      this.$refs.inputIconLeft.value = "";
    },
  },
};
</script>
