import { NgModule } from '@angular/core';
import { MarkdownPipe } from './markdown.pipe';
import 'prismjs';
@NgModule({
  declarations: [MarkdownPipe], // 替换为你的组件名称
  imports: [],
  providers: [],
  exports: [MarkdownPipe],
  bootstrap: [], // 替换为你的根组件
})
export class AppModule {}
