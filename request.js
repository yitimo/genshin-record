const axios = require('axios')

const authkey = 'CXDAJtyCI%2btrXDrlCbR%2bkia%2f57OoyZYw%2bqvxrvOb7PD4%2b2aUocxHrrZwaHx4EHDg7uBEp6d5YI%2b%2fFJiz56shHaraprqNVTARv6rDxE8Pwr9Z%2bN7Fe2AIYDyqXhoT1n2xKHiUPbomrnGklwEgAT29Z00xELmQeyY1KWO%2fDjkGjW4nSySB1%2fpZUMrKxskH62tub66JkuRE5cH5chOtecOHJ%2fI57JgzArCYiXib22ExbfLnSmm5TIiivK3eCeuyQ%2bqtDrbEelVX7MJWWoHroDsGHx01h8xaHtXRbaN7xu49QoxZC1wKS2rQNAq52M6bkodCt%2fuEFtyAonDGXhYx8mfmJ3wwEz2lRrloDUs2hlYOC6rXLLbbUQW9%2fCZ5QwG%2b69BOniGVu4wYm6cqmjgZ7RB7LEX1L4HSLjI%2bq%2bgyWVROk84LP%2f4vVvNOBc%2b0I0tsx7fwh6S0zbddnR93D8uzR0SN0ohO6fu9lCKeHqvnNlR%2f96Dyo9DkuHREnT%2bvJpLlyWrFJ1TJGoXgrVxwzM01D%2b14ig8GG07gOH5ffCagI5iBopNxw%2b%2b8vU7zDEA5mGdOcQH8c4iCQRMYMao7YiUKkAm4XXU59HGDZwgJSIEX6Hdx75h3t3VNIjH27bqPqjxdMNm2i3BqL6PmcbLp7EU0UOhx1sutxxNShsafsUnpczsYC%2bB%2fatH0ERCpBNvU6Z95%2f39XoMfaiQNvxVkpdZWMzosN3WrXfxESwkBtbMmQoGGJO%2fwdMQ8YA7OT1fKb4wMZbMaTRGFdLmFDvhBZUUc%2f2Lt2jSU2vDO1tcKHCs1MUgJ9EAtBkWXpEQlOiJcAuG3kdYsPMW0DGwCSyjnRUw8VyYRG4lzAtqQD04lfwHHgcMgBIGFP%2fCFmyEX8SI4gNAp9p7w85Haki7saQUjg9Qh10maEWQaUwxS%2bfZsRqzq%2b4oFw058f7mAiK%2bdyqX%2br1DvnfnqNO6QewVk08AKjMC7XHccO40rAiuyPEXMbCTYzMA48oz7O4BpVa70L18%2b8imRQ4Pn8'

module.exports = (endId) => {
  return axios.get(`https://hk4e-api.mihoyo.com/event/gacha_info/api/getGachaLog?${parseQuery(endId)}`).then((res) => {
    if (res.status !== 200 || !res.data) {
      throw new Error(res.statusText)
    }
    if (res.data.retcode !== 0) {
      throw new Error(res.data.message)
    }
    return res.data.data && res.data.data.list || []
  })
}

function parseQuery(endId) {
  const params = {
    win_mode: 'fullscreen',
    authkey_ver: 1,
    sign_type: 2,
    auth_appid: 'webview_gacha',
    init_type: 301,
    gacha_id: 'a489e839c5180f4c241cd9df7f8b88a689ddce6d',
    timestamp: Math.floor(Date.now() / 1000),
    lang: 'zh-cn',
    device_type: 'mobile',
    game_version: 'CNRELiOS3.2.0_R11611739_S11212885_D11643430',
    plat_type: 'ios',
    region: 'cn_gf01',
    authkey,
    game_biz: 'hk4e_cn',
    gacha_type: 301,
    page: 1,
    size: 20,
    end_id: endId,
  }
  return Object.keys(params).map((e) => `${e}=${params[e]}`).join('&')
}
