class Api::NoteTagsController < ApplicationController
    def create
        @note_tag = NoteTag.new(note_tag_params)
        if @note_tag.save
            render :show
        else
            render json: @note_tag.errors.full_messages, status: 401
        end
    end


    def destroy
        @note_tag = NoteTag.find_by(note_id: params[:note_id], tag_id: params[:id])
        if @note_tag
            @note_tag.destroy
            render :show
        else
            render json: ["Note tag does not exist"], status: 400
        end
    end

    private

    def note_tag_params
        params.require(:note_tag).permit(:note_id, :tag_id)
    end
end