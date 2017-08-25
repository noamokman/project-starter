import {join} from 'path';
import cpr from 'cpr';
import pify from 'pify';
import execa from 'execa';
import jsonfile from 'jsonfile';
import titleCase from 'title-case';
import snakeCase from 'snake-case';
import replace from 'replace-in-file';
import partial from './partial.js';

const jf = pify(jsonfile);
const cp = pify(cpr);

export function copyStaticFiles (path) {
  return cp(join(__dirname, '../static'), path, {overwrite: true});
}

export function fillPackageJson (path) {
  const pkgPath = join(path, 'package.json');

  return jf.readFile(pkgPath)
    .catch(error => {
      if (error.code !== 'ENOENT') {
        return Promise.reject(error);
      }

      return execa('npm', [
        'init',
        '-y'
      ], {cwd: path})
        .then(() => jf.readFile(pkgPath));
    })
    .then(pkg => {
      const newPkg = {...pkg, ...partial};

      return Promise.all([
        newPkg,
        jf.writeFile(pkgPath, newPkg, {spaces: 2})
      ]);
    })
    .then(([pkg]) => pkg);
}

export function renameProject (path, name) {
  return replace({
    files: [
      `${path}/**/*`,
      `${path}/**/.*`
    ],
    from: [
      /PROJECT_NAME/gm,
      /PROJECT_READABLE_NAME/gm
    ],
    to: [
      snakeCase(name),
      titleCase(name)
    ],
    allowEmptyPaths: true
  });
}

export function initializeModuleDirectory ({path, name}) {
  return copyStaticFiles(path)
    .then(() => fillPackageJson(path))
    .then(pkg => renameProject(path, name || pkg.name));
}