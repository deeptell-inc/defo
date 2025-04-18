import React, { useState, useEffect } from 'react';
import { ProcessSteps } from '@/Components/ProcessSteps';
import { PROCESS_STEPS } from '@/types/process';
import axios from 'axios';

const MOCK_DATA_0: Array<{
  id: number;
  date_time: string;
  customer_number: number;
  company_code: string;
  last_name: string;
  first_name: string;
  gender: string;
  desired_call_time: string;
  memo: string;
  phone_status: string;
  fp_status: string;
  meeting_status: string;
  prefecture: string;
  cellphone: string;
  remarks: string;
}> = [
  {
    id: 10838,
    date_time: "03/23/2025 13:38",
    customer_number: 10838,
    company_code: "114",
    last_name: "山本",
    first_name: "",
    gender: "男性",
    desired_call_time: "3/24 18時",
    memo: "",
    phone_status: "未実施",
    fp_status: "",
    meeting_status: "",
    prefecture: "大阪府",
    cellphone: "9050956857",
    remarks: ""
  },
  {
    id: 10837,
    date_time: "03/23/2025 12:14",
    customer_number: 10837,
    company_code: "93",
    last_name: "宮下",
    first_name: "千佳",
    gender: "女性",
    desired_call_time: "4/25 10-11時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "奈良県",
    cellphone: "8069204792",
    remarks: "3/23留守①12：24"
  },
  {
    id: 10836,
    date_time: "03/23/2025 12:12",
    customer_number: 10836,
    company_code: "77",
    last_name: "千葉",
    first_name: "綾乃",
    gender: "女性",
    desired_call_time: "2025/3/24 12:00",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "北海道",
    cellphone: "9059856259",
    remarks: "3/23留守①14：20"
  },
  {
    id: 10835,
    date_time: "03/23/2025 11:26",
    customer_number: 10835,
    company_code: "89",
    last_name: "岩佐",
    first_name: "麻未",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "熊本県",
    cellphone: "9082217285",
    remarks: "3/23留守①14：18"
  },
  {
    id: 10831,
    date_time: "03/23/2025 09:29",
    customer_number: 10831,
    company_code: "93",
    last_name: "岸本",
    first_name: "仁美",
    gender: "女性",
    desired_call_time: "3/29 15-16時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "大阪府",
    cellphone: "8053082846",
    remarks: "3/23留守14：14"
  },
  {
    id: 10830,
    date_time: "03/23/2025 09:26",
    customer_number: 10830,
    company_code: "89",
    last_name: "一山",
    first_name: "嘉行",
    gender: "男性",
    desired_call_time: "3/24 17：30～18：00",
    memo: "LINE登録あり",
    phone_status: "日時指定",
    fp_status: "",
    meeting_status: "",
    prefecture: "京都府",
    cellphone: "9073582823",
    remarks: ""
  },
  {
    id: 10828,
    date_time: "03/23/2025 09:21",
    customer_number: 10828,
    company_code: "89",
    last_name: "羽鳥",
    first_name: "唯",
    gender: "女性",
    desired_call_time: "日時確認中",
    memo: "LINE登録あり",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "9016529337",
    remarks: "3/23留守①14：10"
  },
  {
    id: 10827,
    date_time: "03/23/2025 09:18",
    customer_number: 10827,
    company_code: "89",
    last_name: "上原",
    first_name: "潤",
    gender: "男性",
    desired_call_time: "3/24 17：45～18：15",
    memo: "LINE登録あり",
    phone_status: "日時指定",
    fp_status: "",
    meeting_status: "",
    prefecture: "徳島県",
    cellphone: "9059118511",
    remarks: ""
  },
  {
    id: 10826,
    date_time: "03/23/2025 09:16",
    customer_number: 10826,
    company_code: "89",
    last_name: "岩本",
    first_name: "裕紀子",
    gender: "女性",
    desired_call_time: "3/24 14：00～14：30",
    memo: "LINE登録あり",
    phone_status: "日時指定",
    fp_status: "",
    meeting_status: "",
    prefecture: "神奈川県",
    cellphone: "7014651617",
    remarks: ""
  },
  {
    id: 10822,
    date_time: "03/23/2025 09:06",
    customer_number: 10822,
    company_code: "89",
    last_name: "小林",
    first_name: "みさと",
    gender: "女性",
    desired_call_time: "3/24 14時～",
    memo: "LINE登録あり",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "沖縄県",
    cellphone: "9012397092",
    remarks: "3/23都合悪①13：20"
  },
  {
    id: 10821,
    date_time: "03/23/2025 09:03",
    customer_number: 10821,
    company_code: "89",
    last_name: "神垣",
    first_name: "優香",
    gender: "女性",
    desired_call_time: "3/26 10：00～10：30",
    memo: "LINE登録あり",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "広島県",
    cellphone: "8058709247",
    remarks: "3/23留守①13：16"
  },
  {
    id: 10820,
    date_time: "03/22/2025 21:19",
    customer_number: 10820,
    company_code: "93",
    last_name: "澤田",
    first_name: "光",
    gender: "男性",
    desired_call_time: "3/29 18時～19時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "青森県",
    cellphone: "8096347350",
    remarks: "3/22留守①21：33"
  },
  {
    id: 10819,
    date_time: "03/22/2025 21:16",
    customer_number: 10819,
    company_code: "77",
    last_name: "山下",
    first_name: "奈緒美",
    gender: "女性",
    desired_call_time: "3/26 10時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "神奈川県",
    cellphone: "8011331771",
    remarks: "3/22留守①21：40"
  },
  {
    id: 10818,
    date_time: "03/22/2025 21:14",
    customer_number: 10818,
    company_code: "77",
    last_name: "岸田",
    first_name: "裕子",
    gender: "女性",
    desired_call_time: "3/27 16時～17時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "神奈川県",
    cellphone: "8050058052",
    remarks: "3/23留守①14：29"
  },
  {
    id: 10817,
    date_time: "03/22/2025 20:29",
    customer_number: 10817,
    company_code: "93",
    last_name: "本多",
    first_name: "るい",
    gender: "女性",
    desired_call_time: "3/24 11時～12時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "宮城県",
    cellphone: "9079823847",
    remarks: "3/22留守①20：32"
  },
  {
    id: 10816,
    date_time: "03/22/2025 20:25",
    customer_number: 10816,
    company_code: "77",
    last_name: "谷",
    first_name: "直宜",
    gender: "男性",
    desired_call_time: "3/24 11時か19時",
    memo: "",
    phone_status: "日時指定",
    fp_status: "",
    meeting_status: "",
    prefecture: "愛知県",
    cellphone: "9091186239",
    remarks: "3/22留守①20：30"
  },
  {
    id: 10815,
    date_time: "03/22/2025 19:55",
    customer_number: 10815,
    company_code: "93",
    last_name: "加藤",
    first_name: "涼子",
    gender: "女性",
    desired_call_time: "4/5 19時～20時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8067033993",
    remarks: "3/22留守①20：15"
  },
  {
    id: 10813,
    date_time: "03/22/2025 18:57",
    customer_number: 10813,
    company_code: "93",
    last_name: "大宮",
    first_name: "祐奈",
    gender: "女性",
    desired_call_time: "4/5 10時～11時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "宮城県",
    cellphone: "9075265840",
    remarks: "3/22留守①20：20"
  },
  {
    id: 10810,
    date_time: "03/22/2025 17:04",
    customer_number: 10810,
    company_code: "93",
    last_name: "寺山",
    first_name: "結子",
    gender: "男性",
    desired_call_time: "3/29.10~11時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "埼玉県",
    cellphone: "9054466985",
    remarks: "3/22留守①17：10"
  },
  {
    id: 10809,
    date_time: "03/22/2025 17:04",
    customer_number: 10809,
    company_code: "93",
    last_name: "阿部",
    first_name: "洋美",
    gender: "女性",
    desired_call_time: "4/3 11-12時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "群馬県",
    cellphone: "7065529218",
    remarks: "3/22留守①17：08"
  },
  {
    id: 10806,
    date_time: "03/22/2025 15:47",
    customer_number: 10806,
    company_code: "93",
    last_name: "栗原",
    first_name: "仁美",
    gender: "女性",
    desired_call_time: "3/29.16~17時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "埼玉県",
    cellphone: "8066365637",
    remarks: "3/22留守①16：04"
  },
  {
    id: 10805,
    date_time: "03/22/2025 15:45",
    customer_number: 10805,
    company_code: "93",
    last_name: "土屋",
    first_name: "優希",
    gender: "男性",
    desired_call_time: "3/28.10~11時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8011959719",
    remarks: "3/22留守①16：00"
  },
  {
    id: 10804,
    date_time: "03/22/2025 15:14",
    customer_number: 10804,
    company_code: "114",
    last_name: "上田",
    first_name: "",
    gender: "男性",
    desired_call_time: "水曜 19時",
    memo: "",
    phone_status: "日時指定",
    fp_status: "",
    meeting_status: "",
    prefecture: "兵庫県",
    cellphone: "8037683547",
    remarks: ""
  },
  {
    id: 10802,
    date_time: "03/22/2025 15:10",
    customer_number: 10802,
    company_code: "77",
    last_name: "瀧塚",
    first_name: "隼人",
    gender: "男性",
    desired_call_time: "2025/3/24 20:00",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "愛知県",
    cellphone: "7023700008",
    remarks: "3/22留守①15：35"
  },
  {
    id: 10800,
    date_time: "03/22/2025 14:49",
    customer_number: 10800,
    company_code: "7711",
    last_name: "高橋",
    first_name: "伊世",
    gender: "女性",
    desired_call_time: "平日19時以降",
    memo: "",
    phone_status: "未実施",
    fp_status: "",
    meeting_status: "",
    prefecture: "愛知県",
    cellphone: "9041995101",
    remarks: ""
  },
  {
    id: 10798,
    date_time: "03/22/2025 13:50",
    customer_number: 10798,
    company_code: "93",
    last_name: "内山",
    first_name: "哲郎",
    gender: "男性",
    desired_call_time: "4/6 18時～19時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "埼玉県",
    cellphone: "8012590871",
    remarks: "3/22留守②18：23①14：36"
  },
  {
    id: 10792,
    date_time: "03/22/2025 11:52",
    customer_number: 10792,
    company_code: "88",
    last_name: "湯原",
    first_name: "秀樹",
    gender: "男性",
    desired_call_time: "3/22 15時",
    memo: "LINE登録あり",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "鳥取県",
    cellphone: "8038770067",
    remarks: "3/22留守①15：11"
  },
  {
    id: 10788,
    date_time: "03/22/2025 09:25",
    customer_number: 10788,
    company_code: "93",
    last_name: "尾木",
    first_name: "和",
    gender: "女性",
    desired_call_time: "3/30 12-13時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "愛媛県",
    cellphone: "8040357776",
    remarks: "3/22留守②17：43①13：25"
  },
  {
    id: 10784,
    date_time: "03/22/2025 09:18",
    customer_number: 10784,
    company_code: "93",
    last_name: "大友",
    first_name: "亜希子",
    gender: "女性",
    desired_call_time: "3/22 19-20時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "宮城県",
    cellphone: "8055569116",
    remarks: "3/22留守②19：48①11：30"
  },
  {
    id: 10782,
    date_time: "03/22/2025 09:16",
    customer_number: 10782,
    company_code: "93",
    last_name: "並木",
    first_name: "愛子",
    gender: "女性",
    desired_call_time: "3/22 18：00頃",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8060895679",
    remarks: "3/22留守②18：02①11：28"
  },
  {
    id: 10775,
    date_time: "03/21/2025 20:38",
    customer_number: 10775,
    company_code: "93",
    last_name: "相野",
    first_name: "幸男",
    gender: "男性",
    desired_call_time: "4/5 16時～17時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "香川県",
    cellphone: "8029753984",
    remarks: "3/22留守②17:06 3/21留守①21：30"
  },
  {
    id: 10772,
    date_time: "03/21/2025 18:00",
    customer_number: 10772,
    company_code: "140",
    last_name: "久保",
    first_name: "昇平",
    gender: "男性",
    desired_call_time: "3/23 10-11時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "北海道",
    cellphone: "8020728355",
    remarks: "3/21留守①19：17"
  },
  {
    id: 10771,
    date_time: "03/21/2025 17:57",
    customer_number: 10771,
    company_code: "93",
    last_name: "キムラ",
    first_name: "サヤカ",
    gender: "女性",
    desired_call_time: "3/24 19-20時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "9095558697",
    remarks: "3/21留守①19：15"
  },
  {
    id: 10769,
    date_time: "03/21/2025 17:52",
    customer_number: 10769,
    company_code: "77",
    last_name: "見形",
    first_name: "美波",
    gender: "女性",
    desired_call_time: "2025/3/29 10:00",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "神奈川県",
    cellphone: "9054293307",
    remarks: "3/21留守①19：14"
  },
  {
    id: 10768,
    date_time: "03/21/2025 17:50",
    customer_number: 10768,
    company_code: "77",
    last_name: "笠木",
    first_name: "速人",
    gender: "男性",
    desired_call_time: "2025/3/24 20:00",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "和歌山県",
    cellphone: "8041175528",
    remarks: "3/21留守①19：11"
  },
  {
    id: 10765,
    date_time: "03/21/2025 15:27",
    customer_number: 10765,
    company_code: "88",
    last_name: "木下",
    first_name: "佳奈恵",
    gender: "女性",
    desired_call_time: "3/24 13:00～13:30",
    memo: "LINE登録あり",
    phone_status: "日時指定",
    fp_status: "",
    meeting_status: "",
    prefecture: "茨城県",
    cellphone: "8095660509",
    remarks: ""
  },
  {
    id: 10762,
    date_time: "03/21/2025 15:20",
    customer_number: 10762,
    company_code: "77",
    last_name: "井戸",
    first_name: "喬史",
    gender: "男性",
    desired_call_time: "3/24 10時～",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "兵庫県",
    cellphone: "8053561846",
    remarks: "3/21都合悪17：00"
  },
  {
    id: 10754,
    date_time: "03/21/2025 14:02",
    customer_number: 10754,
    company_code: "93",
    last_name: "鵜飼",
    first_name: "真妃",
    gender: "女性",
    desired_call_time: "3/31 13-14時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8026181119",
    remarks: "3/22留守②17:15 3/21留守①14：44"
  },
  {
    id: 10750,
    date_time: "03/21/2025 11:47",
    customer_number: 10750,
    company_code: "93",
    last_name: "竹村",
    first_name: "尚倫",
    gender: "男性",
    desired_call_time: "3/29 18-19時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "埼玉県",
    cellphone: "9049270890",
    remarks: "3/22留守②17:16 3/21留守①11：51"
  },
  {
    id: 10742,
    date_time: "03/21/2025 09:26",
    customer_number: 10742,
    company_code: "88",
    last_name: "古田",
    first_name: "明日香",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "神奈川県",
    cellphone: "8048332411",
    remarks: "3/23留守③14：29 3/22留守②17:19 3/21留守①9：27"
  },
  {
    id: 10738,
    date_time: "03/21/2025 09:11",
    customer_number: 10738,
    company_code: "88",
    last_name: "義",
    first_name: "直人",
    gender: "男性",
    desired_call_time: "2025/3/22 11:00",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "群馬県",
    cellphone: "7083270588",
    remarks: "3/22留守③17：52②11：02"
  },
  {
    id: 10735,
    date_time: "03/20/2025 21:38",
    customer_number: 10735,
    company_code: "7711",
    last_name: "高島",
    first_name: "宏実",
    gender: "女性",
    desired_call_time: "24日以降に連絡希望",
    memo: "",
    phone_status: "日時指定",
    fp_status: "",
    meeting_status: "",
    prefecture: "大阪府",
    cellphone: "9062331482",
    remarks: ""
  },
  {
    id: 10732,
    date_time: "03/20/2025 21:23",
    customer_number: 10732,
    company_code: "77",
    last_name: "赤花",
    first_name: "有紀",
    gender: "女性",
    desired_call_time: "3/27 10時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "9077523711",
    remarks: "3/21留守①9：21"
  },
  {
    id: 10725,
    date_time: "03/20/2025 17:27",
    customer_number: 10725,
    company_code: "5017",
    last_name: "黒澤",
    first_name: "弘之",
    gender: "男性",
    desired_call_time: "3/29 20時",
    memo: "",
    phone_status: "日時指定",
    fp_status: "",
    meeting_status: "",
    prefecture: "千葉県",
    cellphone: "8032791979",
    remarks: "3/20留守①18：25"
  },
  {
    id: 10718,
    date_time: "03/20/2025 13:29",
    customer_number: 10718,
    company_code: "6107",
    last_name: "村田",
    first_name: "千穂",
    gender: "女性",
    desired_call_time: "平日夕方以降",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "神奈川県",
    cellphone: "7055958350",
    remarks: "3/20留守②16：52①13：51"
  },
  {
    id: 10717,
    date_time: "03/20/2025 13:03",
    customer_number: 10717,
    company_code: "61",
    last_name: "堀本",
    first_name: "義彦",
    gender: "男性",
    desired_call_time: "2025/3/21 13:30",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "福岡県",
    cellphone: "8064430666",
    remarks: "3/22留守④17:27 3/21留守③13：45"
  },
  {
    id: 10711,
    date_time: "03/20/2025 11:37",
    customer_number: 10711,
    company_code: "77",
    last_name: "大瀧",
    first_name: "達也",
    gender: "男性",
    desired_call_time: "2025/3/24 19:00",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8011297128",
    remarks: "3/20留守②18：04①12：48"
  },
  {
    id: 10700,
    date_time: "03/20/2025 09:24",
    customer_number: 10700,
    company_code: "93",
    last_name: "佐竹",
    first_name: "美保",
    gender: "女性",
    desired_call_time: "3/21 13-14時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "群馬県",
    cellphone: "9012016865",
    remarks: "3/22留守④17:33 3/21留守③13：12 /20留守②17：29①13：14"
  },
  {
    id: 10699,
    date_time: "03/20/2025 09:22",
    customer_number: 10699,
    company_code: "93",
    last_name: "渥美",
    first_name: "亮介",
    gender: "男性",
    desired_call_time: "3/21 12~13時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "新潟県",
    cellphone: "8069560123",
    remarks: "3/22留守③17:35 3/21留守②12：05 3/20都合悪①13：11"
  },
  {
    id: 10697,
    date_time: "03/20/2025 09:18",
    customer_number: 10697,
    company_code: "93",
    last_name: "折原",
    first_name: "正祥",
    gender: "男性",
    desired_call_time: "3/27.18~19時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "千葉県",
    cellphone: "9011004004",
    remarks: "3/22留守③17:38 3/20留守②17：20①13：03"
  },
  {
    id: 10695,
    date_time: "03/20/2025 09:14",
    customer_number: 10695,
    company_code: "89",
    last_name: "森",
    first_name: "顕人",
    gender: "男性",
    desired_call_time: "日時確認中",
    memo: "LINE登録あり",
    phone_status: "石山A振り",
    fp_status: "",
    meeting_status: "",
    prefecture: "埼玉県",
    cellphone: "8056945056",
    remarks: "3/22キャンセル(副業に興味ありとのことで面談自体はキャンセル) 3/20留守①16：21"
  },
  {
    id: 10692,
    date_time: "03/19/2025 19:53",
    customer_number: 10692,
    company_code: "93",
    last_name: "塚田",
    first_name: "優衣",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8013601989",
    remarks: "3/22留守②17:51 3/19留守①20：28"
  },
  {
    id: 10691,
    date_time: "03/19/2025 19:49",
    customer_number: 10691,
    company_code: "93",
    last_name: "村上",
    first_name: "正美",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "9069525176",
    remarks: "3/22留守②17:58 3/19留守①20：26"
  },
  {
    id: 10688,
    date_time: "03/19/2025 16:53",
    customer_number: 10688,
    company_code: "93",
    last_name: "中村",
    first_name: "大吾",
    gender: "男性",
    desired_call_time: "3/24.10~11時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "9085120912",
    remarks: "3/19留守①17：28"
  },
  {
    id: 10682,
    date_time: "03/19/2025 13:45",
    customer_number: 10682,
    company_code: "89",
    last_name: "河上",
    first_name: "亮太",
    gender: "男性",
    desired_call_time: "日時確認中",
    memo: "LINE登録あり",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "島根県",
    cellphone: "8057305054",
    remarks: "3/22留守②20:20 3/19留守①14：34"
  },
  {
    id: 10679,
    date_time: "03/19/2025 12:53",
    customer_number: 10679,
    company_code: "93",
    last_name: "佐竹",
    first_name: "美保",
    gender: "女性",
    desired_call_time: "3/21.14~15時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "群馬県",
    cellphone: "9012016868",
    remarks: "3/22留守②17:32 3/19留守①13：34"
  },
  {
    id: 10671,
    date_time: "03/19/2025 09:49",
    customer_number: 10671,
    company_code: "77",
    last_name: "昌川",
    first_name: "玉蘭",
    gender: "女性",
    desired_call_time: "3/24 9：00～12：00",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "長野県",
    cellphone: "7084521923",
    remarks: "3/24の9:00～12:00の間でかけなおし"
  },
  {
    id: 10670,
    date_time: "03/19/2025 09:47",
    customer_number: 10670,
    company_code: "77",
    last_name: "後藤",
    first_name: "美千江",
    gender: "女性",
    desired_call_time: "3/20 10時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8035856520",
    remarks: "3/22留守②20:23 3/20留守①10：30"
  },
  {
    id: 10669,
    date_time: "03/19/2025 09:44",
    customer_number: 10669,
    company_code: "77",
    last_name: "北島",
    first_name: "彩花",
    gender: "女性",
    desired_call_time: "3/19.20:00",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "神奈川県",
    cellphone: "8081224813",
    remarks: "3/22留守②20:25 3/19留守①20：07"
  },
  {
    id: 10668,
    date_time: "03/19/2025 09:42",
    customer_number: 10668,
    company_code: "77",
    last_name: "木村",
    first_name: "和行",
    gender: "男性",
    desired_call_time: "3/24.11:00",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "三重県",
    cellphone: "9041120285",
    remarks: "3/19留守①13：10"
  },
  {
    id: 10666,
    date_time: "03/19/2025 09:36",
    customer_number: 10666,
    company_code: "93",
    last_name: "池田",
    first_name: "陽祐",
    gender: "男性",
    desired_call_time: "3/19.17~18時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "神奈川県",
    cellphone: "8051952023",
    remarks: "3/23留守③17:36 3/22留守②20:27 3/19留守①11:39"
  },
  {
    id: 10665,
    date_time: "03/19/2025 09:33",
    customer_number: 10665,
    company_code: "93",
    last_name: "松尾",
    first_name: "実久",
    gender: "女性",
    desired_call_time: "3/19.12~13時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "大阪府",
    cellphone: "9078616846",
    remarks: "3/22留守②20:29 3/19留守①10:40"
  },
  {
    id: 10664,
    date_time: "03/19/2025 09:30",
    customer_number: 10664,
    company_code: "93",
    last_name: "清水",
    first_name: "まゆみ",
    gender: "女性",
    desired_call_time: "3/28.18~19時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "9051274962",
    remarks: "3/22留守③20:30 3/19留守②15:10①9:32"
  },
  {
    id: 10654,
    date_time: "03/18/2025 17:40",
    customer_number: 10654,
    company_code: "77",
    last_name: "本間",
    first_name: "由紀",
    gender: "女性",
    desired_call_time: "3/24.18:00",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8064430255",
    remarks: "3/18留守①18：11"
  },
  {
    id: 10650,
    date_time: "03/18/2025 15:48",
    customer_number: 10650,
    company_code: "77",
    last_name: "北村",
    first_name: "聡",
    gender: "男性",
    desired_call_time: "3/19.12:00",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8053525052",
    remarks: "3/22留守②20:35 3/19留守②13:22①12:01"
  },
  {
    id: 10647,
    date_time: "03/18/2025 15:17",
    customer_number: 10647,
    company_code: "88",
    last_name: "龍相",
    first_name: "慎哉",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8066921690",
    remarks: "3/18留守①15：20"
  },
  {
    id: 10645,
    date_time: "03/18/2025 15:03",
    customer_number: 10645,
    company_code: "93",
    last_name: "石井",
    first_name: "愛子",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "大阪府",
    cellphone: "7012170905",
    remarks: "3/18留守②18：18①15：08"
  },
  {
    id: 10639,
    date_time: "03/18/2025 13:07",
    customer_number: 10639,
    company_code: "78",
    last_name: "鈴木",
    first_name: "裕介",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "神奈川県",
    cellphone: "8013465416",
    remarks: "3/18留守①13：29②18：02"
  },
  {
    id: 10630,
    date_time: "03/18/2025 10:25",
    customer_number: 10630,
    company_code: "89",
    last_name: "永渕",
    first_name: "祐子",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "佐賀県",
    cellphone: "9072955698",
    remarks: "3/18留守②16：43①11：22"
  },
  {
    id: 10626,
    date_time: "03/18/2025 09:24",
    customer_number: 10626,
    company_code: "89",
    last_name: "三野",
    first_name: "倫",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "滋賀県",
    cellphone: "8083332570",
    remarks: "新NISAのお話だけ聞きたい保険はいらないとの事でキャンセル"
  },
  {
    id: 10625,
    date_time: "03/18/2025 09:21",
    customer_number: 10625,
    company_code: "89",
    last_name: "升尾",
    first_name: "元紀",
    gender: "男性",
    desired_call_time: "日時確認中",
    memo: "LINE登録あり",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "広島県",
    cellphone: "8052380969",
    remarks: "3/19留守①15：17"
  },
  {
    id: 10623,
    date_time: "03/18/2025 09:16",
    customer_number: 10623,
    company_code: "93",
    last_name: "尾﨑",
    first_name: "美沙子",
    gender: "女性",
    desired_call_time: "4/6.14~15時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "山口県",
    cellphone: "8081455225",
    remarks: "3/19留守①15：18"
  },
  {
    id: 10620,
    date_time: "03/17/2025 19:38",
    customer_number: 10620,
    company_code: "930",
    last_name: "堀田",
    first_name: "眞帆",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "なし",
    cellphone: "9073150509",
    remarks: "3/19留守①16：23"
  },
  {
    id: 10610,
    date_time: "03/17/2025 16:50",
    customer_number: 10610,
    company_code: "88",
    last_name: "中島",
    first_name: "秀幸",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "長野県",
    cellphone: "9069583797",
    remarks: "3/19留守①16：27"
  },
  {
    id: 10600,
    date_time: "03/17/2025 13:25",
    customer_number: 10600,
    company_code: "89",
    last_name: "大塚",
    first_name: "達貴",
    gender: "男性",
    desired_call_time: "日時確認中",
    memo: "LINE登録あり",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "9050182430",
    remarks: "3/19留守①16：33"
  },
  {
    id: 10599,
    date_time: "03/17/2025 13:23",
    customer_number: 10599,
    company_code: "89",
    last_name: "基山",
    first_name: "香菜",
    gender: "女性",
    desired_call_time: "日時確認中",
    memo: "LINE登録あり",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "大阪府",
    cellphone: "9069190911",
    remarks: "3/19留守①16：36"
  },
  {
    id: 10596,
    date_time: "03/17/2025 13:17",
    customer_number: 10596,
    company_code: "93",
    last_name: "松井",
    first_name: "香織",
    gender: "女性",
    desired_call_time: "4/3 10-11時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "9091946926",
    remarks: "3/19留守①16：43"
  },
  {
    id: 10590,
    date_time: "03/17/2025 11:56",
    customer_number: 10590,
    company_code: "77",
    last_name: "川口",
    first_name: "輝夫",
    gender: "男性",
    desired_call_time: "2025/3/18 14:00",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "大阪府",
    cellphone: "8043965849",
    remarks: "3/19留守①16：44"
  },
  {
    id: 10583,
    date_time: "03/17/2025 09:15",
    customer_number: 10583,
    company_code: "77",
    last_name: "塚田",
    first_name: "レオ",
    gender: "男性",
    desired_call_time: "2025/3/16 10:00",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "埼玉県",
    cellphone: "9096758698",
    remarks: "3/19留守①16：45"
  },
  {
    id: 10582,
    date_time: "03/16/2025 21:30",
    customer_number: 10582,
    company_code: "77",
    last_name: "服部",
    first_name: "ゆり",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "岐阜県",
    cellphone: "7084420490",
    remarks: "3/19留守①16:47"
  },
  {
    id: 10576,
    date_time: "03/16/2025 19:58",
    customer_number: 10576,
    company_code: "93",
    last_name: "田澤",
    first_name: "岳史",
    gender: "男性",
    desired_call_time: "3/19 15時～16時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "兵庫県",
    cellphone: "9071055564",
    remarks: "3/19留守①15：06"
  },
  {
    id: 10575,
    date_time: "03/16/2025 19:57",
    customer_number: 10575,
    company_code: "93",
    last_name: "辻千",
    first_name: "枝子",
    gender: "女性",
    desired_call_time: "3/18 17時～18",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "佐賀県",
    cellphone: "9011653523",
    remarks: "3/18留守②17：28"
  },
  {
    id: 10571,
    date_time: "03/16/2025 18:38",
    customer_number: 10571,
    company_code: "88",
    last_name: "林",
    first_name: "聡",
    gender: "男性",
    desired_call_time: "3/22 15時",
    memo: "LINE登録あり",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "兵庫県",
    cellphone: "9037140980",
    remarks: "3/22留守③15：17"
  },
  {
    id: 10569,
    date_time: "03/16/2025 18:15",
    customer_number: 10569,
    company_code: "6157",
    last_name: "前田",
    first_name: "和哉",
    gender: "男性",
    desired_call_time: "3/17 18時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "大阪府",
    cellphone: "8082658553",
    remarks: "3/17留守①18：04"
  },
  {
    id: 10568,
    date_time: "03/16/2025 17:47",
    customer_number: 10568,
    company_code: "114",
    last_name: "能瀬",
    first_name: "",
    gender: "男性",
    desired_call_time: "平日 19時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "兵庫県",
    cellphone: "9079997072",
    remarks: "3/18留守①20：26"
  },
  {
    id: 10563,
    date_time: "03/16/2025 13:56",
    customer_number: 10563,
    company_code: "114",
    last_name: "大濱",
    first_name: "",
    gender: "男性",
    desired_call_time: "3/23 13時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "兵庫県",
    cellphone: "9014807361",
    remarks: "3/23留守②13：54"
  },
  {
    id: 10555,
    date_time: "03/16/2025 10:13",
    customer_number: 10555,
    company_code: "77",
    last_name: "尾花",
    first_name: "久",
    gender: "男性",
    desired_call_time: "3/28.10:00",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "栃木県",
    cellphone: "7036608269",
    remarks: "3/16留守①14：40"
  },
  {
    id: 10553,
    date_time: "03/16/2025 09:27",
    customer_number: 10553,
    company_code: "77",
    last_name: "大須賀",
    first_name: "祐亮",
    gender: "男性",
    desired_call_time: "2025/3/19 12:00",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "9080000787",
    remarks: "3/19留守①12：04 3/16留守①13：05"
  },
  {
    id: 10552,
    date_time: "03/16/2025 09:25",
    customer_number: 10552,
    company_code: "77",
    last_name: "中東",
    first_name: "美貴",
    gender: "女性",
    desired_call_time: "2025/3/19 20:00",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "愛知県",
    cellphone: "8026144641",
    remarks: "3/19留守①20：04"
  },
  {
    id: 10549,
    date_time: "03/16/2025 09:22",
    customer_number: 10549,
    company_code: "93",
    last_name: "星野",
    first_name: "晴香",
    gender: "女性",
    desired_call_time: "4/14.10~11時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "神奈川県",
    cellphone: "9034358293",
    remarks: "3/16留守②19：41①10：44"
  },
  {
    id: 10548,
    date_time: "03/16/2025 09:18",
    customer_number: 10548,
    company_code: "93",
    last_name: "岡",
    first_name: "瑞希",
    gender: "女性",
    desired_call_time: "3/19.19~20時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "埼玉県",
    cellphone: "9043542030",
    remarks: "3/19留守③20：04"
  },
  {
    id: 10546,
    date_time: "03/16/2025 09:15",
    customer_number: 10546,
    company_code: "93",
    last_name: "木原",
    first_name: "章博",
    gender: "男性",
    desired_call_time: "3/17 15時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "大阪府",
    cellphone: "9050141119",
    remarks: "3/16都合悪②19：26①9：16"
  },
  {
    id: 10509,
    date_time: "03/15/2025 16:19",
    customer_number: 10509,
    company_code: "88",
    last_name: "若月",
    first_name: "大輔",
    gender: "男性",
    desired_call_time: "3/16 9時",
    memo: "LINE登録あり",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "茨城県",
    cellphone: "7077718815",
    remarks: "3/15留守①16：43"
  },
  {
    id: 10507,
    date_time: "03/15/2025 16:16",
    customer_number: 10507,
    company_code: "88",
    last_name: "沖",
    first_name: "篤志",
    gender: "男性",
    desired_call_time: "日時確認中",
    memo: "LINE登録あり",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "愛知県",
    cellphone: "9031628018",
    remarks: "3/15留守①16：40"
  },
  {
    id: 10506,
    date_time: "03/15/2025 15:57",
    customer_number: 10506,
    company_code: "93",
    last_name: "森",
    first_name: "綾",
    gender: "女性",
    desired_call_time: "3/24.18~19時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "長崎県",
    cellphone: "8017410150",
    remarks: "3/15留守①16：26"
  },
  {
    id: 10496,
    date_time: "03/15/2025 11:18",
    customer_number: 10496,
    company_code: "93",
    last_name: "中山",
    first_name: "裕介",
    gender: "男性",
    desired_call_time: "3/25 17-18時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8023417556",
    remarks: "3/15留守①11：38"
  },
  {
    id: 10492,
    date_time: "03/15/2025 09:28",
    customer_number: 10492,
    company_code: "89",
    last_name: "阪田",
    first_name: "大樹",
    gender: "男性",
    desired_call_time: "",
    memo: "LINE登録あり",
    phone_status: "石山A振り",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8030897833",
    remarks: "電気×"
  },
  {
    id: 10485,
    date_time: "03/15/2025 09:12",
    customer_number: 10485,
    company_code: "89",
    last_name: "中山",
    first_name: "美穂",
    gender: "女性",
    desired_call_time: "日時確認中",
    memo: "LINE登録あり",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "北海道",
    cellphone: "9033982223",
    remarks: "3/16留守②17:28 3/15留守①11：41"
  },
  {
    id: 10483,
    date_time: "03/14/2025 20:44",
    customer_number: 10483,
    company_code: "77",
    last_name: "村知",
    first_name: "吏香子",
    gender: "女性",
    desired_call_time: "3/22 11時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "愛知県",
    cellphone: "9088676381",
    remarks: "3/22留守③17：52②11：02"
  },
  {
    id: 10476,
    date_time: "03/14/2025 16:30",
    customer_number: 10476,
    company_code: "93",
    last_name: "西村",
    first_name: "正英",
    gender: "男性",
    desired_call_time: "4/21 16-17時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8065703821",
    remarks: "3/22留守②16：15"
  },
  {
    id: 10473,
    date_time: "03/14/2025 15:27",
    customer_number: 10473,
    company_code: "77",
    last_name: "一尾",
    first_name: "佳史",
    gender: "男性",
    desired_call_time: "3/20.20:00",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "大分県",
    cellphone: "8064630620",
    remarks: "3/20留守②20：24"
  },
  {
    id: 10468,
    date_time: "03/14/2025 13:41",
    customer_number: 10468,
    company_code: "93",
    last_name: "大久保",
    first_name: "優香",
    gender: "女性",
    desired_call_time: "3/29 13-14時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "神奈川県",
    cellphone: "9018116161",
    remarks: "3/15留守②15：45"
  },
  {
    id: 10466,
    date_time: "03/14/2025 10:09",
    customer_number: 10466,
    company_code: "93",
    last_name: "徳永",
    first_name: "智史",
    gender: "男性",
    desired_call_time: "3/18.19~20時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "京都府",
    cellphone: "9040198746",
    remarks: "3/18留守①19：09"
  },
  {
    id: 10464,
    date_time: "03/14/2025 09:27",
    customer_number: 10464,
    company_code: "77",
    last_name: "冨澤",
    first_name: "拓海",
    gender: "男性",
    desired_call_time: "2025/3/17 12:00",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "神奈川県",
    cellphone: "7084352969",
    remarks: "3/17留守②12：03 3/14留守①10：41"
  },
  {
    id: 10460,
    date_time: "03/14/2025 09:22",
    customer_number: 10460,
    company_code: "77",
    last_name: "高岡",
    first_name: "瑛里佳",
    gender: "女性",
    desired_call_time: "2025/3/22 10:00",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "石川県",
    cellphone: "9077448438",
    remarks: "3/22留守③18：08②10：06"
  },
  {
    id: 10457,
    date_time: "03/14/2025 09:18",
    customer_number: 10457,
    company_code: "77",
    last_name: "岡本",
    first_name: "弥也",
    gender: "男性",
    desired_call_time: "2025/3/26 13:00",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "静岡県",
    cellphone: "8075670154",
    remarks: "3/14留守①9:46"
  },
  {
    id: 10447,
    date_time: "03/13/2025 20:48",
    customer_number: 10447,
    company_code: "93",
    last_name: "水上",
    first_name: "綾美",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "三重県",
    cellphone: "9058689627",
    remarks: "3/17留守⑤16：38 3/16留守④13：36 3/14留守③20：20②1:30①9：30"
  },
  {
    id: 10444,
    date_time: "03/13/2025 19:30",
    customer_number: 10444,
    company_code: "7711",
    last_name: "木田",
    first_name: "和宏",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "兵庫県",
    cellphone: "9067534007",
    remarks: "36/17留守④17：22 3/16留守③18:53 3/14留守②18：23①12：23"
  },
  {
    id: 10441,
    date_time: "03/13/2025 17:08",
    customer_number: 10441,
    company_code: "93",
    last_name: "西原",
    first_name: "里蘭",
    gender: "女性",
    desired_call_time: "3/17.15~16時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "沖縄県",
    cellphone: "8027369314",
    remarks: "3/17留守②15：27"
  },
  {
    id: 10439,
    date_time: "03/13/2025 16:14",
    customer_number: 10439,
    company_code: "114",
    last_name: "北次",
    first_name: "",
    gender: "女性",
    desired_call_time: "3月16日.10時.B携帯",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "",
    cellphone: "8053665412",
    remarks: "3/16留守①14：52"
  },
  {
    id: 10438,
    date_time: "03/13/2025 16:11",
    customer_number: 10438,
    company_code: "93",
    last_name: "田邊",
    first_name: "汐莉",
    gender: "女性",
    desired_call_time: "3/18.16~17時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8060309443",
    remarks: "3/18留守③16：03"
  },
  {
    id: 10432,
    date_time: "03/13/2025 13:43",
    customer_number: 10432,
    company_code: "89",
    last_name: "金子",
    first_name: "優香",
    gender: "女性",
    desired_call_time: "3/14 18：00～18：30",
    memo: "LINE登録あり",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "群馬県",
    cellphone: "8030281008",
    remarks: "3/16留守③18:59 3/14留守②18：05"
  },
  {
    id: 10427,
    date_time: "03/13/2025 11:16",
    customer_number: 10427,
    company_code: "93",
    last_name: "藤巻",
    first_name: "志歩",
    gender: "女性",
    desired_call_time: "3/17 18時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "石川県",
    cellphone: "9032937452",
    remarks: "3/17留守③18：17 3/16留守②19:01"
  },
  {
    id: 10426,
    date_time: "03/13/2025 11:05",
    customer_number: 10426,
    company_code: "930",
    last_name: "平山",
    first_name: "源英",
    gender: "男性",
    desired_call_time: "2025/3/13 20:30",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8044615632",
    remarks: "3/16留守②19:04 3/13都合悪①11：06"
  },
  {
    id: 10424,
    date_time: "03/13/2025 10:03",
    customer_number: 10424,
    company_code: "77",
    last_name: "尾澤",
    first_name: "裕香子",
    gender: "女性",
    desired_call_time: "3/17 9時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "神奈川県",
    cellphone: "8049326073",
    remarks: "3/17留守①9:05"
  },
  {
    id: 10422,
    date_time: "03/13/2025 09:21",
    customer_number: 10422,
    company_code: "88",
    last_name: "秋場",
    first_name: "笑子",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "石山A振り",
    fp_status: "",
    meeting_status: "",
    prefecture: "神奈川県",
    cellphone: "8096932708",
    remarks: ""
  },
  {
    id: 10419,
    date_time: "03/13/2025 01:24",
    customer_number: 10419,
    company_code: "7711",
    last_name: "伊藤",
    first_name: "由野",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8055583356",
    remarks: "3/17留守④17：26 3/16留守③19:48 3/14留守②16：11 3/13留守①10：17②14：26"
  },
  {
    id: 10414,
    date_time: "03/12/2025 20:47",
    customer_number: 10414,
    company_code: "93",
    last_name: "西淵",
    first_name: "未来",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "和歌山県",
    cellphone: "8014584484",
    remarks: "3/17留守③17：29 3/16留守②19:53 3/14留守①16：55"
  },
  {
    id: 10406,
    date_time: "03/12/2025 16:46",
    customer_number: 10406,
    company_code: "93",
    last_name: "近藤",
    first_name: "弥希",
    gender: "女性",
    desired_call_time: "3/14 10-11時",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "愛知県",
    cellphone: "7054322818",
    remarks: "3/16留守③20:36 3/14留守②10：19"
  },
  {
    id: 10404,
    date_time: "03/12/2025 16:18",
    customer_number: 10404,
    company_code: "930",
    last_name: "井筒",
    first_name: "朔",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "留守",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8026951236",
    remarks: "3/17留守③17"
  }
]

