import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
    
      console.error('[ErrorInterceptor]', error);

      let message = 'A server error occurred. Please try again later.';
      if (error.status === 0) {
        message = 'The server is unavailable.';
      } else if (error.status === 404) {
        message = 'The resource was not found.';
      } else if (error.status === 500) {
        message = 'Internal server error.';
      }

      alert(message);

      return throwError(() => error);
    })
  );
};
