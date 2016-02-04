class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << [:username,:invited_by_id]
    #devise_parameter_sanitizer.for(:sign_in) { |u| u.permit({ roles: [] },:username, :invited_by_id) }
    #devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :invited_by_id])
    #devise_parameter_sanitizer.for(:sign_up) do |user_params|
    #  user_params.permit(:username, :invited_by_id)
    #end
    devise_parameter_sanitizer.for(:account_update) << :username
  end
end
