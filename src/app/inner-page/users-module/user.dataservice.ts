import { Injectable } from "@angular/core";
import { BehaviorSubject,  first, } from "rxjs";
// import { IproposalList } from "src/app/_common/Interfaces/Individuals-proposals/Ic.interface";

@Injectable({
    providedIn: 'root'
})

export class UserDataService {
    
    constructor() { }

    private loaderSub = new BehaviorSubject<boolean>(false);
    private ProposalType = new BehaviorSubject<number>(0);

    private proposalRouteData = new BehaviorSubject<Partial<any>>({});
    private proposalEncodedData = new BehaviorSubject<Partial<any>>({});
   
  
    readonly loader$ = this.loaderSub.asObservable();
    readonly proposalRouteData$ = this.proposalRouteData.asObservable().pipe(first());
    readonly proposalEncodedData$ = this.proposalEncodedData.asObservable().pipe(first());

    setLoaderFlag(flag:boolean){ this.loaderSub.next(flag) };
    SetProposalType(data: number) { this.ProposalType.next(data) };
    
    SetProposalRouteData(data: Partial<any>) { this.proposalRouteData.next(data as Partial<any>) };
    SetProposalEncodedData(data: Partial<any>) { this.proposalEncodedData.next(data) };
    
    ClearProposalRouteData() { this.proposalRouteData.next({}) }
    ClearProposalEncodedData() { this.proposalEncodedData.next({}) }


}



