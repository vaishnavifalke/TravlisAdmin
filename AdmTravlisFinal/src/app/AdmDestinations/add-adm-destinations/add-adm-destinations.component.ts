import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../../Service';
import { NgForm } from '@angular/forms';
import { AdmCountryMaster, AdmStateMaster, AdmDestinations, AdmCityMaster } from '../../Class';

@Component({
  selector: 'app-add-adm-destinations',
  templateUrl: './add-adm-destinations.component.html',
  styleUrls: ['./add-adm-destinations.component.scss']
})
export class AddAdmDestinationsComponent {
  @ViewChild('AdmDestinationsForm') form: NgForm;

  uploadResult: any;
  filesToUpload: Array<File>;
  selectedFileNames: string[] = [];

  admDestinations: AdmDestinations;
  admCountryMaster: AdmCountryMaster;
  admStateMaster: AdmStateMaster;
  AdmCountryMasterList: AdmCountryMaster[] = [];
  AdmStateMasterList: AdmStateMaster[] = [];
  AdmCityMasterList: AdmCityMaster[] = [];

  constructor(private router: Router,
    private http: HttpClient,
    private service: WebService) {
    this.admDestinations = new AdmDestinations();
    this.admDestinations.admCountryMaster = new AdmCountryMaster();
    this.admDestinations.admStateMaster = new AdmStateMaster();
    this.admDestinations.admCityMaster = new AdmCityMaster();

    this.admCountryMaster = new AdmCountryMaster();
    this.admStateMaster = new AdmStateMaster();

    this.GetAllAdmCountryMaster();
  }

  ngOnInit(): void {
    // Additional initialization if needed
  }

  OnSubmit() {
    console.log("admDestinations", this.admDestinations);
    this.admDestinations.Status = "Active";
    this.service.AddAdmDestinations(this.admDestinations).subscribe((result) => {
      if (result > 0) {
        alert('Saved Successfully.');
      } else {
        alert("Something went wrong! Please try again.");
      }
    });
  }

  GetAllAdmCountryMaster() {
    this.service.GetAllAdmCountryMaster().subscribe((result: AdmCountryMaster[]) => {
      this.AdmCountryMasterList = result;
      console.log("AdmCountryMasterList", this.AdmCountryMasterList);
    });
  }

  AdmCountryMasterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.admDestinations.admCountryMaster.AdmCountryMasterId = Number(target.value);
    this.GetAllAdmStateMaster();
  }

  GetAllAdmStateMaster() {
    this.service.GetAllAdmStateMaster().subscribe((result: AdmStateMaster[]) => {
      this.AdmStateMasterList = result.filter(state => 
        state.admCountryMaster.AdmCountryMasterId === this.admDestinations.admCountryMaster.AdmCountryMasterId);
      console.log("AdmStateMasterList", this.AdmStateMasterList);
    });
  }

  AdmStateMasterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.admDestinations.admStateMaster.AdmStateMasterId = Number(target.value);
    this.GetAllAdmCityMaster();
  }

  GetAllAdmCityMaster() {
    this.service.GetAllAdmCityMaster().subscribe((result: AdmCityMaster[]) => {
      this.AdmCityMasterList = result.filter(city => 
        city.admStateMaster.AdmStateMasterId === this.admDestinations.admStateMaster.AdmStateMasterId);
      console.log("AdmCityMasterList", this.AdmCityMasterList);
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.selectedFileNames = [];
    for (let i = 0; i < this.filesToUpload.length; i++) {
      this.selectedFileNames.push(this.filesToUpload[i].name);
      this.admDestinations.Photo = this.filesToUpload[i].name;
    }
  }
}
