import { Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/auth",
        pathMatch: "full"
    },
    {
        path: "auth",
        loadComponent: () => import("./modules/auth/auth.component").then((m) => m.AuthComponent)
    },
    {
        path: "tasks",
        loadComponent: () => import("./modules/task/tasks.component").then((m) => m.TasksComponent),
        canActivate: [AuthGuard]
    },
    {
        path: "**",
        redirectTo: "/auth"
    }
];
