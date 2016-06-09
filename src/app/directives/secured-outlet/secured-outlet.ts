/**
 * Created by Murhaf on 5/20/2016.
 */
import {Directive, Attribute, DynamicComponentLoader, ViewContainerRef} from '@angular/core';
import {Router, RouterOutlet, ComponentInstruction} from '@angular/router-deprecated';
import {IAuthService} from "../../service";

@Directive({selector: 'secure-outlet'})
export class SecureRouterOutlet extends RouterOutlet {
  login:string;
  unauthorized:string;

  private parentRouter: Router;
  private authService: IAuthService;

  constructor(_viewContainerRef: ViewContainerRef, _loader: DynamicComponentLoader,
              _parentRouter: Router, @Attribute('name') nameAttr: string,
              authService:IAuthService,
              @Attribute('login') signinAttr: string,
              @Attribute('unauthorized') unauthorizedAttr: string) {
    super(_viewContainerRef, _loader, _parentRouter, nameAttr);
    this.parentRouter = _parentRouter;
    this.authService = authService;
    this.login = signinAttr;
    this.unauthorized = unauthorizedAttr;
  }

  activate(nextInstruction: ComponentInstruction): Promise<any> {
    var roles = <string[]>nextInstruction.routeData.data['roles'];
    // no roles defined means route has no restrictions so activate
    if (roles == null) {
      return super.activate(nextInstruction);
    }
    // if user isn't authenticated then redirect to sign-in route
    // pass the URL to this route for redirecting back after auth
    // TODO: include querystring parameters too?
    if (!this.authService.isAuthenticated()) {
      var ins = this.parentRouter.generate([this.login,{url:location.pathname}]);
      return super.activate(ins.component);
    }

    // if no specific roles are required *or* the user has one of the
    // roles required then the route can be activated
    if (roles.length == 0 || this.authService.hasRole(roles)) {
      return super.activate(nextInstruction);
    }

    // user has insufficient role permissions so redirect to denied
    var ins = this.parentRouter.generate([this.unauthorized]);
    return super.activate(ins.component);
  }

  reuse(nextInstruction: ComponentInstruction): Promise<any> {
    return super.reuse(nextInstruction);
  }
}
