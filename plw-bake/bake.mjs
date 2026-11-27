/* PLW Plumbing: builds the 3D tradesman used on /plumber/.
   Source: Microsoft Rocketbox Avatar Library (MIT License, Copyright (c) 2020 Microsoft),
   https://github.com/microsoft/Microsoft-Rocketbox  (avatar Construction_Male_06).
   Run once:  node bake.mjs public/plumber   (needs: npm i jpeg-js) */
import fs from "node:fs";
import zlib from "node:zlib";
import jpeg from "jpeg-js";
const SRC = "https://raw.githubusercontent.com/microsoft/Microsoft-Rocketbox/master/Assets/Avatars/Professions/Construction_Male_06/";
const OUT = (process.argv[2] || "public/plumber").replace(/\/$/, "") + "/";
const CACHE = process.env.RB_CACHE;
async function get(rel) {
  if (CACHE) { const p = CACHE + "/" + rel.split("/").pop(); if (fs.existsSync(p)) return fs.readFileSync(p); }
  for (let i = 0; i < 4; i++) {
    try { const r = await fetch(SRC + rel); if (!r.ok) throw new Error(r.status); return Buffer.from(await r.arrayBuffer()); }
    catch (e) { console.log("retry", rel, String(e)); await new Promise((r) => setTimeout(r, 1500 * (i + 1))); }
  }
  throw new Error("download failed: " + rel);
}

/* ---- binary FBX reader ---- */
function parseFBX(buf) {
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength), big = dv.getUint32(23, true) >= 7500;
  let o = 27;
  const u32 = () => { const v = dv.getUint32(o, true); o += 4; return v; };
  const u64 = () => { const v = Number(dv.getBigUint64(o, true)); o += 8; return v; };
  const arr = (T, size) => { const n = u32(), enc = u32(), clen = u32(); let b = buf.subarray(o, o + clen); o += clen; if (enc === 1) b = zlib.inflateSync(b); return new T(b.buffer.slice(b.byteOffset, b.byteOffset + n * size)); };
  const prop = () => {
    const t = String.fromCharCode(buf[o++]); let v, n;
    switch (t) {
      case "Y": v = dv.getInt16(o, true); o += 2; return v;
      case "C": return buf[o++];
      case "I": v = dv.getInt32(o, true); o += 4; return v;
      case "F": v = dv.getFloat32(o, true); o += 4; return v;
      case "D": v = dv.getFloat64(o, true); o += 8; return v;
      case "L": v = Number(dv.getBigInt64(o, true)); o += 8; return v;
      case "f": return arr(Float32Array, 4);
      case "d": return arr(Float64Array, 8);
      case "l": return Array.from(arr(BigInt64Array, 8), Number);
      case "i": return arr(Int32Array, 4);
      case "b": return arr(Uint8Array, 1);
      case "S": n = u32(); v = buf.subarray(o, o + n).toString("latin1"); o += n; return v;
      case "R": n = u32(); v = buf.subarray(o, o + n); o += n; return v;
    }
    throw new Error("fbx property " + t);
  };
  const node = () => {
    const end = big ? u64() : u32(), np = big ? u64() : u32(); big ? u64() : u32();
    const nl = buf[o++]; if (end === 0) return null;
    const name = buf.subarray(o, o + nl).toString("latin1"); o += nl;
    const props = []; for (let i = 0; i < np; i++) props.push(prop());
    const kids = []; while (o < end) { const k = node(); if (k) kids.push(k); }
    o = end; return { name, props, kids };
  };
  const top = []; while (o < buf.length - 32) { const n = node(); if (!n) break; top.push(n); }
  return top;
}
const kid = (n, name) => n.kids.find((k) => k.name === name);
const nm = (n) => n.props[1].replace(/\0.*/, "");

