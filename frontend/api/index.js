export default function handler(req, res) {
  res.status(200).json({
    msg: "hello from serverless",
    envKeys: Object.keys(process.env).filter(k => k.startsWith("DB_") || k.startsWith("STREAM_") || k.startsWith("CLERK_") || k.startsWith("INNGEST_") || k.startsWith("VITE_"))
  });
}
