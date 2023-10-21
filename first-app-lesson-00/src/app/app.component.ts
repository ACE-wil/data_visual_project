import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterModule],
 template: `
<!--    <a [routerLink]="['/nihao']">-->
<!--      <header class="brand-name">-->
<!--        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">-->
<!--        <h1>能好</h1>-->
<!--      </header>-->
<!--    </a>-->
<!--    <a href [routerLink]="['/details']">点击跳转</a>-->
    <div id="sidebar">
        <ul>
          <img src="../assets/touxiang.jpg" style="width: 60px;height: 60px;left: 60px;top:10px;position: relative">
            <li [routerLinkActive]='["active"]' [routerLinkActiveOptions]="{ exact: true }"><a [routerLink]="['/']">首页</a></li>
            <li [routerLinkActive]='["active"]' [routerLinkActiveOptions]="{ exact: true }"><a [routerLink]="['/details']">详情</a></li>
            <li><a href="#">数据</a></li>
            <li><a href="#">发现</a></li>
            <li><a href="#">朋友</a></li>
            <li><a href="#">书签</a></li>
            <li><a href="#">事件</a></li>
            <li><a href="#">讨论</a></li>
            <hr style="top: 20px;position: relative">
            <h2 style="top:20px;position: relative">社区</h2>
            <li><a href="#">朋友</a></li>
            <li><a href="#">书签</a></li>
            <li><a href="#">事件</a></li>
            <li><a href="#">讨论</a></li>
        </ul>

    </div>
    <section class="content">
      <router-outlet></router-outlet>
    </section>

`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Home';
}
