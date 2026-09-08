export type WhatsAppClickEvent = 
  | "wa_general"
  | "wa_service_consult"
  | "wa_appointment_request"
  | "wa_emergency"
  | "wa_quote_request"
  | "maps_click"
  | "waze_click"
  | "phone_click";

export function trackRymEvent(eventName: WhatsAppClickEvent) {
  // Pure event tracking with NO payload
  if (process.env.NODE_ENV !== "production") {
    console.log(`[RyM Analytics] ${eventName}`);
  }
}

function buildWaLink(phone: string, text: string) {
  // clean phone number (digits only)
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export const rymWhatsApp = {
  getGeneralLink(phone: string) {
    return buildWaLink(phone, "Hola, visité el sitio web de Auto Servicio R&M y necesito información.");
  },

  getServiceLink(phone: string, service: string, year: string, brand: string, model: string, description: string) {
    const text = `Hola, quiero consultar por el servicio de ${service}. Mi vehículo es ${year} ${brand} ${model}. Presenta lo siguiente: ${description}.`;
    return buildWaLink(phone, text);
  },

  getAppointmentLink(
    phone: string,
    name: string,
    year: string,
    brand: string,
    model: string,
    service: string,
    description: string,
    date: string,
    timeWindow: string
  ) {
    const text = `Hola, quiero solicitar una cita en Auto Servicio R&M.

Nombre: ${name}
Vehículo: ${year} ${brand} ${model}
Servicio: ${service}
Problema: ${description}
Fecha preferida: ${date}
Horario preferido: ${timeWindow}

Entiendo que la cita queda pendiente de confirmación.`;
    return buildWaLink(phone, text);
  },

  getQuoteLink(
    phone: string,
    name: string,
    year: string,
    brand: string,
    model: string,
    service: string,
    description: string
  ) {
    const text = `Hola, quiero solicitar una valoración en Auto Servicio R&M.

Nombre: ${name}
Vehículo: ${year} ${brand} ${model}
Servicio: ${service}
Problema: ${description}

Entiendo que esta solicitud no constituye una cotización final y el costo se confirma después de revisar el vehículo.`;
    return buildWaLink(phone, text);
  },

  getEmergencyLink(phone: string, symptom: string) {
    return buildWaLink(phone, `Hola, mi vehículo presenta ${symptom}. Necesito saber si pueden revisarlo.`);
  }
};