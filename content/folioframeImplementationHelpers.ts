import {
  folioframeImplementationDocs,
  type ImplementationDocCategory,
} from "./folioframeImplementationDocs";

export function getImplementationDocBySlug(slug: string) {
  return folioframeImplementationDocs.find((doc) => doc.slug === slug);
}

export function getImplementationDocsByCategory(
  category: ImplementationDocCategory,
) {
  return folioframeImplementationDocs.filter((doc) => doc.category === category);
}

export function getImplementationDocsByModule(moduleName: string) {
  return folioframeImplementationDocs.filter(
    (doc) => doc.relatedModule.toLowerCase() === moduleName.toLowerCase(),
  );
}

export function getAllImplementationDocs() {
  return [...folioframeImplementationDocs];
}
