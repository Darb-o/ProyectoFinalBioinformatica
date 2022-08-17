export interface OrganismoRespuesta {
    organismos: Organismo[];
}

export interface Organismo {
    _id:           string;
    identificador: string;
    encabezado:    string;
    nombre:        string;
    nombrec:       string;
    descripcion:   string;
    secuencia:     string;
    imagen:        string;
    __v:           number;
}

export interface tipo {
    tipo: string;
}

export interface vistaResultados{
    cadena: string;
    puntuacion: number;
    porcentaje?: number;
    cadenaBase: string;
    cadenaIngresada: string;
}

export interface variablesNeedleman {
    coincidencia: number;
    noCoincidencia: number;
    gap: number;
}