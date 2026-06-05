import { Request, Response, NextFunction } from 'express';

export  async function verifyCaptcha(req: Request, res: Response, next: NextFunction) {
	const providedKey = req.body['validationToken'];
	const validToken = await callTurnstile(providedKey);
	if (validToken === false) return void res.status(401).json({ message: 'unauthorized' });
	next();
}

async function callTurnstile (token: string): Promise<boolean> {
	const url = process.env.TURNSTILE_ENDPOINT || '';
	if (!url.length) return false ;
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			secret: process.env.TURNSTILE_SECRET,
			response: token
		})
	})
	const data = await res.json();
	if (!data.success) return false;
	return true;
}