const MOCK_DATA_1: Array<{
  id: number;
  date_time: string;
  customer_number: number;
  company_code: string;
  last_name: string;
  first_name: string;
  gender: string;
  desired_call_time: string;
  memo: string;
  phone_status: string;
  fp_status: string;
  meeting_status: string;
  prefecture: string;
  cellphone: string;
  remarks: string;
  line_exchange?: string; // 新しいフィールド「LINE交換」を追加（任意）
}> = [
  {
    id: 10680,
    date_time: "03/19/2025 13:15",
    customer_number: 10680,
    company_code: "93",
    last_name: "井上",
    first_name: "舞沙美",
    gender: "女性",
    desired_call_time: "3/20.10~11時",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "福岡県",
    cellphone: "9031945354",
    remarks: "電気の面談:NG",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 10663,
    date_time: "03/19/2025 09:27",
    customer_number: 10663,
    company_code: "93",
    last_name: "辻本",
    first_name: "輝",
    gender: "男性",
    desired_call_time: "3/23.17~18時",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "福岡県",
    cellphone: "8064516519",
    remarks: "電気の面談:ＯＫ",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 10646,
    date_time: "03/18/2025 15:05",
    customer_number: 10646,
    company_code: "93",
    last_name: "鈴木",
    first_name: "萌",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8011744584",
    remarks: "電気の面談:ＮＧ",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 10638,
    date_time: "03/18/2025 12:51",
    customer_number: 10638,
    company_code: "77",
    last_name: "伊藤",
    first_name: "紅美",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "9058819610",
    remarks: "3/21留守①12：30　電気?",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 10614,
    date_time: "03/17/2025 18:35",
    customer_number: 10614,
    company_code: "93",
    last_name: "井上",
    first_name: "愛海",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "福岡県",
    cellphone: "9098698239",
    remarks: "3/17保留①19：13",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 10605,
    date_time: "03/17/2025 15:42",
    customer_number: 10605,
    company_code: "7711",
    last_name: "須藤",
    first_name: "舞",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "9024336198",
    remarks: "3/21留守①12：32　電気の面談その他:NG",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 10598,
    date_time: "03/17/2025 13:20",
    customer_number: 10598,
    company_code: "40",
    last_name: "松本",
    first_name: "剛",
    gender: "男性",
    desired_call_time: "3/17 20時以降",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8065656486",
    remarks: "電気の面談:NG",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 10592,
    date_time: "03/17/2025 12:09",
    customer_number: 10592,
    company_code: "77",
    last_name: "水口",
    first_name: "朋彦",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "埼玉県",
    cellphone: "8054122142",
    remarks: "3/17留守①19：31/電気の面談:OK  希望日時平日１０時",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 10489,
    date_time: "03/15/2025 09:24",
    customer_number: 10489,
    company_code: "93",
    last_name: "末松",
    first_name: "綾奈",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "岐阜県",
    cellphone: "9034414565",
    remarks: "電気の面談:NG",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 10338,
    date_time: "03/11/2025 09:27",
    customer_number: 10338,
    company_code: "93",
    last_name: "村田",
    first_name: "博子",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "愛知県",
    cellphone: "9078681588",
    remarks: "3/19 13:00 ラインQR送信済み 電気の面談その他:NG",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 10263,
    date_time: "03/09/2025 13:35",
    customer_number: 10263,
    company_code: "2",
    last_name: "アディカ　リ",
    first_name: "リタ",
    gender: "女性",
    desired_call_time: "3/20 17時",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "大阪府",
    cellphone: "8091283182",
    remarks: "3/20留守③17：18",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 10262,
    date_time: "03/09/2025 13:33",
    customer_number: 10262,
    company_code: "2",
    last_name: "ドンガナ",
    first_name: "リシラム",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(希望日超過の為)",
    fp_status: "",
    meeting_status: "",
    prefecture: "大阪府",
    cellphone: "8083229804",
    remarks: "ラインフルネーム「Dhungana rishiram」さんです。面談希望日後ほどご連絡いただきます。　電気の面談：NG",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 10155,
    date_time: "03/06/2025 20:32",
    customer_number: 10155,
    company_code: "93",
    last_name: "菊地",
    first_name: "優",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "埼玉県",
    cellphone: "9098099138",
    remarks: "3/21留守⑦12：49　3/19留守⑥13:45 3/17留守⑤11：37　3/14留守④13:14 3/13留守③11：26　3/11留守②11：07 3/10留守①12:09 電気の面談：NG",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 10038,
    date_time: "03/05/2025 10:38",
    customer_number: 10038,
    company_code: "39",
    last_name: "櫻井",
    first_name: "大輝",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8059206981",
    remarks: "電気×　3/7留守②17：45　3/5留守①11：04",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 10015,
    date_time: "03/04/2025 19:41",
    customer_number: 10015,
    company_code: "93",
    last_name: "小林",
    first_name: "紘大",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "長野県",
    cellphone: "8034146212",
    remarks: "3/18運転中のため後で追加するとのこと。　3/17留守③11：42　3/14留守②13:18 3/13留守①13：15　電気×",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 10005,
    date_time: "03/04/2025 17:55",
    customer_number: 10005,
    company_code: "93",
    last_name: "仲田",
    first_name: "有花",
    gender: "女性",
    desired_call_time: "3/7.10~11時",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "茨城県",
    cellphone: "9071984438",
    remarks: "3/21留守⑦16；08　3/19留守⑥13:49 3/18留守⑤16：20　3/14留守④13:30 3/13留守③13：17　3/11留守②15：06 3/10留守①12:29 電気の面談:NG",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 9802,
    date_time: "02/28/2025 09:58",
    customer_number: 9802,
    company_code: "60",
    last_name: "大橋",
    first_name: "寧々",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(希望日超過の為)",
    fp_status: "",
    meeting_status: "",
    prefecture: "神奈川県",
    cellphone: "8066058267",
    remarks: "3/21留守①16：15　電気×",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 9760,
    date_time: "02/27/2025 13:31",
    customer_number: 9760,
    company_code: "140",
    last_name: "持田",
    first_name: "政昭",
    gender: "男性",
    desired_call_time: "2/28.13~14時",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "神奈川県",
    cellphone: "9030600069",
    remarks: "3/21留守⑦16：17　3/18留守⑥16：11　3/14留守⑤14:58 3/13留守④13：24　3/11留守③14：42 3/10留守①13:44 面談希望日後ほど連絡いただきます。",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 9666,
    date_time: "02/24/2025 19:55",
    customer_number: 9666,
    company_code: "89",
    last_name: "飯塚",
    first_name: "侑",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(希望日超過の為)",
    fp_status: "",
    meeting_status: "",
    prefecture: "群馬県",
    cellphone: "8094891941",
    remarks: "3/18会社名伝えたらすぐ切られた。3/14留守⑦15:04 3/13留守⑥13：27　3/11留守⑤14：38 3/10留守④13:58 3/6留守③15：11　2/25留守②15：10　2/24留守①20：27",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 9436,
    date_time: "02/19/2025 11:16",
    customer_number: 9436,
    company_code: "78",
    last_name: "中里",
    first_name: "亮",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(内容聞き漏れ)",
    fp_status: "",
    meeting_status: "",
    prefecture: "神奈川県",
    cellphone: "9025376613",
    remarks: "3/18留守③15：42　3/14留守②15:21 3/13留守①13：31　2/24 一部のみ聞けました12:05 電気×",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 9412,
    date_time: "02/18/2025 12:18",
    customer_number: 9412,
    company_code: "78",
    last_name: "清水",
    first_name: "大輔",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "7083571253",
    remarks: "3/21留守⑨16：20　3/18留守⑧15：36　3/13留守⑦13：33　3/11留守⑥14：35 3/10留守⑤14:27 3/6留守④15：14　2/27留守③16：28　2/26留守②11：33　2/24留守①12:10",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 9278,
    date_time: "02/15/2025 09:41",
    customer_number: 9278,
    company_code: "78",
    last_name: "腰越",
    first_name: "一宏",
    gender: "男性",
    desired_call_time: "",
    memo: "ライン「koshigoe」で出てくる方かと思います。面談日希望日不明",
    phone_status: "再架電(内容聞き漏れ)",
    fp_status: "",
    meeting_status: "",
    prefecture: "神奈川県",
    cellphone: "9055651057",
    remarks: "3/6留守①15：23　電気の面談:NG",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 9187,
    date_time: "02/12/2025 17:07",
    customer_number: 9187,
    company_code: "88",
    last_name: "齋藤",
    first_name: "友木恵",
    gender: "女性",
    desired_call_time: "",
    memo: "LINE登録あり",
    phone_status: "再架電(希望日超過の為)",
    fp_status: "",
    meeting_status: "",
    prefecture: "福島県",
    cellphone: "249561530",
    remarks: "2/13留守②14：13　2/12留守①18：06",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 9184,
    date_time: "02/12/2025 17:00",
    customer_number: 9184,
    company_code: "78",
    last_name: "佐藤",
    first_name: "龍一",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "大分県",
    cellphone: "8025269451",
    remarks: "3/13電話に出ましたが、LINE追加気が向いたら～という感じ　3/11留守③14：31 3/10留守②14:48 2/24留守①12:37",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 9163,
    date_time: "02/12/2025 13:33",
    customer_number: 9163,
    company_code: "78",
    last_name: "市川",
    first_name: "貴士",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(希望日超過の為)",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "08078568786",
    remarks: "3/18留守⑧15：33　3/14留守⑦15:32 3/13留守⑥14：14　3/11留守⑤14：24 3/10留守④14:51 3/6留守③15：27　2/27留守②16：33　2/24留守①14:07",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 9144,
    date_time: "02/12/2025 09:21",
    customer_number: 9144,
    company_code: "88",
    last_name: "松本",
    first_name: "航武",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(希望日超過の為)",
    fp_status: "",
    meeting_status: "",
    prefecture: "石川県",
    cellphone: "8086943175",
    remarks: "3/18留守⑧15：31　3/14留守⑦15：34　3/13留守⑥14：16　3/11留守⑤14：16 3/10留守④15:37 3/6留守③16：03　2/27留守②16：31　2/24留守①14:13",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 9119,
    date_time: "02/11/2025 10:00",
    customer_number: 9119,
    company_code: "78",
    last_name: "佐藤",
    first_name: "春奈",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "茨城県",
    cellphone: "9016061425",
    remarks: "3/21留守⑧16：53　3/18留守⑦15：28　3/14留守⑥15:37 3/13留守⑤14：＠20　3/11留守④12：20 3/10留守③15:44 2/27留守②16：45　2/24留守①14:42",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 8911,
    date_time: "02/03/2025 17:02",
    customer_number: 8911,
    company_code: "38",
    last_name: "山下",
    first_name: "剛弘",
    gender: "男性",
    desired_call_time: "2/7 21時",
    memo: "LWにて面談日確認中",
    phone_status: "再架電(希望日超過の為)",
    fp_status: "",
    meeting_status: "",
    prefecture: "埼玉県",
    cellphone: "7041674346",
    remarks: "3/21留守⑩16：51　3/18留守⑨15：26　3/14留守⑧15:41 3/10留守⑦15:47 2/27留守⑥16：57　2/24留守⑤14:48",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 8874,
    date_time: "02/02/2025 11:04",
    customer_number: 8874,
    company_code: "77",
    last_name: "桑原",
    first_name: "利旺",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "7054194471",
    remarks: "3/21留守⑨16：36　/18留守⑧15：19　3/13留守⑦14：24　2/27留守⑥16：25　2/24留守⑤14:52 2/21留守12:11 2/14留守②18：28",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 8720,
    date_time: "01/28/2025 16:04",
    customer_number: 8720,
    company_code: "2",
    last_name: "滝澤",
    first_name: "美咲",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(希望日超過の為)",
    fp_status: "別FP手配",
    meeting_status: "",
    prefecture: "千葉県",
    cellphone: "7065193988",
    remarks: "3/21留守⑦16：34　3/19留守⑥14:01 3/18留守⑤15：15　3/14留守④15:46 3/10留守③15:56 2/27留守②16：22　2/24留守①14:57 電気の面談その他:無し",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 8541,
    date_time: "01/23/2025 11:20",
    customer_number: 8541,
    company_code: "40",
    last_name: "菅原",
    first_name: "健児",
    gender: "男性",
    desired_call_time: "",
    memo: "保険に関して興味のある内容あるか確認",
    phone_status: "再架電(希望日超過の為)",
    fp_status: "",
    meeting_status: "",
    prefecture: "北海道",
    cellphone: "9037309953",
    remarks: "3/6留守⑥16：42　2/27留守⑤16：14　2/21都合悪15:00 電気の面談その他:電気OK明日1/24 12時?14時電話希望",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 8529,
    date_time: "01/22/2025 17:13",
    customer_number: 8529,
    company_code: "38",
    last_name: "谷田川",
    first_name: "正平",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(内容聞き漏れ)",
    fp_status: "",
    meeting_status: "",
    prefecture: "神奈川県",
    cellphone: "8090643357",
    remarks: "3/19留守④14:20 2/24留守③15:04 2/21留守②12:22 2/12留守①15：45　2/7都合悪12:38 再架電(内容聞き漏れ)、都合のいい日程後程連絡いただきます。　電気の面談：NG",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 8478,
    date_time: "01/21/2025 00:33",
    customer_number: 8478,
    company_code: "77",
    last_name: "宮ノ入",
    first_name: "朋加",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(希望日超過の為)",
    fp_status: "",
    meeting_status: "",
    prefecture: "埼玉県",
    cellphone: "8044347956",
    remarks: "3/21留守⑨16：31　3/18留守⑧15：08　3/13留守⑦15：17　3/11留守⑥11：48 3/6留守⑤16：40　2/27留守④16：10　2/24留守③15:29 2/21留守②12:27 2/6留守①16：24　電気の面談：NG",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 8308,
    date_time: "01/16/2025 13:11",
    customer_number: 8308,
    company_code: "6",
    last_name: "竹垣",
    first_name: "久美子",
    gender: "女性",
    desired_call_time: "LWにて確認中",
    memo: "",
    phone_status: "再架電(希望日超過の為)",
    fp_status: "",
    meeting_status: "",
    prefecture: "千葉県",
    cellphone: "9047047748",
    remarks: "3/21留守⑨15：50　3/18留守⑧14：46　3/14留守⑦15:53 3/6留守⑥16：38　/27留守⑤16：36　2/24留守④15:32 2/21留守③12:56 2/6留守②16：43",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 8304,
    date_time: "01/16/2025 12:01",
    customer_number: 8304,
    company_code: "88",
    last_name: "澁谷",
    first_name: "衛",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(希望日超過の為)",
    fp_status: "",
    meeting_status: "",
    prefecture: "宮城県",
    cellphone: "8033365968",
    remarks: "3/18留守③14：44　3/13電話つながりましたが予定がわからないとのこと。",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 8144,
    date_time: "01/12/2025 18:43",
    customer_number: 8144,
    company_code: "5",
    last_name: "西山",
    first_name: "侑子",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(希望日超過の為)",
    fp_status: "",
    meeting_status: "",
    prefecture: "福岡県",
    cellphone: "8075028538",
    remarks: "電気×",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 8131,
    date_time: "01/12/2025 13:16",
    customer_number: 8131,
    company_code: "2",
    last_name: "石澤",
    first_name: "小百合",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(希望日超過の為)",
    fp_status: "",
    meeting_status: "",
    prefecture: "埼玉県",
    cellphone: "8053367778",
    remarks: "3/21留守⑪15：40　3/18留守⑩14：40　3/14留守⑨15:55 3/11留守⑧11：40 3/6留守⑦16：35　2/24留守⑥15:36 2/21留守⑤13:00 2/4留守④14：34　1/30留守③13：34　1/28留守②13：30　1/24留守①11：44",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 8104,
    date_time: "01/11/2025 16:16",
    customer_number: 8104,
    company_code: "2",
    last_name: "田中",
    first_name: "幸音",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(希望日超過の為)",
    fp_status: "",
    meeting_status: "",
    prefecture: "大阪府",
    cellphone: "8014599875",
    remarks: "3/21留守⑧15：33　3/18留守⑦14：33　3/11留守⑥11：37 3/6留守⑤16：33　2/27留守④16：19　2/24留守③15:40 2/21留守②15:07 2/4留守①14：28",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 8023,
    date_time: "01/10/2025 15:00",
    customer_number: 8023,
    company_code: "84",
    last_name: "角",
    first_name: "れいな",
    gender: "女性",
    desired_call_time: "3月に面談希望",
    memo: "LINEにご連絡あり",
    phone_status: "再架電(希望日超過の為)",
    fp_status: "別FP手配",
    meeting_status: "",
    prefecture: "愛知県",
    cellphone: "8045220017",
    remarks: "3/21留守⑫15：28　/18留守⑪14：31　3/13",
    line_exchange: "有　ラインワークス追加待ち",
  },
  {
    id: 10680,
    date_time: "03/19/2025 13:15",
    customer_number: 10680,
    company_code: "93",
    last_name: "井上",
    first_name: "舞沙美",
    gender: "女性",
    desired_call_time: "3/20.10~11時",
    memo: "",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "福岡県",
    cellphone: "9031945354",
    remarks: "電気の面談:NG",
    line_exchange: "有　ラインワークス追加待ち"
  },
  // 中略（既存のデータ）
  {
    id: 7134,
    date_time: "12/13/2024 13:11",
    customer_number: 7134,
    company_code: "89",
    last_name: "内野",
    first_name: "美果",
    gender: "女性",
    desired_call_time: "12-16時",
    memo: "LINE登録あり",
    phone_status: "再架電(希望日超過の為)",
    fp_status: "",
    meeting_status: "",
    prefecture: "佐賀県",
    cellphone: "9056689402",
    remarks: "3/21留守⑭14：42　3/18留守⑬13：36　3/13留守⑫16：38　3/11留守⑪11：10  3/6留守⑩16：19　2/27留守⑨16：49　2/26留守⑧11：38　2/21留守⑦15:30 2/4留守⑥13：23　1/30留守⑤16：33　1/24留守④14：24　1/23留守③15:42電気の面談:NG",
    line_exchange: "有　ラインワークスOK"
  },
  // 以下、仮想的データとして追加
  {
    id: 7133,
    date_time: "12/12/2024 15:45",
    customer_number: 7133,
    company_code: "77",
    last_name: "佐々木",
    first_name: "翔太",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(希望日超過の為)",
    fp_status: "",
    meeting_status: "",
    prefecture: "北海道",
    cellphone: "9071234567",
    remarks: "3/20留守③15：30　3/15留守②12：45　12/12留守①16：00 電気の面談:OK",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 7132,
    date_time: "12/11/2024 10:20",
    customer_number: 7132,
    company_code: "93",
    last_name: "高橋",
    first_name: "美咲",
    gender: "女性",
    desired_call_time: "12/15 13時",
    memo: "LINE登録あり",
    phone_status: "再架電(LW追加依頼ﾒｰﾙ返信なし)",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8039876543",
    remarks: "3/21留守⑤14：50　3/10留守④11：30　12/15留守③13：15　12/11留守①10：25 電気の面談:NG",
    line_exchange: "有　ラインワークス追加待ち"
  },
  {
    id: 7131,
    date_time: "12/10/2024 14:30",
    customer_number: 7131,
    company_code: "89",
    last_name: "中村",
    first_name: "健一",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "再架電(内容聞き漏れ)",
    fp_status: "",
    meeting_status: "",
    prefecture: "大阪府",
    cellphone: "9065432109",
    remarks: "3/18留守④14：00　3/12留守③15：45　12/10留守①14：35 電気の面談:OK",
    line_exchange: "有　ラインワークスOK"
  }
];

