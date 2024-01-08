import { Injectable } from "@angular/core";
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class BpmnService {
    private modeler!: BpmnModeler;
    private xml: string = ""

    getModeler(): BpmnModeler {
        return this.modeler;
    }

    setModeler(modeler: BpmnModeler): void {
        this.modeler = modeler;
    }

    getXML(): string {
        return this.xml;
    }

    setXML(xml: string): void {
        this.xml = xml;
    }
}