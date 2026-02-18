// TODO: Descomentar cuando se retome el módulo de citas
// import type { Appointment, CreateAppointmentData, UpdateAppointmentData, CompleteAppointmentData } from '@/types/appointment';
//
// const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
//
// export class AppointmentService {
//   /**
//    * Get all appointments with optional filters
//    */
//   static async getAppointments(filters?: {
//     start_date?: string;
//     end_date?: string;
//     status?: string;
//     referrer_name?: string;
//   }): Promise<Appointment[]> {
//     const params = new URLSearchParams();
//     if (filters?.start_date) params.append('start_date', filters.start_date);
//     if (filters?.end_date) params.append('end_date', filters.end_date);
//     if (filters?.status) params.append('status', filters.status);
//     if (filters?.referrer_name) params.append('referrer_name', filters.referrer_name);
//
//     const queryString = params.toString();
//     const url = `${API}/api/v1/appointments${queryString ? `?${queryString}` : ''}`;
//
//     const response = await fetch(url, {
//       credentials: 'include',
//       headers: {
//         Accept: 'application/json',
//       },
//     });
//
//     if (!response.ok) {
//       throw new Error('Error al cargar las citas');
//     }
//
//     return response.json();
//   }
//
//   /**
//    * Get upcoming appointments
//    */
//   static async getUpcomingAppointments(): Promise<Appointment[]> {
//     const response = await fetch(`${API}/api/v1/appointments/upcoming`, {
//       credentials: 'include',
//       headers: {
//         Accept: 'application/json',
//       },
//     });
//
//     if (!response.ok) {
//       throw new Error('Error al cargar las próximas citas');
//     }
//
//     return response.json();
//   }
//
//   /**
//    * Get a single appointment
//    */
//   static async getAppointment(id: number): Promise<Appointment> {
//     const response = await fetch(`${API}/api/v1/appointments/${id}`, {
//       credentials: 'include',
//       headers: {
//         Accept: 'application/json',
//       },
//     });
//
//     if (!response.ok) {
//       throw new Error('Error al cargar la cita');
//     }
//
//     return response.json();
//   }
//
//   /**
//    * Create a new appointment
//    */
//   static async createAppointment(data: CreateAppointmentData): Promise<{ message: string; appointment: Appointment }> {
//     const response = await fetch(`${API}/api/v1/appointments`, {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         'X-XSRF-TOKEN': AppointmentService.getCsrfToken(),
//       },
//       body: JSON.stringify(data),
//     });
//
//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || 'Error al crear la cita');
//     }
//
//     return response.json();
//   }
//
//   /**
//    * Update an appointment
//    */
//   static async updateAppointment(id: number, data: UpdateAppointmentData): Promise<{ message: string; appointment: Appointment }> {
//     const response = await fetch(`${API}/api/v1/appointments/${id}`, {
//       method: 'PUT',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         'X-XSRF-TOKEN': AppointmentService.getCsrfToken(),
//       },
//       body: JSON.stringify(data),
//     });
//
//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || 'Error al actualizar la cita');
//     }
//
//     return response.json();
//   }
//
//   /**
//    * Cancel an appointment
//    */
//   static async cancelAppointment(id: number): Promise<{ message: string }> {
//     const response = await fetch(`${API}/api/v1/appointments/${id}`, {
//       method: 'DELETE',
//       credentials: 'include',
//       headers: {
//         Accept: 'application/json',
//         'X-XSRF-TOKEN': AppointmentService.getCsrfToken(),
//       },
//     });
//
//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || 'Error al cancelar la cita');
//     }
//
//     return response.json();
//   }
//
//   /**
//    * Complete an appointment (convert to procedure)
//    */
//   static async completeAppointment(id: number, data: CompleteAppointmentData): Promise<{ message: string; appointment: Appointment }> {
//     const response = await fetch(`${API}/api/v1/appointments/${id}/complete`, {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         'X-XSRF-TOKEN': AppointmentService.getCsrfToken(),
//       },
//       body: JSON.stringify(data),
//     });
//
//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || 'Error al completar la cita');
//     }
//
//     return response.json();
//   }
//
//   /**
//    * Get CSRF token from cookie
//    */
//   private static getCsrfToken(): string {
//     const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
//     return match ? decodeURIComponent(match[1]) : '';
//   }
// }
