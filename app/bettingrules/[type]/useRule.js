import useGetCategories from '@/hook/user/useGetCategories';
import { useEffect, useState } from 'react';

export const useRule = (typeId) => {
  const [ruleContent, setRuleContent] = useState();
  const { sportsCategories: types } = useGetCategories();
  useEffect(() => {
    try {
      const content = types.filter((type) => type.id == typeId).slice(-1)[0];
      setRuleContent(content.rules);
    } catch (e) {
      setRuleContent('');
    }
  }, [typeId, types]);
  return ruleContent;
};
