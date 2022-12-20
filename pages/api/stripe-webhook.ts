import { NextApiHandler } from "next";

const stripeWebhook: NextApiHandler = (req, res) => {
  console.log(req.body);

  res.status(204).end();
};

export default stripeWebhook;
