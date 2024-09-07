# -*- coding: utf-8 -*-
import json
from flask import Flask, render_template
from pyecharts import options as opts
from pyecharts.charts import Map
from flask.json import jsonify
from flask import Flask, render_template, request
from flask import Flask
from jinja2 import Markup, Environment, FileSystemLoader
from pyecharts.globals import CurrentConfig
import random
import time
from flask_cors import CORS
#%%
from pyecharts import options as opts
from pyecharts.charts import WordCloud
from pyecharts.globals import SymbolType
# 关于 CurrentConfig，可参考 [基本使用-全局变量]
CurrentConfig.GLOBAL_ENV = Environment(loader=FileSystemLoader("./templates"))
app = Flask(__name__, static_url_path='/static', static_folder='static', template_folder='templates')
CORS(app)

import requests
import json
# 预设
pre_design = {
        "messages": [
            {
                    "role": "user",
                    "content": "你现在是一个专业的职业规划师，要给出多角度多维度的就业意见"
                },
                {
                    "role": "assistant",
                    "content": "作为一个专业的职业规划师，我会给出以下多角度多维度的就业意见：\n\n1. 兴趣与职业匹配：\n在选择职业时，首先要考虑自己的兴趣和特长。如果能够找到与自己兴趣和特长相符合的职业，那么在工作中会更有热情和动力，也更容易取得成功。例如，如果喜欢与人打交道，可以选择销售、市场营销或人力资源等职业；如果喜欢研究和创新，可以选择研发、设计或技术等职业。\n\n2. 市场需求与发展前景：\n在选择职业时，也要考虑市场的需求和发展前景。一些职业可能现在很热门，但未来的发展前景并不一定很好；而一些看似冷门但有发展潜力的职业，可能会成为未来的热门职业。因此，要了解市场的需求和发展趋势，选择有发展前景的职业。\n\n3. 自身能力与竞争力：\n在选择职业时，还要考虑自身的能力和竞争力。不同的职业需要不同的技能和能力，如果自己的技能和能力与职业要求不匹配，那么在竞争中可能会处于劣势。因此，要了解职业的要求和所需技能，并通过学习和实践提升自己的能力和竞争力。\n\n4. 工作与生活平衡：\n在选择职业时，也要考虑工作与生活之间的平衡。如果职业需要投入过多的时间和精力，而影响到自己的生活质量和健康状况，那么这个职业可能不是理想的选择。因此，要选择能够保持工作与生活平衡的职业。\n\n5. 个人兴趣与行业了解：\n在选择职业时，也要考虑个人兴趣与行业了解。了解自己对该行业的兴趣和热情，以及该行业的发展趋势和前景，有助于更好地适应工作环境并取得更好的发展。\n\n综上所述，选择职业需要考虑多方面的因素，包括兴趣与职业匹配、市场需求与发展前景、自身能力与竞争力、工作与生活平衡以及个人兴趣与行业了解等。通过全面考虑并做出明智的决策，选择适合自己的职业并努力发展自己的事业。"
                },
        ]
    }

def get_access_token():
    """
    使用 AK，SK 生成鉴权签名（Access Token）
    :return: access_token，或是None(如果错误)
    """
    API_KEY = "rhHUCLwKoSXIfoNc1wiqhLDP"
    SECRET_KEY = "PtCvndmSKQPRhq0iYVDyX0nDrmTyjAAd"
    url = "https://aip.baidubce.com/oauth/2.0/token"
    params = {"grant_type": "client_credentials", "client_id": API_KEY, "client_secret": SECRET_KEY}
    return str(requests.post(url, params=params).json().get("access_token"))
def ask_question(the_question):

    url = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token="+get_access_token()

    payload = json.dumps(
        pre_design
    )
    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    r = response.json()
    result = r['result']
    return result,url,headers


def get_response(question):
    the_question = str(question)
    new_quest = {
        "role": "user",
        "content": str(the_question)
    }
    pre_design['messages'].append(new_quest)
    result, url, headers = ask_question(the_question)
    new_answer = {
            "role": "assistant",
            "content": result
        }
    pre_design['messages'].append(new_answer)
    return result