/* ---- the control rig: [name, parent, source bones that feed it] ---- */
const RIG = [["hips", null, "Pelvis"], ["spine", "hips", "Spine"], ["spine1", "spine", "Spine1"], ["chest", "spine1", "Spine2"], ["neck", "chest", "Neck"],
  ["head", "neck", "Head,MJaw,MTongue,MBottomLip,LMouthBottom,RMouthBottom,MNose,LCheek,RCheek,LMasseter,RMasseter,LCaninus,RCaninus,MUpperLip,LUpperlip,RUpperlip,LInnerEyebrow,RInnerEyebrow,LOuterEyebrow,ROuterEyebrow,MMiddleEyebrow"]];
for (const s of ["L", "R"]) {
  RIG.push(["cl" + s, "chest", s + " Clavicle"], ["sh" + s, "cl" + s, s + " UpperArm"], ["el" + s, "sh" + s, s + " Forearm"], ["wr" + s, "el" + s, s + " Hand"]);
  for (let f = 0; f < 5; f++) RIG.push(["f" + s + f + "0", "wr" + s, s + " Finger" + f], ["f" + s + f + "1", "f" + s + f + "0", s + " Finger" + f + "1"], ["f" + s + f + "2", "f" + s + f + "1", s + " Finger" + f + "2"]);
  RIG.push(["hip" + s, "hips", s + " Thigh"], ["knee" + s, "hip" + s, s + " Calf"], ["ankle" + s, "knee" + s, s + " Foot"], ["toe" + s, "ankle" + s, s + " Toe0"]);
  RIG.push(["eye" + s, "head", s + "Eye"], ["lidT" + s, "head", s + "EyeBlinkTop"], ["lidB" + s, "head", s + "EyeBlinkBottom"], ["mouth" + s, "head", s + "MouthCorner"]);
}

