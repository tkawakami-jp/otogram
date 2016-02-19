User.create!([
  {email: "kohpaw@gmail.com", encrypted_password: "$2a$10$rdPiQxaat9xgOm3ukVRIR.6wJR16nBe748rsGzAbt7RuAjv3oTpwu", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: "2016-02-09 16:37:37", sign_in_count: 2, current_sign_in_at: "2016-02-09 16:39:17", last_sign_in_at: "2016-02-09 16:37:37", current_sign_in_ip: "126.249.112.244", last_sign_in_ip: "126.249.112.244", confirmation_token: "ysro-RM-PLaq2cHHDwmx", confirmed_at: "2016-02-09 16:37:26", confirmation_sent_at: "2016-02-09 16:36:04", unconfirmed_email: nil, deleted_at: nil, username: "kohei", invited_by_id: 1},
  {email: "o9o60155417@docomo.ne.jp", encrypted_password: "$2a$10$oipX5TO8i0/W/HvM17eV8u6HnT1JyN5r.FdddiixUxJXV3eAfmqzW", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 1, current_sign_in_at: "2015-12-31 15:00:00", last_sign_in_at: "2015-12-31 15:00:00", current_sign_in_ip: "124.110.12.224", last_sign_in_ip: "124.110.12.224", confirmation_token: "ypz8EA9mQKs-h5fg_rF3", confirmed_at: "2015-12-31 15:00:00", confirmation_sent_at: "2015-12-31 15:00:00", unconfirmed_email: nil, deleted_at: nil, username: "takachan", invited_by_id: nil},
  {email: "tkawakami@tkltd.jp", encrypted_password: "$2a$10$WdKJZyc8ge56i5kMXpAwGuyLWoEizM8A/tX1e8DHOG7.R5wQNLE32", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 1, current_sign_in_at: "2015-12-31 15:00:00", last_sign_in_at: "2015-12-31 15:00:00", current_sign_in_ip: "124.110.12.224", last_sign_in_ip: "124.110.12.224", confirmation_token: "ypz8EA9mQKs-h5fg_rF2", confirmed_at: "2015-12-31 15:00:00", confirmation_sent_at: "2015-12-31 15:00:00", unconfirmed_email: nil, deleted_at: nil, username: "takahiro", invited_by_id: nil},
  {email: "takabo.beta@gmail.com", encrypted_password: "$2a$10$c3XZcPB4vb5iRDx2mNBEtuhFjiWc/zf..vLPjz81G14V0e5zAr6aS", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 3, current_sign_in_at: "2016-02-18 12:59:09", last_sign_in_at: "2016-02-18 01:11:50", current_sign_in_ip: "10.0.2.2", last_sign_in_ip: "10.0.2.2", confirmation_token: "ypz8EA9mQKs-h5fg_rF1", confirmed_at: "2015-12-31 15:00:00", confirmation_sent_at: "2015-12-31 15:00:00", unconfirmed_email: nil, deleted_at: nil, username: "takabo", invited_by_id: nil}
])
Invite.create!([
  {sender_id: 1, receiver_id: nil, email: "takabo.beta@gmail.com", token: "aaa"},
  {sender_id: 1, receiver_id: nil, email: "kohpaw@gmail.com", token: "5d173457f2de49f976893a23bdf90782"}
])
Note.create!([
  {score_id: 1, user_id: 1, data: "{\"note\":[[11],[],[11],[],[7],[],[7],[],[6],[],[6],[],[7],[],[],[],[8],[],[8],[],[9],[],[9],[],[10],[],[10],[],[11],[],[],[],[7],[],[7],[],[8],[],[8],[],[9],[],[9],[],[10],[],[],[],[7],[],[7],[],[8],[],[8],[],[9],[],[9],[],[10],[],[],[],[11],[],[11],[],[7],[],[7],[],[6],[],[6],[],[7],[],[],[],[8],[],[8],[],[9],[],[9],[],[10],[],[10],[],[11],[],[],[]],\"bpm\":\"178\"}"},
  {score_id: 1, user_id: 2, data: "{\"note\":[[4],[0],[2],[0],[4],[0],[2],[0],[4],[1],[4],[1],[0,2],[],[],[],[1,6],[4],[1,6],[4],[2,7],[4],[2,7],[4],[3,5],[7],[3],[5],[4,9],[],[],[],[9],[0],[9],[0],[10],[0],[10],[0],[11],[0],[11],[0],[12],[],[],[],[],[0,4],[],[0,4],[],[0,4],[],[0,4],[],[0,4],[],[0,4],[3,5],[],[],[],[9],[11],[9],[11],[9],[9],[9],[9],[8],[8],[8],[8],[0,9],[],[],[],[6],[8],[6],[5],[4],[7],[4],[],[3,7],[],[3,7],[],[4,9],[],[],[]],\"bpm\":\"178\"}"},
  {score_id: 3, user_id: 1, data: "{\"note\":[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[7],[69],[7],[6],[],[4],[],[69],[69],[7],[69],[6],[10],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[1],[4],[132],[3],[1],[3],[],[69],[7],[136],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],\"bpm\":420}"},
  {score_id: 3, user_id: 1, data: "{\"note\":[[],[9],[],[71],[9],[],[134],[],[6],[71],[6],[71],[10],[9],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[5],[71],[6],[5],[],[134],[],[6],[71],[6],[7],[10],[9],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],\"bpm\":420}"},
  {score_id: 3, user_id: 1, data: "{\"note\":[[],[7],[],[69],[7],[],[132],[],[4],[69],[4],[69],[8],[7],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[3],[69],[4],[3],[],[132],[],[4],[69],[4],[69],[8],[7],[],[],[],[],[],[],[],[],[],[],[],[],[],[7,69,3],[],[],[69,3,1],[],[4,2,0],[],[],[],[4,2,0],[],[],[1,67,69],[],[3,129],[],[],[3,69,7],[],[4,70,8],[],[],[10,7,69,3],[],[139,71,133,4],[],[11,8,6,4],[],[12,137,8,69],[],[],[],[],[],[],[],[],[],[],[]],\"bpm\":420}"},
  {score_id: 5, user_id: 1, data: "{\"note\":[[11],[],[],[],[],[],[],[]],\"bpm\":\"120\"}"},
  {score_id: 5, user_id: 1, data: "{\"note\":[[],[10],[],[],[],[],[],[]],\"bpm\":\"120\"}"},
  {score_id: 5, user_id: 1, data: "{\"note\":[[],[],[9],[],[],[],[],[]],\"bpm\":\"120\"}"},
  {score_id: 5, user_id: 1, data: "{\"note\":[[],[],[],[8],[],[],[],[]],\"bpm\":\"120\"}"},
  {score_id: 5, user_id: 1, data: "{\"note\":[[],[],[],[],[7],[],[],[]],\"bpm\":\"120\"}"},
  {score_id: 5, user_id: 1, data: "{\"note\":[[],[],[],[],[],[6],[],[]],\"bpm\":\"120\"}"},
  {score_id: 5, user_id: 1, data: "{\"note\":[[],[],[],[],[],[],[5],[]],\"bpm\":\"120\"}"},
  {score_id: 5, user_id: 1, data: "{\"note\":[[],[],[],[],[],[],[],[4]],\"bpm\":\"120\"}"}
])
Score.create!([
  {owner_id: 1, name: "Twinkle Twinkle Little Star"},
  {owner_id: 1, name: "Lupin the Third '80"},
  {owner_id: 1, name: "color"}
])
Wait.create!([
  {email: "takabo.beta@gmail.com"}
])
