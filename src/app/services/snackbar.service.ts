import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class SnackBarService {

    constructor(private snackBar: MatSnackBar) {
    }

    openSnackBar(message: string, action: string = 'close') {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}
