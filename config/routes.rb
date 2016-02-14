Rails.application.routes.draw do

  get 'scores/show'

  root 'home#index'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    passwords: 'users/passwords',
    registrations: 'users/registrations',
    confirmations: 'users/confirmations'
  }

  get  'inquiry'          => 'inquiry#index'
  post 'inquiry/confirm'  => 'inquiry#confirm'
  post 'inquiry/complete' => 'inquiry#complete'

  resources :invites, only: [:new,:create]

  resources :scores
  resources :notes, only: [:create]

  get  'mario' => 'mario#index'
  get  'mario2' => 'mario#index2'

  get '/users'     => 'users#index', as:'users'
  get '/:username' => 'users#show',  as:'user'#!最後に設置

  #only: [:index,:show,:new,:create,:edit,:update,:destroy]
end
