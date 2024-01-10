import { Injectable } from "@angular/core";
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class BpmnService {
    changedXML = new Subject<string>();
    private modeler!: BpmnModeler;
    private xml: string = "";
    private defaultXML: string = "";

    getModeler(): BpmnModeler {
        return this.modeler;
    }

    setModeler(modeler: BpmnModeler): void {
        this.modeler = modeler;
    }

    clearModeler(): void {
        console.log("Clear modeler");
        this.modeler.clear();
    }

    getXML(): string {
        return this.xml;
    }

    setXML(xml: string): void {
        this.xml = xml;
    }

    getDefaultXML(){
        return this.defaultXML;
    }

    setDefaultXML(defaultXML: string) {
        this.defaultXML = defaultXML;
    }
    
}