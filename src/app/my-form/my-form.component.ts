import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';

interface FormData {
  name: string;
  age: number |null;
  email: string;
  phone: string;
  villageName: string;
  playerType: string;
  photo?: File; // Optional property for the photo file
}
@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent {
  formData: FormData = {
    name: '',
    age: null,
    email: '',
    phone: '',
    villageName: '',
    playerType: ''
  };
  imagePreview: string | ArrayBuffer = '';
  constructor(private apisService: ApiService, private toastr: ToastrService) { }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.formData.photo = file;
    // Read the file and display preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  }

  submitForm() {
    const formData = new FormData();

    // Append form data
    formData.append('name', this.formData.name);
    formData.append('age', String(this.formData.age));
    formData.append('email', this.formData.email);
    formData.append('phone', this.formData.phone);
    formData.append('villageName', this.formData.villageName);
    formData.append('playerType', this.formData.playerType);
    if (this.formData.photo) {
      formData.append('photo', this.formData.photo);
    }

    // Submit the form data
    this.apisService.submitFormData(formData).subscribe(
      response => {
        console.log('Form submitted successfully:', response);
        // Handle success response
        this.toastr.success('Form submitted successfully!', 'Success');
        // Reset the form
        this.resetForm();
      },
      error => {
        console.error('Error submitting form:', error);
        // Handle error response
        this.toastr.error('Error submitting form. Please try again.', 'Error');
      }
    );
  }

  resetForm() {
    this.formData = {
      name: '',
      age: 0,
      email: '',
      phone: '',
      villageName: '',
      playerType: ''
    };
    this.imagePreview = ''; // Reset image preview
  }
}
