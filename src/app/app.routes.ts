import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaygroundComponent } from './playground/playground.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { Path } from './enum/path';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';

export const routes: Routes = [
    {
        path:Path.HOME,
        component:HomeComponent,
    },{
        path:Path.PLAYGROUND,
        component:PlaygroundComponent,
        canActivate:[AuthGuard]
    },{
        path:Path.LOGIN,
        component:LoginComponent
    }
];
