# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'V1::Users', type: :request do
  describe 'GET /find_or_create_by_username' do
    context 'with a valid username' do
      let(:valid_username) { '123' }

      it 'finds an existing user' do
        User.create(name: valid_username, points: 1000)
        get "/v1/users/#{valid_username}", params: { name: valid_username }
        user = JSON.parse(response.body)
        expect(user['name']).to eq(valid_username)
      end

      it 'creates a new user if not found' do
        get "/v1/users/#{valid_username}", params: { name: valid_username }
        user = JSON.parse(response.body)
        expect(user['name']).to eq(valid_username)
      end
    end

    context 'with an invalid username' do
      let(:invalid_username) { '!?' }
      let(:invalid_username2) { 'onetwothreefourfivesixseveneightnine' }

      it 'returns unprocessable entity when username contains special characters' do
        get "/v1/users/#{invalid_username}", params: { name: invalid_username }
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns unprocessable entity when username is too short' do
        get "/v1/users/#{invalid_username}", params: { name: invalid_username }
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns unprocessable entity when username is too long' do
        get "/v1/users/#{invalid_username2}", params: { name: invalid_username2 }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
