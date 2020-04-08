class Api::NotesController < ApplicationController
    def index
        @notes = current_user.notes
        render :index
    end

    def show
        @note = find_note
        if @note
            render :show
        else
            render json: ["Note does not exist"], status: 400
        end
    end
    
    def create
        @note = Note.new(note_params)
        if @note.save
            render :show
        else
            render json: @note.errors.full_messages, status: 401
        end
    end

    def update
        @note = find_note
        if !@note
            render json: ["Note does not exist"], status: 400
        elsif @note.update(note_params)
            render :show
        else
            render json: @note.errors.full_messages, status: 401
        end
    end

    def destroy
        @note = find_note
        if @note
            @note.destroy
            render :show
        else
            render json: ["Note does not exist"], status: 400
        end
    end

    private

    def find_note
        current_user.notes.find_by(id: params[:id])
    end

    def note_params
        params.require(:note).permit(:title, :body, :notebook_id)
    end
end