/**
 * zh-CN - 中文 (简体)
 * zh-TW - 中文 (繁體)
 * en-US - English
 * ja-JP - 日本語
 * ko-KR - 한국어
 */
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

const namespace = 'translation'
i18next.use(initReactI18next).init({ lng: 'zh-CN', resources: {} })

export function i18nAddResources(lng: string, resources: object) {
  i18next.addResourceBundle(lng, namespace, resources, true, true)
}

export function i18nChangeLanguage(lng: string) {
  i18next.changeLanguage(lng)
}

export function i18nGetResources(lng: string) {
  return i18next.getResourceBundle(lng, namespace)
}

export const t = i18next.t.bind(i18next)
export { i18next }
