import React from "react";
import { StackInterface } from "../interface/StackInterface";
import {Step, Divider} from "semantic-ui-react";


export default class Stack extends React.Component<React.PropsWithChildren<{stack: StackInterface[], selected: string}>> {


    private createStepChain() {
        return(

            <Step.Group size="mini" width={this.props.stack.length} atached="top" fluid>
                {this.createSteps()}
            </Step.Group>

        );

    }

    private createSteps() {

        const steps = [];
        let stack = this.props.stack;
       

        let selectedStack = stack.find((stack) => stack.id === this.props.selected);
        if(selectedStack !== undefined) {
            let selectedOrder = selectedStack.order;
            for(let i = 0; i < stack.length; i++) {
             let step = stack.find((stack) => stack.order === i+1);

             if(step !== undefined) {
                let active = false;
                let completed = false;
                    if(step.id === selectedStack.id) {
                        active = true;
                    }
                    if(step.order < selectedOrder) {
                        completed = true;
                    }
                
                    steps.push(  
                    <Step active={active} completed={completed} key={i}>       
                    <Step.Content>
                        <Step.Title>{step.step}</Step.Title>       
                    </Step.Content>
                </Step>)
             }
             
         }
           
        }

        return steps;

    }
/* <Step active={active} completed={completed} key={i}>
                        <Icon name={step.icon} />
                    <Step.Content>
                        <Step.Title>{step.step}</Step.Title>
                        <Step.Description>{step.description}</Step.Description>
                    </Step.Content>*/


    render() {
        return (
            <div className="sequence-step">
                {this.createStepChain()}
                <Divider/>
            </div>
        )
    }

}