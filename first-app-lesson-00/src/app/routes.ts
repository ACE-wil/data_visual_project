import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { EchartsChartComponent } from './echarts-chart/echarts-chart.component';
import { GuPiaoComponent } from './gu-piao/gu-piao.component';
import { FindHousesComponent } from './find-houses/find-houses.component';
import { XiaozhaoComponent } from './xiaozhao/xiaozhao.component';
import { NeituiComponent } from './neitui/neitui.component';
import { SiteFormComponent } from './site-form/site-form.component';
import { ChatComponent } from './chat/chat.component';
import { LicaiIndexComponent } from './licai-index/licai-index.component';
import { LicaiJizhangComponent } from './licai-jizhang/licai-jizhang.component';
import { LicaiTouziComponent } from './licai-touzi/licai-touzi.component';
import { LicaiCunqianComponent } from './licai-cunqian/licai-cunqian.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'siteform',
    component: SiteFormComponent,
  },
  { path: 'xiaozhao', component: XiaozhaoComponent },
  {
    path: 'neitui',
    component: NeituiComponent,
  },
  {
    path: 'gupiao',
    component: GuPiaoComponent,
    children: [
      { path: 'index', component: LicaiIndexComponent },
      { path: 'jizhang', component: LicaiJizhangComponent },
      { path: 'touzi', component: LicaiTouziComponent },
      { path: 'cunqian', component: LicaiCunqianComponent },
    ],
  },
  { path: 'findhouse', component: FindHousesComponent },
  { path: 'echarts-chart', component: EchartsChartComponent },
  { path: 'chat', component: ChatComponent },
];

export default routeConfig;
