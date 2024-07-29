import { URL_USER } from '@/config/url';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { UserApi } from '@/util/UserApi';
import { useMemo } from 'react';

export const RedeemableType = {
  available: 'available', // can redeem
  done: 'done', // already redeemed
  pending: 'pending', // need to deposit to redeem
  unavailable: 'unavailable', // cannot redeem
};

export const usePromotions = () => {
  const { data, isLoading } = useSWR(
    URL_USER.getPromotionList,
    (url) => UserApi(url, {}, { method: 'GET' }),
    { revalidateOnFocus: true }
  );

  return {
    promotionList: data?.data,
    isLoading,
  };
};

export const useCurrentPromotion = (id) => {
  const selectedPromotionId = useSelector(
    (s) => s.promotion.selectedPromotionId
  );
  const idForBody = id || selectedPromotionId;
  const { data, isLoading, mutate } = useSWR(
    idForBody ? [URL_USER.getPromotionDetail, idForBody] : null,
    ([url, idForBody]) => UserApi(url, { id: idForBody }, { method: 'GET' }),
    { revalidateOnFocus: false }
  );

  const currentTierObj = useMemo(() => {
    const progress = data?.data?.promotion_progress?.progress || 0;
    const tiers = data?.data?.promotion_progress?.tiers || [];
    const reward = data?.data?.reward;

    let currentTierIndex = -1;
    let amountNeeded = 0;
    for (let i = 0; i < tiers.length; i++) {
      if (tiers[i].reward === reward) {
        currentTierIndex = i;
        try {
          amountNeeded = tiers[i + 1].min - progress;
        } catch {
          (e) => {};
        }
        break;
      }
    }
    if (currentTierIndex === -1) {
      amountNeeded = tiers?.[0]?.min - progress || 0;
    }
    // if (progress < tiers?.[0]?.min) {
    //   return { currentTier: -1, amountNeeded: tiers[0]?.min - progress };
    // }
    // for (let i = 0; i < tiers?.length; i++) {
    //   const tier = tiers[i];
    //   if (
    //     (tier?.min === undefined || progress >= tier?.min) &&
    //     (tier?.max === -1 || progress <= tier?.max)
    //   ) {
    //     currentTierIndex = i;
    //     break;
    //   }
    // }

    // if (currentTierIndex !== -1) {
    //   const currentTier = tiers[currentTierIndex];
    //   if (currentTier.max === -1) {
    //     // Last tier, no more amount needed
    //     amountNeeded = 0;
    //   } else {
    //     amountNeeded = currentTier.max - progress;
    //   }
    // }

    return { currentTier: currentTierIndex, amountNeeded };
  }, [data?.data]);

  const promoRedeemable = useMemo(() => {
    const amountNeeded = currentTierObj.amountNeeded;
    const isClaimed = data?.data?.claim_status.has_claimed;
    const reward = data?.data?.reward || 0;

    let redeemableStatus;

    if (isClaimed) {
      redeemableStatus = RedeemableType.done;
    } else if (reward > 0) {
      redeemableStatus = RedeemableType.available;
    } else if (amountNeeded > 0) {
      redeemableStatus = RedeemableType.pending;
    } else {
      redeemableStatus = RedeemableType.unavailable;
    }

    return redeemableStatus;
  }, [currentTierObj, data?.data]);

  return {
    mutateCurrentPromotion: mutate,
    currentPromotion: data?.data,
    currentTier: currentTierObj.currentTier,
    amountNeeded: currentTierObj.amountNeeded,
    redeemableStatus: promoRedeemable,
    isLoading,
  };
};

export const usePostPromotion = () => {
  const postPromotion = async (id) => {
    return UserApi(URL_USER.postPromotionClaim, { id }, { method: 'POST' });
  };

  return { postPromotion };
};
