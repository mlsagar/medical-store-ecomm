import { Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProductComponent } from './product/product.component';
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
    },
    {
        path: routePaths.HOME,
        component: HomeComponent
    },
    {
        path: routePaths.SINGLE_PRODUCT,
        component: ProductComponent
    },
    // {
    //     path: routePaths.ORDER_HISTORY,
    //     component: HomeComponent
    // },
    // {
    //     path: routePaths.HOME,
    //     component: HomeComponent
    // }
    {
        path: "**",
        component: ErrorPageComponent
    }
];
