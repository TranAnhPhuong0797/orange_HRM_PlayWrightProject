export type LocatorType = 'id' | 'name' | 'css' | 'xpath';

export interface LocatorDef {
  type: LocatorType;
  selector: string;
}

export const dashboardLocator: Record<string, LocatorDef> = {
    



  
} as const;