import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {GenericService} from '../../../@core/service/generic.service';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {faPlus, faRedo, faSearch, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-search-generic',
    templateUrl: './search-generic.component.html',
    styleUrls: ['./search-generic.component.scss']
})

export class SearchGenericComponent extends GenericService<any> implements OnInit {
    @Input() searchField = [];
    @Input() searchFieldCondition = [];
    @Input() searchFieldValues = [];
    @Input() searchModel = new Array<SearchGenericModel>();
    @Input() showReset = true;

    @ViewChild('genericFormSearch', {static: false}) genericFormSearch: NgForm;

    @Output('emitDataModel')
    emitDataModel: EventEmitter<any> = new EventEmitter<any>();

    testValue = [];
    testCondition = [];

    plusIcon = faPlus;
    searchIcon = faSearch;
    resetIcon = faRedo;
    trashIcon = faTrashAlt;



    constructor(private notification: ToastrService,
                http: HttpClient, protected router: Router) {
        super(http, null, router);
    }

    ngOnInit(): void {
        this.addNewRow();
    }

    searchByField(): void {
        if (this.genericFormSearch.valid) {
            var reportModel = [];
            var a = this.checkIfArrayUnique(this.searchModel);
            if (a.length >= this.searchModel.length) {

                for (let i = 0; i < this.searchModel.length; i++) {
                    if (this.searchModel[i].fieldName.dataType.toUpperCase() === 'DATE') {

                    }
                    reportModel.push({
                        field: this.searchModel[i].fieldName.code, operator: this.searchModel[i].fieldCondition,
                        value: this.searchModel[i].fieldValue,
                        toValue: this.searchModel[i].dateValue
                    });
                }
                this.emitDataModel.emit(reportModel);
            } else {
                this.notification.error('Error', 'Please select other Fields Or Conditions');
            }
        } else {
            this.notification.error('Error', 'Please fill or select value.');
        }


    }

    resetField() {
        this.searchModel = [];
        this.emitDataModel.emit([]);
        this.addNewRow();
    }


    checkIfArrayUnique(arrayData) {
        var a = arrayData.concat();
        for (var i = 0; i < a.length; i++) {
            for (var j = i + 1; j < a.length; j++) {
                if ((a[i].fieldName.code == a[j].fieldName.code) && (a[i].fieldCondition == a[j].fieldCondition)) {
                    a.splice(j--, 1);
                }
            }
        }
        return a;
    }


    addNewRow() {
        var dtl = new SearchGenericModel();
        dtl.searchField = this.searchField;
        dtl.searchFieldCondition = this.searchFieldCondition;
        dtl.searchFieldValues = this.searchFieldValues;
        dtl.fieldCondition = 'sw';
        console.log(dtl);

        this.searchModel.push(dtl);

    }

    changeField(val, i): void {

        this.searchModel[i].dateValue = null;
        this.searchModel[i].fieldValue = null;
        this.searchModel[i].fieldCondition = null;
        this.searchModel[i].searchFieldValues = null;
        this.searchModel[i].searchFieldCondition = null;
        this.testCondition[i] = null;
        this.testValue[i] = null;
        if (val.dataType == 'String') {
            this.searchModel[i].fieldCondition = 'sw';
        }

        this.searchModel[i].searchFieldCondition = val.conditions;
        this.searchModel[i].searchFieldValues = val.selectValues;
        this.testCondition[i] = val.dataType;

        console.log(this.searchModel[i].searchFieldCondition);
        // if(this.searchModel[i].fieldName.code == 'pickUpTime'){
        //     this.searchModel[i].fieldValue =  null;
        //     this.searchModel[i].dateValue =  null;
        // }
    }

    removeRow(i) {
        this.searchModel.splice(i, 1);
        if (this.searchModel.length == 0) {
            this.addNewRow();
        }
    }

    changeCondition(val, i: number) {
        this.testValue[i] = val;
        if (this.searchModel[i].fieldName.code == 'pickUpTime') {
            this.searchModel[i].fieldValue = null;
            this.searchModel[i].dateValue = null;
        }
    }

    formatDate(i) {

        if (this.searchModel[i].fromValue) {
            this.searchModel[i].fieldValue = super.formattedDate(this.searchModel[i].fromValue);
        }
        if (this.searchModel[i].toValue) {
            this.searchModel[i].dateValue = super.formattedDate(this.searchModel[i].toValue);
        }

    }

    ngOnChanges() {
        if (this.searchField) {
            if (this.searchField.length > 0) {
                this.searchField = this.searchField;
            }
        }

    }
}


export class SearchGenericModel {
    searchField = [];
    searchFieldCondition = [];
    searchFieldValues = [];
    fieldName;
    fieldCondition;
    fieldValue;
    fromValue;
    toValue;
    dateValue;
}

