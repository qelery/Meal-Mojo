import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../ngrx/actions/auth.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent implements OnInit {

  constructor(private readonly store: Store, private readonly router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.logoutUser());
    this.router.navigate(['']);
  }
}
