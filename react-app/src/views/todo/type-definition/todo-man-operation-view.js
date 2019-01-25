import React from 'react'
import {TodoManipulationTrayDefinition} from "../manipulation/todo-manipulation-tray";
import TodoManipulationTray from "../manipulation/todo-manipulation-tray";
import RaViewComponent from "../../../artifacts/ra-view-component";


class TodoManOperationView extends RaViewComponent {
    appRender() {
        let todoManipulationTrayDefinition = TodoManipulationTrayDefinition.instance();
        todoManipulationTrayDefinition.complexityType = "MANAGEMENT";
        todoManipulationTrayDefinition.enableChangeLogPanel = false;
        todoManipulationTrayDefinition.enableBugPanel = false;
        todoManipulationTrayDefinition.enableNotePanel = false;
        todoManipulationTrayDefinition.complexityPanelTitle = "Operation";
        todoManipulationTrayDefinition.complexityStepPanelTitle = "Operation Step";
        todoManipulationTrayDefinition.panelTitle = "Management Operations";
        return (<TodoManipulationTray uiDefinition={todoManipulationTrayDefinition} route={this.props.route}/>);
    }
}
export default TodoManOperationView;