class Users::RegistrationsController < Devise::RegistrationsController
# before_filter :configure_sign_up_params, only: [:create]
# before_filter :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  def new
    @invite = Invite.find_by(token: params[:invite_token])
    if @invite
      super
    else
      @wait = Wait.new
    end
  end

  # POST /resource
  def create
    @invite = Invite.find_by(token: params[:invite_token])
    if @invite
      super
    else
      @wait = Wait.new(wait_params)
      if @wait.save
        #SendMailer.wait_email(@wait).deliver_now
        flash[:success] = 'メールアドレスを登録しました。'
        redirect_to new_user_registration_path
      else
        set_one_error_for_one_attribute!(@wait)
        render 'new'
      end
    end
  end

  private
  def wait_params
    params.require(:wait).permit(:email)
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  #protected

  # If you have extra params to permit, append them to the sanitizer.
  #def configure_sign_up_params
  #  devise_parameter_sanitizer.for(:sign_up) << :invited_by_id
  #end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.for(:account_update) << :attribute
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
