import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

interface FormData {
  name: string;
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
    phone: '',
    villageName: '',
    playerType: ''
  };
  imagePreview: string | ArrayBuffer = '';
  errorMsg = '';
  submitted: boolean = false;
  submitting: boolean = false; // Flag to track submission status

  constructor(private apisService: ApiService, private router: Router) { }

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
    if (!this.submitting) { // Check if not already submitting
      this.submitting = true; // Set submitting flag
      const formData = new FormData();

      // Append form data
      formData.append('name', this.formData.name);
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
          this.submitted = true;
          // Reset the form
          this.resetForm();
        },
        error => {
          console.error('Error submitting form:', error);
          // Handle error response
          this.errorMsg = error?.error?.error;
          this.submitting = false; // Reset submitting flag on error
        }
      );
    }
  }

  resetForm() {
    this.formData = {
      name: '',
      phone: '',
      villageName: '',
      playerType: ''
    };
    this.imagePreview = ''; // Reset image preview
    this.errorMsg = '';
    this.submitting = false; // Reset submitting flag
  }

  reloadPage() {
    window.location.reload();
  }
}
