Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations" }
  root to: 'home#index'
  get '/nearby', to: 'home#nearby'
  get '/manage', to: 'shops#manage'

  resources :user do
    resources :shops
  end
end
