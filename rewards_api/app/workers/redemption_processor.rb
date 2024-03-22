# frozen_string_literal: true

class RedemptionProcessor
  include Sidekiq::Worker

  def perform(redemption_params)
    reward_id = redemption_params['reward_id']
    user_id = redemption_params['user_id']

    reward = Reward.find(reward_id)
    user = User.find(user_id)

    return puts 'ERROR: Not enough points' unless reward.points_required <= user.points

    ActiveRecord::Base.transaction do
      user.update!(points: user.points - reward.points_required)
      Redemption.create!(user:, reward:)
    end
  end
end
