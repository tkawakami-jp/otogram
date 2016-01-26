class HomeController < ApplicationController
  
  #before_action :authenticate_user!, only: :show
  
  def index
    @scores = Score.all
    if @scores.length > 0
      @score = Score.find(1)
    end
    
  end
  
end
