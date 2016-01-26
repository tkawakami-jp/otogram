class InquiryController < ApplicationController
  
  def index
    @inquiry = Inquiry.new
  end

  def confirm
    @inquiry = Inquiry.new(inquiry_params)
    if @inquiry.valid?
      render :action => 'confirm'
    else
      render :action => 'index'
    end
  end

  def complete
    @inquiry = Inquiry.new(inquiry_params)
    InquiryMailer.received_email(@inquiry).deliver_now
    flash[:notice] = "お問い合わせありがとうございました。"
    redirect_to root_path
  end

  private
  def inquiry_params
    params.require(:inquiry).permit(:name, :email, :message)
  end
  
end
