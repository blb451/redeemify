# frozen_string_literal: true

require 'sidekiq/web'

Sidekiq::Web.use ActionDispatch::Cookies
Sidekiq::Web.use ActionDispatch::Session::CookieStore, key: '_interslice_session'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'

  namespace :v1 do
    get '/users/:name', to: 'users#find_or_create_by_username'
    resources :rewards, only: [:index]
    resources :redemptions, only: [:create] do
      collection do
        get 'user/:user_id', to: 'redemptions#index_by_user'
      end
      member do
        post 'async', to: 'redemptions#create_async'
      end
    end
  end
end
