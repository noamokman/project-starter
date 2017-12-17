import {join} from 'path';
import {rename} from 'fs';
import cpr from 'cpr';
import pify from 'pify';
import readPkg from 'read-pkg';
import writePkg from 'write-pkg';
import execa from 'execa';
import titleCase from 'title-case';
import snakeCase from 'snake-case';
import replace from 'replace-in-file';
import pCatchIf from 'p-catch-if';
import partial from './partial.js';

const cp = pify(cpr);

export function copyStaticFiles (path) {
  return cp(join(__dirname, '../static'), path, {overwrite: true})
    .then(() => pify(rename)(join(path, 'gitignore'), join(path, '.gitignore')));
}

export function fillPackageJson (path) {
  return readPkg(path)
    .catch(pCatchIf(({code}) => code === 'ENOENT', () => execa('npm', [
      'init',
      '-y'
    ], {cwd: path})
      .then(() => readPkg(path))))
    .then(pkg => {
      const newPkg = {...pkg, ...partial};

      delete newPkg._id;
      delete newPkg.readme;

      return writePkg(path, newPkg);
    });
}

export function renameProject (path) {
  return readPkg(path)
    .then(({name}) => replace({
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
    }));
}

export function initializeProjectDirectory ({path}) {
  return copyStaticFiles(path)
    .then(() => fillPackageJson(path))
    .then(() => renameProject(path));
}