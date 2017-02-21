import {Router} from 'express';
import {index} from './controller';

const router = new Router();

router.post('/', index);

export default router;