import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { HostListener } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterModule, HighchartsChartModule],
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
        <img src="../assets/touxiang.jpg" class="touxiangimg" />
        <li
          class="liststyle"
          [routerLinkActive]="['active']"
          [routerLinkActiveOptions]="{ exact: true }">
          <a [routerLink]="['/']">首页</a>
        </li>
        <li
          class="liststyle"
          [routerLinkActive]="['active']"
          [routerLinkActiveOptions]="{ exact: true }">
          <a [routerLink]="['/siteform']">求职</a>
        </li>
        <li
          class="liststyle"
          [routerLinkActive]="['active']"
          [routerLinkActiveOptions]="{ exact: true }">
          <a [routerLink]="['/xiaozhao']">校招</a>
        </li>
        <li
          class="liststyle"
          [routerLinkActive]="['active']"
          [routerLinkActiveOptions]="{ exact: true }">
          <a [routerLink]="['/neitui']">内推</a>
        </li>
        <li
          class="liststyle"
          [routerLinkActive]="['active']"
          [routerLinkActiveOptions]="{ exact: true }">
          <a [routerLink]="['/findhouse']">看房</a>
        </li>
        <li
          class="liststyle"
          [routerLinkActive]="['active']"
          [routerLinkActiveOptions]="{ exact: true }">
          <a [routerLink]="['/gupiao/index']">理财</a>
        </li>
        <li
          class="liststyle"
          [routerLinkActive]="['active']"
          [routerLinkActiveOptions]="{ exact: true }">
          <a [routerLink]="['/chat']" style="font-size: 15px;font-weight: bold"
            >职业规划</a
          >
        </li>
        <li
          class="liststyle"
          [routerLinkActive]="['active']"
          [routerLinkActiveOptions]="{ exact: true }">
          <a [routerLink]="['/echarts-chart']">关于</a>
        </li>
        <hr style="top: 20px;position: relative" />
        <h2 class="text_shequ">社区</h2>
        <li class="liststyle"><a href="#">朋友</a></li>
        <li class="liststyle"><a href="#">书签</a></li>
        <li class="liststyle"><a href="#">事件</a></li>
        <li class="liststyle"><a href="#">讨论</a></li>
      </ul>
    </div>

    <section class="content">
      <router-outlet></router-outlet>
    </section>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
  title = '大学生求职';
}
