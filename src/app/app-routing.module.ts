import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { UserGameMainComponent } from "./user-game-main/user-game-main.component";
import { UserComponent } from "./user/user.component";
import { IngameComponent } from "./ingame/ingame.component";
import { WinnerComponent } from "./winner/winner.component";

const routes: Routes = [
    { path: 'register', component: UserComponent },
    { path: 'login', component: LoginComponent },
    { path: 'gamepage', component: UserGameMainComponent },
    { path: 'ingame', component: IngameComponent },
    { path: 'winner', component: WinnerComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { };
export const routingComponents = [UserComponent, LoginComponent];