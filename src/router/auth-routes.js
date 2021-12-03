import guest from "@/middleware/guest";

export default [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {
      middleware: [guest],
    },
  },
];
