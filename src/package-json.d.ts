import { JSONSchemaForNPMPackageJsonFiles } from '@schemastore/package'

export interface PackageJSON extends JSONSchemaForNPMPackageJsonFiles {
  name: string
  version: string
  i18n?: Record<string, string>
  duplicis?: { hideFromSettings?: boolean; optional?: boolean; displayName?: string }
  importmap?: Record<string, string>
  engines?: JSONSchemaForNPMPackageJsonFiles['engines'] | { duplicis?: string }
}

export default PackageJSON
