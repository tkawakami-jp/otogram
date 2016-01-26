class UsersController < ApplicationController
  
  def index
    @users = User.all
  end
 
  def show
    @user = User.find_by_username(params[:username])
    #unless @user then
    #  flash[:success] = "User not found!"
    #  redirect_to root_path
    #end
  end
end