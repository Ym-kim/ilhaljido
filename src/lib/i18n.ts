export type { Lang } from './i18n/types'
export { STRINGS, translate } from './i18n/strings'
export {
  getHomeCategories,
  getPartnerTypes,
  getProgramsList,
  getGrowthCamps,
  getNavPrograms,
  VISA_COUNTRIES,
  VISA_PURPOSES,
  VISA_DURATIONS,
  getVisaMockResult,
} from './i18n/content'
export {
  getStayAsia,
  getStayOceania,
  getActivities,
  getWorkspaceFeatures,
  getLanguageFeatures,
  getLanguagePrograms,
  getCruiseFeatures,
  getCruiseRoutes,
  getMarketFeatures,
  getMarketUnits,
  getGlobalDestinations,
  getDomesticCurrent,
  getDomesticUpcoming,
  getSampleSchedule,
  getCategoryLabels,
  getStatusLabels,
  getJobTypeOptions,
  getInterestOptions,
  getRestOptions,
  getApplyProgramOptions,
  translatePriceInclude,
  getWorkStyleOptions,
  getDurationOptions,
  getBudgetOptions,
  getYangyangDateOptions,
  getCompanionOptions,
  getRegionLabel,
  getSpaceTypeLabel,
  getNoiseLevelLabel,
  getLocalizedSpaces,
} from './i18n/data'
export type { HomeCategory, PartnerType, ProgramCard } from './i18n/content'

import type { Lang } from './i18n/types'
import { STRINGS } from './i18n/strings'

/** @deprecated Use STRINGS or translate() — kept for LanguageContext */
export const t: Record<Lang, Record<string, string>> = STRINGS
