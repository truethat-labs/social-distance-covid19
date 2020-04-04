Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations" }
  root to: 'home#index'
  get '/nearby', to: 'home#nearby'
  get '/edit_store', to: 'shops#edit_store'
  get '/manage_store', to: 'shops#manage_store'
  put '/update_current', to: 'shops#update_current'

  resources :user do
    resources :shops
  end
end
