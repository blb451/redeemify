# frozen_string_literal: true

class Reward < ApplicationRecord
  has_many :redemptions
  has_many :users, through: :redemptions
end
