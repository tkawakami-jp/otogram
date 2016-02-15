User.create!([
  {email: "o9o60155417@docomo.ne.jp", encrypted_password: "$2a$10$2xWZa7MhIuhWYzqw0.ACa.44hqLTdbDQj88Qr78boic1x/FjKSZYO", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 1, current_sign_in_at: "2015-12-31 15:00:00", last_sign_in_at: "2015-12-31 15:00:00", current_sign_in_ip: "124.110.12.224", last_sign_in_ip: "124.110.12.224", confirmation_token: "ypz8EA9mQKs-h5fg_rF3", confirmed_at: "2015-12-31 15:00:00", confirmation_sent_at: "2015-12-31 15:00:00", unconfirmed_email: nil, deleted_at: nil, username: "takachan", invited_by_id: nil},
  {email: "tkawakami@tkltd.jp", encrypted_password: "$2a$10$uu4kmaQ4nCxQSfslDjN6xudbwvcgW17q39Oar4faA5aSGMVNH6o4q", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 1, current_sign_in_at: "2015-12-31 15:00:00", last_sign_in_at: "2015-12-31 15:00:00", current_sign_in_ip: "124.110.12.224", last_sign_in_ip: "124.110.12.224", confirmation_token: "ypz8EA9mQKs-h5fg_rF2", confirmed_at: "2015-12-31 15:00:00", confirmation_sent_at: "2015-12-31 15:00:00", unconfirmed_email: nil, deleted_at: nil, username: "takahiro", invited_by_id: nil},
  {email: "takabo.beta@gmail.com", encrypted_password: "$2a$10$WT7qtRLJDjsaK5lmY2k.ZeEIwXkKo71R3z4h8tm048LSkKR70oRxC", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 2, current_sign_in_at: "2016-02-15 02:59:36", last_sign_in_at: "2015-12-31 15:00:00", current_sign_in_ip: "10.0.2.2", last_sign_in_ip: "124.110.12.224", confirmation_token: "ypz8EA9mQKs-h5fg_rF1", confirmed_at: "2015-12-31 15:00:00", confirmation_sent_at: "2015-12-31 15:00:00", unconfirmed_email: nil, deleted_at: nil, username: "takabo", invited_by_id: nil}
])
Invite.create!([
  {sender_id: 1, receiver_id: nil, email: "takabo.beta@gmail.com", token: "aaa"}
])
Note.create!([
  {score_id: 3, user_id: 1, data: "{\"note\":[[],[],[],[7],[],[12,5],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],\"bpm\":120}"},
  {score_id: 1, user_id: 1, data: "{\"note\":[[11],[],[11],[],[7],[],[7],[],[6],[],[6],[],[7],[],[],[],[8],[],[8],[],[9],[],[9],[],[10],[],[10],[],[11],[],[],[],[7],[],[7],[],[8],[],[8],[],[9],[],[9],[],[10],[],[],[],[7],[],[7],[],[8],[],[8],[],[9],[],[9],[],[10],[],[],[],[11],[],[11],[],[7],[],[7],[],[6],[],[6],[],[7],[],[],[],[8],[],[8],[],[9],[],[9],[],[10],[],[10],[],[11],[],[],[]],\"bpm\":\"178\"}"},
  {score_id: 1, user_id: 2, data: "{\"note\":[[4],[0],[2],[0],[4],[0],[2],[0],[4],[1],[4],[1],[0,2],[],[],[],[1,6],[4],[1,6],[4],[2,7],[4],[2,7],[4],[3,5],[7],[3],[5],[4,9],[],[],[],[9],[0],[9],[0],[10],[0],[10],[0],[11],[0],[11],[0],[12],[],[],[],[],[0,4],[],[0,4],[],[0,4],[],[0,4],[],[0,4],[],[0,4],[3,5],[],[],[],[9],[11],[9],[11],[9],[9],[9],[9],[8],[8],[8],[8],[0,9],[],[],[],[6],[8],[6],[5],[4],[7],[4],[],[3,7],[],[3,7],[],[4,9],[],[],[]],\"bpm\":\"178\"}"}
])
Score.create!([
  {owner_id: 1, name: "Twinkle Twinkle Little Star"},
  {owner_id: 1, name: "aaa"}
])
Wait.create!([
  {email: "takabo.beta@gmail.com"}
])
