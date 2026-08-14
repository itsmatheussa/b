import { PIX_CONFIG } from "@/config/pix";

function tlv(id: string, value: string) {
  return id + String(value.length).padStart(2, "0") + value;
}

function crc16(payload: string) {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

const clean = (v: string, max: number) =>
  v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9 ]/g, "")
    .toUpperCase()
    .slice(0, max);

/** Gera o código PIX "copia e cola" (BR Code EMV) com valor fixo. */
export function buildPixPayload(amount: number, txid = "LOVABLEVSL") {
  const merchantAccount = tlv("00", "br.gov.bcb.pix") + tlv("01", PIX_CONFIG.key);

  const payload =
    tlv("00", "01") +
    tlv("26", merchantAccount) +
    tlv("52", "0000") +
    tlv("53", "986") +
    tlv("54", amount.toFixed(2)) +
    tlv("58", "BR") +
    tlv("59", clean(PIX_CONFIG.merchantName, 25)) +
    tlv("60", clean(PIX_CONFIG.merchantCity, 15)) +
    tlv("62", tlv("05", clean(txid, 25))) +
    "6304";

  return payload + crc16(payload);
}