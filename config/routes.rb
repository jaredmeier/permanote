Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create]
    resources :notes, only: [:index, :show, :create, :update, :destroy]
    resources :notebooks, only: [:index, :show, :create, :update, :destroy] 
  end

end