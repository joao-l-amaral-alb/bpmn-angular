import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaveXMLResult } from 'bpmn-js/lib/BaseViewer';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { saveAs } from 'file-saver';
import { BpmnService } from 'src/app/shared/services/bpmn.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  modeler!: BpmnModeler;
  commandStack: any;
  canvas: any;

  constructor(
    private route: Router,
    private bpmnService: BpmnService
  ){}

  ngOnInit(): void {
    this.modeler = this.bpmnService.getModeler();
    this.commandStack = this.modeler.get("commandStack");
    this.canvas = this.modeler.get("canvas");
  }

  viewXML(): void {
    this.modeler.saveXML().then((xmlData: SaveXMLResult) =>{
      const xml: string | undefined = xmlData.xml;
      if(xml) {
        this.bpmnService.setXML(xml)
        this.bpmnService.changedXML.next(xml);
      }
    });
    this.route.navigate(['/xmlViewer']);
  }

  downloadXML(): void {
    this.modeler.saveXML().then((xmlData: SaveXMLResult) =>{
      const xml: string | undefined = xmlData.xml;
      if(xml) {
        const blob = new Blob([xml], {type: "text/xml;charset=utf-8"});
        saveAs(blob, "bpmn.xml");
      }
    });
  }

  resetXML(): void {
    const defaultXML: string = this.bpmnService.getDefaultXML();
    this.modeler.importXML(defaultXML);
  }

  undoAction(): void {
    this.commandStack.undo();
  }

  redoAction(): void {
    this.commandStack.redo();
  }

  fitAction(): void {
    this.canvas.zoom('fit-viewport');
  }

}
