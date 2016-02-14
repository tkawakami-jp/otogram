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
      redirect_to edit_score_path(@score.id)
    else
      render new_score_path
    end
  end

  def edit
    @score = Score.find(params[:id])
    #return render :text => CGI.escapeHTML(@score.notes.inspect).gsub(/,/,'<br>')
    @note = Note.new
  end

  def update
    @score = Score.find(params[:id])
    if @score.update(score_params)
      flash[:success] = "Score edited!"
      redirect_to edit_score_path(params[:id])
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
    params.require(:score).permit(:name, notes_attributes: [:id, :_destroy, :data])
  end
end
