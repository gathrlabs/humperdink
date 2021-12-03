<template>
  <div
    class="
      modal
      select-none
      fixed
      inset-0
      z-50
      overflow-x-hidden overflow-y-auto
    "
  >
    <button
      v-on-clickaway="clickAway"
      type="button"
      class="
        inline-flex
        items-center
        p-1
        border border-transparent
        rounded-full
        shadow-sm
        text-white
        bg-indigo-600
        hover:bg-indigo-700
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-indigo-500
        absolute
        top-5
        right-5
      "
    >
      <close-icon />
    </button>
    <div class="relative mx-auto flex justify-center z-20 py-10">
      <div v-on-clickaway="clickAway">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
import CloseIcon from "../icons/CloseIcon.vue";
export default {
  components: {
    CloseIcon,
  },
  mixins: [clickaway],
  props: {
    containerClasses: {
      type: Array,
      default: () => [],
    },
    classWhitelist: {
      type: [Array, String],
      default: "",
    },
    allowClickAway: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({ modalBg: null }),

  created() {
    document.addEventListener("keydown", this.handleEscape);
    document.body.classList.add("overflow-hidden");
  },

  destroyed() {
    document.removeEventListener("keydown", this.handleEscape);
    document.body.classList.remove("overflow-hidden");
  },

  methods: {
    handleEscape(e) {
      e.stopPropagation();

      if (e.keyCode === 27) {
        this.close(e);
      }
    },

    close(e) {
      this.$emit("modal-close", e);
    },

    clickAway(e) {
      if (
        this.allowClickAway &&
        e.target.parentElement.classList.contains("modal")
      ) {
        this.close(e);
      }
    },
  },
};
</script>
<style scoped>
.modal {
  /*
     * Due to z-index inheritance/conflicts I found it nigh on impossible to get the sticky action bar, the modal
     * overlay and the modal content to layer correctly, so I have opted for applying a bg colour to the wrapping div
     * which already was pinned, by leaning on an 8 digit hex value: rrggbbaa which is not 100% supported by browsers
     * as per link: https://caniuse.com/#feat=css-rrggbbaa
     */
  background-color: #7c858ecc;
}
</style>
