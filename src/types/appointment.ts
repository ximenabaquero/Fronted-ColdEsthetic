export interface Appointment {
  id: number;
  user_id: number;
  patient_id: number;
  patient: {
    id: number;
    first_name: string;
    last_name: string;
    cellphone: string;
    age: number;
  };
  referrer_name: string;
  appointment_datetime: string;
  duration_minutes: number;
  planned_procedures: Array<{ name: string }>;
  notes: string | null;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  google_calendar_event_id: string | null;
  procedure_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface GoogleCalendarStatus {
  connected: boolean;
  email: string | null;
  sync_enabled: boolean;
}

export interface CreateAppointmentData {
  patient_id: number;
  referrer_name: string;
  appointment_datetime: string;
  duration_minutes: number;
  planned_procedures: Array<{name: string}>;
  notes?: string;
}

export interface UpdateAppointmentData {
  referrer_name?: string;
  appointment_datetime?: string;
  duration_minutes?: number;
  planned_procedures?: Array<{name: string}>;
  notes?: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface CompleteAppointmentData {
  procedure_items: Array<{
    item_name: string;
    price: number;
    meta?: any;
  }>;
  notes?: string;
}
