/*
 * place and declare exports type for any used node_modules in project,
 * in order to prevent Flowtype warning.
 **/

declare module 'dotenv-safe' {
  declare var exports: any
}
declare module 'koa' {
  declare var exports: any
}
declare module 'koa-router' {
  declare var exports: any
}
declare module 'koa2-better-body' {
  declare var exports: any
}
