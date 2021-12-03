<template>
  <div>
    <div class="mt-1 relative rounded-md">
      <input
        @keydown.enter="$emit('enter')"
        autofocus
        ref="input"
        :disabled="disabled"
        :type="type"
        :name="name"
        :id="id"
        class="
          focus:outline-none focus:bg-white focus:border-green-500
          block
          w-full
          rounded-md
          border-2 border-gray-200
          py-4
          px-2
          text-lg
        "
        :placeholder="placeholder"
        v-on:input="$emit('input', $event.target.value)"
      />
    </div>
  </div>
</template>
<script>
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
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    clear() {
      this.$refs.input.value = "";
    },
  },
};
</script>
