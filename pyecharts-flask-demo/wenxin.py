# -*- coding: utf-8 -*-
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
    return r['result'],url,headers


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