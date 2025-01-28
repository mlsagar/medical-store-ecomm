import { Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
// import { LoginComponent } from './login/login.component';

const routePaths = environment.ROUTE_PATHS;

export const routes: Routes = [
    {
        path: "",
        redirectTo: routePaths.LOGIN,
        pathMatch: "full"
    },
    {
        path: routePaths.REGISTER,
        component: RegisterComponent
    },
    {
        path: routePaths.LOGIN,
        component: LoginComponent
    }
];
