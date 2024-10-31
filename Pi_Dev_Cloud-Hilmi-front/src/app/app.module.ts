import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { TemplateAllFrontComponent } from './components/template-all-front/template-all-front.component';
import { TemplateAllBackComponent } from './components/template-all-back/template-all-back.component';
import { NavBarDashboardComponent } from './components/nav-bar-dashboard/nav-bar-dashboard.component';
import { SideBarDashboardComponent } from './components/side-bar-dashboard/side-bar-dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EvenementComponent } from './components/evenement/evenement.component';
import { EvenementDetailsComponent } from './components/evenement-details/evenement-details.component';
import { CreateReservComponent } from './components/create-reserv/create-reserv.component';
import { CreateAvisComponent } from './components/create-avis/create-avis.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { MeetingRoomComponent } from './components/meeting-room/meeting-room.component';
import { AllArticleDashboardComponent } from './components/all-article-dashboard/all-article-dashboard.component';
import { OptionsListComponent } from './components/options-list/options-list.component';
import { OptionDetailsComponent } from './components/option-details/option-details.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { CreateOptionComponent } from './components/create-option/create-option.component';
import { CreateUniteEnseignementComponent } from './components/create-unite-enseignement/create-unite-enseignement.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { StatReservationComponent } from './components/stat-reservation/stat-reservation.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UpdateArticleComponent } from './components/update-article/update-article.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { OptionsListDashboardComponent } from './components/options-list-dashboard/options-list-dashboard.component';
import { UpdateOptionComponent } from './components/update-option/update-option.component';
import { UpdateUeComponent } from './components/update-ue/update-ue.component';
import { UeListComponent } from './components/ue-list/ue-list.component';
import { CreateSubjectComponent } from './components/create-subject/create-subject.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { UpdateSubjectComponent } from './components/update-subject/update-subject.component';
import { CreateServiceComponent } from './components/create-service/create-service.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { UpdateServiceComponent } from './components/update-service/update-service.component';
import { AddRessourceComponent } from './components/add-ressource/add-ressource.component';
import { RessourceListComponent } from './components/ressource-list/ressource-list.component';
import { CalculeScoreComponent } from './components/calcule-score/calcule-score.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { UpdateEventComponent } from './components/update-event/update-event.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ForgotPassword2Component } from './components/forgot-password2/forgot-password2.component';
import { ResetPasswordComponentComponent } from './components/reset-password-component/reset-password-component.component';
import { VerifpasswordComponent } from './components/verifpassword/verifpassword.component';
import { StatRoleComponentComponent } from './components/stat-role-component/stat-role-component.component';
import { StatArticleComponent } from './components/stat-article/stat-article.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavBarComponent,
    ArticlesComponent,
    ArticleDetailsComponent,
    RegisterComponent,
    LoginComponent,
    CoursesComponent,
    CourseDetailsComponent,
    TemplateAllFrontComponent,
    TemplateAllBackComponent,
    SideBarDashboardComponent,
    NavBarDashboardComponent,
    EvenementComponent,
    EvenementDetailsComponent,
    CreateReservComponent,
    CreateAvisComponent,
    CreateArticleComponent,
    MeetingRoomComponent,
    AllArticleDashboardComponent,
    OptionsListComponent,
    OptionDetailsComponent,
    ChatbotComponent,
    CreateOptionComponent,
    CreateUniteEnseignementComponent,
    CreateEventComponent,
    StatReservationComponent,
    ReservationsComponent,
    UserListComponent,
    UpdateArticleComponent,
    UpdateUserComponent,
    OptionsListDashboardComponent,
    UpdateOptionComponent,
    UpdateUeComponent,
    UeListComponent,
    CreateSubjectComponent,
    SubjectListComponent,
    UpdateSubjectComponent,
    CreateServiceComponent,
    ServiceListComponent,
    UpdateServiceComponent,
    AddRessourceComponent,
    RessourceListComponent,
    CalculeScoreComponent,
    EventListComponent,
    UpdateEventComponent,
    UserProfileComponent,
    ForgotPassword2Component,
    ResetPasswordComponentComponent,
    VerifpasswordComponent,
    StatRoleComponentComponent,
    StatArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
