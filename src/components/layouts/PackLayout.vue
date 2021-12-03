<template>
  <div>
    <Header />
    <router-view />
    <portal-target name="modals" multiple></portal-target>
    <portal-target name="alerts" multiple></portal-target>
  </div>
</template>

<script>
import Header from "./Header.vue";
import { PortalTarget } from "portal-vue";
export default {
  components: {
    Header,
    PortalTarget,
  },
};
</script>

<style></style>
