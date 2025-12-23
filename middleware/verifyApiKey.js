import 'dotenv/config';

export function verifyApiKey(req, res, next) {
   const providedKey = req.headers['x-api-key'] || '';
   if (providedKey !== process.env.MAA_API_KEY) {
    return res.status(401).json({message: 'unauthorized'})
   }
   next();
}