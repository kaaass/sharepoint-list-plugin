const AppName = __APP_NAME__
const AppVersion = __APP_VERSION__
const AppEnv = __APP_ENVIRONMENT__
const isDev = AppEnv === 'development'

export {
    AppName,
    AppVersion,
    AppEnv,
    isDev
}