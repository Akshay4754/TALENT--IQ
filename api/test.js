export default function handler(req, res) {
  res.status(200).json({ msg: "serverless function works!", timestamp: new Date().toISOString() });
}
