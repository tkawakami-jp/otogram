class Wait < ActiveRecord::Base
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email,
  :presence => { :message => 'メールアドレスを入力してください。' },
  :uniqueness => { :message => 'メールアドレスはすでに登録済みです。' },
  :format => { :with => VALID_EMAIL_REGEX, :message => 'メールアドレスは有効でありません。' }
end
