import {AsyncRouter} from 'express-async-router';
import objectId from 'express-param-objectid';
import * as controller from './todo.controller';
import {isAuthenticated} from '../../auth/auth.service';

const router = new AsyncRouter();

router.param('id', objectId);

router.get('/', isAuthenticated(), controller.index);
router.post('/', isAuthenticated(), controller.create);
router.get('/:id', isAuthenticated(), controller.show);
router.put('/:id', isAuthenticated(), controller.update);
router.delete('/:id', isAuthenticated(), controller.destroy);

export default router;