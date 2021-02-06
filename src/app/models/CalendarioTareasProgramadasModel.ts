export interface CalendarioTareasProgramadasModel {
    idCalendario: number;
    idTareaProgramada: number;
    nombreTareaProgramada:string;
    codPeriodicidadProceso: number;
    nombrePeriodicidad:string;
    semanas:string;
    meses:string;
    dias:string;
    fechasEspecificas:string;
    hora:string;
    intertvalo: number;
    usuarioCreacion:string;
}