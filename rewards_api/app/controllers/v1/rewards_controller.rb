# frozen_string_literal: true

module V1
  class RewardsController < ApplicationController
    # GET /v1/rewards
    def index
      rewards = Reward.all
      render json: rewards, status: :ok
    end
  end
end
