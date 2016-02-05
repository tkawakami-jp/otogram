User.create!([
  {email: "takabo.beta@gmail.com", encrypted_password: "$2a$10$sdahksEn14gY.EXo..OiIeAfe36zVCfFeKzzoJPxthB5MKSMphjD6", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 2, current_sign_in_at: "2016-02-05 21:22:49", last_sign_in_at: "2015-12-31 15:00:00", current_sign_in_ip: "10.0.2.2", last_sign_in_ip: "124.110.12.224", confirmation_token: "ypz8EA9mQKs-h5fg_rF1", confirmed_at: "2015-12-31 15:00:00", confirmation_sent_at: "2015-12-31 15:00:00", unconfirmed_email: nil, deleted_at: nil, username: "takabo", invited_by_id: nil}
])
Invite.create!([
  {sender_id: 1, receiver_id: nil, email: "tkawakami@tkltd.jp", token: "0807e15e7c37b50c9eccfd62a6ade2b0"}
])
