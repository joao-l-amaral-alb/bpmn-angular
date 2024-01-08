import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SaveXMLResult } from 'bpmn-js/lib/BaseViewer';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { BpmnService } from 'src/app/shared/services/bpmn.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit, AfterViewInit {

  @Input() callBackFunction!: () => void;
  modeler!: BpmnModeler;

  constructor(
    private route: Router,
    private bpmnService: BpmnService
  ){}

  ngOnInit(): void {
    this.modeler = this.bpmnService.getModeler();
  }

  viewXML(): void {
    this.modeler.saveXML().then((xml: SaveXMLResult) =>{
      if(xml.xml) {
        this.bpmnService.setXML(xml.xml)
      }
    });
    this.route.navigate(['/xmlViewer']);
  }
  
  // @ViewChild('topMenu', { static: true }) private topMenuElement!: ElementRef;
  
  ngAfterViewInit(): void {
    /* const minimapButton: HTMLCollectionOf<Element> | null = document.getElementsByClassName("djs-minimap");
    const targetElement: HTMLElement = this.topMenuElement.nativeElement;

    if(minimapButton && minimapButton.length > 0) {
      targetElement.appendChild(minimapButton[0]);
    } */
  }

}
