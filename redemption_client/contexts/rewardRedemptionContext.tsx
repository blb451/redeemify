import React, { createContext, useContext, useState } from 'react';

import type { Redemption, Reward } from '@/types';

interface RewardRedemptionContextType {
  rewards: Reward[];
  redemptions: Redemption[];
  setRewards: React.Dispatch<React.SetStateAction<Reward[]>>;
  setRedemptions: React.Dispatch<React.SetStateAction<Redemption[]>>;
}

interface RewardRedemptionProviderProps {
  children: React.ReactNode;
}

const RewardRedemptionContext = createContext<
  RewardRedemptionContextType | undefined
>(undefined);

export const useRewardRedemptionContext = () => {
  const context = useContext(RewardRedemptionContext);
  if (!context) {
    throw new Error(
      'useRewardRedemption must be used within a RewardRedemptionProvider'
    );
  }
  return context;
};

export const RewardRedemptionProvider: React.FC<
  RewardRedemptionProviderProps
> = (props) => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);

  return (
    <RewardRedemptionContext.Provider
      value={{ rewards, redemptions, setRewards, setRedemptions }}
    >
      {props.children}
    </RewardRedemptionContext.Provider>
  );
};
