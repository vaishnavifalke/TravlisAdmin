import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { WebService } from '../../Service';
import { AdmCountryMaster } from '../../Class';

@Component({
  selector: 'app-add-adm-country-master',
  templateUrl: './add-adm-country-master.component.html',
  styleUrls: ['./add-adm-country-master.component.scss']
})
export class AddAdmCountryMasterComponent {
  @ViewChild('AdmCountryMasterForm', { static: false }) form: NgForm;
  admCountryMaster: AdmCountryMaster = new AdmCountryMaster();

  constructor(private router: Router, private http: HttpClient, private service: WebService) { }

  OnSubmit() {
    if (this.form.valid) {
      console.log("admCountryMaster", this.admCountryMaster);
      this.service.AddAdmCountryMaster(this.admCountryMaster).subscribe((result) => {
        if (result > 0) {
          alert('Saved Successfully.');
          this.router.navigateByUrl('/Dashboard');
        } else {
          alert('Something went wrong! Please try again.');
        }
      }, (error) => {
        console.error('Error saving data', error);
        alert('An error occurred while saving data. Please try again.');
      });
      this.form.resetForm();
    }
  }
}
