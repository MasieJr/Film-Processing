export const services = [
  "Email in High Resolution",
  "Email in Low Resolution",
  "Print Only",
  "Print and email",
  "Develop only",
];
export const printsSizes = ["9x13 cm", "10x15 cm", "13x18 cm", "15x20 cm"];
export const finishes = ["Glossy", "Matte"];
export const printPrices = [445, 329, 895, 931];
export const prices = [200, 180, 329, 329, 95];
export const surcharges = [144, 144, 500, 600];
export const devSurcharge = 90;

export interface OrderFormData {
  customerName: string;
  email: string;
  phone: string;
  quantity: number;
  salesPerson: string;
  services: string;
  selectedSize: string;
  selectedFinish: string;
  totalPrice: number;
  keepNegatives: boolean;
  isHalfFrame: boolean;
  filmtype: "35mm" | "120mm" | "Slides" | "negatives";
}
