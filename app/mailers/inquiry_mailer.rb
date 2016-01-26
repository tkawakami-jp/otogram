class InquiryMailer < ApplicationMailer

  def received_email(inquiry)
    @inquiry = inquiry
    mail(
      :to      => 'takabo.beta@gmail.com',
      :from    => "#{Constants::SERVICE_NAME} <takabo.beta@gmail.com>",
      :subject => "[#{Constants::SERVICE_NAME}]お問い合わせ"
    )
  end
end
