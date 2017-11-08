import {AsyncRouter} from 'express-async-router';
import objectId from 'express-param-objectid';
import {isAuthenticated, isAdmin} from '../../auth/auth.service';
import * as controller from './user.controller';

const router = new AsyncRouter();

router.param('id', objectId);

router.get('/', isAdmin(), controller.index);
router.get('/me', isAuthenticated(), controller.me);
router.put('/:id/password', isAuthenticated(), controller.changePassword);
router.get('/:id', isAdmin(), controller.show);
router.put('/:id', isAuthenticated(), controller.update);

export default router;
