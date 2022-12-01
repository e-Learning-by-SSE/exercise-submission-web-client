import React from "react";
import { StackInterface } from "../interface/StackInterface";
import {Step, Icon} from "semantic-ui-react";


export default class Stack extends React.Component<React.PropsWithChildren<{stack: StackInterface[], selected: string}>> {

    constructor(props: React.PropsWithChildren<{stack: StackInterface[], selected: string}>) {
        super(props);
    }

    private createStepChain() {
        return(

            <Step.Group size="mini" atached="top">
                {this.createSteps()}
            </Step.Group>

        );

    }

    private createSteps() {

        const steps = [];
        let stack = this.props.stack;
       

        let selectedStack = stack.find((stack) => stack.id === this.props.selected);
        if(selectedStack != undefined) {
            let selectedOrder = selectedStack.order;
            for(let i = 0; i < stack.length; i++) {
             let step = stack.find((stack) => stack.order === i+1);

             if(step != undefined) {
                let active = false;
                let completed = false;
                    if(step.id == selectedStack.id) {
                        active = true;
                    }
                    if(step.order < selectedOrder) {
                        completed = true;
                    }
                
                    steps.push(  
                    <Step active={active} completed={completed} key={i}>
                        <Icon name={step.icon} />
                    <Step.Content>
                        <Step.Title>{step.step}</Step.Title>
                        <Step.Description>{step.description}</Step.Description>
                    </Step.Content>
                </Step>)
             }
             
         }
           
        }

        return steps;

    }



    render() {
        return (
            <div className="sequence-step">
                {this.createStepChain()}
            </div>
        )
    }

}