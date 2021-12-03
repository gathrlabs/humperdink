<template>
  <div class="relative flex items-start">
    <div @click="$emit('toggle')" class="flex items-center h-5">
      <input
        id="offers"
        aria-describedby="offers-description"
        name="offers"
        type="checkbox"
        class="
          focus:ring-indigo-500
          h-4
          w-4
          text-indigo-600
          border-gray-300
          rounded
        "
      />
    </div>
    <div class="ml-3 text-sm">
      <label for="offers" class="font-medium text-gray-700">{{ label }}</label>
      <p id="offers-description" class="text-gray-500">
        {{ description }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "Offers",
      required: true,
    },
    description: {
      type: String,
      default: "",
      required: false,
    },
  },
};
</script>
