import { Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { GuestGuard } from "./core/guards/guest.guard";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/auth",
        pathMatch: "full"
    },
    {
        path: "auth",
        loadComponent: () => import("./modules/auth/auth.component").then((m) => m.AuthComponent),
        canActivate: [GuestGuard]
    },
    {
        path: "tasks",
        loadComponent: () => import("./modules/task/tasks.component").then((m) => m.TasksComponent),
        canActivate: [AuthGuard]
    },
    {
        path: "**",
        loadComponent: () => import("./shared/components/not-found/not-found.component").then((m) => m.NotFoundComponent)
    }
];
