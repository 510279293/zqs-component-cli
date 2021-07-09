import ora from 'ora';
import chalk from 'chalk';
import consola from 'consola';
import { ROOT } from '../common/constant';
export function slimPath(path) {
  return chalk.yellow(path.replace(ROOT, ''));
}
export { ora, consola };