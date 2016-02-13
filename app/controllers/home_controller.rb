class HomeController < ApplicationController

  def index
    @scores = Score.all.order("updated_at DESC")
  end

end