def get_data(job_name,city_name,wor_exp):
    import pandas
    from requests_html import HTMLSession
    import json
    import pandas as pd
    import requests
    用户输入职位 = job_name
    用户输入城市 = city_name
    城市编码 = {
        '全国': '410',
        '北京': '010',
        '上海': '020',
        '天津': '030',
        '重庆': '040',
        '广州': '050020',
        '深圳': '050090',
        '苏州': '060080',
        '南京': '060020',
        '杭州': '070020',
        '大连': '210040',
        '成都': '280020',
        '武汉': '170020',
        '西安': '270020'

}
    workExperiences = [{'code': '1', 'name': '应届生'},
                       {'code': '2', 'name': '实习生'},
                       {'code': '0$1', 'name': '1年以内'},
                       {'code': '1$3', 'name': '1-3年'},
                       {'code': '3$5', 'name': '3-5年'},
                       {'code': '5$10', 'name': '5-10年'},
                       {'code': '10$999', 'name': '10年以上'}]

    def choose_WE(工作经验):
        for i in workExperiences:
            if i['name'] == 工作经验:
                return i['code']
    url = "https://apic.liepin.com/api/com.liepin.searchfront4c.pc-search-job"
    payload = {
    "data": {
        "mainSearchPcConditionForm": {
            "city": 城市编码[用户输入城市],
            "dq": 城市编码[用户输入城市],
            "pubTime": "",
            "currentPage": 0,
            "pageSize": 40,
            "key": str(用户输入职位),
            "suggestTag": "",
            "workYearCode": choose_WE(wor_exp),
            "compId": "",
            "compName": "",
            "compTag": "",
            "industry": "",
            "salary": "",
            "jobKind": "",
            "compScale": "",
            "compKind": "",
            "compStage": "",
            "eduLevel": ""
        },
        "passThroughForm": {
            "scene": "input",
            "skId": "",
            "fkId": "",
            "ckId": "h2c8pxojavrmo1w785z7ueih2ybfpux8",
            "suggest": None
        }
    }
}
    session = HTMLSession()
    headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Connection": "keep-alive",
    "Content-Length": "399",
    "Content-Type": "application/json;charset=UTF-8;",
    "Cookie": "inited_user=0b40e95258783b742e53b3c4507c0e74; __gc_id=ba575649f262440b97583f40312082aa; __uuid=1680367209983.58; _ga=GA1.1.1780140015.1681902728; need_bind_tel=false; new_user=false; c_flag=fd8e161021d62dd50e5032f3c60a147a; imClientId=40be7e37d455d9dca12bac537377bfad; imId=40be7e37d455d9dc3e4f5f0f695234e5; imClientId_0=40be7e37d455d9dca12bac537377bfad; imId_0=40be7e37d455d9dc3e4f5f0f695234e5; __tlog=1687614466064.74%7C00000000%7C00000000%7Cs_00_t00%7Cs_00_t00; XSRF-TOKEN=AxC3zYUoTCa4UE6UMEBu3Q; acw_tc=276077df16876149605383539e9698e9728a5073c698641df54fd5db7119a7; Hm_lvt_a2647413544f5a04f00da7eee0d5e200=1686135762,1687265958,1687443970,1687614959; UniqueKey=fe87a9f3258ac642a9dba665e9526a14; liepin_login_valid=0; lt_auth=6eZeOHQMxlXw4XfcjTcLtacfj9%2BsU2yYpnhehk8FhoK5W6Ll4P%2FgSwuCq7gH%2FioIqxJ2Jv8zMLb2Mu7%2FzXpD7ksa8FGnlZ6utf6k1XweTuZiHuyflMXuqsjQQ5wtrXo6ykpgn2si0HU%3D; access_system=C; user_roles=0; user_photo=5f8fa3a679c7cc70efbf444e08u.png; user_name=%E6%B2%88%E8%BF%9E%E6%9D%B0; inited_user=0b40e95258783b742e53b3c4507c0e74; imApp_0=1; __session_seq=6; __uv_seq=13; Hm_lpvt_a2647413544f5a04f00da7eee0d5e200=1687614997; fe_im_socketSequence_new_0=2_2_2; fe_im_opened_pages=; fe_im_connectJson_0=%7B%220_fe87a9f3258ac642a9dba665e9526a14%22%3A%7B%22socketConnect%22%3A%222%22%2C%22connectDomain%22%3A%22liepin.com%22%7D%7D; _ga_54YTJKWN86=GS1.1.1687614958.17.1.1687615020.0.0.0",
    "Host": "api-c.liepin.com",
    "Origin": "https://www.liepin.com",
    "Referer": "https://www.liepin.com/",
    "Sec-Ch-Ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": "\"Windows\"",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    "X-Client-Type": "web",
    "X-Fscp-Bi-Stat": "{\"location\": \"https://www.liepin.com/zhaopin/?inputFrom=head_navigation&scene=init&workYearCode=1&ckId=oce2zl0xqfy64oyvrvccr557wnfp6j6a\"}",
    "X-Fscp-Fe-Version": "",
    "X-Fscp-Std-Info": "{\"client_id\": \"40108\"}",
    "X-Fscp-Trace-Id": "5f4fbbc3-01f7-44e5-82b2-fb737d5d07e0",
    "X-Fscp-Version": "1.1",
    "X-Requested-With": "XMLHttpRequest",
    "X-Xsrf-Token": "AxC3zYUoTCa4UE6UMEBu3Q"
}
    r = session.post(url, data=json.dumps(payload), headers=headers)
    response_data = r.json()


    # 翻页
    # page = response_data['data']['pagination']['totalPage']
    # response_df = []
    # for i in range(page): # 需要判断页面的数据有多少页
    #     payload['data']['mainSearchPcConditionForm']['currentPage']=i
    #     r = session.post(url, data=json.dumps(payload), headers=headers)
    #     response_data = r.json()
    #     df = pd.json_normalize(response_data['data']['data']['jobCardList'])
    #     response_df.append(df)
    #     wait_time = random.randint(3,10)
    #     time.sleep(wait_time)
    response_df = []
    df = pd.json_normalize(response_data['data']['data']['jobCardList'])
    response_df.append(df)
    df = pd.concat(response_df)
    key = payload['data']['mainSearchPcConditionForm']['key']
    df.to_excel('liepin2.xlsx')
    df = pd.read_excel('liepin2.xlsx')
    df

    if payload['data']['mainSearchPcConditionForm']["workYearCode"] in ['1','2']:
        df_PM_gz = df[
            ['job.labels', 'job.refreshTime', 'job.title', 'job.salary', 'job.dq', 'job.topJob', 'comp.compStage',
             'comp.compName', 'comp.compIndustry', 'comp.compScale']]
    else:
        df_PM_gz = df[
            ['job.labels', 'job.refreshTime', 'job.title', 'job.salary', 'job.dq', 'job.topJob', 'job.requireWorkYears',
             'job.requireEduLevel', 'comp.compStage', 'comp.compName', 'comp.compIndustry', 'comp.compScale']]

    df_PM_gz['job.dq'].value_counts()
    地区 = [ df_PM_gz['job.dq'].value_counts().index.tolist()[i].split('-')[1]\
             for i,v in enumerate(df_PM_gz['job.dq'].value_counts().index.tolist()) if '-' in v]
    地区
    岗位个数 = [ df_PM_gz['job.dq'].value_counts().values.tolist()[i] for i,v in enumerate(df_PM_gz['job.dq'].value_counts().index.tolist()) if "-" in v]
    岗位个数
    df_PM_gz['job.title'][df_PM_gz['job.title'].str.contains('（')].str.split('（').apply(lambda x: x[0])
    df_job_title = df_PM_gz['job.title'].apply(lambda x: x.split('（')[0].split('/')[0].split('(')[0]).value_counts()
    df_job_title.index.tolist()
    len(df_job_title.index.tolist())
    df_job_title.values.tolist()
    df_PM_gz['job.title'].value_counts()
    PM_title_words = [(df_job_title.index.tolist()[i], df_job_title.values.tolist()[i]) for i in
                      range(1, len(df_job_title.index.tolist()))]
    PM_title_words
    df_PM_gz['job.labels']
    df_PM_gz['job.labels'].values
    df_PM_gz['job.labels'].apply(lambda x: eval(x)).tolist()
    PM_labels_list = [j for i in df_PM_gz['job.labels'].apply(lambda x: eval(x)).tolist() for j in i]
    PM_labels_list
    PM_labels_words = [(i, PM_labels_list.count(i)) for i in set(PM_labels_list)]
    PM_labels_words
    if payload['data']['mainSearchPcConditionForm']["workYearCode"] in ['1','2']:
        df_PM_gz = df_PM_gz.rename(columns={
            'job.labels': '职位标签',
            'job.refreshTime': '职位更新时间',
            'job.title': '职位',
            'job.salary': '薪资',
            'job.dq': '地区',
            'job.topJob': '是否top职位',
            'comp.compStage': '公司融资情况',
            'comp.compName': '公司名称',
            'comp.compIndustry': '行业',
            'comp.compScale': '规模'
        })
    else:
        df_PM_gz = df_PM_gz.rename(columns={
            'job.labels': '职位标签',
            'job.refreshTime': '职位更新时间',
            'job.title': '职位',
            'job.salary': '薪资',
            'job.dq': '地区',
            'job.topJob': '是否top职位',
            'job.requireWorkYears': '工作年限',
            'job.requireEduLevel': '学历',
            'comp.compStage': '公司融资情况',
            'comp.compName': '公司名称',
            'comp.compIndustry': '行业',
            'comp.compScale': '规模'
        })
    if payload['data']['mainSearchPcConditionForm']["workYearCode"] in ['1','2']:
        非薪资面议 = df_PM_gz[~df_PM_gz['薪资'].str.contains("面议")]

    else:
        非薪资面议 = df_PM_gz[~df_PM_gz['薪资'].str.contains("面议|元/天")]

    if payload['data']['mainSearchPcConditionForm']["workYearCode"] in ['2']:
        非薪资面议_detail = 非薪资面议['薪资'].apply(lambda x: x.split('元')[0]).tolist()
        平均薪资 = [ round((int(i.split('-')[0]) + int(i.split('-')[1])) / 2 * 30) \
                        if i.__contains__('-') else int(i) * 30 \
                    for i in 非薪资面议_detail]
    else:
        非薪资面议_detail = 非薪资面议['薪资'].apply(lambda x: x.split('薪')[0].split('·')[0]).tolist()
        平均薪资 = [(int(i.split('-')[0]) + int(i.split('-')[1].split('k')[0])) / 2 \
                        if len(i) == 1 else round(
            (int(i.split('-')[0]) + int(i.split('-')[1].split('k')[0])) / 2 * 1000) \
                    for i in 非薪资面议_detail]

    非薪资面议['平均薪资'] = 平均薪资
    分地区_平均薪资 = 非薪资面议.groupby('地区').agg({'平均薪资': 'median'})
    分地区_平均薪资_values = [round(i[0], 1) for i in 分地区_平均薪资.values.tolist()]
    分地区_平均薪资_values
    分地区_平均薪资_index = 分地区_平均薪资.index.tolist()
    分地区_平均薪资_index

    return df_PM_gz,地区,岗位个数,分地区_平均薪资_index,分地区_平均薪资_values

