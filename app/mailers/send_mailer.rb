class SendMailer < ApplicationMailer

  #お問い合わせ
  def inquiry_email(inquiry)
    @inquiry = inquiry
    mail(
      :to      => 'takabo.beta@gmail.com',
      :from    => "#{Constants::SERVICE_NAME} <takabo.beta@gmail.com>",
      :subject => "[#{Constants::SERVICE_NAME}]お問い合わせ"
    )
  end

  #友達招待
  def invite_email(invite, path)
    @invite = invite
    @path = path
    mail(
      :to      => @invite.email,
      :from    => "#{Constants::SERVICE_NAME} <takabo.beta@gmail.com>",
      :subject => "[#{Constants::SERVICE_NAME}]友達招待"
    )
  end

  #順番待ちリスト
  def wait_email(wait)
    @wait = wait
    mail(
      :to      => 'takabo.beta@gmail.com',
      :from    => "#{Constants::SERVICE_NAME} <takabo.beta@gmail.com>",
      :subject => "[#{Constants::SERVICE_NAME}]順番待ちリスト"
    )
  end
end
