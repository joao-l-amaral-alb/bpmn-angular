import { ElementRef, ViewChild } from '@angular/core';
import minimapModule from 'diagram-js-minimap';
import BpmnColorPickerModule from 'bpmn-js-color-picker';
import { Component } from '@angular/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from 'bpmn-js-properties-panel/dist';
import { MenuComponent } from './menu/menu.component';
import { BpmnService } from '../shared/services/bpmn.service';
import { SaveXMLResult } from 'bpmn-js/lib/BaseViewer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diagram',
  standalone: true,
  imports: [
    MenuComponent
  ],
  templateUrl: './diagram.component.html',
  styleUrl: './diagram.component.css'
})
export class DiagramComponent {

  public modeler: BpmnModeler
  private panel: any;

  @ViewChild('ref', { static: true }) private el!: ElementRef;
  @ViewChild('properties', { static: true }) private propertiesPanel!: ElementRef;

  constructor(
    private bpmnService: BpmnService
  ){
    this.modeler = new BpmnModeler({
      position: 'absolute',
      additionalModules: [
        minimapModule,
        BpmnColorPickerModule,
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule
      ]
    })
  }

  ngOnInit(): void{
    fetch('../assets/template.bpmn')
         .then(response => response.text())
         .then(xml => {
            this.modeler.importXML(xml)
         });
  }
  
  ngAfterContentInit(): void{
    this.modeler.attachTo(this.el.nativeElement);
    this.panel = this.modeler.get('propertiesPanel');
    this.panel.attachTo(this.propertiesPanel.nativeElement);
    this.bpmnService.setModeler(this.modeler);
  }

  ngOnDestroy(): void {
    this.modeler.destroy();
  }

  
}
