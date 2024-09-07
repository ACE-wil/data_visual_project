import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as markdownIt from 'markdown-it';
import { MarkdownPipe } from '../markdown.pipe';
import { AppModule } from '../app.module';
// import 'prismjs';
// import 'prismjs/themes/prism.css';
// import * as Prism from 'prismjs';
// //
@Component({
  standalone: true,
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [FormsModule, CommonModule, AppModule],
})
export class ChatComponent {
  message: string = ''; // 用于绑定输入框的值

  question_answer: string[] = ['你好，我是你的职业规划师'];
  code: string = 'const hello = "Hello, World!';
  // highlightedCode = Prism.highlight(this.code, Prism.languages.javascript, 'javascript');
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    document.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        this.sendMessage(this.message);
      }
    });
  }

  sendMessage(messagee: string): void {
    var loadersend = document.getElementById('loadersend')!;
    loadersend.style.display = 'block';
    let params = new HttpParams().set('wx_question', this.message);
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    // 设置预期的响应类型为文本
    const options = {
      headers: headers,
      responseType: 'text' as 'json', // 设置为 'text'
      observe: 'body' as 'body', // 获取完整的响应体
    };
    setInterval(() => {
      if (this.message == '') {
        loadersend.style.display = 'none';
      }
    }, 60);
    this.http
      .post('http://127.0.0.1:5000/wenxin_response', params.toString(), options)
      .subscribe(
        (the_response: any) => {
          // 处理文本响应
          const textdata = the_response;
          this.question_answer.push(this.message); // 将问题放进数组里
          this.question_answer.push(textdata); // 将回应内容添加到聊天内容数组中
          this.message = ''; // 清空问题数组
        },
        error => {
          console.error('发送消息时发生错误：', error);
          // 处理错误
        }
      );
  }
  getSafeHtml(markdown_string: string): SafeHtml {
    const md = new markdownIt();
    const md_result = md.render(markdown_string);
    return this.sanitizer.bypassSecurityTrustHtml(md_result);
  }
}
