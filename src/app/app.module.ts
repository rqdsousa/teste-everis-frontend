import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ROUTES } from './app-routing.module';
import { AppComponent } from './app.component';
import { RankingComponent } from './Components/ranking/ranking.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    RankingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
