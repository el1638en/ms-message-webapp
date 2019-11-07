import {
    MatNativeDateModule, MatDatepickerModule,
    MatIconModule, MatButtonModule, MatCheckboxModule,
    MatToolbarModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatRadioModule, MatListModule, MatSnackBarModule,
    MatTableModule, MatPaginatorModule, MatDialogModule, MatDateFormats,
    MAT_DATE_FORMATS, MAT_DATE_LOCALE
} from '@angular/material';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { NgModule } from '@angular/core';

// Configuration du format de la datepicker
const DATE_FORMAT = 'DD/MM/YYYY';
export const MY_FORMAT: MatDateFormats = {
    parse: {
        dateInput: DATE_FORMAT,
    },
    display: {
        dateInput: DATE_FORMAT,
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: DATE_FORMAT,
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

const modules = [
    MatButtonModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatRadioModule
];

@NgModule({
    imports: [...modules],
    exports: [...modules],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT },
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }],
}) export class MaterialModule { }
