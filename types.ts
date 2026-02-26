
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  APP_MANAGEMENT = 'APP_MANAGEMENT', // 新增：APP全生命周期管理
  USER_MANAGEMENT = 'USER_MANAGEMENT',
  TERMINAL_MONITOR = 'TERMINAL_MONITOR',
  FAULT_TICKETS = 'FAULT_TICKETS',
  OTA_MANAGEMENT = 'OTA_MANAGEMENT',
  OTA_TASK_CREATE = 'OTA_TASK_CREATE',
  OTA_PACKAGE_MNG = 'OTA_PACKAGE_MNG',
  VEHICLE_CONFIG = 'VEHICLE_CONFIG',
  APP_CONTENT = 'APP_CONTENT',
  AUDIT_LOGS = 'AUDIT_LOGS',
  REPORT_STATS = 'REPORT_STATS',
  SYSTEM_CONFIG = 'SYSTEM_CONFIG',
  DEBUG_RECORDS = 'DEBUG_RECORDS'
}

export interface User {
  id: string;
  username: string;
  phone: string;
  boundVehicle: string;
  appVersion: string;
  serviceStatus: 'Active' | 'Expired' | 'Pending';
  registerDate: string;
  role: 'Admin' | 'Operator' | 'Engineer' | 'CarOwner';
}

export interface VehicleTerminal {
  id: string;
  vin: string;
  model: string;
  status: 'Online' | 'Offline' | 'Warning';
  signal: number;
  faultCode: string | null;
  lastHeartbeat: string;
  location: string;
  mode: string;
  lastUpdate: string;
}

export interface FaultTicket {
  id: string;
  vin: string;
  type: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Processing' | 'Closed';
  createdAt: string;
  description: string;
}

export interface OTATask {
  id: string;
  version: string;
  targetModel: string;
  progress: number;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Failed';
  startTime: string;
  mode: 'Full' | 'Batch' | 'Targeted' | 'Scheduled';
}

export interface OTAPackage {
  id: string;
  version: string;
  type: 'App' | 'ECU' | 'Dual';
  targetModels: string[];
  status: 'Testing' | 'Released' | 'Deprecated';
  uploader: string;
  uploadTime: string;
  size: string;
  changelog: string;
}

// 新增：车辆配置模板
export interface ConfigTemplate {
  id: string;
  name: string;
  targetModels: string[];
  features: string[]; // e.g. "DigitalKey", "AntiTheft"
  updatedAt: string;
  status: 'Active' | 'Draft';
}

// 新增：H5 页面
export interface H5Page {
  id: string;
  title: string;
  type: 'Manual' | 'Guide' | 'Repair' | 'Policy';
  targetModels: string[];
  status: 'Draft' | 'Review' | 'Published' | 'Offline';
  views: number;
  updatedBy: string;
  updatedAt: string;
}

// 新增：文案
export interface AppCopywriting {
  id: string;
  content: string;
  scene: string;
  languages: string[];
  status: 'Enabled' | 'Disabled';
  updatedAt: string;
}
