# frozen_string_literal: true

require 'faker'
require 'open-uri'
require 'json'

def generate_random_image_url(width, height)
  "https://source.unsplash.com/random/#{width}×#{height}?sig=#{rand(1..1000)}"
end

# Create 10 rewards with random names, costs, and image URLs
10.times do
  name = Faker::Commerce.product_name
  points_required = rand(100..500)
  image_url = generate_random_image_url(150, 150)

  Reward.create!(
    name:,
    points_required:,
    image_url:
  )
end
