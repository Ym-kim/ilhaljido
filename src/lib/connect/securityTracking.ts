import { trackEvent } from '@/lib/track'
import { isSecurityPartnerReady, securityEventProperties } from './securityPartners'
import type { SecurityContext, SecurityPartnerConfig } from './securityPartners'

export function trackConnectSecurity(event: 'connect_security_view' | 'connect_security_guide_click', context: SecurityContext) {
  const props = securityEventProperties(context)
  if (props) trackEvent(event, props)
}

// Reading the Business checklist is interest, not an inquiry or a submitted lead.
export function trackBusinessSecurityInterest(context: SecurityContext) {
  if (context.placement !== 'business_readiness' || context.audience_type !== 'business') return
  const props = securityEventProperties(context)
  if (props) trackEvent('business_security_interest', props)
}

// Not called by the current editorial UI: both partner configs remain disabled.
export function trackSecurityPartner(event: 'security_partner_view' | 'security_partner_click', config: SecurityPartnerConfig, context: SecurityContext) {
  const props = securityEventProperties(context)
  if (props && config.audience === context.audience_type && isSecurityPartnerReady(config)) {
    trackEvent(event, { ...props, partner: config.partnerId! })
  }
}
