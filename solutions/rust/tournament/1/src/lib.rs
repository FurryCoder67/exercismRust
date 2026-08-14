use std::{collections::HashMap, fmt};

#[derive(Default)]
struct FootballTally {
    team_name: String,
    matches_played: u32,
    matches_won: u32,
    matches_drawn: u32,
    matches_lost: u32,
    points: u32,
}

impl fmt::Display for FootballTally {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "{:<30} | {:>2} | {:>2} | {:>2} | {:>2} | {:>2}",
            self.team_name,
            self.matches_played,
            self.matches_won,
            self.matches_drawn,
            self.matches_lost,
            self.points
        )
    }
}

impl FootballTally {
    fn new(team_name: &str) -> Self {
        Self {
            team_name: team_name.to_string(),
            ..Default::default()
        }
    }

    fn win(&mut self) {
        self.matches_played += 1;
        self.matches_won += 1;
        self.points += 3;
    }

    fn draw(&mut self) {
        self.matches_played += 1;
        self.matches_drawn += 1;
        self.points += 1;
    }

    fn lose(&mut self) {
        self.matches_played += 1;
        self.matches_lost += 1;
    }
}

pub fn tally(match_results: &str) -> String {
    let mut tally_map: HashMap<String, FootballTally> = HashMap::new();
    for line in match_results.lines() {
        let game: Vec<&str> = line.split(';').collect();
        let team1 = game[0];
        let team2 = game[1];
        let result = game[2];
        match result {
            "win" => {
                tally_map
                    .entry(team1.to_string())
                    .or_insert(FootballTally::new(team1))
                    .win();
                tally_map
                    .entry(team2.to_string())
                    .or_insert(FootballTally::new(team2))
                    .lose();
            }
            "draw" => {
                tally_map
                    .entry(team1.to_string())
                    .or_insert(FootballTally::new(team1))
                    .draw();
                tally_map
                    .entry(team2.to_string())
                    .or_insert(FootballTally::new(team2))
                    .draw();
            }
            "loss" => {
                tally_map
                    .entry(team1.to_string())
                    .or_insert(FootballTally::new(team1))
                    .lose();
                tally_map
                    .entry(team2.to_string())
                    .or_insert(FootballTally::new(team2))
                    .win();
            }
            _ => unreachable!("Each game must results in win, draw or lost."),
        }
    }
    let mut tallies: Vec<&FootballTally> = tally_map.values().collect();
    tallies.sort_by(|a, b| match b.points.cmp(&a.points) {
        std::cmp::Ordering::Equal => a.team_name.cmp(&b.team_name),
        other => other,
    });
    let mut output = "Team                           | MP |  W |  D |  L |  P".to_string();
    for tally in tallies {
        output.push('\n');
        output.push_str(&tally.to_string());
    }
    output
}