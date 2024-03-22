export interface Redemption {
  user_id: string;
  reward_id: string;
  created_at: string;
}

export interface Reward {
  id: string;
  name: string;
  points_required: number;
  image_url: string;
}

export interface User {
  name: string;
  points: number;
  id: string;
}