def niuke_sche(地区):
    import requests
    from requests_html import HTMLSession
    payload = {
        'citys': str(地区),
        'query': str(地区),
        'tab': '1',
        "propertyId": '',
        'page': '',
        'pageSize': '20'
    }
    import json
    session = HTMLSession()
    headers = {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Content-Length": "64",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": "__jsluid_s=f145aed235aede061be13ec6a0d7f822; NOWCODERCLINETID=C3548057278D2CFBBCC678CC0FE5C657; gr_user_id=718e4616-4430-406d-a38f-02640b2978f6; _bl_uid=t6ljakIgbFL6IIiIvsnqessw231t; YD00000586307807%3AWM_NI=sGNTl2yc%2FnoCytlEawX8XKdkgIE2jgzT1U4%2FkD2Rsjclaf1n7KTny15Z5yHhQ4thjNU4AD7QNnMWkM%2Fl4eaikzoCSyC%2F9tDMWy1zWfLYgeXRAQdYeSxPwjcpMTaHRKu4ZG0%3D; YD00000586307807%3AWM_NIKE=9ca17ae2e6ffcda170e2e6ee89e54eb292baa8f73dfbac8ab6d44e828e8facc564aeeba0d2e64f94899997f32af0fea7c3b92ab19982b5ef3abbbde18fee49bbaca4a6e47d9ce898ace761a5978bd3e96dba8cffb6b725a99cfeb3f262a1b4af87b466f5959c8ffc3bf786fb9acb6493ecbc89e94697ec8fa5b65b8eb283b8ea47edb4fc86e463a9a6a1a4d27381f1f795c74795a7ff9bd66e9087a986db5a838facbae859bc90b98be27c8f8cafa9d141b7ec96a8b337e2a3; YD00000586307807%3AWM_TID=fauDYsR%2B9SlEFUURQVfFkioLghBaWWr8; c196c3667d214851b11233f5c17f99d5_gr_last_sent_cs1=750199276; _clck=149v8x0|2|fdh|0|1297; NOWCODERUID=7B09DDDDF355A255D68BD3450F9E2A1F; acw_tc=5be11fb4351b541111391f6df293e3f9042c42957bba9a3869eaaaa6b23ba340; csrfToken=RlcO56eG2PiDRaR19C2uWUEx; Hm_lvt_a808a1326b6c06c437de769d1b85b870=1697631260,1698325083,1698373505,1698551985; c196c3667d214851b11233f5c17f99d5_gr_session_id=d87d8d07-7922-48a5-a71b-a3818242e572; c196c3667d214851b11233f5c17f99d5_gr_session_id_d87d8d07-7922-48a5-a71b-a3818242e572=true; SERVERID=a66ca8a295d000c98b1464de3c1f1290|1698553307|1698551982; SERVERCORSID=a66ca8a295d000c98b1464de3c1f1290|1698553307|1698551982; Hm_lpvt_a808a1326b6c06c437de769d1b85b870=1698553308",
        "Origin": "https://www.nowcoder.com",
        "Referer": "https://www.nowcoder.com/jobs/recommend/campus",
        "Sec-Ch-Ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": "\"Windows\"",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest"
    }
    import pandas as pd
    import random
    niuke_responce_df = []
    for i in range(4):
        payload['page'] = str(i + 1)
        import time
        base_url = "https://www.nowcoder.com/np-api/u/school-schedule/list-card?_="
        timestamp = int(time.time() * 1000)  # 获取当前时间戳，以毫秒为单位
        url = base_url + str(timestamp)
        r = session.post(url, data=payload, headers=headers)
        response_data = r.json()
        niukes = pd.json_normalize(response_data['data']['datas'])
        niuke_responce_df.append(niukes)
    niuke_all_in = pd.concat(niuke_responce_df)
    niuke_all_in
    niuke_all_in.to_excel('niuke_responce_df.xlsx')
    niuke_excel = pd.read_excel('niuke_responce_df.xlsx')
    niuke_excel
    niuke_df = niuke_excel[
        ['name', 'cityList', 'wangshenTime', 'companyEvaluation', 'companyJobCount','homeLogo',
         'wangshenBeginDate', 'wangshenEndDate'
         ]]
    niuke_df
    niuke_CN = niuke_df.rename(columns={
        'name': '公司名称',
        'cityList': '招聘城市',
        'wangshenTime': '网申日期',
        'companyEvaluation': '公司详情',
        'companyJobCount': '岗位个数',
        'homeLogo': '公司LOGO',
        'wangshenBeginDate': '网申开始时间',
        'wangshenEndDate': '网申结束时间'
    })
    niuke_CN
    网申开始时间 = niuke_CN['网申开始时间'].tolist()
    网申开始时间
    网申结束时间 = niuke_CN['网申结束时间'].tolist()
    网申结束时间
    公司LOGO = niuke_CN['公司LOGO'].tolist()
    公司LOGO
    replace_img = 'assets/require_offer.png'
    公司LOGO = [replace_img if pd.isnull(item) else item for item in 公司LOGO]
    公司名称 = niuke_CN['公司名称'].tolist()
    公司名称
    招聘城市 = niuke_CN['招聘城市'].tolist()
    招聘城市
    replacement = '无'
    招聘城市 = [replacement if pd.isnull(item) else item for item in 招聘城市]
    去油招聘城市 = []
    for x in 招聘城市:
        去油招聘城市.append(str(x[1:-2]))
    去引号招聘城市 = [s.replace("'", '') for s in 去油招聘城市]
    去引号招聘城市
    for i in range(len(去引号招聘城市)):
        if 去引号招聘城市[i].__contains__(str(地区)):
            if 去引号招聘城市[i].count(str(地区)) >= 2:
                去引号招聘城市[i] = 去引号招聘城市[i].split(str(地区))[0]
    去引号招聘城市
    for i in range(len(去引号招聘城市)):
        if 去引号招聘城市[i] == '' or 去引号招聘城市[i] == "['[]']" or 去引号招聘城市[i] == '[]':
            去引号招聘城市[i] = str(地区)
    网申日期 = niuke_CN['网申日期'].tolist()
    import datetime
    replacement = '无'
    网申日期 = [replacement if pd.isnull(item) else item for item in 网申日期]
    for i in range(len(网申日期)):
        if 网申日期[i] == '无':
            if pd.isnull(网申开始时间[i]) == False and pd.isnull(网申结束时间[i]) == False:
                start_time = str(datetime.datetime.fromtimestamp(网申开始时间[i] / 1000.0))
                star_tim_date = start_time.split('-')[1] + '月' + start_time.split(' ')[0][-2:] + '日'
                end_time = str(datetime.datetime.fromtimestamp(网申结束时间[i] / 1000.0))
                end_tim_date = end_time.split('-')[1] + '月' + end_time.split(' ')[0][-2:] + '日'
                wangshen_time = star_tim_date + '至' + end_tim_date
                网申日期[i] = wangshen_time
            else:
                网申日期[i] = '已结束'
    网申日期
    公司详情 = niuke_CN['公司详情'].tolist()
    replacement = '无'
    公司详情 = [replacement if pd.isnull(item) else item for item in 公司详情]
    公司详情
    岗位个数 = niuke_CN['岗位个数'].tolist()
    岗位个数
    import requests
    from requests_html import HTMLSession
    session = HTMLSession()
    p = session.get('https://www.nowcoder.com/jobs/school/schedule')
    pic_data = []
    get_pic = p.html.find('img.logo')
    get_pic
    for y in get_pic:
        img_url = y.attrs['src']
        pic_data.append(img_url)
    pic_data
    scheduleData = [
        {"公司名称": 公司名称[i], "招聘城市": 去引号招聘城市[i], "网申日期": 网申日期[i], "公司详情": 公司详情[i],
         "岗位个数": 岗位个数[i],'公司LOGO':公司LOGO[i]} for i in range(len(公司名称))]
    schdata_all = json.dumps(scheduleData, ensure_ascii=False)
    return  schdata_all

