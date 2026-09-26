const QUERY = `query profile($username: String!) {
  allQuestionsCount { difficulty count }
  matchedUser(username: $username) {
    submitStatsGlobal { acSubmissionNum { difficulty count } }
    userCalendar { submissionCalendar }
  }
  userContestRanking(username: $username) { rating globalRanking topPercentage attendedContestsCount }
  userContestRankingHistory(username: $username) {
    attended rating ranking problemsSolved totalProblems
    contest { title startTime }
  }
  recentAcSubmissionList(username: $username, limit: 3) { title titleSlug timestamp }
}`;

const DAY = 86_400_000;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Last ~year of daily submissions (UTC days, as LeetCode reports them), in Sunday-first weeks.
function buildCalendar(raw) {
  const counts = new Map(Object.entries(raw).map(([ts, n]) => [Math.floor(Number(ts) / 86_400) * DAY, n]));
  const today = Math.floor(Date.now() / DAY) * DAY;
  const start = today - (52 * 7 + new Date(today).getUTCDay()) * DAY;

  const weeks = [];
  const months = new Map();
  let total = 0;
  let activeDays = 0;
  let run = 0;
  let longestStreak = 0;
  for (let t = start; t <= today; t += DAY) {
    if (new Date(t).getUTCDay() === 0) weeks.push([]);
    const date = new Date(t).toISOString().slice(0, 10);
    const count = counts.get(t) ?? 0;
    weeks.at(-1).push({ date, count });

    total += count;
    if (count) activeDays++;
    run = count ? run + 1 : 0;
    longestStreak = Math.max(longestStreak, run);

    const month = months.get(date.slice(0, 7)) ?? { submissions: 0, activeDays: 0 };
    month.submissions += count;
    if (count) month.activeDays++;
    months.set(date.slice(0, 7), month);
  }
  const last = weeks.at(-1);
  while (last.length < 7) last.push(null);

  // Label a week when it holds the first of a month, skipping labels too close to the previous one.
  let lastLabelled = -3;
  const labels = weeks.map((w, i) => {
    const first = w.find((d) => d && d.date.endsWith("-01"));
    if (!first || i - lastLabelled < 3) return null;
    lastLabelled = i;
    return MONTHS[Number(first.date.slice(5, 7)) - 1];
  });

  return {
    weeks,
    labels,
    total,
    activeDays,
    longestStreak,
    months: [...months].map(([key, m]) => ({ key, ...m })).reverse(),
  };
}

export async function getLeetCode(username) {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
      body: JSON.stringify({ query: QUERY, variables: { username } }),
      next: { revalidate: 60 * 60 * 6 },
    });
    if (!res.ok) return null;
    const { data } = await res.json();
    if (!data?.matchedUser) return null;

    const byDifficulty = (list) => Object.fromEntries(list.map((x) => [x.difficulty, x.count]));
    const solved = byDifficulty(data.matchedUser.submitStatsGlobal.acSubmissionNum);
    const total = byDifficulty(data.allQuestionsCount);
    const contest = data.userContestRanking;
    const calendarJson = data.matchedUser.userCalendar?.submissionCalendar;

    return {
      solved,
      total,
      rating: contest ? Math.round(contest.rating) : null,
      topPercentage: contest?.topPercentage ?? null,
      recent: (data.recentAcSubmissionList ?? []).map((s) => ({
        title: s.title,
        url: `https://leetcode.com/problems/${s.titleSlug}/`,
        date: new Date(Number(s.timestamp) * 1000),
      })),
      calendar: calendarJson ? buildCalendar(JSON.parse(calendarJson)) : null,
      contests: (data.userContestRankingHistory ?? [])
        .filter((c) => c.attended)
        .map((c) => ({
          t: c.contest.startTime * 1000,
          title: c.contest.title,
          rating: Math.round(c.rating),
          rank: c.ranking,
          solved: c.problemsSolved,
          of: c.totalProblems,
        })),
    };
  } catch {
    return null;
  }
}
