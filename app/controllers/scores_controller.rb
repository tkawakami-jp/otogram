class ScoresController < ApplicationController
  before_action :authenticate_user!, except: :show

  def show
    @score = Score.find(params[:id])
  end

  def new
    @score = current_user.scores.build
  end

  def create
    @score = current_user.scores.build(score_params)
    if @score.save
      flash[:success] = "Score created!"
      redirect_to root_path
    else
      render new_score_path
    end
  end

  def edit
    @score = current_user.scores.find(params[:id])
  end

  def update
    @score = current_user.scores.find(params[:id])
    if @score.update(score_params)
      flash[:success] = "Score edited!"
      redirect_to root_path
    else
      render 'edit'
    end
  end

  def destroy
    @score = current_user.scores.find(params[:id])
    @score.destroy
    flash[:success] = "Score deleted!"
    redirect_to root_path
  end

  private
  def score_params
    params.require(:score).permit(:name)
  end
end
