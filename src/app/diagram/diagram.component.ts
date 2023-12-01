import { ElementRef, ViewChild, OnInit } from '@angular/core';
import minimapModule from 'diagram-js-minimap';
import BpmnColorPickerModule from 'bpmn-js-color-picker';

import { Component } from '@angular/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
//@ts-ignore
import BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';

type BpmnJS = typeof BpmnJS

@Component({
  selector: 'app-diagram',
  standalone: true,
  imports: [],
  templateUrl: './diagram.component.html',
  styleUrl: './diagram.component.css'
})
export class DiagramComponent {
  private bpmnJS: BpmnJS
  //private modeler: BpmnModeler
  
  @ViewChild('ref', { static: true }) private el!: ElementRef;

  constructor(){
    this.bpmnJS = new BpmnJS({
      position: 'absolute',
      additionalModules: [
        minimapModule
      ]
    })
  }

  ngOnInit(): void{
    fetch('../assets/template.bpmn')
         .then(response => response.text())
         .then(xml => {
            this.bpmnJS.importXML(xml)
         });
  }

  zoomIn() {
    this.bpmnJS.get('zoomScroll').stepZoom(1);
  }

  zoomOut() {
    this.bpmnJS.get('zoomScroll').stepZoom(-1);
  }
  
  ngAfterContentInit(): void{
    this.bpmnJS.attachTo(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.bpmnJS.destroy();
  }
}