async function buildMesh() {
  const top = parseFBX(await get("Export/Construction_Male_06.fbx"));
  const O = top.find((n) => n.name === "Objects"), C = top.find((n) => n.name === "Connections").kids.map((c) => c.props);
  const byId = new Map(O.kids.map((k) => [k.props[0], k]));
  const g = O.kids.find((k) => k.name === "Geometry"), mesh = O.kids.find((k) => k.name === "Model" && k.props[2] === "Mesh");
  const mats = C.filter((c) => c[0] === "OO" && c[2] === mesh.props[0] && byId.get(c[1])?.name === "Material").map((c) => nm(byId.get(c[1])).replace(/^m\d+_/, ""));
  const V = kid(g, "Vertices").props[0], PVI = kid(g, "PolygonVertexIndex").props[0];
  const N = kid(kid(g, "LayerElementNormal"), "Normals").props[0];
  const le = kid(g, "LayerElementUV"), UV = kid(le, "UV").props[0], UVI = kid(le, "UVIndex").props[0];
  const MAT = kid(kid(g, "LayerElementMaterial"), "Materials").props[0];
  // skin: source bone -> rig bone
  const src2rig = {}; RIG.forEach(([n, , srcs], i) => srcs.split(",").forEach((s) => (src2rig["Bip01 " + s] = i)));
  const bonePos = RIG.map(() => null), W = Array.from({ length: V.length / 3 }, () => new Map());
  for (const cl of O.kids) {
    if (cl.name !== "Deformer" || cl.props[2] !== "Cluster") continue;
    const link = C.find((c) => c[0] === "OO" && c[2] === cl.props[0] && byId.get(c[1])?.name === "Model");
    const src = nm(byId.get(link[1])), ri = src2rig[src]; if (ri === undefined) throw new Error("unmapped bone " + src);
    const TL = kid(cl, "TransformLink").props[0];
    if (RIG[ri][2].split(",")[0] === src.replace("Bip01 ", "")) bonePos[ri] = [TL[12] / 100, TL[13] / 100, TL[14] / 100];
    const ix = kid(cl, "Indexes"); if (!ix) continue;
    const I = ix.props[0], Wt = kid(cl, "Weights").props[0];
    for (let k = 0; k < I.length; k++) W[I[k]].set(ri, (W[I[k]].get(ri) || 0) + Wt[k]);
  }
  // triangles, split per (position, uv, normal), without the hard hat
  const key = new Map(), pos = [], nrm = [], uv = [], si = [], sw = [], tris = mats.map(() => []);
  let poly = 0, face = [];
  for (let k = 0; k < PVI.length; k++) {
    let cp = PVI[k]; const last = cp < 0; if (last) cp = ~cp;
    const n = [N[k * 3], N[k * 3 + 2], -N[k * 3 + 1]], q = n.map((v) => Math.round(v * 127));
    const id = cp + "/" + UVI[k] + "/" + q.join(",");
    let vi = key.get(id);
    if (vi === undefined) {
      vi = pos.length / 3; key.set(id, vi);
      pos.push(V[cp * 3] / 100, V[cp * 3 + 2] / 100, -V[cp * 3 + 1] / 100); nrm.push(...q); uv.push(UV[UVI[k] * 2], UV[UVI[k] * 2 + 1]);
      const w = [...W[cp]].sort((a, b) => b[1] - a[1]).slice(0, 4), sum = w.reduce((s, x) => s + x[1], 0);
      const b = w.map((x) => Math.round(x[1] / sum * 255)); b[0] += 255 - b.reduce((s, x) => s + x, 0);
      for (let j = 0; j < 4; j++) { si.push(w[j] ? w[j][0] : 0); sw.push(w[j] ? b[j] : 0); }
    }
    face.push(vi);
    if (last) { const m = mats[MAT[poly]]; if (m !== "helmet") for (let j = 1; j < face.length - 1; j++) tris[MAT[poly]].push(face[0], face[j], face[j + 1]); poly++; face = []; }
  }
  // drop vertices only the hard hat used, then pack
  const used = new Int32Array(pos.length / 3).fill(-1); let nv = 0; const index = [], groups = [];
  tris.forEach((t, m) => { if (!t.length) return; groups.push({ mat: mats[m], start: index.length, count: t.length }); for (const v of t) { if (used[v] < 0) used[v] = nv++; index.push(used[v]); } });
  const P = new Float32Array(nv * 3), Nn = new Int8Array(nv * 4), U = new Uint16Array(nv * 2), SI = new Uint8Array(nv * 4), SW = new Uint8Array(nv * 4);
  used.forEach((d, s) => { if (d < 0) return; for (let j = 0; j < 3; j++) { P[d * 3 + j] = pos[s * 3 + j]; Nn[d * 4 + j] = nrm[s * 3 + j]; } for (let j = 0; j < 2; j++) U[d * 2 + j] = Math.round(Math.min(1, Math.max(0, uv[s * 2 + j])) * 65535); for (let j = 0; j < 4; j++) { SI[d * 4 + j] = si[s * 4 + j]; SW[d * 4 + j] = sw[s * 4 + j]; } });
  const bufs = [P, Nn, U, SI, SW, new Uint16Array(index)].map((a) => Buffer.from(a.buffer, a.byteOffset, a.byteLength));
  const head = { nv, ni: index.length, groups, bones: RIG.map(([n, p], i) => [n, p, ...bonePos[i].map((v) => +v.toFixed(5))]), credit: "Character mesh: Microsoft Rocketbox Avatar Library, MIT License, (c) 2020 Microsoft" };
  let json = Buffer.from(JSON.stringify(head)); json = Buffer.concat([json, Buffer.alloc((4 - json.length % 4) % 4, 32)]);
  const hdr = Buffer.alloc(8); hdr.write("PLWM"); hdr.writeUInt32LE(json.length, 4);
  fs.writeFileSync(OUT + "rico.bin", Buffer.concat([hdr, json, ...bufs]));
  console.log("rico.bin", nv, "verts", index.length / 3, "tris", groups.map((g) => g.mat + ":" + g.count / 3).join(" "));
}

