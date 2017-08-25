import {Router} from 'express';
import {index} from './controller';
import './passport';

const router = new Router();

router.post('/', index);

export default router;