def niuke_sche_default(地区):
    import requests
    from requests_html import HTMLSession
    payload = {
        'citys': str(地区),
        'query': '',
        'tab': '1',
        "propertyId": '',
        'page': '',
        'pageSize': '20'
    }
    import json
    session = HTMLSession()
    headers = {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Content-Length": "64",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": "__jsluid_s=f145aed235aede061be13ec6a0d7f822; NOWCODERCLINETID=C3548057278D2CFBBCC678CC0FE5C657; gr_user_id=718e4616-4430-406d-a38f-02640b2978f6; _bl_uid=t6ljakIgbFL6IIiIvsnqessw231t; YD00000586307807%3AWM_NI=sGNTl2yc%2FnoCytlEawX8XKdkgIE2jgzT1U4%2FkD2Rsjclaf1n7KTny15Z5yHhQ4thjNU4AD7QNnMWkM%2Fl4eaikzoCSyC%2F9tDMWy1zWfLYgeXRAQdYeSxPwjcpMTaHRKu4ZG0%3D; YD00000586307807%3AWM_NIKE=9ca17ae2e6ffcda170e2e6ee89e54eb292baa8f73dfbac8ab6d44e828e8facc564aeeba0d2e64f94899997f32af0fea7c3b92ab19982b5ef3abbbde18fee49bbaca4a6e47d9ce898ace761a5978bd3e96dba8cffb6b725a99cfeb3f262a1b4af87b466f5959c8ffc3bf786fb9acb6493ecbc89e94697ec8fa5b65b8eb283b8ea47edb4fc86e463a9a6a1a4d27381f1f795c74795a7ff9bd66e9087a986db5a838facbae859bc90b98be27c8f8cafa9d141b7ec96a8b337e2a3; YD00000586307807%3AWM_TID=fauDYsR%2B9SlEFUURQVfFkioLghBaWWr8; c196c3667d214851b11233f5c17f99d5_gr_last_sent_cs1=750199276; _clck=149v8x0|2|fdh|0|1297; NOWCODERUID=7B09DDDDF355A255D68BD3450F9E2A1F; acw_tc=5be11fb4351b541111391f6df293e3f9042c42957bba9a3869eaaaa6b23ba340; csrfToken=RlcO56eG2PiDRaR19C2uWUEx; Hm_lvt_a808a1326b6c06c437de769d1b85b870=1697631260,1698325083,1698373505,1698551985; c196c3667d214851b11233f5c17f99d5_gr_session_id=d87d8d07-7922-48a5-a71b-a3818242e572; c196c3667d214851b11233f5c17f99d5_gr_session_id_d87d8d07-7922-48a5-a71b-a3818242e572=true; SERVERID=a66ca8a295d000c98b1464de3c1f1290|1698553307|1698551982; SERVERCORSID=a66ca8a295d000c98b1464de3c1f1290|1698553307|1698551982; Hm_lpvt_a808a1326b6c06c437de769d1b85b870=1698553308",
        "Origin": "https://www.nowcoder.com",
        "Referer": "https://www.nowcoder.com/jobs/recommend/campus",
        "Sec-Ch-Ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": "\"Windows\"",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest"
    }
    import pandas as pd
    import random
    niuke_responce_df = []
    for i in range(4):
        payload['page'] = str(i + 1)
        import time
        base_url = "https://www.nowcoder.com/np-api/u/school-schedule/list-card?_="
        timestamp = int(time.time() * 1000)  # 获取当前时间戳，以毫秒为单位
        url = base_url + str(timestamp)
        r = session.post(url, data=payload, headers=headers)
        response_data = r.json()
        niukes = pd.json_normalize(response_data['data']['datas'])
        niuke_responce_df.append(niukes)
    niuke_all_in = pd.concat(niuke_responce_df)
    niuke_all_in
    niuke_all_in.to_excel('niuke_responce_df.xlsx')
    niuke_excel = pd.read_excel('niuke_responce_df.xlsx')
    niuke_excel
    niuke_df = niuke_excel[
        ['name', 'cityList', 'wangshenTime', 'companyEvaluation', 'companyJobCount','homeLogo',
         'wangshenBeginDate', 'wangshenEndDate'
         ]]
    niuke_df
    niuke_CN = niuke_df.rename(columns={
        'name': '公司名称',
        'cityList': '招聘城市',
        'wangshenTime': '网申日期',
        'companyEvaluation': '公司详情',
        'companyJobCount': '岗位个数',
        'homeLogo': '公司LOGO',
        'wangshenBeginDate': '网申开始时间',
        'wangshenEndDate': '网申结束时间'
    })
    niuke_CN
    网申开始时间 = niuke_CN['网申开始时间'].tolist()
    网申开始时间
    网申结束时间 = niuke_CN['网申结束时间'].tolist()
    网申结束时间
    公司LOGO = niuke_CN['公司LOGO'].tolist()
    公司LOGO
    replace_img = 'assets/require_offer.png'
    公司LOGO = [replace_img if pd.isnull(item) else item for item in 公司LOGO]
    公司名称 = niuke_CN['公司名称'].tolist()
    公司名称
    招聘城市 = niuke_CN['招聘城市'].tolist()
    招聘城市
    replacement = '无'
    招聘城市 = [replacement if pd.isnull(item) else item for item in 招聘城市]
    去油招聘城市 = []
    for x in 招聘城市:
        去油招聘城市.append(str(x[1:-2]))
    去引号招聘城市 = [s.replace("'", '') for s in 去油招聘城市]
    for i in range(len(去引号招聘城市)):
        if 去引号招聘城市[i].__contains__(str(地区)):
            if 去引号招聘城市[i].count(str(地区)) >= 2:
                去引号招聘城市[i] = 去引号招聘城市[i].split(str(地区))[0]
    去引号招聘城市
    for i in range(len(去引号招聘城市)):
        if 去引号招聘城市[i].count(去引号招聘城市[i].split(', ')[0]) == 2:
            去引号招聘城市[i] = 去引号招聘城市[i].split(', ')[0]
    去引号招聘城市
    for i in range(len(去引号招聘城市)):
        if 去引号招聘城市[i] == '' or 去引号招聘城市[i] == "['[]']" or 去引号招聘城市[i] == '[]':
            去引号招聘城市[i] = str(地区)
    网申日期 = niuke_CN['网申日期'].tolist()
    import datetime
    replacement = '无'
    网申日期 = [replacement if pd.isnull(item) else item for item in 网申日期]
    for i in range(len(网申日期)):
        if 网申日期[i] == '无':
            if pd.isnull(网申开始时间[i]) == False and pd.isnull(网申结束时间[i]) == False:
                start_time = str(datetime.datetime.fromtimestamp(网申开始时间[i] / 1000.0))
                star_tim_date = start_time.split('-')[1] + '月' + start_time.split(' ')[0][-2:] + '日'
                end_time = str(datetime.datetime.fromtimestamp(网申结束时间[i] / 1000.0))
                end_tim_date = end_time.split('-')[1] + '月' + end_time.split(' ')[0][-2:] + '日'
                wangshen_time = star_tim_date + '至' + end_tim_date
                网申日期[i] = wangshen_time
            else:
                网申日期[i] = '已结束'
    网申日期
    公司详情 = niuke_CN['公司详情'].tolist()
    replacement = '无'
    公司详情 = [replacement if pd.isnull(item) else item for item in 公司详情]
    公司详情
    岗位个数 = niuke_CN['岗位个数'].tolist()
    岗位个数
    import requests
    from requests_html import HTMLSession
    session = HTMLSession()
    p = session.get('https://www.nowcoder.com/jobs/school/schedule')
    pic_data = []
    get_pic = p.html.find('img.logo')
    get_pic
    for y in get_pic:
        img_url = y.attrs['src']
        pic_data.append(img_url)
    pic_data
    scheduleData = [
        {"公司名称": 公司名称[i], "招聘城市": 去引号招聘城市[i], "网申日期": 网申日期[i], "公司详情": 公司详情[i],
         "岗位个数": 岗位个数[i],'公司LOGO':公司LOGO[i]} for i in range(len(公司名称))]
    schdata_all = json.dumps(scheduleData, ensure_ascii=False)
    return  schdata_all

