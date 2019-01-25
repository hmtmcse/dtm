import React from 'react'
import {TodoManipulationTrayDefinition} from "../manipulation/todo-manipulation-tray";
import TodoManipulationTray from "../manipulation/todo-manipulation-tray";
import RaViewComponent from "../../../artifacts/ra-view-component";


class TodoNoteTypeView extends RaViewComponent {
    appRender() {
        let todoManipulationTrayDefinition = TodoManipulationTrayDefinition.instance();
        todoManipulationTrayDefinition.complexityType = "NOTE";
        todoManipulationTrayDefinition.enableChangeLogPanel = false;
        todoManipulationTrayDefinition.enableBugPanel = false;
        todoManipulationTrayDefinition.enableNotePanel = false;
        todoManipulationTrayDefinition.enableComplexityStepPanel = false;

        todoManipulationTrayDefinition.complexityPanelTitle = "Notes";
        todoManipulationTrayDefinition.panelTitle = "Note Holder";
        return (<TodoManipulationTray uiDefinition={todoManipulationTrayDefinition} route={this.props.route}/>);
    }
}
export default TodoNoteTypeView;