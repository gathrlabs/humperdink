<template>
  <div
    class="
      bg-white
      min-h-full
      px-4
      py-16
      sm:px-6 sm:py-24
      md:grid md:place-items-center
      lg:px-8
    "
  >
    <div class="max-w-max mx-auto">
      <main class="flex flex-col">
        <loading-icon
          class="w-8 mb-6 mx-auto"
          stroke="text-gray-600"
        ></loading-icon>
        <div class="text-2xl font-medium text-center">Loading Humperdink</div>
        <div class="text-lg text-center">Please be patient</div>
      </main>
    </div>
  </div>
</template>
<script>
import LoadingIcon from "@/components/icons/LoadingIcon.vue";
export default {
  components: {
    LoadingIcon,
  },
  mounted() {
    this.navigateToStartupPage();
  },
  methods: {
    navigateToStartupPage() {
      setTimeout(() => {
        this.$router.push("/login");
      }, 3000);
    },
  },
};
</script>