def niu_neitui():
    import requests
    from requests_html import HTMLSession
    import time

    base_url = 'https://gw-c.nowcoder.com/api/sparta/pc/search?_='
    timestamp = int(time.time() * 1000)
    url = base_url + str(timestamp)
    print(url)
    payload = {
        "type": "all",
        "query": "内推",
        "page": 1,
        "tag": [],
        "order": "",
        "gioParams": {"logid_var": "C3548057278D2CFBBCC678CCOFE5C657-" + str(timestamp),
                      "sessionID_var": "704_1698682523183_5667",
                      "searchFrom_var": "历史搜索",
                      "searchEnter_var": "主站"}
    }
    import json
    session = HTMLSession()
    headers = {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Content-Length": "235",
        "Content-Type": "application/json",
        "Cookie": "NOWCODERCLINETID=C3548057278D2CFBBCC678CC0FE5C657; gr_user_id=718e4616-4430-406d-a38f-02640b2978f6; c196c3667d214851b11233f5c17f99d5_gr_last_sent_cs1=750199276; _clck=149v8x0|2|fdh|0|1297; NOWCODERUID=7B09DDDDF355A255D68BD3450F9E2A1F; isAgreementChecked=true; t=B31B0C9FD04BA82146EDD0A14199743F; username=%E7%99%BD%E5%AE%A2101; username.sig=05TpHLZDjRg1t_vi0WPcKi1y5AljvsuOC4wqWlSknMI; uid=750199276; uid.sig=Hh_Od6Zck-iegYpK0azuMjiRoNfN8wvUuISrlQpTf9w; Hm_lvt_a808a1326b6c06c437de769d1b85b870=1698551985,1698652368,1698666301,1698682504; c196c3667d214851b11233f5c17f99d5_gr_session_id=30a28c0e-5f03-44e7-9857-0137ac29f495; c196c3667d214851b11233f5c17f99d5_gr_last_sent_sid_with_cs1=30a28c0e-5f03-44e7-9857-0137ac29f495; c196c3667d214851b11233f5c17f99d5_gr_session_id_30a28c0e-5f03-44e7-9857-0137ac29f495=true; acw_tc=6f72c2ab1bd46a9a6b981bd4fa5c368fdb7d826e98aa0db09ceed8d47552b9e1; Hm_lpvt_a808a1326b6c06c437de769d1b85b870=1698682526; c196c3667d214851b11233f5c17f99d5_gr_cs1=750199276",
        "Origin": "https://www.nowcoder.com",
        "Referer": "https://www.nowcoder.com/",
        "Sec-Ch-Ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": "\"Windows\"",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest"
    }
    neitui_response_df = []
    for i in range(4):
        import time
        base_url = 'https://gw-c.nowcoder.com/api/sparta/pc/search?_='
        timestamp = int(time.time() * 1000)
        url = base_url + str(timestamp)
        payload['page'] = i
        payload['gioParams']['logid_var'] = "C3548057278D2CFBBCC678CCOFE5C657-" + str(timestamp)
        r = session.post(url, json=payload, headers=headers)
        response_data = r.json()
        import pandas as pd
        df_niuke_neitui = pd.json_normalize(response_data['data']['records'])
        neitui_response_df.append(df_niuke_neitui)
    neitui_all_in = pd.concat(neitui_response_df)
    neitui_all_in.to_excel('neitui.xlsx')
    neirui_excel = pd.read_excel('neitui.xlsx')
    neirui_excel
    neitui_df = neirui_excel[
        ['data.userBrief.nickname', 'data.userBrief.authDisplayInfo', 'data.contentData.title',
         'data.contentData.content', 'data.contentData.createTime']
    ]
    neitui_df
    neitui_CN = neitui_df.rename(columns={
        'data.userBrief.nickname': '用户名称',
        'data.userBrief.authDisplayInfo': '用户职位',
        'data.contentData.title': '内推标题',
        'data.contentData.content': '内推内容',
        'data.contentData.createTime': '发布时间',
        # 'data.jobSubscript.jobMessage': '招聘岗位'
    })
    neitui_CN
    用户名称 = neitui_CN['用户名称'].tolist()
    用户名称
    用户职位 = neitui_CN['用户职位'].tolist()
    用户职位
    内推标题 = neitui_CN['内推标题'].tolist()
    replacement = '无'
    内推标题 = [replacement if pd.isnull(item) else item for item in 内推标题]
    for i in range(len(内推标题)):
        内推标题[i] = str(内推标题[i])
    for i in range(len(内推标题)):
        if len(内推标题[i]) >= 8:
            内推标题[i] = 内推标题[i][:7]
    内推内容 = neitui_CN['内推内容'].tolist()
    内推内容
    内推内容 = [replacement if pd.isnull(item) else item for item in 内推内容]
    发布时间 = neitui_CN['发布时间'].tolist()
    发布时间
    import datetime
    replacement = "无"
    # 列表推导式，完整写得建新list
    发布时间 = [replacement if pd.isnull(item) else item for item in 发布时间]
    发布时间
    发布时间_日期 = []
    for i in range(len(发布时间)):
        if 发布时间[i] == '无':
            发布时间_日期.append(发布时间[i])
        else:
            the_second = 发布时间[i] / 1000.0
            correct_time = datetime.datetime.fromtimestamp(the_second)
            stand_time = correct_time.strftime('%Y 年 %m 月 %d 日 %H 时 %M 分 %S 秒')
            发布时间_日期.append(stand_time)
    发布时间_日期
    # 招聘岗位 = neitui_CN['招聘岗位'].tolist()
    # replacement = "无"
    # # 列表推导式，完整写得建新list
    # 招聘岗位 = [replacement if pd.isnull(item) else item for item in 招聘岗位]
    # 招聘岗位
    neituiData = [{'用户名称': 用户名称[i], '用户职位': 用户职位[i], '内推标题': 内推标题[i], '内推内容': 内推内容[i],
                   '发布时间': 发布时间_日期[i],} for i in range(len(用户名称))]
    neituiData
    neitui_clear_Data = []
    for i in range(len(neituiData)):
        if neituiData[i]['内推标题'] != '无':
            neitui_clear_Data.append(neituiData[i])
    neitui_clear_Data
    neitui_all = json.dumps(neitui_clear_Data, ensure_ascii=False)
    return neitui_all

def get_ho_data(gz_where,ren_pri):
    from requests_html import HTMLSession
    session = HTMLSession()
    rp = 'rp1'
    if str(gz_where) == '天河':
        base_url = 'https://gz.lianjia.com/zufang/tianhe/'
    if str(gz_where) == '越秀':
        base_url = 'https://gz.lianjia.com/zufang/yuexiu/'
    if str(gz_where) == '海珠':
        base_url = 'https://gz.lianjia.com/zufang/haizhu/'
    if str(gz_where) == '番禺':
        base_url = 'https://gz.lianjia.com/zufang/panyu/'
    if str(gz_where) == '白云':
        base_url = 'https://gz.lianjia.com/zufang/baiyun//'
    if str(gz_where) == '黄埔':
        base_url = 'https://gz.lianjia.com/zufang/huangpugz/'
    if str(gz_where) == '从化':
        base_url = 'https://gz.lianjia.com/zufang/conghua/'
    if str(gz_where) == '增城':
        base_url = 'https://gz.lianjia.com/zufang/zengcheng/'
    if str(gz_where) == '花都':
        base_url = 'https://gz.lianjia.com/zufang/huadou/'
    if str(gz_where) == '南沙':
        base_url = 'https://gz.lianjia.com/zufang/nansha/'
    if str(ren_pri) == '小于1000':
        rp = 'rp1'
    if str(ren_pri) == '1000-2000':
        rp = 'rp2'
    if str(ren_pri) == '1500-2000':
        rp = 'rp3'
    if str(ren_pri) == '2000-2500':
        rp = 'rp4'
    if str(ren_pri) == '2500-3000':
        rp = 'rp5'
    url = base_url + rp
    r = session.get(url)
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(r.text, 'html.parser')
    pic = soup.find_all('img')
    pic
    pic_url = []
    for x in pic:
        srcs = x.get('data-src')
        if srcs:
            pic_url.append(srcs)
    pic_url
    house_title = r.html.find('a.twoline')
    the_house_title = [x.text for x in house_title]
    house_pri_sear = r.html.find('em')
    house_prize = [i.text for i in house_pri_sear]
    house_prize
    house_prize_clear = [(int(x.split('-')[0]) + int(x.split('-')[1])) / 2 if x.__contains__('-') else x for x in house_prize]
    house_prize_clear
    house_detail = r.html.find('p.content__list--item--des ')
    house_detail
    house_clear_detail = []
    house_clear_title = []
    house_clear_prize = []
    for i in range(len(the_house_title)):
        if house_detail[i].text.__contains__('/'):
            house_clear_detail.append(house_detail[i])
            house_clear_title.append(the_house_title[i])
            house_clear_prize.append(house_prize_clear[i])
    house_where = [house_clear_detail[i].text.split('/')[0] for i in range(len(the_house_title))]
    house_where
    house_square = [house_clear_detail[i].text.split('/')[1] for i in range(len(the_house_title))]
    house_square
    house_direction = [house_clear_detail[i].text.split('/')[2] for i in range(len(the_house_title))]
    house_direction
    house_scale = [house_clear_detail[i].text.split('/')[3] if len(house_clear_detail) == 3 else '1室0厅1卫' for x, i in
                   enumerate(house_clear_detail)]
    house_scale

    import pandas as pd
    house_content = pd.DataFrame()
    for i in range(len(house_title)):
        house_content.loc[i, '房子图片'] = pic_url[i]
        house_content.loc[i, '房子标题'] = house_clear_title[i]
        house_content.loc[i, '房子地址'] = house_where[i]
        house_content.loc[i, '房子平方数'] = house_square[i]
        house_content.loc[i, '房子朝向'] = house_direction[i]
        house_content.loc[i, '房子规模'] = house_scale[i]
        house_content.loc[i, '房子价格'] = house_clear_prize[i]
    house_content.to_excel('house_content.xlsx')
    house_all_in = pd.read_excel('house_content.xlsx')
    house_all_in
    house_Data_All = [{'房子图片': pic_url[i],'房子标题': house_clear_title[i], '房子地址': house_where[i], '房子平方数': house_square[i],
                       '房子朝向': house_direction[i], '房子规模': house_scale[i],
                       '房子价格': house_clear_prize[i]} for i in range(len(house_clear_title))]
    house_Data_All
    hous_Data = json.dumps(house_Data_All,ensure_ascii=False)
    return  hous_Data