const MOCK_DATA_2: Array<{
  id: number;
  date_time: string;
  customer_number: number;
  company_code: string;
  last_name: string;
  first_name: string;
  gender: string;
  desired_call_time: string;
  memo: string;
  phone_status: string;
  fp_status: string;
  meeting_status: string;
  prefecture: string;
  cellphone: string;
  remarks: string;
  line_exchange?: string; // 「LINE交換」フィールドを追加（任意）
}> = [
  {
    id: 10845,
    date_time: "03/24/2025 09:04",
    customer_number: 10845,
    company_code: "93",
    last_name: "渡辺",
    first_name: "裕里子",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "OK",
    fp_status: "",
    meeting_status: "",
    prefecture: "栃木県",
    cellphone: "9022410613",
    remarks: "電気の面談その他:NG",
    line_exchange: "有　ラインワークスOK"
  }
];

const MOCK_DATA_3: Array<{
  id: number;
  date_time: string;
  customer_number: number;
  company_code: string;
  last_name: string;
  first_name: string;
  gender: string;
  desired_call_time: string;
  memo: string;
  phone_status: string;
  fp_status: string;
  meeting_status: string;
  prefecture: string;
  cellphone: string;
  remarks: string;
  line_exchange?: string; // 「LINE交換」フィールドを追加（任意）
}> = [
  {
    id: 10843,
    date_time: "03/23/2025 21:25",
    customer_number: 10843,
    company_code: "77",
    last_name: "田中",
    first_name: "千尋",
    gender: "女性",
    desired_call_time: "3/30 17時",
    memo: "",
    phone_status: "OK",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "9026331162",
    remarks: "電気の面談:NG",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 10841,
    date_time: "03/23/2025 16:45",
    customer_number: 10841,
    company_code: "77",
    last_name: "高杉",
    first_name: "海舟",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "OK",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "9017873858",
    remarks: "",
    line_exchange: "無　SMSにて対応希望"
  },
  {
    id: 10824,
    date_time: "03/23/2025 09:11",
    customer_number: 10824,
    company_code: "89",
    last_name: "伊東",
    first_name: "恭子",
    gender: "女性",
    desired_call_time: "3/23 18時～18時半",
    memo: "LINE登録あり",
    phone_status: "OK",
    fp_status: "",
    meeting_status: "",
    prefecture: "千葉県",
    cellphone: "8020598161",
    remarks: "電気の面談:NG",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 10823,
    date_time: "03/23/2025 09:08",
    customer_number: 10823,
    company_code: "89",
    last_name: "林",
    first_name: "真澄",
    gender: "男性",
    desired_call_time: "",
    memo: "LINE登録なし",
    phone_status: "OK",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "9037471069",
    remarks: "電気の面談:NG",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 10767,
    date_time: "03/21/2025 17:48",
    customer_number: 10767,
    company_code: "77",
    last_name: "清野",
    first_name: "涼",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "OK",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8023414196",
    remarks: "3/21留守①19：09",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 10687,
    date_time: "03/19/2025 16:51",
    customer_number: 10687,
    company_code: "77",
    last_name: "坂本",
    first_name: "沙織",
    gender: "女性",
    desired_call_time: "3/20.10:00",
    memo: "",
    phone_status: "OK",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8044517926",
    remarks: "3/19留守①17：09",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 10481,
    date_time: "03/14/2025 19:00",
    customer_number: 10481,
    company_code: "93",
    last_name: "坂元",
    first_name: "一久",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "OK",
    fp_status: "",
    meeting_status: "",
    prefecture: "千葉県",
    cellphone: "8078818662",
    remarks: "3/19留守②12:50 3/18留守①13：33　電気の面談：NG",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 10201,
    date_time: "03/07/2025 20:20",
    customer_number: 10201,
    company_code: "93",
    last_name: "舩山",
    first_name: "麻衣子",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "OK",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8062500805",
    remarks: "",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 10030,
    date_time: "03/05/2025 09:20",
    customer_number: 10030,
    company_code: "93",
    last_name: "藤幡",
    first_name: "絵理",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "OK",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "9046239662",
    remarks: "電気の面談:NG",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 9949,
    date_time: "03/03/2025 17:05",
    customer_number: 9949,
    company_code: "77",
    last_name: "テキン",
    first_name: "桃子",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "OK",
    fp_status: "",
    meeting_status: "",
    prefecture: "東京都",
    cellphone: "8071983691",
    remarks: "電気の面談:NG",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 9153,
    date_time: "02/12/2025 10:23",
    customer_number: 9153,
    company_code: "78",
    last_name: "山岡",
    first_name: "章与",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "OK",
    fp_status: "別FP手配",
    meeting_status: "",
    prefecture: "神奈川県",
    cellphone: "9041619672",
    remarks: "電気×",
    line_exchange: "有　ラインワークスOK"
  }
];


