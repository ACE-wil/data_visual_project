import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component'; // 替换为你的组件文件路径
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
  ], // 替换为你的组件名称
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent] // 替换为你的根组件
})
export class AppModule { }
