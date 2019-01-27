import React from 'react'
import {TodoManipulationTrayDefinition} from "../manipulation/todo-manipulation-tray";
import TodoManipulationTray from "../manipulation/todo-manipulation-tray";
import RaViewComponent from "../../../artifacts/ra-view-component";


class TodoReminderTypeView extends RaViewComponent {
    appRender() {
        let todoManipulationTrayDefinition = TodoManipulationTrayDefinition.instance();
        todoManipulationTrayDefinition.complexityType = "REMINDER";
        todoManipulationTrayDefinition.enableChangeLogPanel = false;
        todoManipulationTrayDefinition.enableBugPanel = false;
        todoManipulationTrayDefinition.enableNotePanel = false;
        todoManipulationTrayDefinition.enableComplexityStepPanel = false;

        todoManipulationTrayDefinition.complexityPanelTitle = "Notes";

        todoManipulationTrayDefinition.panelTitle = "Reminder";
        return (<TodoManipulationTray uiDefinition={todoManipulationTrayDefinition} route={this.props.route}/>);
    }
}
export default TodoReminderTypeView;