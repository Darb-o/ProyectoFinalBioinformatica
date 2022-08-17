export interface OrganismoRespuesta {
    organismos: Organismo[];
}

export interface Organismo {
    _id:           string;
    identificador: string;
    nombre:        string;
    nombrec:       string;
    descripcion:   string;
    longitud:      number;
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
}