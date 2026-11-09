/*
  Every client is Costa Rican. Phones show as "+506 8888-1234" and always dial
  with the country code, so a number typed the local way ("8888-1234") still
  works in tel: and WhatsApp links. A number from another country keeps its own
  format. Prices are colones as es-CR writes them: `n.toLocaleString("es-CR")`
  gives "45 000" with a no-break space.
*/

/** The 8-digit national number when `raw` is a Costa Rican number, else null. */
function crNational(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 8) return digits;
  if (digits.length === 11 && digits.startsWith("506")) return digits.slice(3);
  return null;
}

/** Display text and tel: link for a phone as staff typed it. */
export function crPhone(raw: string): { phone: string; phoneHref: string } {
  const national = crNational(raw);
  if (national) return { phone: `+506 ${national.slice(0, 4)}-${national.slice(4)}`, phoneHref: `tel:+506${national}` };
  const dialable = raw.replace(/[^\d+]/g, "");
  return { phone: raw.trim(), phoneHref: dialable.length >= 3 ? `tel:${dialable}` : "tel:" };
}

/** Digits for a wa.me link: a Costa Rican number always carries 506. */
export function waDigits(raw: string): string {
  const national = crNational(raw);
  return national ? `506${national}` : raw.replace(/\D/g, "");
}
