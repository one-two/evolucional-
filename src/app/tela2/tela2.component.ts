/****************************************************/
// Filename: tela2.components.ts
// Created: Marcelo Bosso
// Change history:
// 12.01.2019 / Marcelo Bosso
/****************************************************/
// Summary: - 
// ## Parte 1
// 	- Criar combo filtro a base dos JSONs 'degrees','classes'
// 	- Popular a tela utilizando o JSON relationships. Nessa tela será necessária a visualização os seguintes itens:nome do professor, nome da materia, todos os nomes dos degrees relacionados, todos os nomes de classe de cada class relacionada ao degree
// 	- Criar botão que ao clicar, trás os students relacionados ao degree em questão
// ## Parte 2 
// 	- Criar formulário para gerar um novo registro do relationships. O registro deverá ser passivel as operações da parte 1 da tela 2
/****************************************************/

import { Component, OnInit } from '@angular/core';

import Students from '../../jsondb/students.json';
import Classes from '../../jsondb/classes.json';
import Degrees from '../../jsondb/degrees.json';
import Relationships from '../../jsondb/relationships.json';
import Matters from '../../jsondb/matters.json';
import Teachers from '../../jsondb/teachers.json';
import { Student } from '../models/Student.js';
import { Classe } from '../models/Classe.js';
import { Degree } from '../models/Degree.js';
import { Relationship } from '../models/Relationship.js';
import { Teacher } from '../models/Teacher.js';
import { Matter } from '../models/Matter.js';

@Component({
  selector: 'app-tela2',
  templateUrl: './tela2.component.html',
  styleUrls: ['./tela2.component.css']
})
export class Tela2Component implements OnInit {
  students: Student[];
  classes: Classe[];
  degrees: Degree[];
  relationships: Relationship[];
  teachers: Teacher[];
  matters: Matter[];
  studentLen: number;
  degreeLen: number;
  filterDeg: number = -1;
  filterClas: number = -1;
  showAddRel: boolean = false;
  errorAddRelation: boolean = false;
  successAddRelation: boolean = false;
  errMsg = "";
  newRel: {
    "id": number,
    matter: string,
    name: string,
    degree : number,
    class: number
  };

  constructor() { }

  ngOnInit() {
    this.relationships = JSON.parse(JSON.stringify(Relationships));
    this.relationships = Relationships.sort((x,i) => {if(x.id < i.id) return -1;});
    this.teachers = Teachers.sort((x,i) => {if(x.id < i.id) return -1;});
    this.matters = Matters.sort((x,i) => {if(x.id < i.id) return -1;});
    this.students = Students.sort((x,i) => {if(x.id < i.id) return -1;});
    this.classes = Classes.classes.sort((x,i) => {if(x.id < i.id) return -1;});
    this.degrees = Degrees.sort((x,i) => {if(x.id < i.id) return -1;});
    this.studentLen = this.students.length;
    this.degreeLen = this.degrees.length;

    this.updateValues();
  }

  updateValues() {
    this.newRel = {
      "id": 0,
      matter: "",
      name: "",
      degree : -1,
      class : -1
    }
  }

  
  filterDegree(deg: number) {
    this.filterDeg = deg;
  }

  filterClass(cla: number) {
    this.filterClas = cla;
  }

  showRelation(deg: any[]) {
    if (this.filterDeg == -1 && this.filterClas == -1) return true;
    for(let i = 0; i < deg.length; i++) {
      if ((deg[i].degreeId == this.filterDeg) || this.filterDeg == -1) {
        if (this.filterClas == -1) return true;
        else {
          for(let c = 0; c < deg[i].classes.length; c++) {
            if (deg[i].classes[c].classId == this.filterClas) return true;
          }
        }
      }
    }
    return false;
  }

  showStudents(profid: number, degid: number, classid: number, di: number, ci: number) {
    let elem = document.getElementById(''+profid+di+ci);
    if (elem.innerHTML != "") {
      elem.innerHTML = "";
      return;
    }
    let classStudents = this.students.filter((st) => {
      if(st.degreeId == degid && st.classId == classid) return true;
    })

    classStudents.forEach((cs) => {
      var li = document.createElement('li');
      
      elem.appendChild(li);
      if (classStudents.length == 0) {
        li.innerHTML=li.innerHTML + "Sala vazia";
      } else {
        li.innerHTML=li.innerHTML + cs.name;
      }
    })

    return;
  }

  addRelation() {
    if (this.newRel.name == "" || this.newRel.matter == "" ) {
      this.errorAddRelation = true;
      this.errMsg = "Campo vazio inválido";
      setTimeout(() => {
        this.errorAddRelation = false;
      }, 3000)
      return;
    } 
    if (this.newRel.degree == -1 || this.newRel.class == -1 ) {
      this.errorAddRelation = true;
      this.errMsg = "Selecione uma degree e classe";
      setTimeout(() => {
        this.errorAddRelation = false;
      }, 3000)
      return;
    } 
    
    let degId = +this.newRel.degree;
    let clId = +this.newRel.class;

    let tId = -1;
    this.teachers.forEach((t) => {
      if (t.name == this.newRel.name) tId = t.id;
    })
    if (tId == -1) tId = this.teachers.length+1;

    let mId = -1;
    this.matters.forEach((m) => {
      if (m.name == this.newRel.matter) mId = m.id;
    })
    if (mId == -1) mId = this.matters.length+1;
    
    let successFind = 0;
    for(let i = 0; i < this.relationships.length; i++) {
      if (this.relationships[i].teacherId == tId && this.relationships[i].matterId == mId) {
        for(let d = 0; d < this.relationships[i].degrees.length; d++) {
          if (this.relationships[i].degrees[d].degreeId == degId) {
            for(let c =0; c < this.relationships[i].degrees[d].classes.length; c++) {
              if (this.relationships[i].degrees[d].classes[c].classId == clId) {
                this.errorAddRelation = true;
                this.errMsg = "Relacionamento Existente";
                return;
              }
            }
            this.relationships[i].degrees[d].classes.push({"classId" : clId});
            successFind = 1;
          }
        }
        if (successFind == 0){
          this.relationships[i].degrees.push({
            "degreeId": this.relationships[i].degrees.length+1,
            "classes" : [{"classId":clId}]
          })
          successFind = 1;
        }
      } 
    }
    if (successFind == 0) {
      this.relationships.push({
        "id" : this.relationships.length+1,
        "teacherId" : tId,
        "matterId" : mId,
        "degrees" : [{
          "degreeId" : degId,
          classes : [{
            "classId" : clId
          }]
        }]
      })
      this.teachers.push({
        id : tId,
        name : this.newRel.name
      });
      this.matters.push({
        id : mId,
        name : this.newRel.matter
      });
    }

    this.showAddRel =false;
    this.successAddRelation = true;
    setTimeout(() => {
      this.successAddRelation = false;
    }, 2000)
    this.updateValues();
  }

}
