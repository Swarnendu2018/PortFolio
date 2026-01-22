import { Component } from '@angular/core';

@Component({
  selector: 'app-socail-link',
  templateUrl: './socail-link.component.html',
  styleUrls: ['./socail-link.component.css']
})
export class SocailLinkComponent {
  socialLinks = [
    {
      url: 'https://github.com/Swarnendu2018',
      icon: 'bi-github',
      colorClass: 'text-light'
    },
    {
      url: 'https://www.linkedin.com/in/swarnendu-gharami-547554139/',
      icon: 'bi-linkedin',
      colorClass: 'text-primary'
    },
    {
      url: 'https://mail.google.com/mail/?view=cm&to=swarnenduriku2014@gmail.com',
      icon: 'bi-google',
      colorClass: ''
    }
  ];
}
