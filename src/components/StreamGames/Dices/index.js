import { PlayBetDicesAccordion } from './PlayBetDicesAccordion';
import { DiceResults } from './DiceResults';
import { useStreamGame } from '@/hook/streamGames/useStreamGame';
import { DiceRules } from './DiceRules';

export const Dices = () => {
  const { results } = useStreamGame();
  return (
    <>
      <div className='p-3 mb-12'>
        <PlayBetDicesAccordion />
        {results.length > 0 && (
          <>
            <DiceResults results={results} />
          </>
        )}
        <DiceRules />
      </div>
    </>
  );
};
