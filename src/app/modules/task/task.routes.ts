import { Routes } from "@angular/router";

export const taskRoutes: Routes = [
    {
        path: "",
        children: [
            {
                path: "task",
                loadComponent: () => import("./pages/task/task.component").then((m) => m.TaskComponent)
            }
        ]
    }
]