def solve_scal(x):
    sort_list = ['1-49人',
        '50-99人',
        '100-499人',
        '500-999人',
        '1000-2000人',
        '2000-5000人',
        '10000人以上',
        '5000-10000人'
        ]

    empty_list = []
    new_list = []
    for y in x:
        if y == sort_list[0]:
            empty_list.append(int(0))
        elif y == sort_list[1]:
            empty_list.append(int(1))
        elif y == sort_list[2]:
            empty_list.append(int(2))
        elif y == sort_list[3]:
            empty_list.append(int(3))
        elif y == sort_list[4]:
            empty_list.append(int(4))
        elif y == sort_list[5]:
            empty_list.append(int(5))
        elif y == sort_list[6]:
            empty_list.append(int(6))
        elif y == sort_list[7]:
            empty_list.append(int(7))
    get_list = sorted(empty_list)
    for i in range(len(get_list)):
        new_list.append(sort_list[get_list[i]])
    return  new_list

def get_tree_graph(job_name,city_name):
    import pandas
    from requests_html import HTMLSession
    import json
    import pandas as pd
    import requests
    用户输入职位 = job_name
    用户输入城市 = city_name
    城市编码 = {
    '全国': '410',
        '北京': '010',
        '上海': '020',
        '天津': '030',
        '重庆': '040',
        '广州': '050020',
        '深圳': '050090',
        '苏州': '060080',
        '南京': '060020',
        '杭州': '070020',
        '大连': '210040',
        '成都': '280020',
        '武汉': '170020',
        '西安': '270020'

}
    url = "https://apic.liepin.com/api/com.liepin.searchfront4c.pc-search-job"
    payload = {
    "data": {
        "mainSearchPcConditionForm": {
            "city": 城市编码[用户输入城市],
            "dq": 城市编码[用户输入城市],
            "pubTime": "",
            "currentPage": 0,
            "pageSize": 40,
            "key": str(用户输入职位),
            "suggestTag": "",
            "workYearCode": "0",
            "compId": "",
            "compName": "",
            "compTag": "",
            "industry": "",
            "salary": "",
            "jobKind": "",
            "compScale": "",
            "compKind": "",
            "compStage": "",
            "eduLevel": ""
        },
        "passThroughForm": {
            "scene": "input",
            "skId": "",
            "fkId": "",
            "ckId": "h2c8pxojavrmo1w785z7ueih2ybfpux8",
            "suggest": None
        }
    }
}
    session = HTMLSession()
    headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Connection": "keep-alive",
    "Content-Length": "399",
    "Content-Type": "application/json;charset=UTF-8;",
    "Cookie": "inited_user=0b40e95258783b742e53b3c4507c0e74; __gc_id=ba575649f262440b97583f40312082aa; __uuid=1680367209983.58; _ga=GA1.1.1780140015.1681902728; need_bind_tel=false; new_user=false; c_flag=fd8e161021d62dd50e5032f3c60a147a; imClientId=40be7e37d455d9dca12bac537377bfad; imId=40be7e37d455d9dc3e4f5f0f695234e5; imClientId_0=40be7e37d455d9dca12bac537377bfad; imId_0=40be7e37d455d9dc3e4f5f0f695234e5; __tlog=1687614466064.74%7C00000000%7C00000000%7Cs_00_t00%7Cs_00_t00; XSRF-TOKEN=AxC3zYUoTCa4UE6UMEBu3Q; acw_tc=276077df16876149605383539e9698e9728a5073c698641df54fd5db7119a7; Hm_lvt_a2647413544f5a04f00da7eee0d5e200=1686135762,1687265958,1687443970,1687614959; UniqueKey=fe87a9f3258ac642a9dba665e9526a14; liepin_login_valid=0; lt_auth=6eZeOHQMxlXw4XfcjTcLtacfj9%2BsU2yYpnhehk8FhoK5W6Ll4P%2FgSwuCq7gH%2FioIqxJ2Jv8zMLb2Mu7%2FzXpD7ksa8FGnlZ6utf6k1XweTuZiHuyflMXuqsjQQ5wtrXo6ykpgn2si0HU%3D; access_system=C; user_roles=0; user_photo=5f8fa3a679c7cc70efbf444e08u.png; user_name=%E6%B2%88%E8%BF%9E%E6%9D%B0; inited_user=0b40e95258783b742e53b3c4507c0e74; imApp_0=1; __session_seq=6; __uv_seq=13; Hm_lpvt_a2647413544f5a04f00da7eee0d5e200=1687614997; fe_im_socketSequence_new_0=2_2_2; fe_im_opened_pages=; fe_im_connectJson_0=%7B%220_fe87a9f3258ac642a9dba665e9526a14%22%3A%7B%22socketConnect%22%3A%222%22%2C%22connectDomain%22%3A%22liepin.com%22%7D%7D; _ga_54YTJKWN86=GS1.1.1687614958.17.1.1687615020.0.0.0",
    "Host": "api-c.liepin.com",
    "Origin": "https://www.liepin.com",
    "Referer": "https://www.liepin.com/",
    "Sec-Ch-Ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": "\"Windows\"",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    "X-Client-Type": "web",
    "X-Fscp-Bi-Stat": "{\"location\": \"https://www.liepin.com/zhaopin/?inputFrom=head_navigation&scene=init&workYearCode=1&ckId=oce2zl0xqfy64oyvrvccr557wnfp6j6a\"}",
    "X-Fscp-Fe-Version": "",
    "X-Fscp-Std-Info": "{\"client_id\": \"40108\"}",
    "X-Fscp-Trace-Id": "5f4fbbc3-01f7-44e5-82b2-fb737d5d07e0",
    "X-Fscp-Version": "1.1",
    "X-Requested-With": "XMLHttpRequest",
    "X-Xsrf-Token": "AxC3zYUoTCa4UE6UMEBu3Q"
}
    r = session.post(url, data=json.dumps(payload), headers=headers)
    response_data = r.json()
    page = response_data['data']['pagination']['totalPage']
    response_df = []
    for i in range(page): # 需要判断页面的数据有多少页
        payload['data']['mainSearchPcConditionForm']['currentPage']=i
        # send a POST request with headers
        r = requests.post(url, data=json.dumps(payload), headers=headers)
    response_data = r.json()
    print(response_data)
    df = pd.json_normalize(response_data['data']['data']['jobCardList'])
    response_df.append(df)
    df = pd.concat(response_df)
    key = payload['data']['mainSearchPcConditionForm']['key']
    df.to_excel('liepin2.xlsx')
    df_all = pd.read_excel('liepin2.xlsx')
    df_all
    df_cities = df[['job.dq','comp.compScale','comp.compIndustry','comp.compName','job.title','job.salary']]
    df_cities
    df_cities = df_cities.rename(columns={
    'job.dq':'地区',
    'comp.compScale':'公司规模',
    'comp.compIndustry':'公司行业',
    'comp.compName':'公司名称',
    'job.title':'岗位名称',
    'job.salary':'工资',

    })
    set_dq = set(df_cities['地区'])
    list_dq = list(set_dq)
    list_dq
    a = len(list_dq)
    data_all = [{
        'name':city_name,
        'children':[
                    {'name':a,
                     'children':[
                         {
                            'name':"公司规模:"+b,
                             'children':[
                                 {
                                     'name': "公司行业:"+str(c),
                                     'children':[
                                         {
                                           'name': "公司名称:"+d,
                                           'children':[
                                               {
                                                'name': "岗位名称:"+e,
                                                'children':[
                                                    {
                                                       'name': "工资："+f,
                                                    } for f in list(set(df_cities[(df_cities['地区'] == a) & (df_cities['公司规模'] == b) & (df_cities['公司行业'] == c)  & (df_cities['公司名称'] == d) & (df_cities['岗位名称'] == e)]['工资']))
                                                ]
                                               } for e in list(set(df_cities[(df_cities['地区'] == a) & (df_cities['公司规模'] == b) & (df_cities['公司行业'] == c)  & (df_cities['公司名称'] == d)]['岗位名称']))
                                           ]
                                         } for d in list(set(df_cities[(df_cities['地区'] == a) & (df_cities['公司规模'] == b) & (df_cities['公司行业'] == c) ]['公司名称']))
                                     ]
                                  } for c in list(set(df_cities[(df_cities['地区'] == a) & (df_cities['公司规模'] == b)]['公司行业']))
                             ]
                         } for b in solve_scal(list(set(df_cities[(df_cities['地区'] == a)]['公司规模'])))
                     ]
                     }  for a in list(set(df_cities['地区']))
         ]
        }
    ]
    data_all
    from pyecharts import options as opts
    from pyecharts.charts import Tree
    c = (
        Tree()
        .add("", data_all, collapse_interval=1, layout="radial")
        .set_global_opts(title_opts=opts.TitleOpts(title=city_name +'-' +job_name +'-'+"岗位速查树状图"))
    )
    import time
    time.localtime()
    output_time = str(time.localtime().tm_year) + '-' \
                  + str(time.localtime().tm_mon) + '-' \
                  + str(time.localtime().tm_mday)
    output_time
    c_generate_charts = (
        Tree()
        .add("", data_all, collapse_interval=1, layout="radial")
        .set_global_opts(title_opts=opts.TitleOpts(title=city_name + '-' + job_name + '-' + "岗位速查树状图"))
        .render(f'charts/{city_name}_{job_name}_{output_time}_tree.html')
    )
    return c


