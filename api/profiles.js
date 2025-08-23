import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY });

export default function handler(req, res) {
  res.status(200).json({ test: "API route works!" });
}

}
