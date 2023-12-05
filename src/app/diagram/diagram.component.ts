import { ElementRef, ViewChild, OnInit } from '@angular/core';
import minimapModule from 'diagram-js-minimap';
import BpmnColorPickerModule from 'bpmn-js-color-picker';
import { Component } from '@angular/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from 'bpmn-js-properties-panel/dist';

@Component({
  selector: 'app-diagram',
  standalone: true,
  imports: [],
  templateUrl: './diagram.component.html',
  styleUrl: './diagram.component.css'
})
export class DiagramComponent {

  private modeler: BpmnModeler
  private panel: any;

  @ViewChild('ref', { static: true }) private el!: ElementRef;
  @ViewChild('properties', { static: true }) private propertiesPanel!: ElementRef;

  constructor(){
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

  
    /*this.modeler.on('element.click', (event) => {
      this.panel.detach();
      this.panel.attachTo(this.propertiesPanel.nativeElement);
    });*/
  }
  
  ngAfterContentInit(): void{
    this.modeler.attachTo(this.el.nativeElement);
    this.panel = this.modeler.get('propertiesPanel');
    this.panel.attachTo(this.propertiesPanel.nativeElement);
  }

  ngOnDestroy(): void {
    this.modeler.destroy();
  }
}
