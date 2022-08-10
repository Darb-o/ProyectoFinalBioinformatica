import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organismo, OrganismoRespuesta  } from '../interfaces/organismo.interface'

@Injectable({
  providedIn: 'root'
})
export class ListadoService {

  private baseUrl: string = environment.baseUrl
  constructor( private http: HttpClient) { }

  getOrganismos(): Observable<OrganismoRespuesta>{
    return this.http.get<OrganismoRespuesta>(`${this.baseUrl}/app/consulta/consultar`);
  }

}
