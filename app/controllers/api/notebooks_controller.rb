class Api::NotebooksController < ApplicationController
    def index
        @notebooks = current_user.notebooks.order(updated_at: :desc)
        render :index
    end

    def show
        @notebook = find_notebook
        if @notebook
            render :show
        else
            render json: ["Notebook does not exist"], status: 400
        end
    end
    
    def create
        @notebook = Notebook.new(notebook_params)
        if @notebook.save
            render :show
        else
            render json: @notebook.errors.full_messages, status: 401
        end
    end

    def update
        @notebook = find_notebook
        if !@notebook
            render json: ["Notebook does not exist"], status: 400
        elsif @notebook.update(notebook_params)
            render :show
        else
            render json: @notebook.errors.full_messages, status: 401
        end
    end

    def destroy
        @notebook = find_notebook
        if @notebook
            @notebook.destroy
            render :show
        else
            render json: ["Notebook does not exist"], status: 400
        end
    end

    private

    def find_notebook
        current_user.notebooks.find_by(id: params[:id])
    end

    def notebook_params
        params.require(:notebook).permit(:name, :author_id)
    end
end