User.create!([
  {email: "o9o60155417@docomo.ne.jp", encrypted_password: "$2a$10$HHMPLlbmX193JNX9J1lnIuIy6ue3UrWuL4OW5gjOsvzuqmn5WRQfm", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 1, current_sign_in_at: "2015-12-31 15:00:00", last_sign_in_at: "2015-12-31 15:00:00", current_sign_in_ip: "124.110.12.224", last_sign_in_ip: "124.110.12.224", confirmation_token: "ypz8EA9mQKs-h5fg_rF3", confirmed_at: "2015-12-31 15:00:00", confirmation_sent_at: "2015-12-31 15:00:00", unconfirmed_email: nil, deleted_at: nil, username: "takachan", invited_by_id: nil},
  {email: "takabo.beta@gmail.com", encrypted_password: "$2a$10$6m6LGZEUeEmX0jdAX6lbwuOlnxWXpRJsadlmdhJO.e7A/tDqAekBa", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 12, current_sign_in_at: "2016-02-09 23:22:33", last_sign_in_at: "2016-02-08 15:54:29", current_sign_in_ip: "10.0.2.2", last_sign_in_ip: "10.0.2.2", confirmation_token: "ypz8EA9mQKs-h5fg_rF1", confirmed_at: "2015-12-31 15:00:00", confirmation_sent_at: "2015-12-31 15:00:00", unconfirmed_email: nil, deleted_at: nil, username: "takabo", invited_by_id: nil}
])
Invite.create!([
  {sender_id: 1, receiver_id: nil, email: "tkawakami@tkltd.jp", token: "aaa"}
])
Score.create!([
  {user_id: 1, name: "Twinkle Twinkle Little Star", data: "{\"notes\":[[11],[],[11],[],[7],[],[7],[],[6],[],[6],[],[7],[],[],[],[8],[],[8],[],[9],[],[9],[],[10],[],[10],[],[11],[],[],[],[7],[],[7],[],[8],[],[8],[],[9],[],[9],[],[10],[],[],[],[7],[],[7],[],[8],[],[8],[],[9],[],[9],[],[10],[],[],[],[11],[],[11],[],[7],[],[7],[],[6],[],[6],[],[7],[],[],[],[8],[],[8],[],[9],[],[9],[],[10],[],[10],[],[11]],\"notes2\":[[4],[0],[2],[0],[4],[0],[2],[0],[4],[1],[4],[1],[0,2],[],[],[],[1,6],[4],[1,6],[4],[2,7],[4],[2,7],[4],[3,5],[7],[3],[5],[4,9],[],[],[],[9],[0],[9],[0],[10],[0],[10],[0],[11],[0],[11],[0],[12],[],[],[],[],[0,4],[],[0,4],[],[0,4],[],[0,4],[],[0,4],[],[0,4],[3,5],[],[],[],[9],[11],[9],[11],[9],[9],[9],[9],[8],[8],[8],[8],[0,9],[],[],[],[6],[8],[6],[5],[4],[7],[4],[],[3,7],[],[3,7],[],[4,9]],\"tempo\":\"178\"}"}
])
Wait.create!([
  {email: "tkawakami@tkltd.jp"}
])
