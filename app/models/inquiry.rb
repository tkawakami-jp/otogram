class Inquiry
  #DBと繋がらないモデルとしている
  include ActiveModel::Model
  #Formで使用するプロパティを定義する
  attr_accessor :name, :email, :message
  
  validates :name, :presence => {:message => '名前を入力してください。'}
  validates :email, :presence => {:message => 'メールアドレスを入力してください。'}
  validates :message, :presence => {:message => 'お問い合わせ内容を記載して下さい。'}
end