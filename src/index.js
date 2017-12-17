import {join} from 'path';
import fs from 'fs';
import cpr from 'cpr';
import pify from 'pify';
import readPkg from 'read-pkg';
import writePkg from 'write-pkg';
import execa from 'execa';
import titleCase from 'title-case';
import snakeCase from 'snake-case';
import replace from 'replace-in-file';
import pCatchIf from 'p-catch-if';
import Handlebars from 'handlebars';
import parseGithubUrl from 'parse-github-url';
import partial from './partial.js';

const cp = pify(cpr);
const {readFile, writeFile, rename} = pify(fs);

export function copyStaticFiles ({path}) {
  return cp(join(__dirname, '..', 'static', 'common'), path, {overwrite: true})
    .then(() => rename(join(path, 'gitignore'), join(path, '.gitignore')));
}

export function fillPackageJson ({path}) {
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

export function renameProject ({path}) {
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

export function createReadme ({path}) {
  return Promise.all([
    readFile(join(__dirname, '..', 'static', 'templates', 'readme.hbs')),
    readPkg(path)
  ])
    .then(([buffer, {name, description, author = {}, license = 'MIT', repository = {}}]) => {
      const template = Handlebars.compile(buffer.toString());
      const repo = repository.url && parseGithubUrl(repository.url).repo;

      const readme = template({name, description, hasAuthor: author.url && author.name, author, license, repo});

      return writeFile(join(path, 'README.md'), readme);
    });
}

export function initializeProjectDirectory ({path}) {
  return copyStaticFiles({path})
    .then(() => fillPackageJson({path}))
    .then(() => renameProject({path}))
    .then(() => createReadme({path}));
}