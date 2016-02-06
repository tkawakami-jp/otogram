class InvitesController < ApplicationController
  before_action :authenticate_user!

  def new
    @invite = Invite.new
  end

  def create
    @invite = Invite.new(invite_params)
    #ユーザー登録済み
    if User.find_by(email: @invite.email)
      flash[:success] = '既にアカウントが存在します。'
      redirect_to new_invite_path
    else
      #2回目以降の招待メール送信
      if exist = Invite.find_by(sender_id: current_user.id, email: @invite.email)
        SendMailer.invite_email(exist, new_user_registration_url(:invite_token => exist.token)).deliver_now
        flash[:success] = '招待メールを送信しました。'
        redirect_to new_invite_path
      #初回の招待メール送信
      else
        @invite.sender_id = current_user.id
        @invite.token = SecureRandom.hex(16)
        if @invite.save
          SendMailer.invite_email(@invite, new_user_registration_url(:invite_token => @invite.token)).deliver_now
          flash[:success] = '招待メールを送信しました。'
          redirect_to new_invite_path
        else
          render 'new'
        end
      end
    end
  end

  private
  def invite_params
    params.require(:invite).permit(:email)
  end
end
