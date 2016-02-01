class User < ActiveRecord::Base

  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, #:validatable
         :confirmable

  #メアド変更確認メールのテンプレート変更用
  def send_on_create_confirmation_instructions
    generate_confirmation_token!  unless @raw_confirmation_token
    send_devise_notification(:confirmation_on_create_instructions, @raw_confirmation_token, {})
  end

  #Devise論理削除
  acts_as_paranoid
  validates_as_paranoid
  validates_uniqueness_of_without_deleted :email, :username

  #Username追加
  validates :username,
    presence: true,                     # 必須
    #uniqueness: true,                  # ユニーク(validates_uniqueness_of_without_deletedで処理)
    length: { maximum: 16 },            # 16文字
    format: { with: /\A[a-z0-9]+\z/i }, # 半角英数字のみ
    :exclusion => %w(otogram staff admin top home user users inquiry inquiries score scores)

  #Score追加
  has_many :scores
end
