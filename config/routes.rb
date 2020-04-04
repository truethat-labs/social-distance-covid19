Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations" }
  root to: 'home#index'
  get '/nearby', to: 'home#nearby'

  resources :user do
    resources :shops
  end
end
