import { Request, Response, NextFunction } from 'express';

export function verifyApiKey(req: Request, res: Response, next: NextFunction) {
	const providedKey = req.headers['x-api-key'];
	const serverKey = process.env.MAA_API_KEY;
	if (!serverKey) throw new Error('MAA_API_KEY not configured');
	if (!providedKey) return void res.status(401).json({ message: 'unauthorized' });
	if (providedKey !== serverKey) return void res.status(401).json({ message: 'unauthorized' });
	next();
}
