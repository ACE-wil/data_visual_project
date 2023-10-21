import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component'; // 替换为你的组件文件路径
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";
import { SiteFormComponent } from './site-form/site-form.component';
import { EchartsChartComponent } from './echarts-chart/echarts-chart.component';
@NgModule({
  declarations: [
    SiteFormComponent,
    EchartsChartComponent
  ], // 替换为你的组件名称
  imports: [BrowserModule, HttpClientModule, FormsModule,CommonModule],
  providers: [],
  exports: [
    SiteFormComponent
  ],
  bootstrap: [AppComponent] // 替换为你的根组件
})
export class AppModule { }
