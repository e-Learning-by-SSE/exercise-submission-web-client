import React from "react";
import { StackInterface } from "../interface/StackInterface";
import {Step, Icon} from "semantic-ui-react";
import { isJSDocThisTag } from "typescript";


export default class Stack extends React.Component<React.PropsWithChildren<{stack: StackInterface[], selected: string}>> {

    constructor(props: React.PropsWithChildren<{stack: StackInterface[], selected: string}>) {
        super(props);
    }

    private createStepChain() {
        return(

            <Step.Group ordered size="mini" atached="top">
                {this.createSteps()}
            </Step.Group>

        );

    }

    private createSteps() {

        const steps = [];
        let stack = this.props.stack;
        let active = false;

        let stepStates = this.getStepStates();

       for(let i = stack.length - 1; i >= 0; i--) {
        let step = stack[i];
        let stepState = stepStates.find((element) => element.number == i);
        if(stepState) {
           steps.push(  
           <Step active={stepState.active} completed={stepState.completed}>
            <Icon name={step.icon} />
            <Step.Content>
              <Step.Title>{step.step}</Step.Title>
              <Step.Description>{step.description}</Step.Description>
            </Step.Content>
          </Step>)
        }
        
    }
        return steps;

    }

    private getStepStates() {
        
        const states = [];
        let completed = false;
        for(let i = this.props.stack.length-1; i >=0; i--) {
            let step = this.props.stack[i];
            if(step.id == this.props.selected) {
                states.push({number: i, active: true, completed: completed});
             
            } else {
                states.push({number: i, active: false, completed: completed});
                completed = true;
            }

        }
        return states;

     
    }


    render() {
        return (
            <div className="sequence-step">
                {this.createStepChain()}
            </div>
        )
    }

}