import { ListsComponent } from "./lists/lists.component";
import { MemberDetailComponent } from "./member/member-detail/member-detail.component";
import { MemberListComponent } from "./member/member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { RegisterComponent } from "./register/register.component";


export * from "./lists/lists.component";
export * from "./member/member-detail/member-detail.component";
export * from "./member/member-list/member-list.component";
export * from "./messages/messages.component";

export const COMPONENTS = [
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent
]