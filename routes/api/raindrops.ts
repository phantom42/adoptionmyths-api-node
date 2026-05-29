import express, {Request, Response} from 'express';
import path from 'path';
import {verifyApiKey} from '../../middleware/verifyApiKey.js';
import { fileURLToPath } from 'url';
import {getRaindrops} from '../../controllers/raindropsController.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

router.use(verifyApiKey);
router
	.route('/search')
	.get(getRaindrops)
router
	.route('/')
	.get(getRaindrops)
export default router;