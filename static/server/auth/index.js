import {Router} from 'express';
import localRoute from './local';

const router = new Router();

router.use('/local', localRoute);

export default router;