export type ViewState = 'home' | 'camera' | 'results' | 'wardrobe';

export type ColorType = 'Summer Cool' | 'Spring Warm' | 'Autumn Warm' | 'Winter Cool';

export interface WardrobeItem {
  id: string;
  imageUrl: string;
  category: 'top' | 'bottom' | 'dress' | 'outerwear' | 'accessory';
  color: string;
}

export interface UserProfile {
  colorType: ColorType | null;
  wardrobe: WardrobeItem[];
}