const MOCK_DATA_4: Array<{
  id: number;
  date_time: string;
  customer_number: number;
  company_code: string;
  last_name: string;
  first_name: string;
  gender: string;
  desired_call_time: string;
  memo: string;
  phone_status: string;
  fp_status: string;
  meeting_status: string;
  prefecture: string;
  cellphone: string;
  remarks: string;
  line_exchange?: string; // 「LINE交換」フィールドを追加（任意）
}> = [
  {
    id: 10842,
    date_time: "03/23/2025 17:23",
    customer_number: 10842,
    company_code: "77",
    last_name: "堀越",
    first_name: "勇作",
    gender: "男性",
    desired_call_time: "2025/3/27 13:00",
    memo: "",
    phone_status: "OK",
    fp_status: "FPに照会中",
    meeting_status: "",
    prefecture: "北海道",
    cellphone: "9062692803",
    remarks: "",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 10839,
    date_time: "03/23/2025 14:19",
    customer_number: 10839,
    company_code: "77",
    last_name: "梶谷",
    first_name: "翔太",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "OK",
    fp_status: "FPに照会中",
    meeting_status: "",
    prefecture: "三重県",
    cellphone: "9076854311",
    remarks: "電気の面談:NG",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 10834,
    date_time: "03/23/2025 11:23",
    customer_number: 10834,
    company_code: "93",
    last_name: "竹下",
    first_name: "理恵",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "OK",
    fp_status: "FPに照会中",
    meeting_status: "",
    prefecture: "熊本県",
    cellphone: "9071552989",
    remarks: "電気×",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 10833,
    date_time: "03/23/2025 09:33",
    customer_number: 10833,
    company_code: "77",
    last_name: "松本",
    first_name: "佳代",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "OK",
    fp_status: "FPに照会中",
    meeting_status: "",
    prefecture: "滋賀県",
    cellphone: "8057006219",
    remarks: "電気×　3/23留守①12：50",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 10832,
    date_time: "03/23/2025 09:31",
    customer_number: 10832,
    company_code: "93",
    last_name: "茶谷",
    first_name: "侑夏",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "OK",
    fp_status: "FPに照会中",
    meeting_status: "",
    prefecture: "大阪府",
    cellphone: "8053482514",
    remarks: "電気×　洗浄×",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 10829,
    date_time: "03/23/2025 09:23",
    customer_number: 10829,
    company_code: "89",
    last_name: "西林",
    first_name: "梨奈",
    gender: "女性",
    desired_call_time: "",
    memo: "LINE登録あり",
    phone_status: "OK",
    fp_status: "FPに照会中",
    meeting_status: "",
    prefecture: "徳島県",
    cellphone: "8098302895",
    remarks: "電気×",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 10814,
    date_time: "03/22/2025 19:40",
    customer_number: 10814,
    company_code: "77",
    last_name: "金子",
    first_name: "彬人",
    gender: "男性",
    desired_call_time: "3/23 10時か17時",
    memo: "",
    phone_status: "OK",
    fp_status: "FPに照会中",
    meeting_status: "",
    prefecture: "群馬県",
    cellphone: "9048263499",
    remarks: "3/22留守①20：35",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 10796,
    date_time: "03/22/2025 13:06",
    customer_number: 10796,
    company_code: "93",
    last_name: "松本",
    first_name: "文美",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "OK",
    fp_status: "FPに照会中",
    meeting_status: "",
    prefecture: "埼玉県",
    cellphone: "9021798849",
    remarks: "電気の面談その他:NG",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 10793,
    date_time: "03/22/2025 11:54",
    customer_number: 10793,
    company_code: "88",
    last_name: "西下",
    first_name: "武志",
    gender: "男性",
    desired_call_time: "3/22 20：00～20：30",
    memo: "LINE登録あり",
    phone_status: "OK",
    fp_status: "FPに照会中",
    meeting_status: "",
    prefecture: "兵庫県",
    cellphone: "9082325031",
    remarks: "電気の面談：OK 希望日時 3/29 17:00以降",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 10789,
    date_time: "03/22/2025 09:56",
    customer_number: 10789,
    company_code: "77",
    last_name: "松田",
    first_name: "淳",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "OK",
    fp_status: "FPに照会中",
    meeting_status: "",
    prefecture: "新潟県",
    cellphone: "8079668677",
    remarks: "電気の面談その他:NG",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 10786,
    date_time: "03/22/2025 09:21",
    customer_number: 10786,
    company_code: "93",
    last_name: "宮田",
    first_name: "寛子",
    gender: "女性",
    desired_call_time: "",
    memo: "",
    phone_status: "OK",
    fp_status: "FPに照会中",
    meeting_status: "",
    prefecture: "埼玉県",
    cellphone: "8017326026",
    remarks: "電気の面談その他:NG",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 10783,
    date_time: "03/22/2025 09:18",
    customer_number: 10783,
    company_code: "77",
    last_name: "桑島",
    first_name: "直央",
    gender: "女性",
    desired_call_time: "3/23.15時",
    memo: "",
    phone_status: "OK",
    fp_status: "FPに照会中",
    meeting_status: "",
    prefecture: "大阪府",
    cellphone: "9065510317",
    remarks: "電気の面談その他:NG",
    line_exchange: "有　ラインワークスOK"
  },
  {
    id: 10764,
    date_time: "03/21/2025 15:25",
    customer_number: 10764,
    company_code: "88",
    last_name: "藤位",
    first_name: "峻彰",
    gender: "男性",
    desired_call_time: "",
    memo: "",
    phone_status: "OK",
    fp_status: "FPに照会中",
    meeting_status: "",
    prefecture: "大阪府",
    cellphone: "9075563649",
    remarks: "電気の面談:NG",
    line_exchange: "有　ラインワークスOK"
  },
]

