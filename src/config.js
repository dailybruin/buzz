const config = {
  SERVER_URL: process.env.NODE_ENV === "production" ? "https://swoop.dailybruin.com" : "http://localhost:3000",
  modulars: {
    "Public comment": ["name", "position", "comment", "explainer"],
    "Comments from the web": ["comment", "username", "section", "headline"],
    "USAC Comment": ["name", "position", "comment", "explainer"],
    "Twitter": ["name", "handle", "tweet", "explainer"],
    "OpinionHasOpinions": ["name", "handle", "tweet", "explainer", "question"],
    "TBT Refer": ["title", "blurb"],
    "TDTY": ["title", "blurb"],
    "Stonewall": ["header", "body"]
  },
  designNotes: {
    sections: ["news", "opinion", "sports", "arts", "inserts"],
    properties: ["placement", "slug", "section"]
  }
};

export default config;