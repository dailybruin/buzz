const config = {
  SERVER_URL: process.env.NODE_ENV === "production" ? "https://buzz.dailybruin.com" : "http://localhost:3000",
  auditSheet: "https://docs.google.com/spreadsheets/d/1pg1fk2PGo11Vjddbm3YYCHjiTYIkCXH0Y4nTYPIwK0E/edit",
  modulars: {
    "Public Comment": ["name", "position", "comment", "explainer"],
    "Web Comment": ["comment", "username", "section", "headline"],
    "USAC Comment": ["name", "position", "comment", "explainer"],
    "Twitter": ["name", "handle", "tweet", "explainer"],
    "OpinionHas Opinions": ["name", "handle", "tweet", "explainer", "question"],
    "TBT Refer": ["title", "blurb"],
    "TDTY": ["title", "blurb"],
    "Stonewall": ["header", "body"]
  },
  designNotes: {
    sections: ["news", "opinion", "arts", "sports",  "inserts"],
    properties: [
      {key: "placement", label: "Placement"},
      {key:"slug", label: "Slug"},
      {key: "art", label: "Art"},
      {key: "wordCount", label: "Word Count"},
      {key:"status", label: "Status"},
      {key: "link", label: "Link"},
      { key: "placed", label: "Placed" },
      { key: "opinionated", label: "Opinionated" },
      { key: "referText", label: "Refer Text" },
      { key: "pullQuote", label: "Pull Quote" },
      { key: "comments", label: "Comments"},
    ],
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