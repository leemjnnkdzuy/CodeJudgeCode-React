import assets from "../assets"

const RANK = {
    "Unranked": {
        "name": "Chưa Xếp Hạng",
        "min_rating": -1,
        "max_rating": -1,
        "icon": assets.rank.Unranked,
        "color": "#6c757d",
        "order": 0
    },
    "Iron_1" : {
        "name" : "Sắt I",
        "min_rating" : 0,
        "max_rating" : 199,
        "icon" : assets.rank.Iron_1,
        "color" : "#6c757d",
        "order" : 1
    },
    "Iron_2" : {
        "name" : "Sắt II",
        "min_rating" : 200,
        "max_rating" : 399,
        "icon" : assets.rank.Iron_2,
        "color" : "#6c757d",
        "order" : 2
    },
    "Iron_3" : {
        "name" : "Sắt III",
        "min_rating" : 400,
        "max_rating" : 599,
        "icon" : assets.rank.Iron_3,
        "color" : "#6c757d",
        "order" : 3
    },
    "Bronze_1" : {
        "name" : "Đồng I",
        "min_rating" : 600,
        "max_rating" : 799,
        "icon" : assets.rank.Bronze_1,
        "color" : "#cd7f32",
        "order" : 4
    },
    "Bronze_2" : {
        "name" : "Đồng II",
        "min_rating" : 800,
        "max_rating" : 999,
        "icon" : assets.rank.Bronze_2,
        "color" : "#cd7f32",
        "order" : 5
    },
    "Bronze_3" : {
        "name" : "Đồng III",
        "min_rating" : 1000,
        "max_rating" : 1199,
        "icon" : assets.rank.Bronze_3,
        "color" : "#cd7f32",
        "order" : 6
    },
    "Silver_1" : {
        "name" : "Bạc I",
        "min_rating" : 1200,
        "max_rating" : 1399,
        "icon" : assets.rank.Silver_1,
        "color" : "#c0c0c0",
        "order" : 7
    },
    "Silver_2" : {
        "name" : "Bạc II",
        "min_rating" : 1400,
        "max_rating" : 1599,
        "icon" : assets.rank.Silver_2,
        "color" : "#c0c0c0",
        "order" : 8
    },
    "Silver_3" : {
        "name" : "Bạc III",
        "min_rating" : 1600,
        "max_rating" : 1799,
        "icon" : assets.rank.Silver_3,
        "color" : "#c0c0c0",
        "order" : 9
    },
    "Gold_1" : {
        "name" : "Vàng I",
        "min_rating" : 1800,
        "max_rating" : 1999,
        "icon" : assets.rank.Gold_1,
        "color" : "#ffd700",
        "order" : 10
    },
    "Gold_2" : {
        "name" : "Vàng II",
        "min_rating" : 2000,
        "max_rating" : 2199,
        "icon" : assets.rank.Gold_2,
        "color" : "#ffd700",
        "order" : 11
    },
    "Gold_3" : {
        "name" : "Vàng III",
        "min_rating" : 2200,
        "max_rating" : 2399,
        "icon" : assets.rank.Gold_3,
        "color" : "#ffd700",
        "order" : 12
    },
    "Platinum_1" : {
        "name" : "Bạch Kim I",
        "min_rating" : 2400,
        "max_rating" : 2599,
        "icon" : assets.rank.Platinum_1,
        "color" : "#00a78b",
        "order" : 13
    },
    "Platinum_2" : {
        "name" : "Bạch Kim II",
        "min_rating" : 2600,
        "max_rating" : 2799,
        "icon" : assets.rank.Platinum_2,
        "color" : "#00a78b",
        "order" : 14
    },
    "Platinum_3" : {
        "name" : "Bạch Kim III",
        "min_rating" : 2800,
        "max_rating" : 2999,
        "icon" : assets.rank.Platinum_3,
        "color" : "#00a78b",
        "order" : 15
    },
    "Diamond_1" : {
        "name" : "Kim Cương I",
        "min_rating" : 3000,
        "max_rating" : 3199,
        "icon" : assets.rank.Diamond_1,
        "color" : "#b30fff",
        "order" : 16
    },
    "Diamond_2" : {
        "name" : "Kim Cương II",
        "min_rating" : 3200,
        "max_rating" : 3399,
        "icon" : assets.rank.Diamond_2,
        "color" : "#b30fff",
        "order" : 17
    },
    "Diamond_3" : {
        "name" : "Kim Cương III",
        "min_rating" : 3400,
        "max_rating" : 3599,
        "icon" : assets.rank.Diamond_3,
        "color" : "#b30fff",
        "order" : 18
    },
    "Ascendant_1" : {
        "name" : "Thăng Thiên I",
        "min_rating" : 3600,
        "max_rating" : 3799,
        "icon" : assets.rank.Ascendant_1,
        "color" : "#00c462",
        "order" : 19
    },
    "Ascendant_2" : {
        "name" : "Thăng Thiên II",
        "min_rating" : 3800,
        "max_rating" : 3999,
        "icon" : assets.rank.Ascendant_2,
        "color" : "#00c462",
        "order" : 20
    },
    "Ascendant_3" : {
        "name" : "Thăng Thiên III",
        "min_rating" : 4000,
        "max_rating" : 4199,
        "icon" : assets.rank.Ascendant_3,
        "color" : "#00c462",
        "order" : 21
    },
    "Immortal_1" : {
        "name" : "Bất Tử I",
        "min_rating" : 4200,
        "max_rating" : 4399,
        "icon" : assets.rank.Immortal_1,
        "color" : "#7e0000",
        "order" : 22
    },
    "Immortal_2" : {
        "name" : "Bất Tử II",
        "min_rating" : 4400,
        "max_rating" : 4599,
        "icon" : assets.rank.Immortal_2,
        "color" : "#7e0000",
        "order" : 23
    },
    "Immortal_3" : {
        "name" : "Bất Tử III",
        "min_rating" : 4600,
        "max_rating" : 4799,
        "icon" : assets.rank.Immortal_3,
        "color" : "#7e0000",
        "order" : 24
    },
    "Radiant" : {
        "name" : "Rực Rỡ",
        "min_rating" : 4800,
        "max_rating" : 999999,
        "icon" : assets.rank.Radiant,
        "color" : "#b3a700ff",
        "order" : 25
    }
}

export default RANK;