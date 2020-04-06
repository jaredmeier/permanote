class Api::SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
        if @user
            login!(@user)
            render "api/users/show"
        else
            render json: ["Invalid email address or password"], status: 401
        end
    end

    def destroy
        if current_user
            logout!
            render json: ["Successfully logged out"]
        else
            render json: ["Can\'t logout because not currently logged in"], status: 400
        end
    end
end