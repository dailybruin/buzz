const config = {
  SERVER_URL: process.env.NODE_ENV === "production" ? "https://buzz.dailybruin.com" : "http://localhost:3000",
  auditSheet: "https://docs.google.com/spreadsheets/d/1dOOL9Y4eZaTOTrTLsjPGCcjE6euqXazfgeaK3DIu2jc/edit",
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
    properties: ["placement", "slug", "art", "wordCount", "comments", "status"],
    placeholders: {
      "comments": "refers/flags/etc."
    }
  },
  schedule: {
    metrics: ["shift", "start", "end", "person", "day"],
    sections: ["news", "opinion", "arts", "sports"]
  },
  stories: {
    properties: ["figma" ]
  }
};

export default config;