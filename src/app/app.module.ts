import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule,Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ChoosingComponent } from './choosing/choosing.component';
import { WaitingComponent } from './waiting/waiting.component';
import { EnsuringComponent } from './ensuring/ensuring.component';

export const ROUTES:Routes = [
  { path:'',redirectTo: 'waiting/1', pathMatch:'full' },
  { path:'waiting/:type',component:WaitingComponent },
  { path:'choosing',component:ChoosingComponent },
  { path:'ensuring',component:EnsuringComponent },
  { path:'**',component: WaitingComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ChoosingComponent,
    WaitingComponent,
    EnsuringComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES,{useHash: true})//使用哈希路由
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
