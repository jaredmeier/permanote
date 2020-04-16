class Api::TagsController < ApplicationController
    def index
        @tags = current_user.tags
        render :index
    end

    def show
        @tag = find_tag
        if @tag
            render :show
        else
            render json: ["Tag does not exist"], status: 400
        end
    end
    
    def create
        @tag = Tag.new(tag_params)
        if @tag.save
            render :show
        else
            render json: @tag.errors.full_messages, status: 401
        end
    end

    def destroy
        @tag = find_tag
        if @tag
            @tag.destroy
            render json: @tag.id
        else
            render json: ["Tag does not exist"], status: 400
        end
    end

    private

    def find_tag
        current_user.tags.find_by(id: params[:id])
    end

    def tag_params
        params.require(:tag).permit(:name, :author_id)
    end
end