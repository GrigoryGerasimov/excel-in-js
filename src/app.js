import { Router } from "@core/routes/routers/Router";
import { ExcelPage, DashboardPage } from "@/core/routes/pages";

const router = new Router("#root", {
    excel: ExcelPage,
    dashboard: DashboardPage
});

router.init();
