import { nativeFetch } from "./request.js";

const RBX_HASH = /((?:\d+DAY-)?[a-f0-9]{16,128})/i;
const rbxUrl = (ref) => {
  let bucket = 31;
  for (const ch of ref) bucket ^= ch.charCodeAt(0);
  return `https://t${bucket % 8}.rbxcdn.com/${ref}`;
};
const rbxFetch = async (ref) => {
  const response = await nativeFetch(rbxUrl(ref));
  if (!response.ok) throw new Error(`Roblox CDN ${response.status}`);
  return response;
};
const rbxBlobs = new Map();
const rbxBlobUrl = (ref) => {
  const hash = String(ref).match(RBX_HASH)?.[1];
  if (!hash) return Promise.reject(new Error("Not a Roblox asset reference"));
  if (!rbxBlobs.has(hash))
    rbxBlobs.set(
      hash,
      rbxFetch(hash)
        .then((r) => r.blob())
        .then((b) => URL.createObjectURL(b))
        .catch((error) => {
          rbxBlobs.delete(hash);
          throw error;
        }),
    );
  return rbxBlobs.get(hash);
};
let avatar3dPromise = null;
export function loadAvatar3d(model) {
  // Share downloaded model assets when the viewer remounts.
  avatar3dPromise ??= (async () => {
    const [objUrl, mtl] = await Promise.all([
      rbxBlobUrl(model.obj),
      rbxFetch(model.mtl).then((r) => r.text()),
    ]);
    const refs = [
      ...new Set([...mtl.matchAll(/^\s*map_kd\s+(\S+)/gim)].map((m) => m[1])),
    ];
    const resolved = new Map();
    await Promise.all(
      refs.map(async (ref) => {
        try {
          resolved.set(ref, await rbxBlobUrl(ref));
        } catch {}
      }),
    );
    // Keep map_Kd lines only when they resolved; otherwise the viewer falls back to the ordered `textures` list.
    const mtlText = resolved.size
      ? mtl.replace(/^(\s*map_kd\s+)(\S+)/gim, (line, lead, ref) =>
          resolved.has(ref) ? lead + resolved.get(ref) : "",
        )
      : mtl.replace(/^\s*map_kd\s+\S+.*$/gim, "");
    const textures = await Promise.all(
      (model.textures || []).map((ref) => rbxBlobUrl(ref).catch(() => null)),
    );
    return {
      targetId: model.targetId,
      version: model.version,
      obj: model.obj,
      objUrl,
      mtl: model.mtl,
      mtlText,
      textures: textures.map((t) => t || ""),
      fetchedAt: Date.now(),
      assetProxyVersion: 14,
    };
  })().catch((error) => {
    avatar3dPromise = null;
    throw error;
  });
  return avatar3dPromise;
}
