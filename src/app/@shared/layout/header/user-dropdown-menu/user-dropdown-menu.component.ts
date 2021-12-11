import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CredentialsService } from '@app/auth';
import { AlterarSenhaComponent } from '@app/auth/alterar-senha/alterar-senha.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'app-user-dropdown-menu',
  templateUrl: './user-dropdown-menu.component.html',
  styleUrls: ['./user-dropdown-menu.component.scss'],
})
export class UserDropdownMenuComponent implements OnInit {
  @ViewChild('dropdownMenu', { static: false }) dropdownMenu: any;
  bsModalRef: BsModalRef;

  constructor(
    public authService: AuthenticationService,
    public credentialsService: CredentialsService,
    private modalService: BsModalService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hideDropdownMenu();
    }
  }

  ngOnInit() {}

  alterarSenha(): void {
    const initialState = {
      login: this.credentialsService.credentials.dadosUsuario.email,
    };

    this.bsModalRef = this.modalService.show(AlterarSenhaComponent, { initialState });
  }

  public toggleDropdownMenu() {
    if (this.dropdownMenu.nativeElement.classList.contains('show')) {
      this.hideDropdownMenu();
    } else {
      this.showDropdownMenu();
    }
  }

  public showDropdownMenu() {
    this.renderer.addClass(this.dropdownMenu.nativeElement, 'show');
  }

  public hideDropdownMenu() {
    this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show');
  }

  public logout() {
    this.credentialsService.setCredentials();
    this.authService.logout();
  }
}
