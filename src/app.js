import { ExcelPage, DashboardPage, PageNotFound } from "@/core/routes/pages";
import { Router } from "@core/routes/routers/Router";
import "@/assets/scss/index.scss";

const router = new Router("#root", {
    excel: ExcelPage,
    dashboard: DashboardPage,
    404: PageNotFound
});

router.init();
