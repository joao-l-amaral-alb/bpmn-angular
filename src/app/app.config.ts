import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { routes } from './app.routes';
import { BpmnService } from './shared/services/bpmn.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import minimapModule from 'diagram-js-minimap';
import BpmnColorPickerModule from 'bpmn-js-color-picker';
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from 'bpmn-js-properties-panel';

export function initializeApp(bpmnService: BpmnService, httpClient: HttpClient): Function {
  const modeler: BpmnModeler = new BpmnModeler(
    {
      position: 'absolute',
      additionalModules: [
        minimapModule,
        BpmnColorPickerModule,
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule
      ]
    }
  );

  bpmnService.setModeler(modeler);

  return () => httpClient.get('assets/template.bpmn', { responseType: 'text' }).subscribe({
    next: (xml: string) => {
      bpmnService.setDefaultXML(xml);
      modeler.importXML(xml) 
    },
    error: (e) => {console.error(e)},
    complete: () => console.info('Get default bpmn...')
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [BpmnService, HttpClient],
    }
  ]
};
