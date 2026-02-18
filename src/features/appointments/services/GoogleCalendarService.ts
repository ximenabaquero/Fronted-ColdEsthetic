// TODO: Descomentar cuando se retome el módulo de citas y Google Calendar
// import type { GoogleCalendarStatus } from '@/types/appointment';
//
// const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
//
// export class GoogleCalendarService {
//   /**
//    * Get connection status
//    */
//   static async getStatus(): Promise<GoogleCalendarStatus> {
//     const response = await fetch(`${API}/api/v1/google/status`, {
//       credentials: 'include',
//       headers: {
//         Accept: 'application/json',
//       },
//     });
//
//     if (!response.ok) {
//       throw new Error('Error al obtener el estado de conexión');
//     }
//
//     return response.json();
//   }
//
//   /**
//    * Initiate OAuth flow to connect Google Calendar
//    */
//   static async connect(): Promise<{ auth_url: string }> {
//     const response = await fetch(`${API}/api/v1/google/auth`, {
//       credentials: 'include',
//       headers: {
//         Accept: 'application/json',
//       },
//     });
//
//     if (!response.ok) {
//       throw new Error('Error al iniciar la conexión');
//     }
//
//     const data = await response.json();
//
//     // Open OAuth URL in new window
//     window.open(data.auth_url, '_blank', 'width=600,height=700');
//
//     return data;
//   }
//
//   /**
//    * Disconnect Google Calendar
//    */
//   static async disconnect(): Promise<{ message: string }> {
//     const response = await fetch(`${API}/api/v1/google/disconnect`, {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         Accept: 'application/json',
//         'X-XSRF-TOKEN': GoogleCalendarService.getCsrfToken(),
//       },
//     });
//
//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || 'Error al desconectar');
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
