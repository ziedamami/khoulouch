import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MaillingService } from 'app/mailling.service';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    `]
})

export class ComponentsComponent implements OnInit {
    page = 4;
    page1 = 5;
    focus;
    focus1;
    focus2;
    date: {year: number, month: number};
    model: NgbDateStruct;
    submitted = false;
    success = false;
    mailForm :FormGroup
    mail:any[]
    name;
    email;
    message;
    constructor( private renderer : Renderer2,private mailservice:MaillingService,private formBuilder: FormBuilder) {
        this.mailForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            message: ['', Validators.required],
            
           
      
      
          });

          this.mailForm = new FormGroup({
            message: new FormControl({ value: '' }, Validators.compose([Validators.required])),
            name: new FormControl({ value: '' }, Validators.compose([Validators.required])),
            email: new FormControl({ value: '' }, Validators.compose([Validators.required])),
            
          });
    }
    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: {month: number}) {
        return date.month !== current.month;
    }

    ngOnInit() {
        let input_group_focus = document.getElementsByClassName('form-control');
        let input_group = document.getElementsByClassName('input-group');
        for (let i = 0; i < input_group.length; i++) {
            input_group[i].children[0].addEventListener('focus', function (){
                input_group[i].classList.add('input-group-focus');
            });
            input_group[i].children[0].addEventListener('blur', function (){
                input_group[i].classList.remove('input-group-focus');
            });
        }
       
    }
    scroll(id) {
        let el = document.getElementById(id);

       el.scrollIntoView();
   }
   onmailFormSubmit() {
    this.submitted = true;
    if (this.mailForm.invalid) {
      return;
    }
    this.success = true;

    this.mailservice.sendmail()
      .subscribe(res => {
      location.reload();
       // console.log(form)
      // alert('wait')
      }, (err) => {
        console.log(err);
      }
      );
  }
}
