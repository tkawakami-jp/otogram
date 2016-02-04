class Invite < ActiveRecord::Base
  belongs_to :sender, :class_name => 'User'
  belongs_to :receiver, :class_name => 'User'

  validates :email, :presence => {:message => 'メールアドレスを入力してください。'}
end
