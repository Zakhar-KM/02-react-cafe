import css from "./App.module.css";
import { useState } from "react";
import CafeInfo from "../CafeInfo/CafeInfo";
import VoteStats from "../VoteStats/VoteStats";
import VoteOptions from "../VoteOptions/VoteOptions";
import Notification from "../Notifications/Notifications";
import type { Votes, VoteType } from "../../types/votes";

export default function App() {
  const initialVotes: Votes = { good: 0, neutral: 0, bad: 0 };
  const [votes, setVotes] = useState<Votes>(initialVotes);

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate =
    totalVotes > 0 ? Math.round((votes.good / totalVotes) * 100) : 0;
  const handleVote = (type: VoteType) => {
    setVotes((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };
  const resetVotes = () => {
    setVotes(initialVotes);
  };

  return (
    <div className={css.app}>
      <CafeInfo />
      {totalVotes > 0 ? (
        <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={true} />
      ) : (
        <VoteOptions
          onVote={handleVote}
          onReset={resetVotes}
          canReset={false}
        />
      )}
      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
