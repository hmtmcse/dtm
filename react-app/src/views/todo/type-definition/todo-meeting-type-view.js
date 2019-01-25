import React from 'react'
import {TodoManipulationTrayDefinition} from "../manipulation/todo-manipulation-tray";
import TodoManipulationTray from "../manipulation/todo-manipulation-tray";
import RaViewComponent from "../../../artifacts/ra-view-component";


class TodoMeetingTypeView extends RaViewComponent {
    appRender() {
        let todoManipulationTrayDefinition = TodoManipulationTrayDefinition.instance();
        todoManipulationTrayDefinition.complexityType = "MEETING";
        todoManipulationTrayDefinition.enableChangeLogPanel = false;
        todoManipulationTrayDefinition.enableBugPanel = false;
        todoManipulationTrayDefinition.enableNotePanel = false;

        todoManipulationTrayDefinition.complexityPanelTitle = "Main Topic";
        todoManipulationTrayDefinition.complexityStepPanelTitle = "Sub Topic";

        todoManipulationTrayDefinition.panelTitle = "Meeting Topics";
        return (<TodoManipulationTray uiDefinition={todoManipulationTrayDefinition} route={this.props.route}/>);
    }
}
export default TodoMeetingTypeView;