import {
  folioframeModules,
  type FolioFrameModuleCategory,
  type ModuleSlug,
} from "./folioframeModules";
import { folioframeOffers, type OfferSlug } from "./folioframeOffers";
import { getPortalDemoDataForModule } from "./folioframeDemoData";

export function getModuleBySlug(slug: string) {
  return folioframeModules.find((moduleInfo) => moduleInfo.slug === slug);
}

export function getOfferBySlug(slug: string) {
  return folioframeOffers.find((offer) => offer.slug === slug);
}

export function getModulesByCategory(category: FolioFrameModuleCategory) {
  return folioframeModules.filter((moduleInfo) => moduleInfo.category === category);
}

export function getRelatedModules(slug: ModuleSlug) {
  const moduleInfo = getModuleBySlug(slug);

  if (!moduleInfo) {
    return [];
  }

  return moduleInfo.relatedModules
    .map((relatedSlug) => getModuleBySlug(relatedSlug))
    .filter((relatedModule) => relatedModule !== undefined);
}

export function getOfferModules(slug: OfferSlug) {
  const offer = getOfferBySlug(slug);

  if (!offer) {
    return [];
  }

  return offer.includedModules
    .map((moduleSlug) => getModuleBySlug(moduleSlug))
    .filter((moduleInfo) => moduleInfo !== undefined);
}

export { getPortalDemoDataForModule };
