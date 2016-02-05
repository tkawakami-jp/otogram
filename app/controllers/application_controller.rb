class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
  #Devise用
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << [:username,:invited_by_id]
    devise_parameter_sanitizer.for(:account_update) << :username
  end
  #エラーを最初の一件だけにフィルター
  def set_one_error_for_one_attribute!(model)
    model.errors.keys.each do |key|
      single_error = model.errors.get(key).try(:first)
      model.errors.delete(key)
      model.errors[key] = single_error
    end
  end
end
