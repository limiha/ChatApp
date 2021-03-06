import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupsService } from '../groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '../models/group.model';
import { ToastrService } from 'ngx-toastr';
import { DismissGroupComponent } from '../dismiss-group/dismiss-group.component';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {

  group: Group;

  id: number;
  onDismissing: boolean = false;

  @ViewChild(DismissGroupComponent) dismiss;
  
  constructor(
    public groupService: GroupsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    this.id = this.route.snapshot.params['id'];
    this.groupService.byId(this.id).subscribe(data => {
      this.group = data;
    });
  }

  listAll() {
    this.router.navigate(['']);
  }

  join() {
    this.groupService.join(this.id).subscribe(res => {
      this.getData();
      this.toastrService.success('accession was successfully!', 'Joined!', { closeButton: true, progressBar: true, extendedTimeOut: 2000, timeOut: 2000 });
    }, errors => console.log(errors));
  }

  back() {
    window.history.back();
  }

  exit() {
    this.groupService.exit(this.id).subscribe(res => {
      this.getData();
      this.toastrService.error('Exit was successfully!', 'Exit!', { closeButton: true, progressBar: true, extendedTimeOut: 2000, timeOut: 2000 });
    });
  }

  edit() {
    this.router.navigate(['groups/edit', this.id]); 
  }

  dismissing($event) {
    this.onDismissing = $event;
    if(this.onDismissing) {
      this.groupService.dismiss(this.id).subscribe(() => {
        this.router.navigate(['']);
        this.toastrService.error("Deleted!", "The group was deleted successful.");
      }, errors => console.log(errors));
    }
  }

  onDismiss() {
    this.onDismissing = true;
  }
}
