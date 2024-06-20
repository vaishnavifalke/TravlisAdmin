import { Component, OnInit } from '@angular/core';
import { AdmCountryMaster, AdmStateMaster, AdmCityMaster } from '../../Class';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WebService } from '../../Service';

@Component({
  selector: 'app-add-adm-city-master',
  templateUrl: './add-adm-city-master.component.html',
  styleUrls: ['./add-adm-city-master.component.scss']
})
export class AddAdmCityMasterComponent implements OnInit {
  admCityMaster: AdmCityMaster;
  admCountryMaster: AdmCountryMaster;
  admStateMaster: AdmStateMaster;
  AdmCountryMasterList: any[] = [];
  AdmStateMasterList: any[] = [];

  constructor(private router: Router, private http: HttpClient, private service: WebService) {
    this.admCityMaster = new AdmCityMaster();
    this.admCityMaster.admCountryMaster = new AdmCountryMaster();
    this.admCityMaster.admStateMaster = new AdmStateMaster();
    this.admCountryMaster = new AdmCountryMaster();
    this.admStateMaster = new AdmStateMaster();
  }

  ngOnInit(): void {
    this.GetAllAdmCountryMaster();
  }

  OnSubmit() {
    console.log("admCityMaster", this.admCityMaster);
    this.admCityMaster.Status = "Active";
    this.service.AddAdmCityMaster(this.admCityMaster).subscribe((result) => {
      if (result > 0) {
        alert('Saved Successfully.');
      } else {
        alert("Something went wrong! Please try again.");
      }
    });
  }

  GetAllAdmCountryMaster() {
    this.service.GetAllAdmCountryMaster().subscribe((result) => {
      this.AdmCountryMasterList = result;
      console.log("AdmCountryMasterList", this.AdmCountryMasterList);
    });
  }

  AdmCountryMasterChange(event) {
    const selectedCountryId = event.target.value;
    this.admCityMaster.admCountryMaster.AdmCountryMasterId = selectedCountryId;
    this.GetAllAdmStateMaster(selectedCountryId);
  }

  GetAllAdmStateMaster(countryId: number) {
    this.service.GetAllAdmStateMaster().subscribe((result) => {
      this.AdmStateMasterList = result.filter(state => state.admCountryMaster.AdmCountryMasterId === countryId);
      console.log("AdmStateMasterList", this.AdmStateMasterList);
    });
  }
}