const MOCK_DATA_5: Array<{
  id: number;
  date_time: string;
  customer_number: number;
  company_code: string;
  last_name: string;
  first_name: string;
  gender: string;
  desired_call_time: string;
  memo: string;
  phone_status: string;
  fp_status: string;
  meeting_status: string;
  prefecture: string;
  cellphone: string;
  remarks: string;
  line_exchange?: string; // 「LINE交換」フィールドを追加（任意）
}> = []


const MOCK_DATA_6: Array<{
  id: number;
  date_time: string;
  customer_number: number;
  company_code: string;
  last_name: string;
  first_name: string;
  gender: string;
  desired_call_time: string;
  memo: string;
  phone_status: string;
  fp_status: string;
  meeting_status: string;
  prefecture: string;
  cellphone: string;
  remarks: string;
  line_exchange?: string; // 「LINE交換」フィールドを追加（任意）
}> = []

const MOCK_DATA_7: Array<{
  id: number;
  date_time: string;
  customer_number: number;
  company_code: string;
  last_name: string;
  first_name: string;
  gender: string;
  desired_call_time: string;
  memo: string;
  phone_status: string;
  fp_status: string;
  meeting_status: string;
  prefecture: string;
  cellphone: string;
  remarks: string;
  line_exchange?: string; // 「LINE交換」フィールドを追加（任意）
}> = []

