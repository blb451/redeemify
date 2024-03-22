# frozen_string_literal: true

module V1
  class RedemptionsController < ApplicationController
    # POST /v1/redemptions
    def create
      user = find_user
      reward = find_reward

      return render_error('User or reward not found', :not_found) unless user && reward
      return render_error('Not enough points', :forbidden) if not_enough_points?(user, reward)

      process_redemption(user, reward)
    rescue ActiveRecord::RecordNotFound => error
      render_error(error.message, :not_found)
    rescue ActiveRecord::RecordInvalid => error
      render_error(error.message, :unprocessable_entity)
    end

    # POST /v1/redemptions/async
    # Optional
    def create_async
      params = redemption_params.permit(:user_id, :reward_id).to_hash
      RedemptionProcessor.perform_async(params)
      render json: {}, status: :accepted
    end

    # GET /v1/redemptions/user/:user_id
    def index_by_user
      user = User.find_by(id: params[:user_id])
      if user
        redemptions = user.redemptions
        render json: redemptions, status: :ok
      else
        render_error('User not found', :not_found)
      end
    end

    private

    def find_user
      User.find(redemption_params[:user_id])
    end

    def find_reward
      Reward.find(redemption_params[:reward_id])
    end

    def not_enough_points?(user, reward)
      reward.points_required > user.points
    end

    def process_redemption(user, reward)
      ActiveRecord::Base.transaction do
        user.update!(points: user.points - reward.points_required)
        redemption = Redemption.create!(user:, reward:)
        render json: { redemption: }, status: :ok
      end
    end

    def redemption_params
      params.require(:redemption).permit(:user_id, :reward_id)
    end

    def render_error(message, status)
      render json: { error: message }, status:
    end
  end
end
