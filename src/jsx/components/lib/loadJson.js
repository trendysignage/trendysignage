async function loadAssetSourceFromContentJSON(
    engine,
    content,
    baseURL = "",
    applyAsset
  ) {
    const { assets, id: sourceId } = content
  
    engine.asset.addLocalSource(sourceId, undefined, applyAsset)
    assets.forEach(asset => {
      if (asset.meta) {
        Object.entries(asset.meta).forEach(([key, value]) => {
          const stringValue = value.toString()
          if (stringValue.includes("{{base_url}}")) {
            const updated = stringValue.replace("{{base_url}}", baseURL)
            if (asset.meta) {
              asset.meta[key] = updated
            }
          }
        })
      }
      engine.asset.addAssetToSource(sourceId, asset)
    })
  }
  
  export default loadAssetSourceFromContentJSON
  