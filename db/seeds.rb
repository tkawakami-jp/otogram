# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create!([
  {email: "takabo.beta@gmail.com", password: "tk154500", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 1, current_sign_in_at: "2016-01-01 00:00:00", last_sign_in_at: "2016-01-01 00:00:00", current_sign_in_ip: "124.110.12.224", last_sign_in_ip: "124.110.12.224", confirmation_token: "ypz8EA9mQKs-h5fg_rF1", confirmed_at: "2016-01-01 00:00:00", confirmation_sent_at: "2016-01-01 00:00:00", unconfirmed_email: nil, deleted_at: nil, username: "takabo"},
  {email: "tkawakami@tkltd.jp", password: "tk154500", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 1, current_sign_in_at: "2016-01-01 00:00:00", last_sign_in_at: "2016-01-01 00:00:00", current_sign_in_ip: "124.110.12.224", last_sign_in_ip: "124.110.12.224", confirmation_token: "ypz8EA9mQKs-h5fg_rF2", confirmed_at: "2016-01-01 00:00:00", confirmation_sent_at: "2016-01-01 00:00:00", unconfirmed_email: nil, deleted_at: nil, username: "takahiro"},
  {email: "o9o60155417@docomo.ne.jp", password: "tk154500", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 1, current_sign_in_at: "2016-01-01 00:00:00", last_sign_in_at: "2016-01-01 00:00:00", current_sign_in_ip: "124.110.12.224", last_sign_in_ip: "124.110.12.224", confirmation_token: "ypz8EA9mQKs-h5fg_rF3", confirmed_at: "2016-01-01 00:00:00", confirmation_sent_at: "2016-01-01 00:00:00", unconfirmed_email: nil, deleted_at: nil, username: "takachan"}
])
Invite.create!([
  {sender_id: 1, receiver_id: nil, email: "takabo.beta@gmail.com", token: "aaa"}
])
#Score.create!([
#  {user_id: 1, name: "Twinkle Twinkle Little Star", data: "{\"notes\":[[11],[],[11],[],[7],[],[7],[],[6],[],[6],[],[7],[],[],[],[8],[],[8],[],[9],[],[9],[],[10],[],[10],[],[11],[],[],[],[7],[],[7],[],[8],[],[8],[],[9],[],[9],[],[10],[],[],[],[7],[],[7],[],[8],[],[8],[],[9],[],[9],[],[10],[],[],[],[11],[],[11],[],[7],[],[7],[],[6],[],[6],[],[7],[],[],[],[8],[],[8],[],[9],[],[9],[],[10],[],[10],[],[11]],\"notes2\":[[4],[0],[2],[0],[4],[0],[2],[0],[4],[1],[4],[1],[0,2],[],[],[],[1,6],[4],[1,6],[4],[2,7],[4],[2,7],[4],[3,5],[7],[3],[5],[4,9],[],[],[],[9],[0],[9],[0],[10],[0],[10],[0],[11],[0],[11],[0],[12],[],[],[],[],[0,4],[],[0,4],[],[0,4],[],[0,4],[],[0,4],[],[0,4],[3,5],[],[],[],[9],[11],[9],[11],[9],[9],[9],[9],[8],[8],[8],[8],[0,9],[],[],[],[6],[8],[6],[5],[4],[7],[4],[],[3,7],[],[3,7],[],[4,9]],\"tempo\":\"178\"}"},
#  {user_id: 1, name: "bbb", data: "{\"notes\":[[1026,2313],[1026,2313],[],[1026,2313],[],[1028,2315],[1026,2313],[],[1024,2311],[],[],[],[517,3591,265],[],[],[],[2818,2820,267],[],[3072,3595],[3072,2818,3595],[2817,2820,267],[],[3072,3592],[3072,2817,3591],[2816,2819,267],[],[3072,3591],[2816,1287,3595],[2817,1286,1288],[262,1288,1290],[1286,3591,1288],[1285,1287,266],[2,3595,3084],[],[256],[257,3595],[4,3593,3084],[],[256],[257,7,3593],[6,3592,3084],[4],[256,3592],[257,4,3590],[3084],[256],[],[257,6,3591],[7,3084],[3591],[256,4,3592],[257],[4,3593,3084],[],[0,3594],[257],[2,3591],[1031],[256,1030],[3,1029,3592],[1028],[1027,262],[1026],[1025,263],[1026,266,3595],[7],[2050,4],[7,266,3595],[1028,3593,266],[7],[2050,4],[5,1031,3593],[1030,3592,266],[1028,6,2568],[4],[1,1028,3590],[264],[2049,2,260],[3,260],[261,1030],[1031,266],[3584,2,7],[1028],[1,5,7],[1025,3591],[1026],[1027],[],[1028],[258,3588],[],[260,3595],[261,3595],[],[261,267]],\"notes2\":[],\"tempo\":\"370\"}"}
#])
Wait.create!([
  {email: "takabo.beta@gmail.com"}
])
