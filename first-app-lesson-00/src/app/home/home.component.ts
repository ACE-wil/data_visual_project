import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as Highcharts from 'highcharts';
import { ElementRef, Renderer2 } from '@angular/core';
declare var dongtai: any;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div
      class="welcome"
      style="color:#605DC8;position: absolute;left: 270px;top: 26px;text-decoration-line:underline;font-size: 20px">
      你好，尊贵的
      <mark
        class="user_name"
        style="font-size: 30px;background-color: white;color:#469c6c;font-weight: bold"
        >Pico</mark
      >
      先生
    </div>
    <section
      style="position: absolute;left: 38%;width: 62%;overflow-x: hidden;top:20px">
      <form>
        <input type="text" class="the_input" placeholder="Filter by city" />
        <button
          class="primary"
          type="button"
          style="left: 10px;position: relative;width: 80px">
          Search
        </button>
      </form>
    </section>
    <div
      class="contente"
      style="position: relative;left:18%;top: 100px;width: 60%">
      <div [routerLink]="['/siteform']" class="img1">
        <img src="../../assets/require_offer.png" class="item_img1" />
        <br />
        <div>
          <h3 style="text-align: center;line-height: 60px;color:#605DC8">
            职位数据爬取
          </h3>
          <h4 class="the_h4" style="position: absolute;top:320px;left: 110px">
            (已开通)
          </h4>
        </div>
      </div>
      <div [routerLink]="['/findhouse']" class="img2">
        <img
          src="../../assets/rent_or_buy_house.png"
          style="width:250px;height:250px;border-top-left-radius: 5px;border-top-right-radius: 5px;" />
        <br />
        <h3 style="text-align: center;line-height: 60px;color:#605DC8">
          租买房数据爬取
        </h3>
      </div>
      <div
        [routerLink]="['/gupiao/index']"
        class="img3"
        style="float: left;box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;height: 330px;margin: 20px;border-radius: 5px">
        <img
          src="../../assets/gu_shen.png"
          style="width:250px;height:250px;border-top-left-radius: 5px;border-top-right-radius: 5px;" />
        <br />
        <h3 style="text-align: center;line-height: 60px;color:#605DC8">
          股票数据爬取
        </h3>
      </div>
    </div>

    <div
      class="container"
      id="container"
      style="width: 800px;height: 600px;background-color: yellow;position: absolute;top: 500px;left: 320px"></div>

    <div
      class="contentee"
      style="position: relative;left:20%;top: 1180px;width: 55%;box-shadow: rgba(163,163,163,0.46) 0px 4px 12px;height: 400px;background-color: rgba(232,232,232,0.63)">
      <div
        style="position: absolute;background-color: rgba(98,196,123,0.81);width: 100%;height: 90px;border-radius: 5px"></div>
      <div
        style="width: 700px;position: absolute;left: 50px;height: 200px;top: 177px">
        <hr />
      </div>
      <div
        style="width: 700px;position: absolute;left: 50px;height: 200px;top: 277px">
        <hr />
      </div>
      <div
        style="width: 700px;position: absolute;left: 50px;height: 200px;top: 377px">
        <hr />
      </div>
      <div
        class="col-lg-12 grid-margin stretch-card"
        style="position: absolute;top: 10px;left: 10px">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title" style="font-size: 30px;color: #ffffff">
              Striped Table
            </h4>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead style="color:white;">
                  <tr>
                    <th>User</th>
                    <th>First name</th>
                    <th>Progress</th>
                    <th>Amount</th>
                    <th>Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="py-1">
                      <img
                        src="../../assets/1.png"
                        alt="image"
                        style="width: 30px;height: 30px;border-radius: 50%" />
                    </td>
                    <td>Herman Beck</td>
                    <td>
                      <div class="progress">
                        <div
                          class="progress-bar bg-success"
                          role="progressbar"
                          style="width: 25%"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"></div>
                      </div>
                    </td>
                    <td>$ 77.99</td>
                    <td>May 15, 2015</td>
                  </tr>
                  <tr>
                    <td class="py-1">
                      <img
                        src="../../assets/2.png"
                        alt="image"
                        style="width: 30px;height: 30px;border-radius: 50%" />
                    </td>
                    <td>Messsy Adam</td>
                    <td>
                      <div class="progress">
                        <div
                          class="progress-bar bg-danger"
                          role="progressbar"
                          style="width: 75%"
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"></div>
                      </div>
                    </td>
                    <td>$245.30</td>
                    <td>July 1, 2015</td>
                  </tr>
                  <tr>
                    <td class="py-1">
                      <img
                        src="../../assets/3.png"
                        alt="image"
                        style="width: 30px;height: 30px;border-radius: 50%" />
                    </td>
                    <td>John Richards</td>
                    <td>
                      <div class="progress">
                        <div
                          class="progress-bar bg-warning"
                          role="progressbar"
                          style="width: 90%"
                          aria-valuenow="90"
                          aria-valuemin="0"
                          aria-valuemax="100"></div>
                      </div>
                    </td>
                    <td>$138.00</td>
                    <td>Apr 12, 2015</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="agreatlist"
      style="width: 330px;height: 1090px;overflow:hidden;position:fixed;top:0;right:0;box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;">
      <div style="position:absolute;left: 70px;top:16px">
        <svg
          t="1697526539283"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1668"
          width="30"
          height="30">
          <path
            d="M817 256h-13.3L524.3 535.4c-4.1 4.1-8.8 4.7-11.3 4.7s-7.2-0.6-11.3-4.7L222.3 256H209c-17.3 0-32 14.7-32 32v13.3l279.4 279.4c15.1 15.1 35.2 23.4 56.6 23.4s41.5-8.3 56.6-23.4L849 301.3V288c0-17.3-14.7-32-32-32z"
            fill="#E04DFF"
            p-id="1669"></path>
          <path
            d="M817 256c17.3 0 32 14.7 32 32v448c0 17.3-14.7 32-32 32H209c-17.3 0-32-14.7-32-32V288c0-17.3 14.7-32 32-32h608m0-64H209c-52.8 0-96 43.2-96 96v448c0 52.8 43.2 96 96 96h608c52.8 0 96-43.2 96-96V288c0-52.8-43.2-96-96-96z"
            fill="#691FFF"
            p-id="1670"></path>
        </svg>
      </div>
      <div style="position: absolute;left: 110px;top:19px">
        <svg
          t="1697526978005"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3661"
          width="22"
          height="22">
          <path
            d="M979.456 812.032c-4.096-80.896-46.592-156.16-116.224-205.312V380.416c0-130.56-100.864-240.64-233.984-266.752v-5.12C629.248 48.64 576.512 0 512 0S394.752 48.64 394.752 108.544v5.12c-133.12 26.112-233.984 135.68-233.984 266.752v226.304c-69.632 49.152-112.128 123.904-116.224 205.312h116.224v0.512h701.952v-0.512h116.736z"
            fill="#605DC8"
            p-id="3662"></path>
          <path
            d="M487.424 1024h29.184c76.288 0 139.776-57.344 148.992-131.072H359.424C368.64 967.68 432.64 1024 507.904 1024h-20.48z"
            fill="#605DC8"
            p-id="3663"></path>
        </svg>
      </div>
      <div>
        <img
          class="touxiang"
          src="../../assets/touxiang.jpg"
          style="position:absolute;width: 40px;height: 40px;border-radius: 50%;left:150px;top:13px" />
        <h1
          class="namee"
          style="position: absolute;left:30px;top:58px;color:#605DC8">
          Chats
        </h1>
      </div>
      <div>
        <h1 style="position: absolute;left:200px;top:15px;color:#605DC8">
          Pico
        </h1>
      </div>
      <div
        style="background-color: white;width: 90%;height:400px;position: absolute;top:100px;left: 5%">
        <div class="item" style="width: 100%;height:100px;">
          <img
            src="../../assets/1.png"
            style="border-radius: 50%;width: 40px;height: 40px;position: absolute;left: 10px;top: 10px" />
          <div
            style="position: absolute;left:70px;top:18px;color:#605DC8;font-size: 20px">
            Amani
          </div>
        </div>
        <div class="item1" style="width: 100%;height:100px;">
          <img
            src="../../assets/2.png"
            style="border-radius: 50%;width: 40px;height: 40px;position: absolute;left: 10px;top: 80px" />
          <div
            style="position: absolute;left:70px;top:88px;color:#605DC8;font-size: 20px">
            Amy
          </div>
        </div>
        <div class="item2" style="width: 100%;height:100px;">
          <img
            src="../../assets/3.png"
            style="border-radius: 50%;width: 40px;height: 40px;position: absolute;left: 10px;top: 150px" />
          <div
            style="position: absolute;left:70px;top:158px;color:#605DC8;font-size: 20px">
            John
          </div>
        </div>
      </div>

      <div
        style="background-color: rgba(70,156,108,0.69);border-radius:8px;width: 300px;height:300px;position: fixed;right: 1%;bottom:60px">
        <div
          style="position: absolute;left: 20px;top:10px;color:white;font-size: 30px">
          Amy
        </div>
        <div
          style="position:absolute;border-radius:8px;width: 100%;height: 300px;background-color: white;top:50px;box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;">
          <div>
            <img
              src="../../assets/1.png"
              style="width: 40px;height: 40px;position:absolute;top:10px;left:10px;" />
          </div>
          <div
            style="position:absolute;top:10px;left: 60px;background-color: #8B89E6;border-radius: 10px;height: 40px;color:white;line-height:40px">
            您好，请问需要什么帮助吗？
          </div>
          <div
            style="position:absolute;top:60px;left: 165px;background-color: rgba(98,196,123,0.81);border-radius: 10px;height: 40px;color:white;line-height:40px">
            暂时不用
          </div>
          <div>
            <img
              src="../../assets/2.png"
              style="width: 40px;height: 40px;position: absolute;top:60px;left:240px" />
          </div>
        </div>

        <div>
          <input
            placeholder="输入聊天内容"
            style="border-radius: 10px;left:10px;position:absolute;top:300px;height: 30px;width: 200px;border:1px solid rgba(0,0,0,0.43)" />
          <div style="position: absolute;left:220px;top:300px;">
            <svg
              t="1697531359626"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5047"
              width="32"
              height="32">
              <path
                d="M511.488 118.670222a398.222222 398.222222 0 1 0 0 796.444445 398.222222 398.222222 0 0 0 0-796.444445z m0-85.333333a483.555556 483.555556 0 1 1 0 967.111111 483.555556 483.555556 0 0 1 0-967.111111zM292.067556 378.709333a69.063111 69.063111 0 1 1 138.126222 0 69.063111 69.063111 0 0 1-138.126222 0z m300.657777 0a69.063111 69.063111 0 1 1 138.183111 0 69.063111 69.063111 0 0 1-138.183111 0zM275.626667 545.336889h475.249777c0 108.828444-100.067556 239.502222-240.355555 239.502222-140.231111 0-234.894222-130.673778-234.894222-239.502222z"
                fill="#605DC8"
                p-id="5048"></path>
            </svg>
          </div>
          <div style="position: absolute;left:260px;top:300px;">
            <svg
              t="1697531541188"
              class="icon"
              viewBox="0 0 1126 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6198"
              width="32"
              height="32">
              <path
                d="M841.386667 278.186667L395.946667 464.213333c-3.413333 1.706667-5.12 3.413333-6.826667 6.826667 0 3.413333 0 6.826667 1.706667 8.533333l256 281.6c1.706667 1.706667 3.413333 1.706667 6.826666 1.706667 1.706667 0 3.413333-1.706667 5.12-3.413333l191.146667-472.746667c1.706667-1.706667 0-5.12-1.706667-6.826667-1.706667-1.706667-3.413333-1.706667-6.826666-1.706666zM372.053333 535.893333c-1.706667-1.706667-5.12-3.413333-8.533333-1.706666s-5.12 3.413333-3.413333 6.826666l8.533333 141.653334c0 3.413333 1.706667 5.12 5.12 5.12 1.706667 1.706667 5.12 0 6.826667-1.706667l56.32-56.32c5.12-5.12 5.12-13.653333 0-18.773333l-64.853334-75.093334zM750.933333 262.826667c0-1.706667-1.706667-3.413333-3.413333-1.706667l-469.333333 78.506667c-1.706667 0-5.12 1.706667-5.12 5.12 0 1.706667 0 5.12 1.706666 6.826666l58.026667 68.266667c3.413333 5.12 10.24 5.12 15.36 3.413333l401.066667-155.306666c1.706667-1.706667 1.706667-3.413333 1.706666-5.12z"
                fill="#605DC8"
                p-id="6199"></path>
              <path
                d="M742.4 0h-358.4C199.68 0 51.2 148.48 51.2 332.8v358.4C51.2 875.52 199.68 1024 384 1024h358.4C926.72 1024 1075.2 875.52 1075.2 691.2v-358.4C1075.2 148.48 926.72 0 742.4 0z m157.013333 300.373333L713.386667 779.946667c-15.36 34.133333-56.32 47.786667-90.453334 32.426666-6.826667-3.413333-15.36-8.533333-20.48-15.36l-122.88-134.826666s-35.84 32.426667-102.4 93.866666c-11.946667 6.826667-27.306667 3.413333-29.013333 3.413334-18.773333-1.706667-30.72-18.773333-27.306667-37.546667L307.2 476.16l-68.266667-81.92c-25.6-27.306667-23.893333-69.973333 3.413334-93.866667 10.24-10.24 23.893333-15.36 37.546666-17.066666l551.253334-75.093334c37.546667-5.12 69.973333 22.186667 75.093333 58.026667 1.706667 10.24-1.706667 23.893333-6.826667 34.133333z"
                fill="#605DC8"
                p-id="6200"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    dongtai();
  }
}
