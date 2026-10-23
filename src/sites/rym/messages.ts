import type { BrandConfig } from "@/templates/types";
import { whatsappLink } from "@/sites/shared/whatsapp";

/** WhatsApp links with Auto Servicio R&M's prefilled messages. */
export const rymWhatsApp = {
  getGeneralLink(brand: BrandConfig) {
    return whatsappLink(brand, "Hola, visité el sitio web de Auto Servicio R&M y necesito información.");
  },

  getServiceLink(brand: BrandConfig, service: string, year: string, make: string, model: string, description: string) {
    const text = `Hola, quiero consultar por el servicio de ${service}. Mi vehículo es ${year} ${make} ${model}. Presenta lo siguiente: ${description}.`;
    return whatsappLink(brand, text);
  },

  getAppointmentLink(
    brand: BrandConfig,
    name: string,
    year: string,
    make: string,
    model: string,
    service: string,
    description: string,
    date: string,
    timeWindow: string
  ) {
    const text = `Hola, quiero solicitar una cita en Auto Servicio R&M.

Nombre: ${name}
Vehículo: ${year} ${make} ${model}
Servicio: ${service}
Problema: ${description}
Fecha preferida: ${date}
Horario preferido: ${timeWindow}

Entiendo que la cita queda pendiente de confirmación.`;
    return whatsappLink(brand, text);
  },

  getQuoteLink(
    brand: BrandConfig,
    name: string,
    year: string,
    make: string,
    model: string,
    service: string,
    description: string
  ) {
    const text = `Hola, quiero solicitar una valoración en Auto Servicio R&M.

Nombre: ${name}
Vehículo: ${year} ${make} ${model}
Servicio: ${service}
Problema: ${description}

Entiendo que esta solicitud no constituye una cotización final y el costo se confirma después de revisar el vehículo.`;
    return whatsappLink(brand, text);
  },

  getEmergencyLink(brand: BrandConfig, symptom: string) {
    return whatsappLink(brand, `Hola, mi vehículo presenta ${symptom}. Necesito saber si pueden revisarlo.`);
  }
};
