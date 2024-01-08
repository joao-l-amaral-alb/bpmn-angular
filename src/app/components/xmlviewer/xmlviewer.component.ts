import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BpmnService } from 'src/app/shared/services/bpmn.service';

@Component({
  selector: 'app-xmlviewer',
  standalone: true,
  imports: [],
  templateUrl: './xmlviewer.component.html',
  styleUrl: './xmlviewer.component.css'
})
export class XMLViewerComponent {
  public xml: string ="";

  constructor(
     private route: Router, 
     private bpmnService: BpmnService
  ){ }

  ngOnInit(): void {
     this.xml = this.bpmnService.getXML()
     if(this.xml == undefined) {
        this.xml = 'To design a workflow, go to the diagram page.';
      }
  }

  viewDiagram(){
     this.route.navigate(['']);
  }
}
