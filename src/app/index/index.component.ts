/****************************************************/
// Filename: index.components.ts
// Created: Marcelo Bosso
// Change history:
// 11.01.2019 / Marcelo Bosso
/****************************************************/
// Summary: - Welcome screen
/****************************************************/


import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


import { Tela1Component } from '../tela1/tela1.component';
import { Tela2Component } from '../tela2/tela2.component';


@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {

    public id: number;
    headers: string[];
    config: any;
    showSection = false;
    subtitle: string = "Bem vindo ao sistema(protótipo) de alunos!";
    componentRef: any;

    @ViewChild('telacontainer', { read: ViewContainerRef, static: false}) entry: ViewContainerRef;
    constructor(
        private titleService: Title,
        private resolver: ComponentFactoryResolver
    ) { }

    ngOnInit() {
        this.setTitle(`Alumni Ilumni`);
    }

    createComponent(dest) {
        //this.entry.clear();
        if (dest == 'home') {
            this.subtitle = "Bem vindo ao sistema(protótipo) de alunos!";
            this.showSection = false;
            this.componentRef.destroy();
        }
        else if (dest == 'page1') {
            this.entry.clear();
            this.subtitle = "Alunos";
            const factory = this.resolver.resolveComponentFactory(Tela1Component);
            this.componentRef = this.entry.createComponent(factory);
            this.showSection = true;
        }
        else if (dest = 'page2') {
            this.entry.clear();
            this.subtitle = "Professores";
            const factory = this.resolver.resolveComponentFactory(Tela2Component);
            this.componentRef = this.entry.createComponent(factory);
            this.showSection = true;
        }

    }

    setTitle( newTitle: string) {
        this.titleService.setTitle( newTitle );
    }

}
