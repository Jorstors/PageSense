export default async function handler(req, res) {
  if (req.method === "POST") {
    const { received } = req.body;
    res.status(200).json({ received });
    console.log(received);
  } else {
    res.status(405).end();
  }
}
