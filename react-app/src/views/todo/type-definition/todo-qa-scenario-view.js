import React from 'react'
import {TodoManipulationTrayDefinition} from "../manipulation/todo-manipulation-tray";
import TodoManipulationTray from "../manipulation/todo-manipulation-tray";
import RaViewComponent from "../../../artifacts/ra-view-component";


class TodoQaScenarioView extends RaViewComponent {
    appRender() {
        let todoManipulationTrayDefinition = TodoManipulationTrayDefinition.instance();
        todoManipulationTrayDefinition.complexityType = "QA";
        todoManipulationTrayDefinition.complexityPanelTitle = "Scenario";
        todoManipulationTrayDefinition.complexityStepPanelTitle = "Steps";
        todoManipulationTrayDefinition.panelTitle = "Test Scenario & Cases";
        return (<TodoManipulationTray uiDefinition={todoManipulationTrayDefinition} route={this.props.route}/>);
    }
}
export default TodoQaScenarioView;