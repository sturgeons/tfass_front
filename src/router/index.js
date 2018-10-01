//引入vue
import Vue from "vue";
//引入 vue-router
import Router from "vue-router";
//引入自定义store
import { get_main_obj, getCookie } from "../Utils/store";
import vuexStore from "../store/index";
//引入组件页面
import pLogin from "@/Pages/pc/login-p";
import redirect from "@/Pages/rediractor";
import pMain from "@/Pages/pc/main-p";
import main from "@/Pages/main";
import pPkgSwsMain from "@/Pages/pc/pkg-sws-main";
import pPkgSwsProcess from "@/Pages/pc/pkg-sws-process";
//移动客户端页面
import mLogin from "@/Pages/mobile/login-m";
import mMain from "@/Pages/mobile/main-m";
import mMenu from "@/Pages/mobile/menu-m";
//手机客户端页面
import mLayerMenu from "@/Pages/mobile/client-layer-menu-m";
import mLayerClientPlan from "@/Pages/mobile/client-layer-plan-m";
import mLayerClientDo from "@/Pages/mobile/client-layer-do-m";
import mLayerClientObservedHistory from "@/Pages/mobile/client-layer-history-observe-m";
//admin-电脑端页面
import adminRedirect from "@/Pages/admin";
import adminMain from "@/Pages/admin/pc/main-p";
import adminAuditor from "@/Pages/admin/pc/layer/auditor-p"
import adminArea from "@/Pages/admin/pc/layer/area-p"
import adminChecklist from "@/Pages/admin/pc/layer/checklist-p"
import adminObserveds from "@/Pages/admin/pc/layer/observeds-p"
import adminSchedule from "@/Pages/admin/pc/layer/schedule-p"
import adminScheduleCalendar from "@/Pages/admin/pc/layer/schedule-calendar-p"
Vue.use(Router);

const router = new Router({
  routes: [
    {      //电脑登录界面
      path: "/p/login",
      component: pLogin
    },
    {      //主界面 重新定向界面
      path: "/",
      component: redirect
    },
    {      //电脑客户端主界面
      path: "/p/main",
      component: pMain,
      meta: {
        requireLogin: true
      },
      children: [
        {
          path: "pkg-sws-main",
          component: pPkgSwsMain
        },
        {
          path: "pkg-sws-main/:type",
          component: pPkgSwsProcess
        },
        {
          path: "layerPlan",
          component: mLayerClientPlan
        },
        {
          path: "layerHistory",
          component: mLayerClientObservedHistory
        },
        {
          path: "layerDo/:id",
          component: mLayerClientDo
        }
      ]
    },
    {      //主界面重新定向
      path: "/main",
      component: main,
      meta: {
        requireLogin: true
      }
    },
    {      //手机登录界面
      path: "/m/login",
      component: mLogin
    },
    {      //手机客户端主界面
      path: "/m/main",
      component: mMain,
      meta: {
        requireLogin: true
      },
      children: [
        {
          path: "/",
          component: mMenu
        },
        {
          path: "layerMenu",
          component: mLayerMenu
        },
        {
          path: "layerPlan",
          component: mLayerClientPlan
        },
        {
          path: "layerDo/:id",
          component: mLayerClientDo
        },
        {
          path: "layerHistory",
          component: mLayerClientObservedHistory
        }
      ]
    },
    {      //admin 重新定向界面
      path: "/admin",
      component: adminRedirect,
      meta: {
        requireLogin: true
      },
    },

    {      //admin pc客户端主界面
      path: "/p/admin",
      component: adminMain,
      meta: {
        requireLogin: true
      },
      children: [
        {
          path: "auditor",
          component: adminAuditor
        },
        {
          path: "area",
          component: adminArea
        },
        {
          path: "checklist",
          component: adminChecklist
        },
        {
          path: "observeds",
          component: adminObserveds
        },
        {
          path: "schedule",
          component: adminSchedule
        },
        {
          path: "scheduleCalendar",
          component: adminScheduleCalendar
        },
        {
          path: "dashboard",
          component: mLayerClientObservedHistory
        }
      ]
    }
  ]
});
//路由全局钩子
router.beforeEach((to, from, next) => {
  console.log(to.path);
  to.matched.some(o => {
    if (o.meta.requireLogin) {
      //判断当前路由是否需要登录
      if (getCookie("token") != "") {
        vuexStore.dispatch("user_check_token");
        next();
      } else {
        next({
          path: "/"
        });
      }
    } else {
      next();
    }
  });
});

export default router;
