User.create!([
  {email: "kohpaw@gmail.com", encrypted_password: "$2a$10$jNpDayCbtdlt.BxxRZQC/.xQrg16Sa3KKkSk71454T4DwCN1le9lS", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: "2016-02-09 16:37:37", sign_in_count: 2, current_sign_in_at: "2016-02-09 16:39:17", last_sign_in_at: "2016-02-09 16:37:37", current_sign_in_ip: "126.249.112.244", last_sign_in_ip: "126.249.112.244", confirmation_token: "ysro-RM-PLaq2cHHDwmx", confirmed_at: "2016-02-09 16:37:26", confirmation_sent_at: "2016-02-09 16:36:04", unconfirmed_email: nil, deleted_at: nil, username: "kohei", invited_by_id: 1},
  {email: "o9o60155417@docomo.ne.jp", encrypted_password: "$2a$10$gojY5ZaeH0Z13iXrF8IuZu0ziJh4twcA3dkdb507iwuO9foaBFK9K", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 1, current_sign_in_at: "2015-12-31 15:00:00", last_sign_in_at: "2015-12-31 15:00:00", current_sign_in_ip: "124.110.12.224", last_sign_in_ip: "124.110.12.224", confirmation_token: "ypz8EA9mQKs-h5fg_rF3", confirmed_at: "2015-12-31 15:00:00", confirmation_sent_at: "2015-12-31 15:00:00", unconfirmed_email: nil, deleted_at: nil, username: "takachan", invited_by_id: nil},
  {email: "tkawakami@tkltd.jp", encrypted_password: "$2a$10$ZWZ0txQqh4ANe0vuYGw5EOVvRRElTLF2jHAlROSAZWwj1kdO72mgS", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 1, current_sign_in_at: "2015-12-31 15:00:00", last_sign_in_at: "2015-12-31 15:00:00", current_sign_in_ip: "124.110.12.224", last_sign_in_ip: "124.110.12.224", confirmation_token: "ypz8EA9mQKs-h5fg_rF2", confirmed_at: "2015-12-31 15:00:00", confirmation_sent_at: "2015-12-31 15:00:00", unconfirmed_email: nil, deleted_at: nil, username: "takahiro", invited_by_id: nil},
  {email: "takabo.beta@gmail.com", encrypted_password: "$2a$10$Xq8PNvg1oQ6o/1WCTrzoyu73HrYD5vPf4viR9WcG5.3906qwYEyEy", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 2, current_sign_in_at: "2016-02-25 05:34:08", last_sign_in_at: "2015-12-31 15:00:00", current_sign_in_ip: "10.0.2.2", last_sign_in_ip: "124.110.12.224", confirmation_token: "ypz8EA9mQKs-h5fg_rF1", confirmed_at: "2015-12-31 15:00:00", confirmation_sent_at: "2015-12-31 15:00:00", unconfirmed_email: nil, deleted_at: nil, username: "takabo", invited_by_id: nil}
])
Invite.create!([
  {sender_id: 1, receiver_id: nil, email: "takabo.beta@gmail.com", token: "aaa"},
  {sender_id: 1, receiver_id: nil, email: "kohpaw@gmail.com", token: "5d173457f2de49f976893a23bdf90782"}
])
Note.create!([
  {score_id: 1, user_id: 1, data: "{\"note\":[[20],[],[20],[],[16],[],[16],[],[15],[],[15],[],[16],[],[],[],[17],[],[17],[],[18],[],[18],[],[19],[],[19],[],[20],[],[],[],[16],[],[16],[],[17],[],[17],[],[18],[],[18],[],[19],[],[],[],[16],[],[16],[],[17],[],[17],[],[18],[],[18],[],[19],[],[],[],[20],[],[20],[],[16],[],[16],[],[15],[],[15],[],[16],[],[],[],[17],[],[17],[],[18],[],[18],[],[19],[],[19],[],[20],[],[],[]],\"bpm\":100}"},
  {score_id: 1, user_id: 2, data: "{\"note\":[[13],[9],[11],[9],[13],[9],[11],[9],[13],[10],[13],[10],[9,11],[],[],[],[10,15],[13],[10,15],[13],[11,16],[13],[11,16],[13],[12,14],[16],[12],[14],[13,18],[],[],[],[18],[9],[18],[9],[19],[9],[19],[9],[20],[9],[20],[9],[21],[],[],[],[],[9,13],[],[9,13],[],[9,13],[],[9,13],[],[9,13],[],[9,13],[12,14],[],[],[],[18],[20],[18],[20],[18],[18],[18],[18],[17],[17],[17],[17],[9,18],[],[],[],[15],[17],[15],[14],[13],[16],[13],[],[12,16],[],[12,16],[],[13,18],[],[],[]],\"bpm\":100}"},
  {score_id: 2, user_id: 1, data: "{\"note\":[[20],[],[],[],[],[],[],[]],\"bpm\":\"120\"}"},
  {score_id: 2, user_id: 1, data: "{\"note\":[[],[19],[],[],[],[],[],[]],\"bpm\":\"120\"}"},
  {score_id: 2, user_id: 1, data: "{\"note\":[[],[],[18],[],[],[],[],[]],\"bpm\":\"120\"}"},
  {score_id: 2, user_id: 1, data: "{\"note\":[[],[],[],[17],[],[],[],[]],\"bpm\":\"120\"}"},
  {score_id: 2, user_id: 1, data: "{\"note\":[[],[],[],[],[16],[],[],[]],\"bpm\":\"120\"}"},
  {score_id: 2, user_id: 1, data: "{\"note\":[[],[],[],[],[],[15],[],[]],\"bpm\":\"120\"}"},
  {score_id: 2, user_id: 1, data: "{\"note\":[[],[],[],[],[],[],[14],[]],\"bpm\":\"120\"}"},
  {score_id: 2, user_id: 1, data: "{\"note\":[[],[],[],[],[],[],[],[13]],\"bpm\":\"120\"}"}
])
Score.create!([
  {owner_id: 1, name: "Twinkle Twinkle Little Star"},
  {owner_id: 1, name: "color"}
])
Wait.create!([
  {email: "takabo.beta@gmail.com"}
])