@app.route("/")
def index_boot():
    return render_template("index_bootstrap.html")

@app.route('/midd', methods=['POST'])
def midd():
    job_name = request.form.get('job_name')
    city_name = request.form.get('city_name')
    wor_exp = request.form.get('wor_exp')
    from markupsafe import Markup
    df_PM_gz,地区,岗位个数,分地区_平均薪资_index,分地区_平均薪资_values= get_data(job_name, city_name,wor_exp)
    ori_dat = df_PM_gz.to_json(orient='records',force_ascii=False)
    data = {
        '分地区':分地区_平均薪资_index,
        '平均薪资':分地区_平均薪资_values,
        '地区':地区,
        '岗位个数':岗位个数,
        'dataFrame':ori_dat
    }
    return jsonify(data)

@app.route('/niu_sch', methods=['POST'])
def niuk_sch():
    地区 = request.form.get('sch_where')
    sch_data = niuke_sche(地区)
    schdata_all = json.dumps(sch_data, ensure_ascii=False)
    sch_adata = json.loads(schdata_all)
    return sch_adata

@app.route('/niu_sch_default', methods=['POST'])
def niuk_sch_defaults():
    地区 = request.form.get('sch_where')
    sch_data = niuke_sche_default(地区)
    schdata_all = json.dumps(sch_data, ensure_ascii=False)
    sch_adata = json.loads(schdata_all)
    return sch_adata

@app.route('/niu_neitui', methods=['POST'])
def niu_neitui_method():
    niu_tui_data = niu_neitui()
    niu_tuis_data = json.dumps(niu_tui_data, ensure_ascii=False)
    niu_data = json.loads(niu_tuis_data)
    return niu_data

@app.route('/house_datas', methods=['POST'])
def get_house_data():
    gz_where = request.form.get('gz_where')
    ren_pri = request.form.get('ren_pri')
    house_data  = get_ho_data(gz_where,ren_pri)
    the_house_data = json.dumps(house_data, ensure_ascii=False)
    end_house_data = json.loads(the_house_data)
    return end_house_data

@app.route('/wenxin_response', methods=['POST'])
def get_wx_respon():
    问题 = request.form.get('wx_question')
    wx_answer = get_response(问题)
    return str(wx_answer)


def get_the_data(job_name,city_name):
    import pandas
    from requests_html import HTMLSession
    import json
    import pandas as pd
    import requests
    用户输入职位 = job_name
    用户输入城市 = city_name
    城市编码 = {
    '全国': '410',
        '北京': '010',
        '上海': '020',
        '天津': '030',
        '重庆': '040',
        '广州': '050020',
        '深圳': '050090',
        '苏州': '060080',
        '南京': '060020',
        '杭州': '070020',
        '大连': '210040',
        '成都': '280020',
        '武汉': '170020',
        '西安': '270020'

}
    url = "https://apic.liepin.com/api/com.liepin.searchfront4c.pc-search-job"
    payload = {
    "data": {
        "mainSearchPcConditionForm": {
            "city": 城市编码[用户输入城市],
            "dq": 城市编码[用户输入城市],
            "pubTime": "",
            "currentPage": 0,
            "pageSize": 40,
            "key": str(用户输入职位),
            "suggestTag": "",
            "workYearCode": "0",
            "compId": "",
            "compName": "",
            "compTag": "",
            "industry": "",
            "salary": "",
            "jobKind": "",
            "compScale": "",
            "compKind": "",
            "compStage": "",
            "eduLevel": ""
        },
        "passThroughForm": {
            "scene": "input",
            "skId": "",
            "fkId": "",
            "ckId": "h2c8pxojavrmo1w785z7ueih2ybfpux8",
            "suggest": None
        }
    }
}
    session = HTMLSession()
    headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Connection": "keep-alive",
    "Content-Length": "399",
    "Content-Type": "application/json;charset=UTF-8;",
    "Cookie": "inited_user=0b40e95258783b742e53b3c4507c0e74; __gc_id=ba575649f262440b97583f40312082aa; __uuid=1680367209983.58; _ga=GA1.1.1780140015.1681902728; need_bind_tel=false; new_user=false; c_flag=fd8e161021d62dd50e5032f3c60a147a; imClientId=40be7e37d455d9dca12bac537377bfad; imId=40be7e37d455d9dc3e4f5f0f695234e5; imClientId_0=40be7e37d455d9dca12bac537377bfad; imId_0=40be7e37d455d9dc3e4f5f0f695234e5; __tlog=1687614466064.74%7C00000000%7C00000000%7Cs_00_t00%7Cs_00_t00; XSRF-TOKEN=AxC3zYUoTCa4UE6UMEBu3Q; acw_tc=276077df16876149605383539e9698e9728a5073c698641df54fd5db7119a7; Hm_lvt_a2647413544f5a04f00da7eee0d5e200=1686135762,1687265958,1687443970,1687614959; UniqueKey=fe87a9f3258ac642a9dba665e9526a14; liepin_login_valid=0; lt_auth=6eZeOHQMxlXw4XfcjTcLtacfj9%2BsU2yYpnhehk8FhoK5W6Ll4P%2FgSwuCq7gH%2FioIqxJ2Jv8zMLb2Mu7%2FzXpD7ksa8FGnlZ6utf6k1XweTuZiHuyflMXuqsjQQ5wtrXo6ykpgn2si0HU%3D; access_system=C; user_roles=0; user_photo=5f8fa3a679c7cc70efbf444e08u.png; user_name=%E6%B2%88%E8%BF%9E%E6%9D%B0; inited_user=0b40e95258783b742e53b3c4507c0e74; imApp_0=1; __session_seq=6; __uv_seq=13; Hm_lpvt_a2647413544f5a04f00da7eee0d5e200=1687614997; fe_im_socketSequence_new_0=2_2_2; fe_im_opened_pages=; fe_im_connectJson_0=%7B%220_fe87a9f3258ac642a9dba665e9526a14%22%3A%7B%22socketConnect%22%3A%222%22%2C%22connectDomain%22%3A%22liepin.com%22%7D%7D; _ga_54YTJKWN86=GS1.1.1687614958.17.1.1687615020.0.0.0",
    "Host": "api-c.liepin.com",
    "Origin": "https://www.liepin.com",
    "Referer": "https://www.liepin.com/",
    "Sec-Ch-Ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": "\"Windows\"",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    "X-Client-Type": "web",
    "X-Fscp-Bi-Stat": "{\"location\": \"https://www.liepin.com/zhaopin/?inputFrom=head_navigation&scene=init&workYearCode=1&ckId=oce2zl0xqfy64oyvrvccr557wnfp6j6a\"}",
    "X-Fscp-Fe-Version": "",
    "X-Fscp-Std-Info": "{\"client_id\": \"40108\"}",
    "X-Fscp-Trace-Id": "5f4fbbc3-01f7-44e5-82b2-fb737d5d07e0",
    "X-Fscp-Version": "1.1",
    "X-Requested-With": "XMLHttpRequest",
    "X-Xsrf-Token": "AxC3zYUoTCa4UE6UMEBu3Q"
}
    r = session.post(url, data=json.dumps(payload), headers=headers)
    response_data = r.json()
    page = response_data['data']['pagination']['totalPage']
    response_df = []
    for i in range(page): # 需要判断页面的数据有多少页
        payload['data']['mainSearchPcConditionForm']['currentPage']=i
        # send a POST request with headers
        r = requests.post(url, data=json.dumps(payload), headers=headers)
    response_data = r.json()
    print(response_data)
    df = pd.json_normalize(response_data['data']['data']['jobCardList'])
    response_df.append(df)
    df = pd.concat(response_df)
    key = payload['data']['mainSearchPcConditionForm']['key']
    df.to_excel('liepin2.xlsx')
    df = pd.read_excel('liepin2.xlsx')
    df

    df_PM_gz =  df[['job.labels','job.refreshTime','job.title','job.salary','job.dq','job.topJob','job.requireWorkYears','job.requireEduLevel','comp.compStage','comp.compName','comp.compIndustry','comp.compScale']]
    df_PM_gz

    df_PM_gz['job.dq'].value_counts()
    地区 = [ df_PM_gz['job.dq'].value_counts().index.tolist()[i].split('-')[1]\
             for i,v in enumerate(df_PM_gz['job.dq'].value_counts().index.tolist()) if '-' in v]
    地区
    岗位个数 = [ df_PM_gz['job.dq'].value_counts().values.tolist()[i] for i,v in enumerate(df_PM_gz['job.dq'].value_counts().index.tolist()) if "-" in v]
    岗位个数
    df_PM_gz['job.title'][df_PM_gz['job.title'].str.contains('（')].str.split('（').apply(lambda x: x[0])
    df_job_title = df_PM_gz['job.title'].apply(lambda x: x.split('（')[0].split('/')[0].split('(')[0]).value_counts()
    df_job_title.index.tolist()
    len(df_job_title.index.tolist())
    df_job_title.values.tolist()
    df_PM_gz['job.title'].value_counts()
    PM_title_words = [(df_job_title.index.tolist()[i], df_job_title.values.tolist()[i]) for i in
                      range(1, len(df_job_title.index.tolist()))]
    PM_title_words
    df_PM_gz['job.labels']
    df_PM_gz['job.labels'].values
    df_PM_gz['job.labels'].apply(lambda x: eval(x)).tolist()
    PM_labels_list = [j for i in df_PM_gz['job.labels'].apply(lambda x: eval(x)).tolist() for j in i]
    PM_labels_list
    PM_labels_words = [(i, PM_labels_list.count(i)) for i in set(PM_labels_list)]
    PM_labels_words
    df_PM_gz = df_PM_gz.rename(columns={
        'job.labels': '职位标签',
        'job.refreshTime': '职位更新时间',
        'job.title': '职位',
        'job.salary': '薪资',
        'job.dq': '地区',
        'job.topJob': '是否top职位',
        'job.requireWorkYears': '工作年限',
        'job.requireEduLevel': '学历',
        'comp.compStage': '公司融资情况',
        'comp.compName': '公司名称',
        'comp.compIndustry': '行业',
        'comp.compScale': '规模'
    })
    df_PM_gz
    非薪资面议 = df_PM_gz[~df_PM_gz['薪资'].str.contains("面议|元/天")]
    非薪资面议
    非薪资面议_detail = 非薪资面议['薪资'].apply(lambda x: x.split('薪')[0].split('·')).tolist()
    非薪资面议_detail
    平均薪资 = [(int(i[0].split('-')[0]) + int(i[0].split('-')[1].split('k')[0])) / 2 \
                    if len(i) == 1 else round(
        (int(i[0].split('-')[0]) + int(i[0].split('-')[1].split('k')[0])) / 2 * int(i[1]) / 12, 1) \
                for i in 非薪资面议_detail]
    平均薪资
    非薪资面议['平均薪资'] = 平均薪资
    分地区_平均薪资 = 非薪资面议.groupby('地区').agg({'平均薪资': 'median'})
    分地区_平均薪资_values = [round(i[0], 1) for i in 分地区_平均薪资.values.tolist()]
    分地区_平均薪资_values
    分地区_平均薪资_index = 分地区_平均薪资.index.tolist()
    分地区_平均薪资_index

    return 地区,岗位个数,PM_title_words,分地区_平均薪资_index,分地区_平均薪资_values

