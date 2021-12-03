import auth from "@/middleware/auth";

export default [
  {
    path: "/pack",
    name: "Pack",
    redirect: {
      name: "PackMulti",
    },
    component: () => import("@/components/layouts/PackLayout.vue"),
    meta: {
      middleware: [auth],
    },
    children: [
      {
        path: "multi",
        name: "PackMulti",
        component: () => import("@/views/Multi.vue"),
        meta: {
          middleware: [auth],
        },
      },
      {
        path: "single",
        name: "PackSingle",
        component: () => import("@/views/Single.vue"),
        meta: {
          middleware: [auth],
        },
      },
    ],
  },
];
