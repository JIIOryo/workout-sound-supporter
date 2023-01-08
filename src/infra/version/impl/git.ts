import * as childProcess from 'child_process'

import {inject, injectable} from 'inversify'

import * as infra from '@/infra'
import * as di from '@/di'

@injectable()
export class GitVersion implements infra.version.Interface.IVersion {
  constructor(
    @inject(di.Identifier.Infra.Logger) private readonly logger: infra.logger.Interface.ILogger,
  ) {}

  public get = async (): Promise<string> => {
    try {
      const version = childProcess.execSync('git describe --tags HEAD').toString().trim()
      return version
    } catch (e) {
      this.logger.error('Failed to get version', e)
      return 'unknown'
    }
  }
}
