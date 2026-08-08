import type { BrandModelId } from '@/lib/media/brandModels'
import { trackEvent } from '@/lib/track'

type EditorialAssetContext = {
  assetId: string
  mobileAssetId?: string
  modelIds: BrandModelId[]
  route: string
  section: string
  locale: string
}

export function trackEditorialAssetView(context: EditorialAssetContext) {
  trackEvent('visual_asset_view', {
    asset_id: context.assetId,
    mobile_asset_id: context.mobileAssetId ?? '',
    model_ids: context.modelIds.join(','),
    route: context.route,
    section: context.section,
    locale: context.locale,
  })
}

export function trackEditorialAssetCta(
  context: EditorialAssetContext & { target: string; action: string },
) {
  trackEvent('visual_asset_cta_click', {
    asset_id: context.assetId,
    mobile_asset_id: context.mobileAssetId ?? '',
    model_ids: context.modelIds.join(','),
    route: context.route,
    section: context.section,
    locale: context.locale,
    destination_url: context.target,
    action: context.action,
  })
}
