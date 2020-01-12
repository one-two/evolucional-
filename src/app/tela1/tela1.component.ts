/****************************************************/
// Filename: tela1.components.ts
// Created: Marcelo Bosso
// Change history:
// 11.01.2019 / Marcelo Bosso
/****************************************************/
// Summary: - 
// ## Parte 1
// 	- Criar combo de filtro a base dos JSONs 'degrees','classes'
// 	- Popular a tela com as informações de students e suas relações (trazendo nome do degree, nome do class)
// 	- Dar opção para editar o nome dos students e a class atribuida ao mesmo
// 	- Filtrar conforme combo sempre levando em consideração os dados pós-alteração
// ## Parte 2
// 	- Criar botão que gera mais 300 students e os distribuí entre os degrees e classes
// 	- Gerar gráfico com a quantidade de students por degree
// 	Nota: A cada clique no botão serão gerados + 300 students e o gráfico deverá ser atualizado
/****************************************************/

import { Component, OnInit, ɵbypassSanitizationTrustStyle } from '@angular/core';

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

@Component({
  selector: 'app-tela1',
  templateUrl: './tela1.component.html',
  styleUrls: ['./tela1.component.css']
})
export class Tela1Component implements OnInit {
  classLen: number = 0;
  degreeLen: number = 0;
  studentLen: number = 0;
  students: Student[];
  classes: Classe[];
  degrees: Degree[];
  relationships: Relationship[];
  filterDeg: number = -1;
  filterClas: number = -1;
  degreeDist: number[] = [];
  degreeDistShow: number[] = [];
  showDist: boolean = false;


  edit: boolean[] = [];

  constructor() { 

  }

  ngOnInit() {
    this.students = JSON.parse(JSON.stringify(Students));
    this.updateValues();
    this.calculateDegreeDistribution(this.degrees, this.students);
    let bars = document.getElementById("chartDiv");
    bars.style.display = "none";
  }

  updateValues() {
    this.classes = Classes.classes;
    this.degrees = Degrees;
    this.relationships = Relationships;
    this.studentLen = this.students.length;
    this.degreeLen = this.degrees.length;
    for(let i =0; i < this.studentLen; i++) this.edit[i] = false;
  }

  openEdit(i: number) {
    this.edit[i] = !this.edit[i];
  }

  showHideDist() {
    this.showDist = !this.showDist;
    let bars = document.getElementById("chartDiv");
    if (this.showDist) {
      this.calculateDegreeDistribution(this.degrees, this.students);
      bars.style.display = "block";
      let elems = document.getElementsByName("Bar");
      if (elems.length == 0) return;
      for(let i = 0; i < elems.length; i++) {
        let dg = this.degrees.find(x => x.name == elems[i].innerText.split(":")[0]);
        let tid = dg.id-1;
        this.degreeDistShow[i] = this.degreeDist[tid];
        elems[i].style.width = ''+ (this.degreeDist[tid]/this.students.length)*100 + '%';
      }
    } else {
      bars.style.display = "none";
    }
  }

  filterDegree(deg: number) {
    this.filterDeg = deg;
  }

  filterClass(cla: number) {
    this.filterClas = cla;
  }

  showStudent(deg:number, cla: number) {
    if (this.filterClas == -1 && this.filterDeg == -1) return true;
    else
    {
      if (
        (deg == this.filterDeg && this.filterClas == -1)
        || (cla == this.filterClas && this.filterDeg == -1)
        ) return true;
      if (deg == this.filterDeg && cla == this.filterClas) return true;
      return false;
    }
  }

  updateStudent(i: number) {
    Students[i] = JSON.parse(JSON.stringify(this.students[i]));
  }

  rollbackStudent(i:number) {
    this.students[i] = JSON.parse(JSON.stringify(Students[i]));
  }

  calculateDegreeDistribution(deg: Degree[], stu: Student[]) {
    let totalStudents = this.studentLen;
    for(let i = 0; i < this.degreeLen; i++) this.degreeDist[i] = 0;
    this.students.forEach((st) => {
      this.degreeDist[st.degreeId-1]++;
    })
  }

  add300Students() {
    for(let i = 0; i < 300; i++) {
      let newra = 0;
      let raNOK = true;
      while(raNOK) {
        raNOK = false;
        newra = Math.floor(Math.random()*1000000);
        if (this.students.find(st => st.ra == newra)) raNOK = true;
      }
      this.students.push({
        id: this.students.length,
        classId: this.classes[Math.floor(Math.random() * this.classes.length)].id,
        degreeId: this.degrees[Math.floor(Math.random() * this.degrees.length)].id,
        name: "Nome do aluno " + this.students.length,
        ra: newra,
      })
      Students[i] = JSON.parse(JSON.stringify(this.students[i]));
    }
    this.updateValues();
    this.showHideDist();
  }

}
