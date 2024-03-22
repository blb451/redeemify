# frozen_string_literal: true

class User < ApplicationRecord
  has_many :redemptions
  has_many :rewards, through: :redemptions

  validates :name, presence: true, length: { in: 3..15 },
                   format: { with: /\A[a-zA-Z0-9]+\z/, message: 'can only contain letters and numbers' }
  validates :points, numericality: { greater_than_or_equal_to: 0 }
end
