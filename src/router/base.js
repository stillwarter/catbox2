export const baseRouter = {
  path: "/",
  name: "home",
  component: () => import("@/layout/layout.vue"),
  children: [
    {
      path: "main",
      name: "main",
      component: () => import("@/views/index.vue"),
      meta: {
        title: "主页",
      },
    },
    {
      path: "mark",
      name: "mark",
      component: () => import("@/views/Mark/index.vue"),
      meta: {
        title: "记录",
      },
    },
    {
      path: "mdedit",
      name: "mdedit",
      component: () => import("@/views/Mark/editMd/editMd.vue"),
      meta: {
        title: "md编辑",
      },
    },
    {
      path: "plan",
      name: "plan",
      component: () => import("@/views/Plan/plan.vue"),
      meta: {
        title: "计划与规划",
      },
    },
    {
      path: "calendar",
      name: "calendar",
      component: () => import("@/views/calendar/calendar.vue"),
      meta: {
        title: "日常工作生活记录",
      },
    },
  ],
};
