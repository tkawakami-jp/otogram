User.create!([
  {email: "takabo.beta@gmail.com", password: "tk154500", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 1, current_sign_in_at: "2016-01-01 00:00:00", last_sign_in_at: "2016-01-01 00:00:00", current_sign_in_ip: "124.110.12.224", last_sign_in_ip: "124.110.12.224", confirmation_token: "ypz8EA9mQKs-h5fg_rF1", confirmed_at: "2016-01-01 00:00:00", confirmation_sent_at: "2016-01-01 00:00:00", unconfirmed_email: nil, deleted_at: nil, username: "takahiro", invited_by_id: nil},
  {email: "tkawakami@tkltd.jp", password: "tk154500", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 1, current_sign_in_at: "2016-01-01 00:00:00", last_sign_in_at: "2016-01-01 00:00:00", current_sign_in_ip: "124.110.12.224", last_sign_in_ip: "124.110.12.224", confirmation_token: "ypz8EA9mQKs-h5fg_rF2", confirmed_at: "2016-01-01 00:00:00", confirmation_sent_at: "2016-01-01 00:00:00", unconfirmed_email: nil, deleted_at: nil, username: "alex", invited_by_id: nil},
  {email: "o9o60155417@docomo.ne.jp", password: "tk154500", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 1, current_sign_in_at: "2016-01-01 00:00:00", last_sign_in_at: "2016-01-01 00:00:00", current_sign_in_ip: "124.110.12.224", last_sign_in_ip: "124.110.12.224", confirmation_token: "ypz8EA9mQKs-h5fg_rF3", confirmed_at: "2016-01-01 00:00:00", confirmation_sent_at: "2016-01-01 00:00:00", unconfirmed_email: nil, deleted_at: nil, username: "takabo", invited_by_id: nil},
])
Invite.create!([
  {sender_id: 1, receiver_id: nil, email: "takabo.beta@gmail.com", token: "aaa"},
])
Note.create!([
  {score_id: 1, user_id: 1, data: "{\"note\":[[20],[],[20],[],[16],[],[16],[],[15],[],[15],[],[16],[],[],[],[17],[],[17],[],[18],[],[18],[],[19],[],[19],[],[20],[],[],[],[16],[],[16],[],[17],[],[17],[],[18],[],[18],[],[19],[],[],[],[16],[],[16],[],[17],[],[17],[],[18],[],[18],[],[19],[],[],[],[20],[],[20],[],[16],[],[16],[],[15],[],[15],[],[16],[],[],[],[17],[],[17],[],[18],[],[18],[],[19],[],[19],[],[20],[],[],[]],\"bpm\":100,\"beat\":8,\"len\":96}"},
  {score_id: 1, user_id: 2, data: "{\"note\":[[13],[9],[11],[9],[13],[9],[11],[9],[13],[10],[13],[10],[9,11],[],[],[],[10,15],[13],[10,15],[13],[11,16],[13],[11,16],[13],[12,14],[16],[12],[14],[13,18],[],[],[],[18],[9],[18],[9],[19],[9],[19],[9],[20],[9],[20],[9],[21],[],[],[],[],[9,13],[],[9,13],[],[9,13],[],[9,13],[],[9,13],[],[9,13],[12,14],[],[],[],[18],[20],[18],[20],[18],[18],[18],[18],[17],[17],[17],[17],[9,18],[],[],[],[15],[17],[15],[14],[13],[16],[13],[],[12,16],[],[12,16],[],[13,18],[],[],[]],\"bpm\":100,\"beat\":8,\"len\":96}"},
  {score_id: 2, user_id: 1, data: "{\"note\":[[20],[],[],[],[],[],[],[]],\"bpm\":120,\"beat\":8,\"len\":32}"},
  {score_id: 2, user_id: 1, data: "{\"note\":[[],[19],[],[],[],[],[],[]],\"bpm\":120,\"beat\":8,\"len\":32}"},
  {score_id: 2, user_id: 1, data: "{\"note\":[[],[],[18],[],[],[],[],[]],\"bpm\":120,\"beat\":8,\"len\":32}"},
  {score_id: 2, user_id: 1, data: "{\"note\":[[],[],[],[17],[],[],[],[]],\"bpm\":120,\"beat\":8,\"len\":32}"},
  {score_id: 2, user_id: 1, data: "{\"note\":[[],[],[],[],[16],[],[],[]],\"bpm\":120,\"beat\":8,\"len\":32}"},
  {score_id: 2, user_id: 1, data: "{\"note\":[[],[],[],[],[],[15],[],[]],\"bpm\":120,\"beat\":8,\"len\":32}"},
  {score_id: 2, user_id: 1, data: "{\"note\":[[],[],[],[],[],[],[14],[]],\"bpm\":120,\"beat\":8,\"len\":32}"},
  {score_id: 2, user_id: 1, data: "{\"note\":[[],[],[],[],[],[],[],[13]],\"bpm\":120,\"beat\":8,\"len\":32}"},
  {score_id: 3, user_id: 1, data: "{\"note\":[[],[],[21,19,16],[],[19,16,78],[16],[],[141,16,148],[],[],[13],[78],[13],[],[78],[16],[],[23],[21],[23],[22],[],[20],[22],[21],[],[23],[21],[22],[],[],[],[],[],[16,78,12],[],[16,78],[12],[],[148,16,141],[],[],[13],[78],[20,145,13],[78],[17],[16],[],[],[10],[],[12],[140],[11],[],[10],[12],[],[78],[],[16],[],[145],[],[],[21,19,16],[],[],[19,17,78],[],[18,16,13],[],[],[],[],[],[],[],[],[],[],[82,16,13],[],[],[18,16,78],[],[19,145,12],[],[],[],[],[],[],[],[],[9,78],[],[],[79,12,10],[],[],[16,78,12],[],[],[141,16,148],[],[],[20,16,13],[],[20,145,78],[],[21,19,16],[],[],[],[],[],[152,22,20,17],[],[],[],[19],[],[17],[19],[],[16],[],[],[21,19,22],[],[148,19],[20,19],[],[20,19],[],[],[144],[15,20],[],[],[17],[],[19],[23],[21],[23],[148],[20],[21],[],[20],[21],[21],[],[19],[19],[17],[19],[16],[15],[17],[16],[],[],[],[],[],[144],[15],[],[],[148,16],[17,20],[],[21,19],[23],[],[],[],[],[],[],[],[],[16],[],[16],[12],[],[13],[],[],[18],[18],[],[],[],[],[],[],[],[16],[],[16],[15],[],[83,16,78],[],[],[19,16],[],[],[],[],[],[],[],[],[16],[],[12],[],[16,13],[12],[13],[],[17],[],[],[],[145],[],[20,18,15],[],[],[22,17],[],[],[21,16],[],[19,12],[],[19,16,78],[12],[],[141,16,148],[],[],[13],[78],[13,145,20],[78],[17],[16,21],[],[],[],[],[],[],[20,17,22,152],[],[],[],[19],[],[17],[19],[],[16],[],[],[],[],[148],[19],[16],[20],[],[20,144],[15],[21],[],[17],[],[],[19],[23],[21],[20],[19],[16],[],[148],[],[20],[21],[19],[19],[19],[17],[19],[16],[15],[17],[16],[],[21,23],[],[],[22],[144],[15],[],[20,17],[17],[],[],[19],[],[19,21,23],[],[87,21,19],[],[],[23,21,19],[],[],[16],[],[16],[12],[],[13],[],[],[18,13],[],[],[],[],[],[],[],[16],[],[16],[],[15],[],[83,16,78],[],[],[19,16],[],[],[],[],[],[],[],[],[16],[],[12],[],[16,13],[12],[13],[],[17],[],[],[],[145],[],[20,18,15],[],[],[22,17],[],[],[148,16],[],[],[20],[],[],[21],[],[],[],[15,13],[],[78,12],[],[16,78],[],[],[],[16,78,75,9],[],[],[],[],[],[],[],[15,13,75],[],[15,13],[15],[],[17,12,10],[],[12],[141],[12],[75],[12],[75],[10],[],[],[12,78,17],[],[75],[10],[],[9,75,78],[],[],[],[78,75,9],[],[],[],[],[],[],[6,8,75],[],[8],[9],[],[9],[12],[],[8],[10,12],[],[],[],[],[],[19],[148],[19],[17],[18],[],[19],[23],[],[20],[20],[],[13],[],[],[],[20],[21],[20],[18],[19],[151],[22],[20,22],[],[23,85],[21,23],[],[78],[],[],[],[],[16,21],[],[78,16],[12],[],[16,78,9],[],[],[],[],[78,9],[7],[],[141,8],[],[],[9],[],[138],[9],[],[9,8,13],[],[],[15],[15],[17],[15],[15],[],[15,145,19],[15],[],[15],[15,17],[],[15],[15,17,12],[],[],[5],[],[6],[7],[],[6],[8],[],[19],[],[17],[19],[],[16],[],[],[19],[],[148],[20],[21],[],[23],[24],[23,144],[15],[],[17],[],[],[19],[23],[21],[20],[19],[16],[],[148],[],[20],[21],[],[19],[19],[17],[19],[16],[15],[17],[16],[148],[20],[21],[],[23],[24],[23,15],[],[17],[16],[],[19],[],[],[19,21,23],[],[87,21,19],[],[],[19,21,23],[],[],[16],[],[16],[12],[],[13],[],[],[13,18],[13],[],[],[],[],[],[16],[],[],[15],[],[],[],[83,16,78],[],[],[19,16],[],[],[],[],[],[],[],[],[16],[12],[],[13],[18,16],[],[],[],[20,17],[],[],[],[20,145],[],[18,15,20],[],[],[17,22],[],[],[19,21,16],[],[16,19,21],[],[],[],[],[],[19,21,16],[],[],[],[19,16,12],[],[13,16,18],[],[],[],[],[],[140],[11],[10],[11],[12],[78],[16],[],[],[],[],[],[16,78,12],[],[78,16],[],[],[],[],[],[],[],[],[],[10,12,78],[],[16,13,11],[],[],[],[],[],[],[12],[78],[16,78],[12],[78],[16,78],[12],[13],[78],[16],[],[9,78],[],[],[79,12,10],[],[],[16,78,12],[],[],[148,16,141],[],[],[20,16,13],[],[78,145,20],[],[21,19,16],[],[],[],[],[],[21,19,145,15],[],[],[],[],[],[],[],[],[]],\"bpm\":126,\"beat\":16,\"len\":752}"},
  {score_id: 3, user_id: 2, data: "{\"note\":[[30],[],[23],[],[25],[92],[],[29],[],[],[89],[],[29],[],[93],[30],[],[],[30],[],[31],[],[31],[],[32],[],[32],[],[33],[],[26],[],[30],[],[23],[],[25],[92],[],[29],[],[],[29],[],[96],[],[33],[30],[],[],[30],[],[31],[],[31],[],[32],[],[32],[],[33],[],[26],[],[30],[],[23],[],[],[21,92],[],[27,20],[],[],[23],[],[20],[23],[25],[27],[29],[],[22],[],[],[89,32],[],[26,33],[],[],[29],[],[26],[29],[159],[33],[30,23],[],[],[92,21],[],[],[32,25],[],[],[29,22],[],[],[32,25],[],[33,26],[],[30,23],[],[],[],[],[],[33,26],[],[],[],[],[],[],[],[],[],[30],[],[31],[],[32],[],[30],[],[29],[],[155],[],[26],[],[33],[],[30],[],[30],[],[92],[],[92],[],[29],[],[96],[],[33],[],[159],[],[30],[],[31],[],[32],[],[35],[],[36],[],[162],[],[33],[],[29],[],[30],[],[30],[],[93],[],[29],[],[30],[],[23],[],[26],[],[155],[],[27,25,21],[],[27],[],[89],[],[27],[],[90,24,21],[],[],[27,89,85],[],[],[26],[],[89],[],[89],[],[25],[],[89],[],[89,23,83],[],[],[89],[],[],[92],[],[29],[],[89],[],[27],[],[29],[],[26],[],[33],[],[31],[],[159],[],[30],[],[31],[],[32],[96],[],[29],[],[],[29],[],[32],[],[33],[30],[],[],[],[],[],[],[26,33],[],[],[],[],[],[],[],[],[],[30],[],[31],[],[32],[],[35],[],[36],[],[162],[],[33],[],[159],[],[30],[],[30],[],[92],[],[92],[],[29],[],[96],[],[33],[],[159],[],[30],[],[31],[],[32],[],[35],[],[36],[],[162],[],[33],[],[29],[],[30],[],[30],[],[93],[],[29],[],[30],[],[23],[],[90],[],[155],[],[27,25,21],[],[27],[],[89],[],[27],[],[90,24,21],[],[],[27,85,89],[],[],[26],[],[89],[],[89],[],[25],[],[89],[],[89,23,83],[],[],[89],[],[],[92],[],[29],[],[89],[],[27],[],[29],[],[26],[],[33],[],[31],[],[159],[],[29],[],[],[93],[],[],[30],[],[],[],[30],[],[23],[],[],[],[],[],[34,27],[],[],[27],[],[],[31],[],[30],[],[29],[],[31],[],[92],[],[26],[],[27],[],[89],[],[26],[],[24],[],[21],[],[21],[],[20],[],[27],[],[23],[],[152],[],[24],[],[22],[],[24],[],[24],[],[92],[],[24],[],[26],[],[22],[],[24],[],[92],[],[26],[],[92],[],[29],[],[29],[],[27],[],[155],[],[26],[],[32],[],[31],[],[159],[],[30],[],[33],[],[37],[],[30],[],[31],[],[31],[],[31],[31],[],[32,25],[],[],[25],[],[92],[],[30],[],[29],[],[28],[],[27],[],[155],[],[26,33],[],[33],[],[96],[],[32],[],[33],[],[33],[],[26],[],[29],[26,33],[],[],[26],[],[27],[92],[],[27],[29],[],[],[],[33],[],[],[],[30],[],[31],[],[32],[],[35],[],[36],[],[162],[],[33],[],[159],[],[30],[],[30],[],[92],[],[92],[],[29],[],[96],[],[33],[],[159],[],[30],[],[31],[],[32],[],[35],[],[36],[],[162],[],[33],[],[29],[],[30],[],[30],[],[93],[],[29],[],[30],[],[23],[],[26],[],[155],[],[27,25,21],[],[27],[],[89],[],[27],[],[90,24,21],[],[],[89,85,27],[],[],[26],[],[89],[],[89],[],[25],[],[89],[],[89,23,83],[],[],[89],[],[],[28],[],[29],[],[89],[],[27],[],[29],[],[26],[],[33],[],[31],[],[159],[],[30],[],[29],[],[92],[],[26],[],[23],[],[26],[],[92],[28],[27],[],[],[],[34],[],[27],[],[],[],[27],[],[30],[],[27],[30],[34],[],[30],[],[29],[],[92],[],[26],[],[23],[],[26],[],[92],[28],[27],[],[],[],[34],[],[27],[],[],[],[27],[],[30],[],[27],[30],[34],[],[30,23],[],[],[92,21],[],[],[25,32],[],[],[22,29],[],[],[89,96],[],[26,33],[],[30,23],[],[],[],[],[],[34,27],[],[],[],[],[],[],[],[],[]],\"bpm\":126,\"beat\":16,\"len\":752}"}
])
Score.create!([
  {owner_id: 1, name: "Twinkle Twinkle Little Star"},
  {owner_id: 1, name: "color"},
  {owner_id: 1, name: "Lupin the Third '80"}
])
Wait.create!([
  {email: "takabo.beta@gmail.com"}
])