const MOCK_DATA_8: Array<{
  id: number;
  date_time: string;
  customer_number: number;
  company_code: string;
  last_name: string;
  first_name: string;
  gender: string;
  desired_call_time: string;
  memo: string;
  phone_status: string;
  fp_status: string;
  meeting_status: string;
  prefecture: string;
  cellphone: string;
  remarks: string;
  line_exchange?: string; // 「LINE交換」フィールドを追加（任意）
}> = []

const MOCK_DATA_9: Array<{
  id: number;
  date_time: string;
  customer_number: number;
  company_code: string;
  last_name: string;
  first_name: string;
  gender: string;
  desired_call_time: string;
  memo: string;
  phone_status: string;
  fp_status: string;
  meeting_status: string;
  prefecture: string;
  cellphone: string;
  remarks: string;
  line_exchange?: string; // 「LINE交換」フィールドを追加（任意）
}> = []

const MOCK_DATA_10: Array<{
  id: number;
  date_time: string;
  customer_number: number;
  company_code: string;
  last_name: string;
  first_name: string;
  gender: string;
  desired_call_time: string;
  memo: string;
  phone_status: string;
  fp_status: string;
  meeting_status: string;
  prefecture: string;
  cellphone: string;
  remarks: string;
  line_exchange?: string; // 「LINE交換」フィールドを追加（任意）
}> = []

