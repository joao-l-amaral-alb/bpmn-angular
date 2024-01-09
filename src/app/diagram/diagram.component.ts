import { AfterContentInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { MenuComponent } from './menu/menu.component';
import { BpmnService } from '../shared/services/bpmn.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-diagram',
  standalone: true,
  imports: [
    MenuComponent,
    HttpClientModule
  ],
  templateUrl: './diagram.component.html',
  styleUrl: './diagram.component.css'
})
export class DiagramComponent implements OnInit, AfterContentInit{

  public modeler!: BpmnModeler
  private panel: any;

  @ViewChild('ref', { static: true }) private el!: ElementRef;
  @ViewChild('properties', { static: true }) private propertiesPanel!: ElementRef;

  constructor(
    private bpmnService: BpmnService
  ){
  }

  ngOnInit(): void{
    this.modeler = this.bpmnService.getModeler();
  }
  
  ngAfterContentInit(): void{
    this.modeler.attachTo(this.el.nativeElement);
    this.panel = this.modeler.get('propertiesPanel');
    this.panel.attachTo(this.propertiesPanel.nativeElement);
    this.bpmnService.setModeler(this.modeler);
  }

}
