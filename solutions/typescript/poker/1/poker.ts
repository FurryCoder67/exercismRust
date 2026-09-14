type Card = { rank: number; suit: string };

const RANK_MAP: Record<string, number> = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14,
};

function parseCard(card: string): Card {
    const suit = card.slice(-1);
    const rankStr = card.slice(0, -1);
    return { rank: RANK_MAP[rankStr], suit };
}

function parseHand(hand: string): Card[] {
    return hand.split(' ').map(parseCard);
}

// Returns a score array: [handRankCategory, tiebreak1, tiebreak2, ...]
// Higher is better, compared lexicographically.
function evaluateHand(hand: string): number[] {
    const cards = parseHand(hand);
    const ranks = cards.map(c => c.rank).sort((a, b) => b - a);

    const counts: Record<number, number> = {};
    for (const r of ranks) {
        counts[r] = (counts[r] || 0) + 1;
    }

    // Group ranks by count, then sort groups by (count desc, rank desc)
    const groups = Object.entries(counts)
        .map(([rank, count]) => ({ rank: Number(rank), count }))
        .sort((a, b) => (b.count - a.count) || (b.rank - a.rank));

    const isFlush = cards.every(c => c.suit === cards[0].suit);

    // Check straight (including special case A-2-3-4-5, "wheel")
    const uniqueRanks = Array.from(new Set(ranks)).sort((a, b) => b - a);
    let isStraight = false;
    let straightHigh = 0;

    if (uniqueRanks.length === 5) {
        if (uniqueRanks[0] - uniqueRanks[4] === 4) {
            isStraight = true;
            straightHigh = uniqueRanks[0];
        } else if (
            uniqueRanks[0] === 14 &&
            uniqueRanks[1] === 5 &&
            uniqueRanks[2] === 4 &&
            uniqueRanks[3] === 3 &&
            uniqueRanks[4] === 2
        ) {
            // wheel: A-2-3-4-5, treat Ace as low, high card is 5
            isStraight = true;
            straightHigh = 5;
        }
    }

    const groupCounts = groups.map(g => g.count);
    const groupRanksOrdered = groups.map(g => g.rank);

    // Straight flush
    if (isStraight && isFlush) {
        return [8, straightHigh];
    }

    // Four of a kind
    if (groupCounts[0] === 4) {
        return [7, ...groupRanksOrdered];
    }

    // Full house
    if (groupCounts[0] === 3 && groupCounts[1] === 2) {
        return [6, ...groupRanksOrdered];
    }

    // Flush
    if (isFlush) {
        return [5, ...ranks];
    }

    // Straight
    if (isStraight) {
        return [4, straightHigh];
    }

    // Three of a kind
    if (groupCounts[0] === 3) {
        return [3, ...groupRanksOrdered];
    }

    // Two pair
    if (groupCounts[0] === 2 && groupCounts[1] === 2) {
        return [2, ...groupRanksOrdered];
    }

    // One pair
    if (groupCounts[0] === 2) {
        return [1, ...groupRanksOrdered];
    }

    // High card
    return [0, ...ranks];
}

function compareScores(a: number[], b: number[]): number {
    const len = Math.max(a.length, b.length);
    for (let i = 0; i < len; i++) {
        const av = a[i] ?? 0;
        const bv = b[i] ?? 0;
        if (av !== bv) return av - bv;
    }
    return 0;
}

export function bestHands(hands: string[]): string[] {
    const scored = hands.map(hand => ({ hand, score: evaluateHand(hand) }));
    let best = scored[0].score;

    for (const { score } of scored) {
        if (compareScores(score, best) > 0) {
            best = score;
        }
    }

    return scored
        .filter(({ score }) => compareScores(score, best) === 0)
        .map(({ hand }) => hand);
}