/* ---- textures: TGA -> edit -> downscale -> JPEG ---- */
function tga(buf) {
  const w = buf.readUInt16LE(12), h = buf.readUInt16LE(14), bpp = buf[16] >> 3, type = buf[2], flip = !(buf[17] & 0x20);
  let o = 18 + buf[0]; const px = new Uint8Array(w * h * 3);
  const put = (i, s) => { const y = flip ? h - 1 - ((i / w) | 0) : (i / w) | 0, d = (y * w + (i % w)) * 3; px[d] = buf[s + 2]; px[d + 1] = buf[s + 1]; px[d + 2] = buf[s]; };
  if (type === 2) for (let i = 0; i < w * h; i++, o += bpp) put(i, o);
  else if (type === 10) for (let i = 0; i < w * h;) { const c = buf[o++], n = (c & 127) + 1; if (c & 128) { for (let k = 0; k < n; k++) put(i++, o); o += bpp; } else for (let k = 0; k < n; k++, o += bpp) put(i++, o); }
  else throw new Error("tga type " + type);
  return { w, h, px };
}
function half({ w, h, px }) {
  const W = w >> 1, H = h >> 1, out = new Uint8Array(W * H * 3);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) for (let c = 0; c < 3; c++) { const a = ((y * 2) * w + x * 2) * 3 + c; out[(y * W + x) * 3 + c] = (px[a] + px[a + 3] + px[a + w * 3] + px[a + w * 3 + 3] + 2) >> 2; }
  return { w: W, h: H, px: out };
}
function save(name, img, size, q) {
  while (img.w > size) img = half(img);
  const rgba = Buffer.alloc(img.w * img.h * 4, 255); for (let i = 0, j = 0; i < img.px.length; i += 3, j += 4) { rgba[j] = img.px[i]; rgba[j + 1] = img.px[i + 1]; rgba[j + 2] = img.px[i + 2]; }
  const out = jpeg.encode({ data: rgba, width: img.w, height: img.h }, q).data; fs.writeFileSync(OUT + name, out); console.log(name, img.w + "px", (out.length / 1024).toFixed(0) + " KB");
}
// workwear blue -> deep company navy, keeping the cloth shading
function navy(img) {
  const p = img.px;
  for (let i = 0; i < p.length; i += 3) {
    const r = p[i], g = p[i + 1], b = p[i + 2], m = Math.min(1, Math.max(0, (b - Math.max(r, g) - 8) / 36)); if (m <= 0) continue;
    const l = (0.3 * r + 0.5 * g + 0.2 * b) / 255, k = Math.pow(l, 0.92) * 1.5;
    p[i] = r + (Math.min(255, 54 * k * 2.2) - r) * m; p[i + 1] = g + (Math.min(255, 70 * k * 2.2) - g) * m; p[i + 2] = b + (Math.min(255, 104 * k * 2.2) - b) * m;
  }
  return img;
}
// specular -> roughness (green channel, as three.js reads it)
function rough(img, base, gain) { const p = img.px; for (let i = 0; i < p.length; i += 3) { const s = Math.max(p[i], p[i + 1], p[i + 2]) / 255, v = Math.round(255 * Math.min(1, Math.max(0.08, base - s * gain))); p[i] = p[i + 1] = p[i + 2] = v; } return img; }

fs.mkdirSync(OUT, { recursive: true });
await buildMesh();
const T = "Textures/m105_";
save("rico_body.jpg", navy(tga(await get(T + "body_color.tga"))), 2048, 84);
save("rico_body_n.jpg", tga(await get(T + "body_normal.tga")), 1024, 88);
save("rico_head.jpg", tga(await get(T + "head_color.tga")), 1024, 88);
save("rico_head_n.jpg", tga(await get(T + "head_normal.tga")), 512, 88);
save("rico_head_r.jpg", rough(tga(await get(T + "head_specular.tga")), 0.74, 1.5), 512, 80);
save("rico_tools.jpg", tga(await get(T + "tools_color.tga")), 512, 86);
save("rico_tools_n.jpg", tga(await get(T + "tools_normal.tga")), 512, 86);
console.log("done");
