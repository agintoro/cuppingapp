export interface Lot {
  id: string;
  slug: string;
  lotName: string;
  origin: string;
  region: string;
  process: string;
  varietals: string;
  altitude: string;
  farm: string;
  producer: string;
  pricePerKg: string;
  availability: "Available" | "Limited" | "Reserved" | "Sold Out" | "Coming Soon";
  minimumOrder: string;
  recommendedUse: string;
  tastingNotes: string[];
  processDetails: string;
  moisture: string;
  waterActivity: string;
  buyerDescription: string;
}

export interface Process {
  name: string;
  category: string;
  description: string;
  number: string;
}
