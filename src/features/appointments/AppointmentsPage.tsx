// TODO: Descomentar cuando se retome el módulo de citas
// "use client";
//
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { AppointmentService } from './services/AppointmentService';
// import { GoogleCalendarService } from './services/GoogleCalendarService';
// import type { Appointment, GoogleCalendarStatus } from '@/types/appointment';
// import { Calendar, Clock, User, Phone, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
//
// export default function AppointmentsPage() {
//   const router = useRouter();
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [googleStatus, setGoogleStatus] = useState<GoogleCalendarStatus | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState<string>('all');
//
//   useEffect(() => {
//     loadData();
//   }, []);
//
//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const [appointmentsData, statusData] = await Promise.all([
//         AppointmentService.getAppointments(),
//         GoogleCalendarService.getStatus()
//       ]);
//       setAppointments(appointmentsData);
//       setGoogleStatus(statusData);
//     } catch (error) {
//       console.error('Error loading data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const handleConnectGoogle = async () => {
//     try {
//       await GoogleCalendarService.connect();
//       setTimeout(() => loadData(), 2000);
//     } catch (error) {
//       console.error('Error connecting Google Calendar:', error);
//     }
//   };
//
//   const handleDisconnectGoogle = async () => {
//     try {
//       await GoogleCalendarService.disconnect();
//       await loadData();
//     } catch (error) {
//       console.error('Error disconnecting Google Calendar:', error);
//     }
//   };
//
//   const getStatusBadge = (status: string) => {
//     const variants = {
//       pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <Clock className="w-4 h-4" /> },
//       confirmed: { bg: 'bg-blue-100', text: 'text-blue-800', icon: <CheckCircle className="w-4 h-4" /> },
//       completed: { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle className="w-4 h-4" /> },
//       cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: <XCircle className="w-4 h-4" /> },
//     };
//     const variant = variants[status as keyof typeof variants] || variants.pending;
//
//     return (
//       <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${variant.bg} ${variant.text}`}>
//         {variant.icon}
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </span>
//     );
//   };
//
//   const filteredAppointments = appointments.filter(apt => {
//     if (filter === 'all') return true;
//     return apt.status === filter;
//   });
//
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Cargando citas...</p>
//         </div>
//       </div>
//     );
//   }
//
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-8">
//       <div className="container mx-auto px-4 max-w-7xl">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Citas</h1>
//           <p className="text-gray-600">Administra las citas de tus pacientes</p>
//         </div>
//
//         {/* Google Calendar Connection Card */}
//         <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className={`p-2 rounded-lg ${googleStatus?.connected ? 'bg-green-100' : 'bg-gray-100'}`}>
//                 <Calendar className={`w-5 h-5 ${googleStatus?.connected ? 'text-green-600' : 'text-gray-600'}`} />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900">Google Calendar</h3>
//                 {googleStatus?.connected ? (
//                   <p className="text-sm text-green-600">Conectado: {googleStatus.email}</p>
//                 ) : (
//                   <p className="text-sm text-gray-600">No conectado</p>
//                 )}
//               </div>
//             </div>
//             {googleStatus?.connected ? (
//               <button
//                 onClick={handleDisconnectGoogle}
//                 className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100"
//               >
//                 Desconectar
//               </button>
//             ) : (
//               <button
//                 onClick={handleConnectGoogle}
//                 className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
//               >
//                 Conectar Google Calendar
//               </button>
//             )}
//           </div>
//         </div>
//
//         {/* Filters */}
//         <div className="mb-6 flex gap-2">
//           {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
//             <button
//               key={status}
//               onClick={() => setFilter(status)}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
//                 filter === status
//                   ? 'bg-emerald-600 text-white'
//                   : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
//               }`}
//             >
//               {status === 'all' ? 'Todas' : status.charAt(0).toUpperCase() + status.slice(1)}
//             </button>
//           ))}
//         </div>
//
//         {/* Appointments List */}
//         <div className="grid gap-4">
//           {filteredAppointments.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
//               <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//               <p className="text-gray-600">No hay citas {filter !== 'all' ? `con estado: ${filter}` : ''}</p>
//             </div>
//           ) : (
//             filteredAppointments.map((appointment) => (
//               <div
//                 key={appointment.id}
//                 className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-2">
//                       <h3 className="text-lg font-semibold text-gray-900">
//                         {appointment.patient.first_name} {appointment.patient.last_name}
//                       </h3>
//                       {getStatusBadge(appointment.status)}
//                       {appointment.google_calendar_event_id && (
//                         <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
//                           <Calendar className="w-3 h-3" />
//                           Sincronizado
//                         </span>
//                       )}
//                     </div>
//                     <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
//                       <div className="flex items-center gap-2">
//                         <Calendar className="w-4 h-4 text-emerald-600" />
//                         {new Date(appointment.appointment_datetime).toLocaleDateString('es-CO', {
//                           weekday: 'long',
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric',
//                         })}
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Clock className="w-4 h-4 text-emerald-600" />
//                         {new Date(appointment.appointment_datetime).toLocaleTimeString('es-CO', {
//                           hour: '2-digit',
//                           minute: '2-digit',
//                         })} ({appointment.duration_minutes} min)
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <User className="w-4 h-4 text-emerald-600" />
//                         {appointment.referrer_name}
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Phone className="w-4 h-4 text-emerald-600" />
//                         {appointment.patient.cellphone}
//                       </div>
//                     </div>
//                     {appointment.planned_procedures && appointment.planned_procedures.length > 0 && (
//                       <div className="mt-3">
//                         <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
//                           <FileText className="w-4 h-4 text-emerald-600" />
//                           Procedimientos:
//                         </div>
//                         <div className="flex flex-wrap gap-2">
//                           {appointment.planned_procedures.map((proc, idx) => (
//                             <span
//                               key={idx}
//                               className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full"
//                             >
//                               {proc.name}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                     {appointment.notes && (
//                       <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
//                         <strong>Notas:</strong> {appointment.notes}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//
//         {/* Info Message */}
//         <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//           <p className="text-sm text-blue-800">
//             <strong>Nota:</strong> Esta es una versión simplificada de la página de citas.
//             Para crear, editar o completar citas, utiliza los endpoints de la API directamente o implementa
//             los formularios completos según las especificaciones del plan.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function AppointmentsPage() {
  return null;
}
