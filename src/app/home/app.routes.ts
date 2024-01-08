import { Routes } from '@angular/router';
import { DiagramComponent } from '../diagram/diagram.component';
import { XMLViewerComponent } from '../components/xmlviewer/xmlviewer.component';

export const routes: Routes = [
    { path: "", component: DiagramComponent },
    { path: "xmlViewer", component: XMLViewerComponent } 
 ];
 
