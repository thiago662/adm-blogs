import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  blogDeNotas: any = 'blog-de-notas';
  brainLogs: any = 'brain-logs';

  constructor() { }
  
  getBlogUrl(blog: any) {
    switch (blog) {
      case this.blogDeNotas:
        return environment.blogDeNotasUrl;
        break;
      case this.brainLogs:
        return environment.brainLogsUrl;
        break;
    
      default:
        return '';
        break;
    }
  }
}
