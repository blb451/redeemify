# frozen_string_literal: true

module V1
  class UsersController < ApplicationController
    # GET /v1/users/:name
    def find_or_create_by_username
      user = User.find_or_create_by(name: params[:name])

      if user.persisted?
        render json: user, status: :ok
      else
        render json: user.errors, status: :unprocessable_entity
      end
    end
  end
end
