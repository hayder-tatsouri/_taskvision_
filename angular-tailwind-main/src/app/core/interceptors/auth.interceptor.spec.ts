import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let httpHandler: HttpHandler;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['refreshToken']);
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        { provide: AuthService, useValue: spy }
      ]
    });

    interceptor = TestBed.inject(AuthInterceptor);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    httpHandler = {
      handle: (req: HttpRequest<any>) => of({} as HttpEvent<any>)
    };
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should attach token if exists', () => {
    localStorage.setItem('token', 'test-token');
    const req = new HttpRequest('GET', '/test');
    interceptor.intercept(req, httpHandler).subscribe();
    const headers = req.headers.get('Authorization');
    expect(headers).toBe('Bearer test-token');
  });
});
