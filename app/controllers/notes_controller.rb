class NotesController < ApplicationController

  def create
    @note = Note.new(note_params)
    if @note.save
      flash[:success] = "Note created!"
    end
    redirect_to edit_score_path(note_params[:score_id])
  end

  private
  def note_params
    params.require(:note).permit(:score_id, :user_id)
  end
end
