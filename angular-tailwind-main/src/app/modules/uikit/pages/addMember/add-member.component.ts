import { Component } from '@angular/core';
import { UserServicesService } from 'src/app/core/services/user-services.service';  
import { User } from '../table/model/user.model';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-member',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.css'
})

export class AddMemberComponent {
   
  constructor(private userService: UserServicesService) {}


  addMember(form: NgForm) {
    console.log('Form Values:', form.value); // Debug: Log form values
    if (form.valid) {
      this.userService.addUser(form.value).subscribe({
        next: (res) => {
          console.log('✅ User added:', res);
          form.resetForm({ role: 'user' }); // reset with default
        },
        error: (err) => {
          console.error('❌ Error while adding user:', err);
        }
      });
    }
  }


}

