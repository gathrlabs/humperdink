<template>
<div class="min-h-full pt-16 pb-12 flex flex-col bg-white">
  <main class="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
    <div class="py-16">
      <div class="text-center">
        <p class="text-sm font-semibold text-indigo-600 uppercase tracking-wide">Humperdink <span class="text-gray-700 pl-4">Please release me</span></p>
        <div class="mt-6 mx-auto w-full flex justify-center rounded-lg">
          <iframe class="shadow-2xl rounded-xl" width="560" height="315" src="https://www.youtube.com/embed/ch_Fz2Np-Z4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </main>
  <footer class="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="flex justify-center space-x-4">
      <a href="#" class="text-sm font-medium text-gray-500 hover:text-gray-600">Contact Support</a>
      <span class="inline-block border-l border-gray-300" aria-hidden="true"></span>
      <a href="#" class="text-sm font-medium text-gray-500 hover:text-gray-600">Status</a>
      <span class="inline-block border-l border-gray-300" aria-hidden="true"></span>
      <a href="#" class="text-sm font-medium text-gray-500 hover:text-gray-600">Twitter</a>
    </nav>
  </footer>
</div>

</template>
<script>
import ButtonRegular from "../components/common/ButtonRegular.vue";
import InputIconLeft from "../components/common/InputIconLeft.vue";
import LockIcon from "../components/icons/LockIcon.vue";

const { ipcRenderer } = window.require("electron");

export default {
  components: {
    ButtonRegular,
    InputIconLeft,
    LockIcon,
  },
  data() {
    return {
      form: {
        email: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("auth/login", this.form);
        this.$router.push("/pack");
      } catch (err) {
        console.log(err);
      }
    },
    print() {
      const url = `https://arc.d/shipments/1424387/label`;
      ipcRenderer.invoke("print", url);
    },
    inputPin(value) {
      this.form.email = value;
    },
  },
};
</script>
