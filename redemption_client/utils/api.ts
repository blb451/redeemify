import axios from 'axios';

const API_ROUTE = 'http://localhost:3000/v1/';

export const login = async (textInputValue: string) =>
  axios.get(`${API_ROUTE}/users/${textInputValue}`);

export const fetchRewards = async () => axios.get(`${API_ROUTE}/rewards`);

export const fetchRedemptionsByUserId = async (userId: string) =>
  axios.get(`${API_ROUTE}/redemptions/user/${userId}`);

export const redeemReward = async (userId: string, rewardId: string) =>
  axios.post(`${API_ROUTE}/redemptions`, {
    redemption: { user_id: userId, reward_id: rewardId },
  });
