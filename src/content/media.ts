const mediaModules = import.meta.glob('../assets/media/**/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

function normalizeAssetKey(assetKey: string): string {
  if (assetKey.startsWith('/media/')) {
    return assetKey.slice('/media/'.length)
  }

  return assetKey.replace(/^\/+/, '')
}

export function resolveMediaAsset(assetKey: string): string {
  const moduleKey = `../assets/media/${normalizeAssetKey(assetKey)}`
  const assetUrl = mediaModules[moduleKey]

  if (!assetUrl) {
    throw new Error(`Missing media asset: ${assetKey}`)
  }

  return assetUrl
}
