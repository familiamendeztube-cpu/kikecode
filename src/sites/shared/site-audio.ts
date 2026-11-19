/* One playing audio at a time across a site: the FAQ chat and the Secretaria
   IA card both claim this before playback, so starting one stops the other. */

let current: { owner: string; stop: () => void } | null = null;

export function claimAudio(owner: string, stop: () => void): void {
  if (current && current.owner !== owner) current.stop();
  current = { owner, stop };
}

export function releaseAudio(owner: string): void {
  if (current?.owner === owner) current = null;
}
