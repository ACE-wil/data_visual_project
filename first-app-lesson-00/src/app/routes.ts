import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { EchartsChartComponent} from "./echarts-chart/echarts-chart.component";

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'details',
    component: DetailsComponent,
    title: 'Home details'
  },
  {path: 'echarts-chart',
    component: EchartsChartComponent
  }
];

export default routeConfig;