const MOCK_DATA_11: Array<{
  id: number;
  date_time: string;
  customer_number: number;
  company_code: string;
  last_name: string;
  first_name: string;
  gender: string;
  desired_call_time: string;
  memo: string;
  phone_status: string;
  fp_status: string;
  meeting_status: string;
  prefecture: string;
  cellphone: string;
  remarks: string;
  line_exchange?: string; // 「LINE交換」フィールドを追加（任意）
}> = []

// Define the Customer type based on the Django model
interface Customer {
  id: number;
  date_time: string | null;
  customer_number: number | null;
  company_code: string | null;
  last_name: string | null;
  first_name: string | null;
  gender: string | null;
  desired_call_time: string | null;
  memo: string | null;
  phone_status: string | null;
  fp_status: string | null;
  meeting_status: string | null;
  prefecture: string | null;
  cellphone: string | null;
  remarks: string | null;
}


const Process = () => {
  const [activeStep, setActiveStep] = useState(PROCESS_STEPS[0].id);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  // Fetch customers from API
  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/customer_call/import_csv/");
      setCustomers(response.data);
    } catch (error) {
      console.error("顧客データの取得に失敗しました：", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  const onFileUpload = async () => {
    if (!file) {
      setMessage("ファイルが選択されていません。");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:9000/api/customer_call/import_csv/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      if (response.data.data) {
        setCustomers(response.data.data);
      } else {
        fetchCustomers();
      }
    } catch (error) {
      console.error("CSVインポート中にエラーが発生しました：", error);
      setMessage("CSVインポート中にエラーが発生しました");
    }
  };

  const filteredCustomers = activeStep === PROCESS_STEPS[0].id ? MOCK_DATA_0 :
                            activeStep === PROCESS_STEPS[1].id ? MOCK_DATA_1 :
                            activeStep === PROCESS_STEPS[2].id ? MOCK_DATA_2 :
                            activeStep === PROCESS_STEPS[3].id ? MOCK_DATA_3 :
                            activeStep === PROCESS_STEPS[4].id ? MOCK_DATA_4 :
                            activeStep === PROCESS_STEPS[5].id ? MOCK_DATA_5 :
                            activeStep === PROCESS_STEPS[6].id ? MOCK_DATA_6 :
                            activeStep === PROCESS_STEPS[7].id ? MOCK_DATA_7 :
                            activeStep === PROCESS_STEPS[8].id ? MOCK_DATA_8 :
                            activeStep === PROCESS_STEPS[9].id ? MOCK_DATA_9 :
                            activeStep === PROCESS_STEPS[10].id ? MOCK_DATA_10 :
                            activeStep === PROCESS_STEPS[11].id ? MOCK_DATA_11 :
                            customers.filter(
                              customer => customer.fp_status === PROCESS_STEPS.find(step => step.id === activeStep)?.label
                            );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">プロセス管理ダッシュボード</h1>
          <p className="text-gray-600">顧客のプロセスを効率的に管理・追跡</p>
        </div>
        
        <ProcessSteps
          steps={[
            { id: 'confirmation_possible', label: '確認電話可能', description: '' },
            { id: 're_call', label: '再架電', description: '' },
            { id: 'phone_confirmed', label: '確認電話通過', description: '' },
            { id: 'fp_not_assigned', label: 'FP未振り', description: '' },
            { id: 'fp_inquiry', label: 'FP照会中', description: '' },
            { id: 'chat_group_pending', label: 'チャットグループ未', description: '' },
            { id: 'fp_assigned_no_schedule', label: 'FP振り済日程未定', description: '' },
            { id: 'fp_scheduled_monthly', label: 'FP日時確定/月間', description: '' },
            { id: 'execution_monthly', label: '実行/月間', description: '' },
            { id: 'fp_scheduled_today', label: 'FP日時確定/当日', description: '' },
            { id: 'execution_today', label: '実行/当日', description: '' },
            { id: 'execution_confirmation', label: '実行確認用', description: '' },
          ]}
          activeStep={activeStep}
          onStepClick={setActiveStep}
        />
        
        <div className="relative overflow-x-auto">
          <table className="w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">日時</th>
                <th className="px-4 py-2">顧客番号</th>
                <th className="px-4 py-2">企業コード</th>
                <th className="px-4 py-2">苗字</th>
                <th className="px-4 py-2">名前</th>
                <th className="px-4 py-2">性別</th>
                <th className="px-4 py-2">確認電話希望日時</th>
                <th className="px-4 py-2">メモ</th>
                <th className="px-4 py-2">電話連絡ステータス</th>
                <th className="px-4 py-2">FPステータス</th>
                <th className="px-4 py-2">面談ステータス</th>
                <th className="px-4 py-2">都道府県</th>
                <th className="px-4 py-2">携帯番号</th>
                <th className="px-4 py-2">備考欄</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers && filteredCustomers.length > 0 ? (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="border-t">
                    <td className="px-4 py-2">{cust.id}</td>
                    <td className="px-4 py-2">{cust.date_time}</td>
                    <td className="px-4 py-2">{cust.customer_number}</td>
                    <td className="px-4 py-2">{cust.company_code}</td>
                    <td className="px-4 py-2">{cust.last_name}</td>
                    <td className="px-4 py-2">{cust.first_name}</td>
                    <td className="px-4 py-2">{cust.gender}</td>
                    <td className="px-4 py-2">{cust.desired_call_time}</td>
                    <td className="px-4 py-2">{cust.memo}</td>
                    <td className="px-4 py-2">{cust.phone_status}</td>
                    <td className="px-4 py-2">{cust.fp_status}</td>
                    <td className="px-4 py-2">{cust.meeting_status}</td>
                    <td className="px-4 py-2">{cust.prefecture}</td>
                    <td className="px-4 py-2">{cust.cellphone}</td>
                    <td className="px-4 py-2">{cust.remarks}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2" colSpan={15}>
                    データがありません
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* CSVインポートセクション */}
        <div>
          <h2 className="text-xl font-bold mb-4">CSV インポート (Process)</h2>
          <div className="flex items-center space-x-4">
            <input type="file" accept=".csv" onChange={onFileChange} />
            <button
              onClick={onFileUpload}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              アップロード
            </button>
          </div>
          {message && <p className="mt-2 text-green-600">{message}</p>}
        </div>
      </div>
    </div>
  );
};export default Process;

