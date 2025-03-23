export interface Deployment {
    name: string;
    namespace: string;
    replicas: number;
    available: number;
    configMaps: any;
    isConfigMapOpen: boolean;
    setCurrentView: boolean;
  }
