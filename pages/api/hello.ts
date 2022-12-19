// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.setHeader("Allow", "POST").status(405).json({});
  }
  const email = req.body.email;

  if (typeof email !== "string") {
    return res.status(400).json({});
  }

  const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;
  const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;

  if (!MAILERLITE_GROUP_ID || !MAILERLITE_API_KEY) {
    return res
      .status(500)
      .json({ error: `Nie podano zmiennych środowiskowych` });
  }

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-MailerLite-ApiKey": MAILERLITE_API_KEY,
    },
    body: JSON.stringify({ email: email }),
  };

  const mailerliteResponse = await fetch(
    `https://api.mailerlite.com/api/v2/groups/${MAILERLITE_GROUP_ID}/subscribers`,
    options
  );

  if (!mailerliteResponse.ok) {
    return res.status(500).json({
      error: `Pojawił się problem przy zapisie do Newslettera`,
    });
  }

  return res.status(201).json({});
};

export default handler;
