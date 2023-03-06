import React from "react";

import { Segment, Header, Icon, Divider, Placeholder, Dropdown, Grid, GridColumn} from "semantic-ui-react";
import { CourseDto } from "stumgmtbackend";
import DataService from "../../services/DataService";


export default class ShowVersion extends React.Component<React.PropsWithChildren<{}>, 
    {dropdown: React.ReactElement<any, string | React.JSXElementConstructor<any>>}> {

    private courses: CourseDto[] = [];

    constructor(props: React.PropsWithChildren<{}>) {
        super(props);
        this.state = {dropdown: this.createPlaceHolder()};
        let api = new DataService();
        api.getStumgmtbackend().getCourses().then((courses) => {
            this.courses = courses;
            this.setState({dropdown: this.createDropdown(courses)});
        });
    }

    handleComboBoxSelection = (event: React.SyntheticEvent<HTMLElement, Event>, data: any) => {
        event.preventDefault();
        let id = data.value;
        if(id !== "noCourses") {
            let course = this.courses.find(course => course.id === id);
            if(course !== undefined) {
                let api = new DataService();
                api.getCurrentCourseId().setCourseId(course.id);
            }

        } 
    }

    public createDropdown(courses: CourseDto[]): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        const dropdownItems = [];

        if(courses.length === 0) {
           dropdownItems.push( { key: "noCourses", value: "noCourses", text: "No courses found" });
        }

        courses.forEach((course) => {
            dropdownItems.push( { key: course.id, value: course.id, text: course.title });
        });

        let currentCourse = new DataService().getCurrentCourseId();
        
            
        return ( <Dropdown
            placeholder='Select Country'
            fluid
            search
            selection
            onChange={this.handleComboBoxSelection}
            defaultValue={currentCourse.getCourseId()}
            options={dropdownItems}
          />);
    }

    private createPlaceHolder(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        
        return ( <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
          </Placeholder>);
    }


    render() {
        return (
            <div className="settings">
                <Segment>
                    <Header as="h2">
                        <Icon name="settings" />
                        <Header.Content>
                            Settings
                        </Header.Content>
                    </Header>
                    <Divider />
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <GridColumn>
                                <Header style={{marginTop:'0em'}} size="large" textAlign="center">Select Course:</Header>
                            </GridColumn>
                            <GridColumn>{this.state.dropdown}</GridColumn>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        )

    }


}
