const EXTRA_SPACE_CONSTANT: number = 10;

export function miniMapSetup(): void {
    /* const miniMapElement: HTMLElement  | null = document.querySelector<HTMLElement>(".djs-minimap .toggle");
    if(miniMapElement) {  
        miniMapElement.title = "Map";
    } */
}

export function calculateMiniMapPosition(): void {
    const propertiesPanel: HTMLElement | null = document.querySelector("#properties-panel");
    const miniMapButton: HTMLElement  | null = document.querySelector(".djs-minimap");

    if(propertiesPanel && miniMapButton) {  
        const propertiesPanelWidth: string =  (propertiesPanel.offsetWidth ?? "0").toString();
        miniMapButton.style.right = `${+propertiesPanelWidth+EXTRA_SPACE_CONSTANT}px`;
    }
}