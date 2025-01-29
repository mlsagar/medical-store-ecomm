import { Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProductComponent } from './product/product.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { authGuard } from '../core/auth.guard';
import { ProfileComponent } from './profile/profile.component';

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
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: routePaths.SINGLE_PRODUCT,
        component: ProductComponent,
        canActivate: [authGuard]
    },
    {
        path: routePaths.ORDER_HISTORY,
        component: OrderHistoryComponent,
        canActivate: [authGuard]
    },
    {
        path: routePaths.PROFILE,
        component: ProfileComponent
    },
    {
        path: "**",
        component: ErrorPageComponent
    }
];