from pyecharts.charts import Map
def map_chart(地区,岗位个数) -> Map:
    city_name = request.form.get('city_name')
    job_name = request.form.get('job_name')
    c = (
        Map()
        .add(str(city_name), [list(z) for z in zip(地区, 岗位个数)], str(city_name))
        .set_global_opts(
            title_opts=opts.TitleOpts(title=city_name +'-' +job_name +'-' "岗位分布地图"), visualmap_opts=opts.VisualMapOpts()
        )
    )
    import time
    time.localtime()
    output_time = str(time.localtime().tm_year) + '-' \
                  + str(time.localtime().tm_mon) + '-' \
                  + str(time.localtime().tm_mday)
    output_time
    c_generate_charts = (
        Map()
        .add(str(city_name), [list(z) for z in zip(地区, 岗位个数)], str(city_name))
        .set_global_opts(
            title_opts=opts.TitleOpts(title=city_name + '-' + job_name + '-' "岗位分布地图"),
            visualmap_opts=opts.VisualMapOpts()
        )
        .render(f'charts/{city_name}_{job_name}_{output_time}_map.html')
    )
    return c

@app.route('/get_map',methods=['POST'])
def get_map():
    job_name = request.form.get('job_name')
    city_name = request.form.get('city_name')
    import time
    time.localtime()
    output_time = str(time.localtime().tm_year) + '-' \
                  + str(time.localtime().tm_mon) + '-' \
                  + str(time.localtime().tm_mday)
    output_time
    import os
    # 指定文件夹路径和文件名
    folder_path = "charts"
    file_name = city_name+'_'+job_name+'_'+output_time+'_map.html'
    # 构建完整的文件路径
    file_path = os.path.join(folder_path, file_name)
    # 检查文件是否存在
    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            content = file.read()
            map_html = content
    else:
        地区, 岗位个数, _, _, _, = get_the_data(job_name, city_name)
        print(地区, 岗位个数)
        f = map_chart(地区, 岗位个数)
        map_html = f.render_embed()

    return map_html

def word_chart(PM_title_words)->WordCloud():
    job_name = request.form.get('job_name')
    city_name = request.form.get('city_name')
    d = (
        WordCloud()
        .add("", PM_title_words, word_size_range=[20, 100], shape=SymbolType.DIAMOND)
        .set_global_opts(title_opts=opts.TitleOpts(title=city_name +'-' +job_name +'-'+ "热门岗位词云图"))
    )
    import time
    time.localtime()
    output_time = str(time.localtime().tm_year) + '-' \
                  + str(time.localtime().tm_mon) + '-' \
                  + str(time.localtime().tm_mday)
    output_time
    d_generate_charts = (
        WordCloud()
        .add("", PM_title_words, word_size_range=[20, 100], shape=SymbolType.DIAMOND)
        .set_global_opts(title_opts=opts.TitleOpts(title=city_name + '-' + job_name + '-' + "热门岗位词云图"))
        .render(f'charts/{city_name}_{job_name}_{output_time}_word.html')
    )
    return d

@app.route('/get_tree',methods=['POST'])
def get_tree():
    job_name = request.form.get('job_name')
    city_name = request.form.get('city_name')
    import time
    time.localtime()
    output_time = str(time.localtime().tm_year) + '-' \
                  + str(time.localtime().tm_mon) + '-' \
                  + str(time.localtime().tm_mday)
    output_time
    import os
    # 指定文件夹路径和文件名
    folder_path = "charts"
    file_name = city_name + '_' + job_name + '_' + output_time + '_tree.html'
    # 构建完整的文件路径
    file_path = os.path.join(folder_path, file_name)
    # 检查文件是否存在
    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            tree_content = file.read()
            tree_html = tree_content
    else:
        tree = get_tree_graph(job_name, city_name)
        tree_html = tree.render_embed()

    return tree_html




@app.route('/get_word', methods=['POST'])
def word():
    job_name = request.form.get('job_name')
    city_name = request.form.get('city_name')
    import time
    time.localtime()
    output_time = str(time.localtime().tm_year) + '-' \
                  + str(time.localtime().tm_mon) + '-' \
                  + str(time.localtime().tm_mday)
    output_time
    import os
    # 指定文件夹路径和文件名
    folder_path = "charts"
    file_name = city_name + '_' + job_name + '_' + output_time + '_word.html'
    # 构建完整的文件路径
    file_path = os.path.join(folder_path, file_name)
    # 检查文件是否存在
    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            word_content = file.read()
            word_html = word_content
    else:
        _, _, PM_title_words,_, _,= get_the_data(job_name, city_name)
        d = word_chart(PM_title_words)
        word_html = d.render_embed()
    return word_html

if __name__ == "__main__":
    app.run()