// Deliberate serverless safety gate: local SQLite is not durable on Vercel.
export default function handler(req,res){res.status(503).json({error:'durable_database_required',mode:'development'});}
