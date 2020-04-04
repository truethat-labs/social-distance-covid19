Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations" }
  root to: 'home#index'
  get '/nearby', to: 'home#nearby'
  get '/edit_store', to: 'shops#edit_store'
  get '/manage_store', to: 'shops#manage_store'

  resources :user do
    resources :shops
  end
end
